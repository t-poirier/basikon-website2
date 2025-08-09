<template>
  <div id="hubspotForm" class="max-w-[500px] w-full px-4"></div>
</template>

<script setup>
import { onMounted } from "vue"

const { hubspotForm } = defineProps({
  hubspotForm: {
    type: Object,
    default: () => ({
      region: "",
      portalId: "",
      formId: "",
      target: "",
    }),
  },
})

onMounted(() => {
  const script = document.createElement("script")
  script.src = "//js.hsforms.net/forms/embed/v2.js"
  script.async = true
  script.onload = () => {
    if (window.hbspt) {
      window.hbspt.forms.create(hubspotForm)
    }
  }
  document.body.appendChild(script)
})
</script>

<style scoped lang="scss"></style>
