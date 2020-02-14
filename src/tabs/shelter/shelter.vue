<template lang="pug">

.shelter
  // Producers and consumers
  producers

  .building(
    v-for="building in buildingsUnlocked"
    :key="`building-${building.link}`"
  )
    .building-title {{ building.level ? building.tiers[building.level].title : building.tiers[1].title }} 
      span.building-subtitle(v-if="building.level >= 1") (level {{ building.level }} {{ building.link }})
    
    .building-description {{ building.level ? building.tiers[building.level].description : building.tiers[1].description }} 

    .requires Requires: 
      span.cost 4 skins
      | , 
      span.cost 6 shroomwood

    // ToDo: Provides
    .provides Provides: 
      span.highlight +1 motivation
      | , 
      span.highlight +10 storage space

    .buttons(v-if="building.level < building.tiers.length - 1")
      v-tooltip(content-class="button-tooltip" right)
        template(#activator="tooltip")
          span(v-on="tooltip.on")            
            v-btn(    
              @click="upgradeBuilding({ link: building.link, level: building.level })"
              :disabled="upgradeCheckDisabled(building.link)"
              retain-focus-on-click
              color="#FFE082"
              outlined
              small
            ) {{ building.level ? 'Upgrade' : 'Build' }}

        .tooltip
          .tooltip-title {{ 'Upgrade to: "' + building.tiers[building.level].title + '"' }}
          .tooltip-text {{ building.tiers[building.level].description }}
          
          //- ToDo: complete tooltip
          //- :cost="upgrade.cost ? upgrade.cost : null"
          //- :effect="upgrade.effect ? upgrade.effect : null"
          //- :flavor="upgrade.tooltipFlavor ? upgrade.tooltipFlavor : null"

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
    ...mapGetters(['buildings', 'buildingsUnlocked'])
  },

  methods: {
    ...mapActions(['upgradeBuilding']),

    upgradeCheckDisabled(link) {
      if (this.buildings[link].cost) {
        for (let i = 0; i < this.buildings[link].cost.length; i++) {
          let price = this.buildings[link].cost[i]
          if (this.resources[price.resource].countRound < price.amount) {
            return true
          }
        }
      }
      return false
    }
  }
}
</script>

<style lang="sass">
.shelter
  padding: 8px 6px

.building
  margin: 4px 4px 4px 0
  padding: 4px 8px
  border: 1px solid rgba(255, 255, 255, 0.1)
  border-radius: 3px

  .building-title
    font-size: 18px

  .building-subtitle
    font-size: 14px
    color: #554a60

  .building-description

  .cost
    color: $cost-color

  .buttons
    margin-top: 4px
    margin-bottom: 4px
</style>
