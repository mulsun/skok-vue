<template>
  <div class="content content-small">
    <h1 id="pageTitle" class="page-title">{{ $t("about.title") }}</h1>
    <p class="preline">{{ $t("about.text") }}</p>

    <div class="legal-docs">
      <h3>{{ $t("legal.title") }}</h3>
      <a href="/pdfs/KVKK_ve_Islenmesi_Politikasi_SKOK.docx.pdf">
        {{ $t("legal.kvkk") }}
      </a>
      <a href="/pdfs/Genel_AydinlatmaMetni_SKOK.docx.pdf">
        {{ $t("legal.genel") }}
      </a>
      <a href="/pdfs/Musteri_AydinlatmaMetni_SKOK.docx.pdf">
        {{ $t("legal.musteri") }}
      </a>
      <a href="/pdfs/CalisanAdayi_AydinlatmaMetni_SKOK.docx.pdf">
        {{ $t("legal.calisan") }}
      </a>
      <a href="/pdfs/Kamera_AydinlatmaMetni_SKOK.docx.pdf">
        {{ $t("legal.kamera") }}
      </a>
    </div>
  </div>
</template>
<style>
.legal-docs {
  display: flex;
  flex-direction: column;
  padding: var(--ws);
  line-height: 1.5;
}
</style>