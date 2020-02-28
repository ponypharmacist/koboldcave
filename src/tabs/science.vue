<template lang="pug">

.science
  h4.text-center Active research project: 
  .current-research
    .cr-left
      .cr-title Spider Milking Equipment
        v-icon(
          color="purple lighten-2"
          size="16px"
        ) mdi-sleep

      .cr-description Elastic leather harness to faciliate string extraction from livestock spiders.

      .cr-bars
        .cr-bar
          img(src="~@/assets/resources/insight.png")
          .cr-bar-bg
            .cr-bar-fill(style="width: 66%;")
            .cr-bar-progress 120/200
        .cr-bar
          img(src="~@/assets/resources/shrooms.png")
          .cr-bar-bg
            .cr-bar-fill(style="width: 66%;")
            .cr-bar-progress 120/200
        .cr-bar
          img(src="~@/assets/resources/shekels.png")
          .cr-bar-bg
            .cr-bar-fill(style="width: 66%;")
            .cr-bar-progress 120/200

    .cr-right
      v-btn(
        outlined
        color="green lighten-1"
      )
        span Continue >

  p Science
  p Research comes from personal, tribe, buildings, adventure lore events.
  p Techs just like skills can affect anything.
  p Can unlock upgrades or new types of buildings etc.

  ul
    li wheel, growing, woodwork, stonework, tools, cultivation
    li smithery, teaching, brewing, fertilization
    li architecture, processing, iron works, agriculture, sewerage
    li archery, tactics, mathematics, tanning, leather working, economics, accounting
    li quarries, bridges, physics, alchemy, conservation, trade routes
    li chemistry, water wheels, medicine, crane, biology, cartography
    li intelligence, ooptics, gunpowder, fashion, imperialism,
    li clockmaking, industrialization, extraction, railroad, hygiene
    li precision tools, ballistics, infrastructure, explosives
    li oil refining, composites, metamaterials, electricity, journalism
    li antibiotics, food processing, advertisement, 24/7 service
    li entertainment, taming, genetic research, microbiology, cave ecosystems
    li waste management, children's rights, feminism, cave internet
    li shopping, automation, bionics, banks, student loans, fusion power
    li recycling, graphic design, nightlife, levitation, xenomineralogy
    li kobold-machine interface, nanotubes, plastics, AI, deep shaft extraction
    li hydroponics, logistics, plasma spectroscopy, underwater engineering
    li nano shekels, lightning in a can, the claw, refrigiration,
    li photovoltaics (cave solar power, it does nothing)
    li deepwater drilling, photonics (gem lasers), smart fabrics
    li body augmentations, eugenics, plasteel, pitch black coating

</template>

<script>
export default {
  name: 'science'
}
</script>

<style lang="sass">
.science
  padding: 8px 6px

  .current-research
    display: flex
    align-items: center
    margin: 0 4px 4px 0
    padding: 6px 6px 16px 12px
    background-color: rgba(0, 0, 0, 0.25)
    border: 1px solid rgba(255, 255, 255, 0.1)
    border-radius: 3px

    .cr-left
      margin-right: 16px

      .cr-title
        display: flex
        font-size: 20px

        .v-icon
          align-self: top
          height: 16px
          margin-left: 4px

      .cr-description
        margin-bottom: 6px

      .cr-bars
        display: flex

        .cr-bar
          display: flex
          align-items: center
          height: 16px
          margin-right: 18px

          img
            margin-right: 6px

          .cr-bar-bg
            position: relative
            width: 100px
            height: 3px
            background-color: #554a60
            border-radius: 1.5px

            .cr-bar-fill
              width: 10%
              height: 3px
              background-color: rgba(255, 224, 130, 0.8)
              border-radius: 1.5px

            .cr-bar-progress
              position: absolute
              width: 100%
              bottom: -18px
              font-size: 12px
              text-align: center
              color: #554a60

    .cr-right
      margin-left: auto
</style>
