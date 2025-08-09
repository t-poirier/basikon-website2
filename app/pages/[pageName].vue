<template>
  <Page :pageName="pageName" />
</template>

<script setup>
const route = useRoute()
const { pageName } = route.params
</script>