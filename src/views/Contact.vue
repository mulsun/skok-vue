<template>
  <div class="content content-small">
    <h2 class="page-title">Contact</h2>
    <div class="contact">
      <div>
        <h3>Executive Producer</h3>
        <a href="mailto:sunay@skokfilm.com">Sunay Kahraman</a>
      </div>
      <div>
        <h3>Producers</h3>
        <ul>
          <li><a href="mailto:sibel@skokfilm.com">Sibel Bolat</a></li>
          <li><a href="mailto:oktay@skokfilm.com">Oktay Kahraman</a></li>
          <li><a href="mailto:atilla@skokfilm.com">Atilla Onur Varol</a></li>
          <li><a href="mailto:ali@skokfilm.com">Ali Yılmaz</a></li>
        </ul>
      </div>
      <div>
        <h3>Co-Producer</h3>
        <a href="mailto:mustafa@skokfilm.com">Mustafa Gülsün</a>
      </div>
      <div>
        <h3 data-translate="contact-put">Contact</h3>
        <a href="mailto:hello@skokfilm.com">hello@skokfilm.com</a>
        <span itemprop="telephone">
          <span data-translate="tel">Tel</span>
          : (+90) 212 367 40 71
        </span>
        <span itemprop="fax">
          <span data-translate="fax">Fax</span>
          : (+90) 212 366 58 02
        </span>
        <span itemprop="telephone">
          <span data-translate="mobile">Mobile</span>
          : (+90) 532 605 83 19
        </span>
      </div>
      <div>
        <h3>Office (IST)</h3>
        <span itemprop="address">
          <span data-translate="address">Address</span>
          : Maslak Mh. Bilim Sk. No:5<br>Sun Plaza Kat: 13-15-19 MASLAK / ISTANBUL
          <a
            target="blank"
            href="https://www.google.com.tr/maps/place/Sun+Plaza/@41.110089,29.019272,15z/data=!4m5!3m4!1s0x0:0x3b4fe6cfd6d3233b!8m2!3d41.110089!4d29.019272"
          >[MAP]</a>
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="postcss">
.contact {
  display: grid;
  font-size: 13px;
  line-height: 1.5;
  letter-spacing: 0.5px;

  & h3 {
    margin-top: 0;
  }

  & > div {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 10px 15px 10px 0;
    transition: all ease-in 125ms;

    &:hover {
      background-color: #fff;
      padding-left: 15px;

      & a,
      & {
        color: #000;
      }
    }

    &:first-child {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  & a {
    color: rgba(255, 255, 255, 0.75);

    &:hover,
    &:focus {
      color: #fff;
      text-decoration: underline;
    }
  }

  & [itemprop] {
    display: block;

    & span {
      font-weight: 500;
    }
  }
}
</style>