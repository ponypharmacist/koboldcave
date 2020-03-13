<template lang="pug">

.inventory
  h2 Inventory
  h3 Equipment
  .items
    .item(
      v-for="item in itemsOwnedByType('equip')"
      :key="`item-${item.link}`"
    ) 
      .item-title {{ item.title }} 
      .item-quantity {{ item.owned }}
  
  h3 Consumables
  .items
    .item(
      v-for="item in itemsOwnedByType('consumable')"
      :key="`item-${item.link}`"
    ) 
      .item-title {{ item.title }} 
      .item-quantity {{ item.owned }}

  p ToDo: click on item to display stats and actions in iStone
  p ToDo: item tooltips
  p ToDo: item action: trash

</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('inventory', {
  name: 'inventory',

  computed: {
    ...mapGetters(['itemsOwned', 'itemsOwnedByType'])
  }
})
</script>

<style lang="sass">
// Items
.items
  display: flex
  flex-wrap: wrap

  .item
    display: flex
    width: 190px
    margin: 3px 3px
    padding: 4px 6px 4px 28px
    border: 1px solid rgba(255, 255, 255, 0.1)
    font-size: 14px
    background: transparent url('~@/assets/resources/shekels.png') no-repeat 5px 6px / 16px 16px
    transition: $transition-all
    cursor: pointer

    &:hover
      border-color: rgba(255, 224, 130, 0.4)

    .item-quantity
      margin-left: auto
      font-size: 13px
      color: #554a60
</style>
