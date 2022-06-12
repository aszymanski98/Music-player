<template>
  <AppHeader/>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <AppPlayer/>
  <AppAuthModal/>
</template>

<script>
import AppPlayer from '@/components/Player.vue';
import AppHeader from '@/components/Header.vue';
import AppAuthModal from '@/components/Auth.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuthModal,
    AppPlayer,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.25s linear;
}

.fade-leave-to {
  transition: all 0.25s linear;
  opacity: 0;
}
</style>
