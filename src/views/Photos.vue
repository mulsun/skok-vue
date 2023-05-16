<template>
  <div class="photos-page">
    <div v-if="!photos.who()" class="photos-container">
      <div class="photographers-menu">
        <h2>Artists</h2>
        <ul>
          <li v-for="(p, i) in photos.photographers" :key="i">
            <a :href="`/photos/${slugify(p)}`">{{ p }}</a>
          </li>
        </ul>
      </div>
      <div class="photos-side">
        <div class="photo-filters">
          <label
            v-for="(c, i) in photos.categories"
            :key="i"
            class="photo-filter"
          >
            <input
              class="sr-only"
              :value="c"
              type="radio"
              name="categoryFilter"
              v-model="mpfilter"
            />
            {{ c }}
          </label>
        </div>
        <div class="photo-filters photographer" v-if="mpfilter">
          <label v-for="(c, i) in mppFiltered" :key="i" class="photo-filter">
            <input
              class="sr-only"
              :value="c"
              type="radio"
              name="photographerFilter"
              v-model="mppfilter"
            />
            {{ c }}
          </label>
        </div>
        <div class="photo-grid">
          <template
            v-for="(photographer, i) in mppFilteredPhotos || currentPhotos"
            :key="i"
          >
            <template v-for="(category, j) in photographer.children" :key="j">
              <template v-for="(item, k) in category.children" :key="k">
                <template v-if="item.children">
                  <template v-for="(photo, l) in item.children" :key="l">
                    <div
                      class="photo-item"
                      @click="modal.open($event, photographer.name)"
                    >
                      <img
                        :src="
                          photos.path(
                            photographer.name,
                            category.name + '/' + item.name,
                            photo
                          )
                        "
                        alt=""
                      />
                    </div>
                  </template>
                </template>
                <template v-else>
                  <div
                    class="photo-item"
                    @click="modal.open($event, photographer.name)"
                  >
                    <img
                      :src="photos.path(photographer.name, category.name, item)"
                      alt=""
                    />
                  </div>
                </template>
              </template>
            </template>
          </template>
        </div>
      </div>
    </div>
    <div class="photographer-photos" v-else>
      <h1>{{ photos.who() }}</h1>
      <div class="photographer-photos-filters">
        <label>
          <input
            class="sr-only"
            type="radio"
            name="filter"
            v-model="cpfilter"
            value="all"
          />
          All
        </label>
        <label v-for="(o, i) in photos.all()" :key="i">
          <input
            class="sr-only"
            type="radio"
            name="filter"
            v-model="cpfilter"
            :value="o.name"
          />
          {{ o.name }}
        </label>
      </div>
      <div v-for="(o, i) in filteredPhotos" :key="i" class="photo-category">
        <div class="photo-grid">
          <div
            class="photo-item"
            :class="o.name"
            v-for="(photo, j) in fpc(o.children)"
            :key="`${i - j}`"
            @click="modal.open($event)"
            :data-category="o.name"
          >
            <img
              :src="photos.path(photos.who(), o.name, photo)"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
    <Modal
      @close="modal.show = false"
      :show="modal.show"
      :src="modal.src"
      :photographer="modal.photographer"
    />
  </div>
</template>
<script setup>
import { ref, reactive, inject, watch } from "vue";
import Modal from "../components/modal.vue";
const data = inject("photoData");
const slugify = inject("slugify");
const fpc = inject("flattenPhotosChildren");
const photos = reactive({ ...data });
const currentPhotos = ref(photos.random);

const modal = reactive({
  src: null,
  show: false,
  open(e, p) {
    this.src = e.target.src;
    this.show = true;
    this.photographer = p;
  },
});

// Main Page Photography Filter
const mpfilter = ref(null);
const mppFiltered = ref(photos.photographers);

watch(mpfilter, (category) => {
  // reset
  mppfilter.value = null;
  mppFilteredPhotos.value = null;

  const filtered = photos
    .all()
    .map((p) => {
      const filteredChildren = p.children.find((c) => c.name === category);
      return {
        ...p,
        children: filteredChildren ? [filteredChildren] : undefined,
      };
    })
    .filter((p) => p.children !== undefined);
  mppFiltered.value = filtered.map((p) => p.name);
  currentPhotos.value = filtered;
});

// Main Page Photographer Filter
const mppfilter = ref(null);
const mppFilteredPhotos = ref(null);

watch(mppfilter, (photographer) => {
  mppFilteredPhotos.value = currentPhotos.value.filter(
    (p) => p.name === photographer
  );
});

// Category Page Photographer Filters
const cpfilter = ref("all");
const filteredPhotos = ref(photos.all());

watch(cpfilter, (val) => {
  if (val === "all") {
    filteredPhotos.value = photos.all();
  } else {
    photos.all().find((o) => {
      if (o.name === val) {
        filteredPhotos.value = [o];
      }
    });
  }
});
</script>

<style lang="postcss">
.photos-page {
  margin-top: calc(var(--ws) * 2);

  @media (--mobile) {
    padding: 0 var(--ws);
  }
}

.photos-container {
  display: grid;
  @media (--desktop) {
    grid-template-columns: 20% 1fr;
    gap: 0.2rem;
  }
}

.photo-filters {
  margin: 0 0 calc(var(--ws) / 2);
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;

  &.photographer {
    border-top: 1px solid rgba(150, 150, 150, 0.2);
    padding: calc(var(--ws) / 2) 0;
  }

  & .photo-filter {
    display: inline-flex;
    border: 1px solid var(--opaque-contrast);
    border-radius: 0.5rem;
    padding: calc(var(--ws) / 4) calc(var(--ws) / 2);
    margin: calc(var(--ws) / 12);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:has(:checked),
    &:hover {
      background-color: var(--text-color);
      color: var(--site-bg);
    }
  }
}

.photographers-menu {
  & h2 {
    margin: 0 0 calc(var(--ws) / 6);
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 600;
  }

  & a {
    font-size: 0.9rem;
    line-height: 1.25rem;

    @media (--mobile) {
      font-size: 2rem;
      line-height: 2.3rem;
      font-weight: 800;
    }
  }
}

.photo-grid {
  gap: calc(var(--ws) / 8);
  column-count: 4;

  @media (--mobile) {
    column-count: 2;
  }

  & .photo-item {
    cursor: pointer;
    animation: photo-fade-in 0.5s linear;
    opacity: 0.85;
    transition: opacity 0.2s ease-in-out;

    & img {
      height: auto;
      width: 100%;
      object-fit: cover;
    }

    &:hover {
      opacity: 1;
    }
  }
}

.photos-side {
  @media (--mobile) {
    display: none;
  }
}

.photographer-photos {
  & h1 {
    font-size: 5rem;
    font-weight: 300;
    line-height: 1;
    text-align: center;
    margin-bottom: var(--ws);
  }

  & .photographer-photos-filters {
    text-align: center;
    display: flex;
    justify-content: center;
    margin: var(--ws) 0;
    gap: calc(var(--ws) / 2);

    & label {
      cursor: pointer;

      &:has(:checked) {
        color: var(--text-color);
        font-weight: 600;
        text-decoration: underline;
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }

  & .photo-category {
    display: grid;
    gap: var(--ws);
    margin-bottom: calc(var(--ws) * 3);

    @media (--mobile) {
      grid-template-columns: 1fr;
    }
  }
}

@keyframes photo-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>