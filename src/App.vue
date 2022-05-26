<template>
  <AppHeader />
  <AppIntroduction />
  <AppContent />
  <AppPlayer />
  <AppAuthModal />
</template>

<script>
import AppIntroduction from '@/components/Introduction.vue';
import AppContent from '@/components/Content.vue';
import AppPlayer from '@/components/Player.vue';
import AppHeader from '@/components/Header.vue';
import AppAuthModal from '@/components/Auth.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuthModal,
    AppIntroduction,
    AppContent,
    AppPlayer,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>
