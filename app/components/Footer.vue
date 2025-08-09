<template>
  <div class="footer grid-container">
    <div class="row">
      <div class="col-xs-12">
        <div class="max-w-[2560px] m-auto">
          <NuxtLink
            class="h-[44px] w-[260px] block bg-no-repeat bg-left bg-contain"
            :style="{
              'background-image': `url(/img/basikon-white.svg)`,
            }"
            :to="localePath('/')"
            @click="closeMenu"
          >
          </NuxtLink>

          <div class="h-full flex flex-wrap">
            <div v-for="menu in page.menus" class="h-full" :key="`${locale}-${menu.text}`">
              <NuxtLink v-if="menu.href" :href="localePath(menu.href)" class="block text-white">{{ menu.text }}</NuxtLink>

              <div v-else class="header-menu-block pl-3 pr-3 xl:pl-4 xl:pr-4 relative h-full">
                <div v-if="menu.items" class="">
                  <div class="header-menu-items justify-between">
                    <div v-for="item in menu.items" class="">
                      <div class="font-bold whitespace-nowrap">{{ item.text }}</div>

                      <div v-for="subItem in item.items">
                        <NuxtLink :href="localePath(subItem.href)" class="whitespace-nowrap block text-white">{{ subItem.text }}</NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
const { locale } = useI18n()

const showMenu = ref(false)
const pageName = "header"

const { data: page, refresh } = await useAsyncData(`${pageName}-${locale.value}`, () =>
  $fetch(`${resourcesUrl}/pages/${locale.value}/${pageName}.json`),
)

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
.footer {
  background-color: var(--color-midnight-blue);
  color: var(--color-white);
}
</style>
