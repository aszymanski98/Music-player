<template>
  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-white text-left align-top w-full h-20">
    <div class="relative h-full flex items-center justify-evenly">
      <!-- Play/Pause Button -->
      <div class="float-left leading-3 flex justify-center px-2"
           :class="{'mt-8': currentSong.modified_name}">
        <button type="button" @click.prevent="toggleAudio" id="player-play-button">
          <i class="fa text-gray-500 text-xl"
            :class="{ 'fa-play': !playing, 'fa-pause': playing }"
          ></i>
        </button>
      </div>
      <!-- Current Position -->
      <div
        class="float-left flex justify-center items-center w-7 h-7 leading-3 text-gray-400
          text-lg w-14 mt-1 px-2"
        :class="{'mt-8': currentSong.modified_name}"
      >
        <span class="player-currenttime">{{ seek }}</span>
      </div>
      <!-- Song Title -->
      <div
        class="absolute top-0 w-full text-sm lg:text-base
            text-center player-song-info h-2/3 flex items-center justify-center"
        v-if="currentSong.modified_name"
      >
        <span class="song-title">{{ currentSong.modified_name }}</span>
      </div>

      <!-- Scrub -->
      <div class="float-left player-scrub px-2" :class="{'mt-8': currentSong.modified_name}">
        <!-- Scrub Container  -->
        <span
          class="block w-full h-2 rounded m-1 bg-gray-200 relative cursor-pointer"
          @click.prevent="updateSeek"
        >
          <!-- Player Ball -->
          <span class="absolute top-neg-10 -translate-x-2 text-gray-800 text-lg"
                :style="{ left: playerProgress }"
          >
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
                :style="{ width: playerProgress }"></span>
        </span>
      </div>
      <!-- Duration -->
      <div
        class="float-left flex justify-center items-center w-7 h-7 leading-3
        text-gray-400 text-lg w-14 mt-1 px-2"
        :class="{'mt-8': currentSong.modified_name}"
      >
        <span class="player-duration">{{ duration }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Player',
  computed: {
    ...mapGetters(['playing']),
    ...mapState({
      duration: (state) => state.player.duration,
      seek: (state) => state.player.seek,
      playerProgress: (state) => state.player.playerProgress,
      currentSong: (state) => state.player.currentSong,
    }),
  },
  methods: {
    ...mapActions(['toggleAudio', 'updateSeek']),
  },
};
</script>
