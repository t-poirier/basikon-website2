<template>
  <Card
    cardLinkTo="/about"
    imgName="e2e0f0fc.jpg"
    cardClass="h-[692px]"
    topHeadline="European Leasing & Consumer Credit Industry"
    topSubhead="ANNUAL CONVENTIONS<br>9 & 10 OCTOBER<br>CASCAIS, PORTUGAL"
    textBlocksClass="text-white"
    :topBtns="[
      {
        href: '/blog/amfe-partnership-credit-mexico',
        text: 'More info here',
        theme: 'primary-light',
      },
    ]"
  >
  </Card>
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
    textBlocksClass="text-white"
    cardClass="h-[580px]"
    moduleTemplate="promo"
    topHeadline="iPad Pro"
    topSubhead="Unbelievably thin. Incredibly powerful."
    bottomSubhead="Built for Basikon Intelligence."
    bottomSubheadClass="ai-gradient"
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
    textBlocksClass="text-white"
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
