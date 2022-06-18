<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
           style="background-image: url(/assets/img/song-header.png)">
      </div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button type="button" class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full
        focus:outline-none" @click.prevent="newSong(this.song)" id="play-button">
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments ({{ song.comment_count }})</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p-4 mb-4"
            v-if="comment_show_alert"
            :class="comment_alert_variant"
          >
            {{ comment_alert_message }}
          </div>
          <VeeForm :validation-schema="schema" @submit="addComment" v-if="userLoggedIn">
            <VeeField as="textarea" name="comment"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                      transition duration-500 focus:outline-none focus:border-black rounded mb-4"
                      placeholder="Your comment here..."></VeeField>
            <ErrorMessage name="comment" class="text-red-600 mb-4 block"/>
            <button
              :disabled="comment_in_submission"
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
            >
              Submit
            </button>
          </VeeForm>
          <!-- Sort Comments -->
          <select v-model="sort"
                  class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded">
            <option value="DESC">Latest</option>
            <option value="ASC">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul
      class="container mx-auto"
      v-for="comment in sortedComments"
      :key="comment.docID"
    >
      <li class="p-6 bg-gray-50 border border-gray-200">
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.userName }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import { songsCollection, commentsCollection, auth } from '@/includes/firebase';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Song',
  data() {
    return {
      song: {},
      comments: [],
      schema: {
        comment: 'required|min:3',
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: 'bg-blue-500',
      comment_alert_message: 'Please wait! Your comment is being submitted.',
      sort: 'DESC',
    };
  },
  async beforeRouteEnter(to, from, next) {
    const docSnapshot = await songsCollection.doc(to.params.id)
      .get();

    next(async (vm) => {
      if (!docSnapshot.exists) {
        await vm.$router.push({ name: 'home' });
        return;
      }

      const { sort } = vm.$route.query;
      // eslint-disable-next-line no-param-reassign
      vm.sort = sort === 'DESC' || sort === 'ASC' ? sort : 'DESC';

      // eslint-disable-next-line no-param-reassign
      vm.song = docSnapshot.data();
      await vm.getComments();
    });
  },
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
    sortedComments() {
      return this.comments.slice()
        .sort((a, b) => {
          if (this.sort === 'DESC') {
            return new Date(b.datePosted) - new Date(a.datePosted);
          }
          return new Date(a.datePosted) - new Date(b.datePosted);
        });
    },
  },
  methods: {
    ...mapActions(['newSong']),
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = 'bg-blue-500';
      this.comment_alert_message = 'Please wait! Your comment is being submitted.';

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        songId: this.$route.params.id,
        userName: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);

      this.song.comment_count += 1;

      await songsCollection.doc(this.$route.params.id)
        .update({
          comment_count: this.song.comment_count,
        });

      await this.getComments();

      this.comment_in_submission = false;
      this.comment_alert_variant = 'bg-green-500';
      this.comment_alert_message = 'Comment added!';

      resetForm();

      setTimeout(() => {
        this.comment_show_alert = false;
      }, 1000);
    },
    async getComments() {
      const snapshots = await commentsCollection.where('songId', '==', this.$route.params.id)
        .get();

      this.comments = [];
      snapshots.forEach((doc) => {
        this.comments.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }

      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>
