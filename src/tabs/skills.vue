<template lang="pug">

.skills
  .skill(
    v-for="skill in skillsUnlocked"
    :key="`skill-${skill.link}`"
  ) 
    .skill-title {{ skill.title }} 
      span.highlight lvl.{{ skill.level }}
    .skill-progress {{ skill.progress }}/{{ skillsProgressNeeded(skill.link) }}
    .skill-progress-fill(:style="'width: ' + progressFill(skill.progress, skill.link) + '%'")

  // ToDo: skill tooltips!

  p Skill levels trigger some unlocks.
  p Skills affect tasks and actions effectiveness/speed/productivity.
  p Skills affect adventures / business / social / construction / magic / religion.
  p 5 skill levels (to keep things simple), it's better to have more meaningfull skills.

  ul
    li https://kumodesu.fandom.com/wiki/System/Skills

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'skills',

  computed: {
    ...mapGetters(['skillsUnlocked', 'skillsProgressNeeded'])
  },

  methods: {
    progressFill(progress, link) {
      let needed = this.skillsProgressNeeded(link)
      return Number(Math.round((progress / needed) * 100 + 'e0') + 'e0')
    }
  }
}
</script>

<style lang="sass">
.skills
  padding: 8px 6px
  display: flex
  flex-wrap: wrap

.skill
  position: relative
  display: flex
  width: 49%
  height: 40px
  line-height: 30px
  margin-right: 1%
  margin-bottom: 6px
  padding: 4px 6px 4px 14px
  border: 1px solid rgba(255, 255, 255, 0.1)
  border-radius: 3px

  .skill-title
    font-size: 18px

  .skill-progress
    margin-left: auto
    font-size: 14px
    color: #554a60

  .skill-progress-fill
    position: absolute
    height: 100%
    top: 0
    left: 0
    background-color: rgba(255, 224, 130, 0.05)
    border-radius: 3px
    transition: all 500ms linear
</style>
