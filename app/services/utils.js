import { Marked } from "marked"

const resourcesUrl = (process.env.NODE_ENV === "production" ? "" : `http://localhost`) + "/imp/website"

function getMarkedInstance({ localePath, useHeadingAnchors } = {}) {
  const markedInstance = new Marked()

  const renderer = {
    link: options => {
      const { href, title, text: optionsText } = options
      let text = optionsText
      // When we want to display bare URL markdown linters forces us to
      // repeat the link both in the text and href parts [some-link](some-link).
      // To avoid that we support [](some-link) and the text part automatically gets the href.
      if (!text && href) text = href

      let optionalTags = ""
      let hasNewTabOption
      if (title) {
        // We only support target=_blank, no need to support other values as they are rare
        const strippedTitle = title.replaceAll("[newTab]", () => {
          hasNewTabOption = true
          return ""
        })
        if (strippedTitle) optionalTags += ` title="${strippedTitle}"`
        if (hasNewTabOption) {
          if (optionalTags) optionalTags += " "
          optionalTags += ` target="_blank"`
        }
      }

      const parsedHref = href.startsWith("#") || href.startsWith("http") ? href : localePath(href)
      return `<a${optionalTags} href="${parsedHref}">${text}</a>`
    },
  }

  if (useHeadingAnchors) {
    renderer.heading = options => {
      const { depth, text } = options

      const escapedText = text
        .toLowerCase()
        .replace(/\s/g, "-")
        .replace(/\W_/g, "")
        .replace(/¿|\?|!|'|"|\.|%|’/g, "")

      return `
<h${depth} class="md-header">
  <a name="${escapedText}" class="md-anchor" href="#${escapedText}">
    <span class="font-size-link"></span>
  </a>
  ${text}
</h${depth}>`
    }
  }

  markedInstance.use({ renderer })
  return markedInstance
}

export { getMarkedInstance, resourcesUrl }
