<template>
  <div :id="target" class="max-w-[500px] min-h-[600px] w-full px-4"></div>
</template>

<script setup>
import { onMounted, toRaw } from "vue"

const { hubspotForm, messages } = defineProps({
  hubspotForm: {
    type: Object,
    default: () => ({
      region: "",
      portalId: "",
      formId: "",
    }),
  },
  messages: Object,
})

const rawHubspotForm = toRaw(hubspotForm)
const rawMessages = toRaw(messages)
const target = "hubspot-form"
const formParams = {
  ...rawHubspotForm,
  target: "#" + target,
  formId: rawMessages[rawHubspotForm.formId] || rawHubspotForm.formId,
}

onMounted(() => {
  const script = document.createElement("script")
  script.src = "//js.hsforms.net/forms/embed/v2.js"
  script.async = true
  script.onload = () => {
    if (window.hbspt) {
      window.hbspt.forms.create(formParams)
    }
  }
  document.body.appendChild(script)
})
</script>

<style scoped lang="scss"></style>
