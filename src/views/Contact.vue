<template>
  <div class="content content-small">
    <h1 id="pageTitle" class="page-title">Contact</h1>
    <div class="contact">
      <div>
        <h2>Producers</h2>
        <ul>
          <li><a href="mailto:sunay@skokfilm.com">Sunay Kahraman</a></li>
          <li><a href="mailto:oktay@skokfilm.com">Oktay Kahraman</a></li>
        </ul>
      </div>
      <div>
        <h2>Co-Producers</h2>
        <ul>
          <li><a href="mailto:mustafa@skokfilm.com">Mustafa Gülsün</a></li>
        </ul>
      </div>
      <div>
        <h2>Contact</h2>
        <a class="has-underline" href="mailto:hello@skokfilm.com"
          >hello@skokfilm.com</a
        >
        <span itemprop="telephone">
          <span>Tel</span>
          : (+90) 212 924 17 32
        </span>
        <span itemprop="telephone">
          <span>Mobile</span>
          : (+90) 532 605 83 19
        </span>
      </div>
      <div>
        <h2>Office (IST)</h2>
        <span itemprop="address">
          <span>Address</span>: Maslak Mahallesi Dereboyu 2 Caddesi No:15 Ata
          Center Kat: G2 İç Kapı No:75 <br />Sarıyer / İSTANBUL
          <a
            class="has-underline"
            target="blank"
            href="https://g.page/skokfilm"
          >
            [MAP]
          </a>
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="postcss">
.contact {
  display: grid;
  line-height: 1.5;
  letter-spacing: 0.5px;

  & h2 {
    margin-top: 0;
    margin-bottom: 0.25rem;
    font-size: 1.2rem;
  }

  & > div {
    padding: calc(var(--padding) / 3) calc(var(--padding) / 2)
      calc(var(--padding) / 3) 0;
  }

  & a {
    color: var(--text-color);
  }

  & [itemprop] {
    display: block;

    & span {
      font-weight: 550;
    }
  }
}
</style>