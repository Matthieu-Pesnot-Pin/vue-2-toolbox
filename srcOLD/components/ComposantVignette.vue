<template>
  <div>
    <transition name="vignette">
      <div
        class="composant-vignette"
        v-if="visible"
        :class="computedClass"
        :style="`width: ${width};`"
        @click="$emit('visibility', false)"
      >
        <div v-html="texteVignette" class="texte-vignette"></div>
        <div
          v-if="closeCross"
          class="frame-croix element-clickable"
          title="fermer"
          @click="$emit('visibility', false)"
        >
          ✖️
        </div> 
        <div v-if="detailsButton" class="get-details element-clickable" title="détails" @click.stop="$emit('details-click')">ℹ️</div>

      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ComposantVignette",
  model: {
    prop: "visible",
    event: "visibility",
  },
  data: () => {
    return {
      timeoutHandler: undefined,
    };
  },
  props: {
    autoHideTime: { default: 5000 }, // // sets timeout before close in ms
    closeCross: { type: Boolean, default: false }, //displays cross on the upper right
    autoHide: { type: Boolean, default: false }, // to use auto hide, v-model with a boolean for visibility must exist in parent component
    visible: { type: Boolean, default: true },
    position: { type: String, default: "right" }, // right, left, centered, always on bottom
    texteVignette: { type: String, default: "..." },
    typeVignette: { type: String, default: "neutral" }, // neutral, success, error
    detailsButton: { type: Boolean, default: false},
    width: { default: "auto" },
  },
  methods: {
    setTimerBeforeClose() {
      if (this.timeoutHandler != undefined) clearTimeout(this.timeoutHandler);
      if (this.visible == true && this.autoHide) {
        this.timeoutHandler = setTimeout(() => {
          this.$emit("visibility", false);
        }, this.autoHideTime);
      }
    },
  },
  computed: {
    computedClass() {
      return this.position + " " + this.typeVignette;
    },
  },
  watch: {
    visible() {
      this.setTimerBeforeClose();
    },
    texteVignette() {
      this.setTimerBeforeClose();
    },
    typeVignette() {
      this.setTimerBeforeClose();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/css/components.scss";
.composant-vignette {
  cursor: default;
  max-width: 400px;
  z-index: 100;
  display: flex;
  align-items: center;

  position: fixed;

  bottom: 3vh;
  border-radius: 15px;
  padding: 15px 15px 15px 15px;
  box-shadow: 0 5px 10px 0 $opacity-25;
  border: 1px solid $couleur-texte-fonce;

  &.neutral {
    background-color: $couleur-fond-menu-navigation;
  }
  &.success {
    background-color: rgb(144, 255, 144);
  }
  &.error {
    background-color: rgb(255, 160, 160);
  }

  &.right {
    right: 50px;
  }
  &.left {
    left: 50px;
  }
  &.centered {
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }
}

.texte-vignette {
  width: 100%;
  text-align: center;
}

.frame-croix {
  margin-left: 10px;
  right: 3px;
  top: 0px;
  font-size: 0.8em;
}
.vignette {
  @include typo-small-medium;
  color: black;
  font-weight: normal;
}
.get-details {
  position: relative;
  // font-size: 1em;
  font-weight: 700;
  margin-left: 5px;
  bottom: 1px;
}

.vignette-enter,
.vignette-leave-to {
  visibility: hidden;
  bottom: -100px;
  opacity: 0;
}

.vignette-enter-active,
.vignette-leave-active {
  transition: all 0.5s;
}
</style>
