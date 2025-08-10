<template>
  <div class="header grid-container fixed bg-white z-[100]">
    <div class="row">
      <div class="col-xs-12">
        <div class="max-w-[1200px] m-auto flex justify-between items-center h-[44px]">
          <NuxtLink
            class="h-full w-[260px] bg-no-repeat bg-left bg-contain"
            :style="{
              'background-image': `url(/img/basikon.svg)`,
            }"
            :to="localePath('/')"
            @click="closeMenu"
          >
          </NuxtLink>

          <div class="hidden h-full lg:flex items-center">
            <div v-for="menu in page.menus" class="h-full flex items-center" :key="`${locale}-${menu.text}`">
              <NuxtLink v-if="menu.href" :href="localePath(menu.href)" class="text-center block px-3 xl:px-4">{{ $t(menu.text) }}</NuxtLink>

              <div v-else class="header-menu-block px-3 xl:px-4 relative h-full flex items-center">
                <div class="text-center cursor-pointer" tabindex="1">{{ $t(menu.text) }}</div>

                <div v-if="menu.items" class="absolute z-[1] top-[44px] pt-[10px]">
                  <div class="header-menu-items justify-between bg-white rounded-md">
                    <div v-for="item in menu.items" class="p-4">
                      <div class="font-bold whitespace-nowrap p-1">{{ $t(item.text) }}</div>

                      <div v-for="subItem in item.items">
                        <NuxtLink :href="localePath(subItem.href)" class="whitespace-nowrap p-1 block min-w-[140px]">{{ $t(subItem.text) }}</NuxtLink>
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
              :href="localePath(page.button.href)"
              :class="'pointer-events-auto button button-sm' + (page.button.color ? ` button-${page.button.color}` : '')"
            >
              {{ $t(page.button.text) }}
            </NuxtLink>

            <div class="ml-2 flex lg:hidden burger-icon" @click.stop="toggleMobileMenu" :data-toggle="showMenu">
              <span />
              <span />
              <span />
            </div>

            <div class="responsive-menu lg:!hidden h-screen w-full absolute z-[1] top-[44px] left-0" :data-show="showMenu">
              <div v-for="menu in page.menus" class="" :key="`${locale}-${menu.text}`">
                <NuxtLink v-if="menu.href" :href="localePath(menu.href)" @click="closeMenu" class="block pl-5 pr-5 pt-2 pb-2">{{
                  $t(menu.text)
                }}</NuxtLink>

                <div v-else class="header-menu-block-responsive pl-5 pr-5">
                  <div class="cursor-pointer pt-2 pb-2">{{ $t(menu.text) }}</div>

                  <div v-if="menu.items" class="header-menu-items-responsive pt-2 pb-2 bg-white">
                    <div v-if="menu.items" v-for="item in menu.items" class="">
                      <div class="font-bold p-1 pl-4">{{ $t(item.text) }}</div>

                      <div v-for="subItem in item.items">
                        <NuxtLink :href="localePath(subItem.href)" @click="closeMenu" class="p-1 pl-4 block">{{ $t(subItem.text) }}</NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <LocaleSelect />
            </div>

            <LocaleSelect responsive />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defaultLocale, resourcesUrl } from "@/services/utils"
import { ref } from "vue"

const localePath = useLocalePath()
const { locale } = useI18n()

const showMenu = ref(false)
const pageName = "header"

const pageKeyUrl = `${resourcesUrl}/pages/${locale.value}/${pageName}.json`
const { data: localePage, refresh: localeRefresh } = await useAsyncData(pageKeyUrl, () => $fetch(pageKeyUrl))

let page = localePage?.value
let refresh = localeRefresh
if (!page) {
  const defaultPageKeyUrl = `${resourcesUrl}/pages/${defaultLocale}/${pageName}.json`
  const pageRef = await useAsyncData(defaultPageKeyUrl, () => $fetch(defaultPageKeyUrl))
  page = pageRef.data
  refresh = pageRef.value?.refresh
}

watch(locale, () => {
  refresh()
  showMenu.value = false
})

function toggleMobileMenu() {
  showMenu.value = !showMenu.value
}

function closeMenu() {
  showMenu.value = false
}
</script>

<style scoped lang="scss">
.header {
  box-shadow: 0 0 0 1px rgba(100, 100, 100, 0.1);
}

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
    background-color: var(--color-midnight-blue);
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
