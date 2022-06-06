<template>
  <div class="content content-small">
    <h1 id="pageTitle" class="page-title">{{ $t("contact.title") }}</h1>
    <div class="contact">
      <div>
        <h2>{{ $t("contact.producers") }}</h2>
        <ul>
          <li><a href="mailto:sunay@skokfilm.com">Sunay Kahraman</a></li>
          <li><a href="mailto:oktay@skokfilm.com">Oktay Kahraman</a></li>
          <li><a href="mailto:sibel@skokfilm.com">Sibel Bolat</a></li>
        </ul>
      </div>
      <div>
        <h2>{{ $t("contact.coProducers") }}</h2>
        <ul>
          <li><a href="mailto:mustafa@skokfilm.com">Mustafa Gülsün</a></li>
        </ul>
      </div>
      <div>
        <h2>{{ $t("contact.title") }}</h2>
        <a class="has-underline" href="mailto:hello@skokfilm.com">
          hello@skokfilm.com
        </a>
        <span itemprop="telephone">
          <span>{{ $t("contact.tel") }}</span>
          : (+90) 212 924 17 32
        </span>
        <span itemprop="telephone">
          <span>{{ $t("contact.mobile") }}</span>
          : (+90) 532 605 83 19
        </span>
      </div>
      <div>
        <h2>{{ $t("contact.office") }} (IST)</h2>
        <span itemprop="address">
          <span>{{ $t("contact.address") }}</span>
          : Maslak Mahallesi Dereboyu 2 Caddesi <br />
          No:15 Ata Center Kat: G2 İç Kapı No:75 <br />
          Sarıyer / İSTANBUL
          <a
            class="has-underline"
            target="blank"
            href="https://g.page/skokfilm"
          >
            [{{ $t("contact.map") }}]
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
    padding: calc(var(--ws) / 3) calc(var(--ws) / 2) calc(var(--ws) / 3) 0;
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