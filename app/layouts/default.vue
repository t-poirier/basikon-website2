<template>
    <select @change="switchLocale($event)" :value="locale">
      <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
        {{ locale.name }}
      </option>
    </select>

    <div class="header">HEADER</div>
    
    <slot />

    <div class="footer">FOOTER</div>
</template>


<script setup>
const { locales, locale, setLocale } = useI18n()

const availableLocales = locales.value

function switchLocale(event) {
  setLocale(event.target.value)
}
</script>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 2rem;
}
</style>
