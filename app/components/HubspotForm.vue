<template>
  <div class="w-[600px] min-h-[600px] p-6 bg-[--color-ice-mist] rounded-[5px]">
    <div :id="target" class="w-full"></div>
  </div>
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
