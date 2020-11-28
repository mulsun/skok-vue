<template>
	<ul class="social">
		<li><a
			target="blank"
			href="http://vimeo.com/skokfilm"
		>Vimeo</a></li>
		<li><a
			target="blank"
			href="https://www.instagram.com/skokfilm/"
		>IG</a></li>
		<li><a
			target="blank"
			href="https://www.facebook.com/skokfilm/"
		>Fb</a></li>
		<li><a
			target="blank"
			href="mailto:hello@skokfilm.com?subject=Hello! 👋"
			class="msh"
		><span class="at">@</span><span class="hello">hello@skokfilm.com</span></a></li>
	</ul>
</template>
<script>
export default {
}
</script>
<style lang="postcss">
.social {
  list-style: none;
  padding: 0;
  display: flex;
  font-weight: 900;
  margin: 60px 0 0;

  @media (max-width: 991px) {
    padding: var(--mobile-padding);
  }

  & li a {
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
    @media(min-width: 421px) {
      &:not(:hover) .hello {
        display: none;
      }

      &:hover .at {
        display: none;
      }
    }

    @media(max-width: 420px) {
      & .hello {
        display: none;
      }

      & .at {
        display: inline-flex;
      }
    }
  }
}
</style>