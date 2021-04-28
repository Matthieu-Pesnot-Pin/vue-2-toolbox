<template>
  <div 
    v-if='visible'   
    class="masque-gris" 
    @click="quitModale" >
    <div class="modale" :class="computedOverflow" @click.stop>
      <keep-alive>
        <div 
          :is="modale.content.componentName" 
          v-on:modale-event="contentPassing" 
          v-bind='modale.content.props'
        ></div>
      </keep-alive>
    </div>
  </div>
</template>
<script>

import { mapMutations, mapState } from 'vuex'

const STATES_TO_MAP = [
  'modale'
]

const MUTATIONS_TO_MAP = [
  'modalHide'
]

export default {
  name: "modalContainerComponent",
  model: {
    prop: 'visible',
    event: 'defineVisibility'
  },
  components: {
    ModalAlertComponent: ()=> import('./ModalAlertComponent'),
    ModalYesNoComponent: ()=> import('./ModalYesNoComponent'),
  },
  props: {
    visible: {default: false},
    content: {default: ''},
    hiddenOverflow: {default: true},
  },
  computed: {
    ...mapState(STATES_TO_MAP),
    computedOverflow(){
      if (this.hiddenOverflow) return 'autoOverflow'
      else return 'hiddenOverflow'
    }
  },
  methods: {
    ...mapMutations(MUTATIONS_TO_MAP),
    quitModale() {
      if (this.content.allowQuitOnClick) this.modalHide()
    },
    contentPassing(content) {
      this.$emit('modale-event', content)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/css/modal.scss";

.masque-gris {
    z-index: 40;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
}

.hiddenOverflow {
  overflow: hidden;
}
.autoOverflow {
  overflow: auto;
}

.modale {
  z-index: 50;
  position: fixed;
  top: 50%;
  left: 50%;

  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  background-color: $background-color;
  border-radius: 39px;
  padding: 24px 23px 23px 24px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: flex-start;
  border: 1px solid $border-color;
  max-height: 85vh;
  // max-width: 600px;

}
.sous-cadre {
  width: auto;
  height: auto;
  min-width: 200px;
  min-height: 100px;
  padding: 20px;
  background-color: $background-color;
  border-radius: 39px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.4);
  border: 1px solid $border-color;
}
</style>