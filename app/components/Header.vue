<template>
  <div class="grid-container fixed bg-white z-[10]">
    <div class="row w-full">
      <div class="col-xs-12 !p-0">
        <div class="max-w-[2560px] m-auto flex justify-between items-center h-[44px]">
          <NuxtLink
            class="h-full w-[260px] bg-no-repeat bg-center bg-contain"
            :style="{
              'background-image': `url(/img/basikon.svg)`,
            }"
            :to="localePath('/')"
          >
          </NuxtLink>

          <div class="hidden h-full lg:flex items-center">
            <div v-for="menu in page.menus" class="h-full flex items-center" :key="`${locale}-${menu.title}`">
              <NuxtLink v-if="menu.href" :href="localePath(menu.href)" class="text-center block pl-4 pr-4">{{ menu.title }}</NuxtLink>

              <div v-else class="header-menu-block pl-4 pr-4 relative h-full flex items-center">
                <div class="text-center cursor-pointer">{{ menu.title }}</div>

                <div v-if="menu.items" class="absolute z-[1] top-[44px] pt-[10px]">
                  <div class="header-menu-items justify-between bg-white rounded-md">
                    <div v-for="item in menu.items" class="p-4">
                      <div class="font-bold whitespace-nowrap p-1">{{ item.title }}</div>

                      <div v-for="subItem in item.items">
                        <NuxtLink :href="localePath(subItem.href)" class="whitespace-nowrap p-1 block">{{ subItem.title }}</NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-[260px] flex justify-end">
            <NuxtLink
              v-if="page.button"
              :href="page.button.href"
              :class="'pointer-events-auto button button-sm' + (page.button.style ? ` button-${page.button.style}` : '')"
            >
              {{ page.button.title }}
            </NuxtLink>

            <div class="ml-2 flex lg:hidden burger-icon" @click.stop="toggleMobileMenu" :data-toggle="showMenu">
              <span />
              <span />
              <span />
            </div>

            <div class="responsive-menu lg:!hidden h-screen w-full absolute z-[1] top-[44px] left-0" :data-show="showMenu">
              <div v-for="menu in page.menus" class="" :key="`${locale}-${menu.title}`">
                <NuxtLink v-if="menu.href" :href="localePath(menu.href)" class="block pl-5 pr-5 pt-2 pb-2">{{ menu.title }}</NuxtLink>

                <div v-else class="header-menu-block-responsive pl-5 pr-5">
                  <div class="cursor-pointer pt-2 pb-2">{{ menu.title }}</div>

                  <div v-if="menu.items" class="header-menu-items-responsive pt-2 pb-2 bg-white">
                    <div v-if="menu.items" v-for="item in menu.items" class="">
                      <div class="font-bold p-1 pl-4">{{ item.title }}</div>

                      <div v-for="subItem in item.items">
                        <NuxtLink :href="localePath(subItem.href)" class="p-1 pl-4 block">{{ subItem.title }}</NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <select @change="switchLocale($event)" name="locales" class="ml-2 cursor-pointer hidden lg:block">
              <option
                v-for="availableLocale in availableLocales"
                :key="availableLocale.code"
                :value="availableLocale.code"
                :selected="availableLocale.code === locale"
              >
                {{ availableLocale.code.toUpperCase() }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
import { ref } from "vue"

const localePath = useLocalePath()
const { locales, locale, setLocale } = useI18n()

const availableLocales = locales.value

const pageName = "header"
const { data: page, refresh } = await useAsyncData(`${pageName}-${locale.value}`, () =>
  $fetch(`${resourcesUrl}/pages/${locale.value}/${pageName}.json`),
)
watch(locale, () => refresh())

function switchLocale(event) {
  setLocale(event.target.value)
}

const showMenu = ref(false)
function toggleMobileMenu() {
  showMenu.value = !showMenu.value
}
</script>

<style scoped lang="scss">
.header-menu-block {
  &:hover {
    .header-menu-items {
      display: flex;
    }

    &::after {
      border-bottom: 11px solid var(--color-white);
      border-left: 11px solid rgba(0, 0, 0, 0);
      border-right: 11px solid rgba(0, 0, 0, 0);
      content: "";
      display: inline-block;
      left: auto;
      position: absolute;
      left: 45%;
      top: 44px;
    }
  }
}

.header-menu-items {
  display: none;
  box-shadow: 0 1px 0 1px rgba(155, 155, 155, 0.1);
}

.header-menu-block-responsive {
  &:hover {
    .header-menu-items-responsive {
      display: block;
    }
  }
}

.header-menu-items-responsive {
  display: none;
  box-shadow: 0 0 0 1px rgba(100, 100, 100, 0.1);
}

.burger-icon {
  cursor: pointer;
  flex-direction: column;
  justify-content: space-around;
  height: 28px;
  width: 28px;

  span {
    background-color: var(--color-blue-dark);
    display: block;
    height: 3px;
    transition:
      opacity 0.2s ease-in-out,
      transform 0.2s ease-in-out;
    width: 28px;

    &:nth-of-type(1) {
      margin-top: 0;
      transform-origin: top right;
    }

    &:nth-of-type(3) {
      margin-bottom: 0;
      transform-origin: bottom right;
    }
  }

  &[data-toggle="true"] {
    span {
      &:nth-of-type(1) {
        transform: rotate(-45deg);
      }

      &:nth-of-type(2) {
        opacity: 0;
      }

      &:nth-of-type(3) {
        transform: rotate(45deg);
      }
    }
  }
}

.responsive-menu {
  background: var(--color-white);
  display: none;

  &[data-show="true"] {
    display: flex;
    flex-direction: column;
  }
}
</style>
