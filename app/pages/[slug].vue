<template>
  <Page :pageName="slug" />
</template>

<script setup>
const route = useRoute()
const { slug } = route.params
</script>