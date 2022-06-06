<template>
  <ul class="social">
    <li>
      <a target="blank" href="http://vimeo.com/skokfilm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M0 0v24h24v-24h-24zm19.249 10.732c-1.628 3.478-5.558 8.213-8.042 8.213-2.448 0-2.802-5.221-4.139-8.696-.658-1.709-1.083-1.317-2.316-.454l-.752-.97c1.798-1.581 3.599-3.418 4.705-3.52 1.245-.12 2.012.731 2.299 2.554.379 2.396.908 6.114 1.832 6.114.72 0 2.494-2.95 2.585-4.004.162-1.544-1.135-1.591-2.261-1.109 1.781-5.836 9.194-4.761 6.089 1.872z"
          />
        </svg>
        <span class="sr-only">Vimeo, {{ $t("footer.opensInNewWindow") }}</span>
      </a>
    </li>
    <li>
      <a target="blank" href="https://www.instagram.com/skokfilm/">
        <span class="gg-instagram"></span>
        <span class="sr-only"
          >Instagram, {{ $t("footer.opensInNewWindow") }}</span
        >
      </a>
    </li>
    <li>
      <a target="blank" href="https://www.facebook.com/skokfilm/">
        <span class="gg-facebook"></span>
        <span class="sr-only"
          >Facebook, {{ $t("footer.opensInNewWindow") }}</span
        >
      </a>
    </li>
  </ul>
</template>
<style lang="postcss">
.social {
  list-style: none;
  display: flex;
  font-weight: 900;
  margin: var(--ws) 0 0;

  @media (--mobile) {
    padding: 0 var(--ws);
  }

  & li {
    margin-right: 6px;

    & a {
      min-width: 24px;
      min-height: 24px;
      width: 24px;
      display: grid;
      place-items: center;
      color: var(--text-color);
      border-radius: 4px;
      overflow: hidden;
      line-height: 0;
      transition: all ease-in 125ms;

      & path {
        fill: currentColor;
        transform: scale(var(--ggs, 1));
      }

      &:hover,
      &:focus {
        opacity: 0.75;
        width: 100%;
      }
    }
  }
}

/* css.gg */
.gg-facebook {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 24px;
  height: 24px;
  background-color: currentColor;
  padding: 2px;
}

.gg-facebook::after,
.gg-facebook::before {
  content: "";
  display: block;
  position: absolute;
  box-sizing: border-box;
  color: var(--site-bg);
}

.gg-facebook::before {
  width: 8px;
  height: 20px;
  border-left: 4px solid;
  border-top: 4px solid;
  border-top-left-radius: 5px;
  left: 12px;
}

.gg-facebook::after {
  width: 10px;
  height: 4px;
  background: currentColor;
  top: 9px;
  left: 10px;
  transform: skew(-5deg);
}

.gg-instagram {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  border: 2px solid transparent;
  box-shadow: 0 0 0 2px;
  border-radius: 2px;
  width: 20px;
  height: 20px;
  background-color: currentColor;
}

.gg-instagram::after,
.gg-instagram::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
}

.gg-instagram::after {
  border: 2px solid var(--site-bg);
  left: 3px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  top: 3px;
}

.gg-instagram::before {
  border-radius: 3px;
  width: 2px;
  height: 2px;
  background: var(--site-bg);
  right: 1px;
  top: 1px;
}
</style>