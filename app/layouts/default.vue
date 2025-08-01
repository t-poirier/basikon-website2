<template>
    <p>Current language: {{ currentLocaleName }}</p>
    <select v-model="locale">
      <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
        {{ locale.name }}
      </option>
    </select>

    <div class="header">HEADER</div>

    <slot />

    <div class="footer">FOOTER</div>
</template>


<script setup>
const { locales, locale } = useI18n()

const availableLocales = locales.value

const currentLocaleName = computed(() => {
  return availableLocales.find((l) => l.code === locale.value)?.name || locale.value
})
</script>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 2rem;
}
</style>
