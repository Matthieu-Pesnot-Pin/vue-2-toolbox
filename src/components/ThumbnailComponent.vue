<template>
  <div>
    <transition name="Thumbnail">
      <div
        class="composant-Thumbnail"
        v-if="visible"
        :class="computedClass"
        :style="`width: ${width};`"
        @click="hideThumbnail"
      >
        <div v-html="content" class="texte-Thumbnail"></div>
        <div
          v-if="closeCross"
          class="frame-croix element-clickable"
          title="fermer"
          @click="hideThumbnail"
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
  name: "ComposantThumbnail",
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
    content: { type: String, default: "..." },
    visible: { default: true }, // visibility
    autoHide: { default: false }, // to use auto hide, v-model with a boolean for visibility must exist in parent component
    autoHideTime: { default: 5000 }, // // sets timeout before close in ms
    closeCross: { default: false }, //displays cross on the right to close thumbnail
    position: { type: String, default: "right" }, // right, left, centered available, thumbnail will always be on the bottom of th screen
    thumbnailType: { type: String, default: "neutral" }, // neutral, success, error - changes the background color
    detailsButton: { default: false },
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
    hideThumbnail() {
      console.log("Here");
      this.$emit('visibility', false)
    }
  },
  computed: {
    computedClass() {
      return this.position + " " + this.thumbnailType;
    },
  },
  watch: {
    visible() {
      this.setTimerBeforeClose();
    },
    content() {
      this.setTimerBeforeClose();
    },
    thumbnailType() {
      this.setTimerBeforeClose();
    },
  },
};
</script>

<style lang="scss" scoped>
$border-color: #000;
$neutral-background: #CCC;
$font-color: #000;
$success-background-color: rgb(144, 255, 144);
$error-background-color: rgb(255, 160, 160);

.composant-Thumbnail {
  cursor: default;
  max-width: 400px;
  z-index: 100;
  display: flex;
  align-items: center;

  position: fixed;

  bottom: 3vh;
  border-radius: 15px;
  padding: 15px 15px 15px 15px;
  box-shadow: 0 5px 10px 0 rgba(1, 1, 1, 0.4);
  border: 1px solid $border-color;

  &.neutral {
    background-color: $neutral-background;
  }
  &.success {
    background-color: $success-background-color;
  }
  &.error {
    background-color: $error-background-color;
  }
  &.right {
    right: 50px;
  }
  &.left {
    left: 50px;
  }
  &.center {
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }
}

.texte-Thumbnail {
  width: 100%;
  text-align: center;
}

.frame-croix {
  margin-left: 10px;
  right: 3px;
  top: 0px;
  font-size: 0.8em;
}
.Thumbnail {
  // @include typo-small-medium;
  color: $font-color;
  font-weight: normal;
}
.get-details {
  position: relative;
  font-weight: 700;
  margin-left: 5px;
  bottom: 1px;
}

.Thumbnail-enter,
.Thumbnail-leave-to {
  visibility: hidden;
  bottom: -100px;
  opacity: 0;
}

.Thumbnail-enter-active,
.Thumbnail-leave-active {
  transition: all 0.5s;
}
</style>
