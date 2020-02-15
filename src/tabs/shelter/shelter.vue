<template lang="pug">

.shelter
  .building(
    v-for="building in buildingsUnlocked"
    :key="`building-${building.link}`"
  )
    .building-info
      img.building-thumb(src="~@/assets/buildings/tent-thumb.gif")
      .building-title
        | {{ building.tiers[lvlCurrent(building.level)].title }} 
        span.building-subtitle(v-if="building.level >= 1")
          | (tier {{ building.level }} {{ building.link }})
      
      .building-description(v-if="building.level >= 1")
        div {{ building.tiers[lvlCurrent(building.level)].description }}
        div(v-if="building.tiers[lvlCurrent(building.level)].provides") Provides: 
          span.provides(
            v-for="(item, key) in building.tiers[lvlCurrent(building.level)].provides"
            :key="`building-${building.link}-effect-${key}`"
            )
            span.highlight {{ providesTextByType(item) }}
            span.comma , 


    // Build/upgrade button
    .buttons(v-if="building.level < building.tiers.length - 1 && building.tiers[lvlNext(building.level)].unlocked")
      v-tooltip(content-class="button-tooltip" right)
        template(#activator="tooltip")
          span(v-on="tooltip.on")            
            v-btn(    
              @click="upgradeBuilding({ link: building.link, level: lvlNext(building.level) })"
              :disabled="upgradeCheckDisabled({ link: building.link, level: lvlNext(building.level) })"
              retain-focus-on-click
              color="#FFE082"
              outlined
              small
            ) {{ building.level ? 'Upgrade' : 'Build' }}

        .tooltip
          .tooltip-title
            | {{ building.level === 0 ? 'Build "' : 'Upgrade to: "' }}
            span.highlight {{ building.tiers[lvlNext(building.level)].title }}
            | "

          .tooltip-text {{ building.tiers[lvlNext(building.level)].description }}
                  
          .tooltip-text(v-if="building.tiers[lvlNext(building.level)].cost") Requires: 
            .cost(
              v-for="(item, key) in building.tiers[lvlNext(building.level)].cost"
              :key="`building-cost-${key}`"
              ) {{ item.resource }} {{ item.amount }}

          .tooltip-text(v-if="building.tiers[building.level + 1].effect") Effect: 
            .effect(
              v-for="(item, key) in building.tiers[building.level + 1].effect"
              :key="`building-${building.link}-effect-${key}`"
              ) {{ effectTextByType(item) }}

          .tooltip-text(v-if="building.tiers[building.level + 1].provides") Provides: 
            .effect(
              v-for="(item, key) in building.tiers[building.level + 1].provides"
              :key="`building-${building.link}-effect-${key}`"
              ) {{ providesTextByType(item) }}

          .tooltip-flavor(v-if="building.tiers[building.level + 1].tooltipFlavor")
            | {{ building.tiers[building.level + 1].tooltipFlavor }}
          
          //- ToDo: complete tooltip
          //- :effect="upgrade.effect ? upgrade.effect : null"

  p
   b Types: <br>
   | Rest, living, pets <br>
   | Food production, livestock (pens, aquariums, terraria), traps <br>
   | Forge, processing, extraction, crafting/engineering <br>
   | Scientific / magical <br>
   | Business: caffe, tradepost <br>
   | Power, lightning

  p
   b Upgrades: <br>
   | size (capacity, productivity), level (material, automation?), addons with bonuses <br>
   | resulting description: <b class="highlight">Medium magma forge</b> powered by <b class="highlight">death dragon heart</b>. It uses <b class="highlight">liquid fear</b> to cool metal parts.

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'shelter',

  computed: {
    ...mapGetters(['resources', 'buildings', 'buildingsUnlocked'])
  },

  methods: {
    ...mapActions(['upgradeBuilding']),

    upgradeCheckDisabled(building) {
      // building: { link: String, level: Number }
      const cost = this.buildings[building.link].tiers[building.level].cost
      if (cost) {
        for (let i = 0; i < cost.length; i++) {
          if (this.resources[cost[i].resource].countRound < cost[i].amount) return true
        }
      }
      return false
    },

    lvlCurrent(level) {
      return level === 0 ? 1 : level
    },

    lvlNext(level) {
      return level === 0 ? 1 : level + 1
    },

    effectTextByType(effect) {
      // 1. Math effect
      if (effect.add)
        if (effect.title) return effect.title
        else return '+' + effect.amount + ' ' + effect.link + ' ' + effect.target
      // ToDo: better wording: '+10 shrooms storage'
    },

    providesTextByType(provides) {
      if (provides.type === 'rate') return '+' + provides.amount + ' ' + provides.link + ' per second'
    }
  }
}
</script>

<style lang="sass">
.shelter
  padding: 8px 6px

.building
  display: flex
  margin: 0 4px 4px 0
  padding: 6px 6px 6px 12px
  background-color: rgba(0, 0, 0, 0.25)
  border: 1px solid rgba(255, 255, 255, 0.1)
  border-radius: 3px

  .building-info
    position: relative
    padding-left: 40px

    .building-title
      font-size: 20px
      line-height: 28px
      font-weight: 700

      .building-subtitle
        font-size: 14px
        color: #554a60
        font-weight: 400

    .building-description
      & .provides:last-child
        .comma
          display: none

    .building-thumb
      position: absolute
      width: 32px
      height: 32px
      left: 0
      top: -2px

  .cost
    color: $cost-color

  .buttons
    margin: 0 0 0 auto
</style>
