<template lang="pug">

.shelter
  p Shelter

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
export default {
  name: 'shelter'
}
</script>

<style lang="sass">
.shelter
  padding: 8px 6px
</style>
