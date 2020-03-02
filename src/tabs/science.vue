<template lang="pug">

.science
  // Active research project
  .current-research.border-gold
    .cr-caption.font-bold Active research project: 
    .cr-title {{ researchActive ? researchActive.title : 'none' }}

    .cr-description {{ researchActive ? researchActive.tooltipText : '...' }}

    .cr-bars(v-if="researchActive")
      .cr-bar(v-for="cost in researchActive.cost")
        img(:src="resourceImage(cost.resource)")
        .cr-bar-bg
          .cr-bar-fill(:style="'width: ' + cost.progress / cost.amount * 100 + '%;'")
          .cr-bar-progress {{ cost.progress }} of {{ cost.amount }}
  
  // Research list
  .research-list
    .tech(
      v-for="tech in researchUnlocked"
      :key="`tech-${tech.link}`"
    )
      .tech-left
        .tech-title {{ tech.title }}

      .tech-right
        v-tooltip(transition="fade-transition" right)
          template(#activator="tooltip")
            span(v-on="tooltip.on")
              v-btn(
                @click="startResearch(tech.link)"
                :color="tech.active ? '#a7e9af' : '#FFE082'"
                :class="{ 'research-active': tech.active }"
                outlined
                small
              ) {{ tech.active ? 'Pause' : 'Research' }}
                v-icon.progress-icon(
                  v-if="tech.active"
                  size="14px"
                ) mdi-yin-yang

          .tooltip
            .tooltip-title {{ tech.title }}
            .tooltip-text {{ tech.tooltipText }}
            // ToDo: costs/effects in tech tooltip
            .tooltip-flavor(v-if="tech.tooltipFlavor") {{ tech.tooltipFlavor }}

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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'science',

  computed: {
    ...mapGetters(['resources', 'researchUnlocked', 'researchActive'])
  },

  methods: {
    ...mapActions(['startResearch']),

    resourceImage(name) {
      return require('@/assets/resources/' + name + '.png')
    }
  }
}
</script>

<style lang="sass">
.science
  padding: 8px 6px

  // Current research
  .current-research
    display: flex
    flex-direction: column
    align-items: center
    height: 120px
    margin: 0 4px 4px 0
    padding: 6px 6px 16px 12px
    background-color: rgba(0, 0, 0, 0.25)
    border-radius: 3px

    .cr-caption
      font-size: 14px

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
          width: 150px
          height: 3px
          background-color: #554a60
          border-radius: 1.5px

          .cr-bar-fill
            width: 10%
            height: 3px
            background-color: rgba(255, 224, 130, 0.8)
            border-radius: 1.5px
            transition: width 500ms linear

          .cr-bar-progress
            position: absolute
            width: 100%
            bottom: -18px
            font-size: 12px
            text-align: center
            color: #554a60

  // Tech list
  .research-list
    display: flex
    flex-wrap: wrap

    .tech
      display: flex
      width: calc(50% - 4px)
      margin: 0 4px 4px 0
      padding: 6px 6px 6px 12px
      background-color: rgba(0, 0, 0, 0.25)
      border: 1px solid rgba(255, 255, 255, 0.1)

    .tech-left
      display: inline-block
      margin-right: auto
      font-size: 18px

    .tech-right
      .research-active
        border-width: 2px
</style>
