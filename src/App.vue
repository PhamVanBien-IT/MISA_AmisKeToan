<template>
  <div class="container">
      <TheNavVue></TheNavVue>
      <TheContentVue></TheContentVue>
  </div>
</template>

<script>
import TheNavVue from './views/TheNav.vue';
import TheContentVue from './views/TheContent.vue';

export default {
  name: 'App',
  components: {
    TheNavVue,
    TheContentVue,
  }
}
</script>

<style>
  @import url(../src/css/main.css);
</style>
