<template>
  <div class="sub-footer">
    <button
      :title="`Toggle ${lightTheme ? 'Dark' : 'Light'} Theme`"
      class="toggle-theme"
      :aria-pressed="lightTheme"
      @click="lightTheme = !lightTheme"
    >
      <span aria-hidden="true">{{ lightTheme ? "🌑" : "🌕" }}</span>
      <span class="sr-only">{{ lightTheme ? "Light" : "Dark" }} theme</span>
    </button>
    <button
      :title="$t(`footer.changeLanguage`)"
      :aria-label="$t(`footer.changeLanguage`)"
      class="toggle-language"
      @click="setLanguage"
    >
      {{ currentLangLabel }}
    </button>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let lightTheme = ref(localStorage.getItem("theme") === "light");
let currentLang = ref(localStorage.getItem("lang") ?? "en");
let currentLangLabel = currentLang.value === "en" ? "tr" : "en";

function setLanguage() {
  localStorage.setItem("lang", currentLangLabel);
  currentLang.value = localStorage.getItem("lang");
  router.go(0);
}

watch(
  () => lightTheme.value,
  () => {
    localStorage.setItem("theme", lightTheme.value ? "light" : "dark");
    document.documentElement.setAttribute(
      "theme",
      localStorage.getItem("theme")
    );
  },
  { immediate: true }
);
</script>

<style lang="postcss">
.sub-footer {
  margin: calc(var(--ws) / 2) 0;
}

.toggle-theme {
  background: transparent;
  border: 0;
  cursor: pointer;
  margin-right: calc(var(--ws) / 3);
  padding: 0;

  @media (--mobile) {
    margin-left: var(--ws);
  }
}

.toggle-language {
  color: var(--text-color);
  background: none;
  border: 1px solid var(--text-color);
  border-radius: 6px;
  font-size: 12px;
  text-transform: uppercase;
}
</style>
