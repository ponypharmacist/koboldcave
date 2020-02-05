<template lang="pug">

.producers
  .producer(v-for="(producer, key) in producers" :key="'producer_' + key")
    v-tooltip(content-class="button-tooltip" right)
      template(#activator="tooltip")
        .producer-title(v-on="tooltip.on") Shroom plot ({{ producer.number }})

      tooltip(
        :title="producer.title"
        :text="producer.tooltipText"
        :type="'production'"
        :effect="producer.produces"
        :cost="producer.consumes"
      )

    nobr.producer-actions
      v-btn.plus-button.mr-2(
        v-show="producer.number"
        @click="removeProducer(producer.link)"
        color="#ECEFF1"
        outlined
        x-small
      )
        v-icon(size="14px") mdi-minus

      v-btn.plus-button(
        :disabled="producer.number === producer.numberMax"
        @click="addProducer(producer.link)"
        color="#ECEFF1"
        outlined
        x-small
      )
        v-icon(size="14px") mdi-plus

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default Vue.component('producers', {
  name: 'producers',

  computed: {
    ...mapGetters(['producers'])
  },

  methods: {
    ...mapActions(['addProducer', 'removeProducer'])
  }
})
</script>

<style lang="sass">
.producers
  .section-title
    margin-bottom: 6px

.producer
  width: 50%
  display: flex
  align-items: center
  padding: 0 4px 0 8px
  background-color: rgba(255,255,255,0.05)

.producer-title
  line-height: 28px

.producer-actions
  margin-left: auto

.plus-button
  min-width: 20px !important
  padding: 0 !important
</style>
