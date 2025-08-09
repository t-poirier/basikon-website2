<template>
  <Page :pageName="pageName" :pageCategory="pageCategory" />
</template>

<script setup>
const route = useRoute()
const { pageName, pageCategory } = route.params
</script>