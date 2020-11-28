<template>
  <h1 class="logo-header">
    <router-link to="/">
      <span class="sr-only">SKOK Film</span>
      <img
        src="//skokfilm.com/images/skok-logo.svg"
        alt=""
      >
    </router-link>
  </h1>
</template>

<script>
export default {

}
</script>
<style lang="postcss">
.logo-header {
  flex: 1;
  margin: 0;
  line-height: 0;

  & a {
    display: inline-flex;
    height: 48px;

    & img {
      height: 100%;
    }
  }
}
</style>