<template>
	<div class="social">
		<a
			target="blank"
			href="http://vimeo.com/skokfilm"
		>Vimeo</a>
		<a
			target="blank"
			href="https://www.instagram.com/skokfilm/"
		>IG</a>
		<a
			target="blank"
			href="https://www.facebook.com/skokfilm/"
		>Fb</a>
		<a
			target="blank"
			href="mailto:hello@skokfilm.com"
			class="msh"
		><span class="at">@</span><span class="hello">hello@skokfilm.com</span></a>
	</div>
</template>
<script>
export default {
}
</script>
<style lang="postcss">
.social {
  display: flex;
  font-weight: 900;
  margin-top: 60px;

  @media (max-width: 991px) {
    padding: var(--mobile-padding);
  }

  & a {
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.25);
    color: #000;
    margin-right: 2px;
    transition: background-color ease-in 125ms;

    &:hover,
    &:focus {
      background-color: #fff;
    }
  }

  & .msh {
    &:not(:hover) .hello {
      display: none;
    }

    &:hover .at {
      display: none;
    }
  }
}
</style>