<template>
  <div class="footer grid-container">
    <div class="row">
      <div class="col-xs-12">
        <div class="max-w-[1200px] m-auto py-10">
          <NuxtLink
            class="h-[44px] w-[260px] block bg-no-repeat bg-left bg-contain"
            :style="{
              'background-image': `url(/img/basikon-white.svg)`,
            }"
            :to="localePath('/')"
          >
          </NuxtLink>

          <div class="flex">
            <a class="flex items-center py-2 mr-5 text-white" href="https://fr.linkedin.com/company/basikon" target="_blank">
              <svg viewBox="0 0 28 29" xmlns="http://www.w3.org/2000/svg" class="size-[16px] fill-white">
                <path
                  d="M27.993 28.0789V28.0778H27.9999V17.7474C27.9999 12.6937 26.926 8.80078 21.0942 8.80078C18.2907 8.80078 16.4093 10.3594 15.6413 11.837H15.5602V9.27258H10.0308V28.0778H15.7884V18.7661C15.7884 16.3144 16.2472 13.9437 19.2441 13.9437C22.1971 13.9437 22.2411 16.7416 22.2411 18.9234V28.0789H27.993Z"
                />
                <path d="M0.419128 9.2207H6.26955V27.6607H0.419128V9.2207Z" />
                <path
                  d="M3.3431 0C1.49755 0 0 1.49486 0 3.33709C0 5.17932 1.49755 6.70544 3.3431 6.70544C5.18865 6.70544 6.6862 5.17932 6.6862 3.33709C6.68504 1.49486 5.18749 0 3.3431 0V0Z"
                />
              </svg>
              <span class="ml-2 inline-block h-[19px]">LinkedIn</span>
            </a>
            <a class="flex items-center py-2 mr-5 text-white" href="https://www.youtube.com/@BASIKON_COM" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 28.4" class="size-[16px] fill-white">
                <path
                  d="M33.2771 0H8.72286C3.90535 0 0 3.73202 0 8.3357V20.0654C0 24.6691 3.90535 28.4011 8.72286 28.4011H33.2771C38.0946 28.4011 42 24.6691 42 20.0654V8.3357C42 3.73202 38.0946 0 33.2771 0ZM27.3779 14.7713L15.8931 20.0057C15.5871 20.1452 15.2336 19.932 15.2336 19.608V8.81193C15.2336 8.48336 15.5964 8.27041 15.903 8.41893L27.3879 13.9806C27.7293 14.1459 27.7234 14.6139 27.3779 14.7713Z"
                />
              </svg>
              <span class="ml-2 inline-block h-[19px]">Youtube</span>
            </a>
          </div>

          <hr class="border-t border-gray-700 my-4">

          <div class="flex flex-wrap justify-between">
            <div v-for="menu in page.menus" class="h-full w-full sm:w-auto" :key="`${locale}-${menu.text}`">
              <NuxtLink v-if="menu.href" :href="localePath(menu.href)" class="block text-white py-2">{{ menu.text }}</NuxtLink>

              <div v-else class="header-menu-block relative h-full">
                <div v-if="menu.items" class="">
                  <div class="header-menu-items justify-between">
                    <div v-for="item in menu.items" class="py-2">
                      <div class="font-bold whitespace-nowrap">{{ item.text }}</div>

                      <div v-for="subItem in item.items">
                        <NuxtLink :href="localePath(subItem.href)" class="whitespace-nowrap block text-white py-2">{{ subItem.text }}</NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr class="border-t border-gray-700 my-4">

          <div>
            <NuxtLink class="text-white block pt-2 pb-2" :href="localePath(page.corporateResponsibility?.href)">
              {{ page.corporateResponsibility?.text }}
            </NuxtLink>
            <NuxtLink class="text-white block pt-2 pb-2" :href="localePath(page.privacyPolicy?.href)">
              {{ page.privacyPolicy?.text }}
            </NuxtLink>
            <div class="pt-2 pb-2">{{ page.copyrightMention?.text }}</div>
            <div class="pt-2 pb-2">{{ page.legalMention?.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"

const localePath = useLocalePath()
const { locale } = useI18n()

const pageName = "footer"

const { data: page, refresh } = await useAsyncData(`${pageName}-${locale.value}`, () =>
  $fetch(`${resourcesUrl}/pages/${locale.value}/${pageName}.json`),
)

watch(locale, () => {
  refresh()
})
</script>

<style scoped lang="scss">
.footer {
  background-color: var(--color-midnight-blue);
  color: var(--color-white);
}
</style>
