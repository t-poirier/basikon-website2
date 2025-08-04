<template>
  <Card
    cardLinkTo="/about"
    imgName="hero_iphone_family__fuz5j2v5xx6y_largetall.jpg"
    cardClass="h-[692px]"
    topHeadline="iPhone"
    topSubhead="Meet the iPhone 16 family."
    :topBtns="[
      {
        href: '/about',
        text: 'Learn more',
        theme: 'primary',
      },
      {
        href: '/about',
        text: 'Shop iPhone',
        theme: 'tertiary',
      },
    ]"
  >
  </Card>
  <Card
    cardLinkTo="/about"
    sm="6"
    imgName="promo_ipadpro_avail__s271j89g8kii_large.jpg"
    textClass="text-white"
    cardClass="h-[580px]"
    moduleTemplate="promo"
    topHeadline="iPad Pro"
    topSubhead="Unbelievably thin. Incredibly powerful."
    :topBtns="[
      {
        href: '/about',
        text: 'Learn more',
        theme: 'primary',
      },
      {
        href: '/about',
        text: 'Buy',
        theme: 'tertiary',
      },
    ]"
  >
  </Card>
  <Card
    sm="6"
    imgName="promo_apple_intelligence_visual_intelligence__fz9rjall8kii_large.jpg"
    cardClass="h-[580px]"
    textClass="text-white"
    moduleTemplate="promo"
    bottomHeadline="Apple Intelligence"
    bottomSubhead="Turn a poster into a Calendar event with visual intelligence."
    :bottomBtns="[
      {
        href: '/about',
        text: 'Watch the clip',
        theme: 'primary-light',
      },
      {
        href: '/about',
        text: 'Learn more',
        theme: 'tertiary-light',
      },
    ]"
  >
  </Card>
</template>

<style lang="scss">
@use "~/assets/scss/index.scss";
</style>
