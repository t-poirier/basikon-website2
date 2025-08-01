<template>
    <div class="header">HEADER</div>
    <slot />
    <div class="footer">FOOTER</div>
</template>

<script setup>
const version = 2 + 1
</script>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 2rem;
}
</style>
