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
              name="filter"
              @change="filterPhotos($event.target.value)"
            />
            {{ c }}
          </label>
        </div>
        <div class="photo-grid">
          <template v-for="(photographer, i) in currentPhotos" :key="i">
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
      <div v-for="(o, i) in photos.all()" :key="i" class="photo-category">
        <h2>{{ o.name }}</h2>
        <div class="photo-grid">
          <div
            class="photo-item"
            :class="o.name"
            v-for="(photo, j) in fpc(o.children)"
            :key="`${i - j}`"
            @click="modal.open($event)"
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
import { ref, reactive, inject } from "vue";
import Modal from "../components/modal.vue";
const data = inject("photoData");
const slugify = inject("slugify");
const fpc = inject("flattenPhotosChildren");
const photos = reactive({ ...data });
const currentPhotos = ref(photos.random);

function filterPhotos(category) {
  const filtered = photos.all().map((p) => {
    const filteredChildren = p.children.find((c) => c.name === category);
    return {
      ...p,
      children: filteredChildren ? [filteredChildren] : undefined,
    };
  });
  currentPhotos.value = filtered;
}

const modal = reactive({
  src: null,
  show: false,
  open(e, p) {
    this.src = e.target.src;
    this.show = true;
    this.photographer = p;
  },
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
  }

  & .photo-category {
    display: grid;
    grid-template-columns: 0.15fr 0.85fr;
    gap: var(--ws);
    margin-bottom: calc(var(--ws) * 3);

    @media (--mobile) {
      grid-template-columns: 1fr;
    }

    &:hover {
      & h2 {
        text-decoration: underline;
      }
    }

    & h2 {
      margin: 0;
      font-size: 1rem;
      letter-spacing: 0;
      font-weight: 400;
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