<template>
  <div>
    <transition name="Thumbnail">
      <div
        class="composant-Thumbnail"
        v-if="Thumbnail.visible"
        :class="computedClass"
        :style="`width: ${Thumbnail.width};`"
        @click="Thumbnail.hide"
      >
        <div v-html="Thumbnail.content" class="texte-Thumbnail"></div>
        <div
          v-if="Thumbnail.closeCross"
          class="frame-croix clickable"
          title="fermer"
          @click="Thumbnail.hide"
        >
          ✖️
        </div>
        <div
          v-if="Thumbnail.detailsButton"
          class="get-details clickable"
          title="détails"
          @click.stop="$emit('details-click')"
        >
          ℹ️
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export var Thumbnail = {
  content: "...",
  visible: false, // visibility
  autoHide: true, // to use auto hide, v-model with a boolean for visibility must exist in parent component
  autoHideTime: 2000, // // sets timeout before close in ms
  closeCross: false, //displays cross on the right to close thumbnail
  position: "center", // right, left, center available, thumbnail will always be on the bottom of th screen
  thumbnailType: "neutral", // neutral, success, error - changes the background color
  detailsButton: false,
  width: "auto",

  setContent(value) {
    Thumbnail.content = value;
  },
  setVisible(value) {
    Thumbnail.visible = value;
  },
  setAutoHide(value) {
    Thumbnail.autoHide = value;
  },
  setAutoHideTime(value) {
    Thumbnail.autoHideTime = value;
  },
  setCloseCross(value) {
    Thumbnail.closeCross = value;
  },
  /**
   * Available values (string):
   * - left
   * - right
   * - center
   */
  setPosition(value) {
    Thumbnail.position = value;
  },
  setThumbnailType(value) {
    Thumbnail.thumbnailType = value;
  },
  setDetailsButton(value) {
    Thumbnail.detailsButton = value;
  },
  setWidth(value) {
    Thumbnail.width = value;
  },

  setOption(optionName, value) {
    if (typeof Thumbnail[optionName] == "function")
      console.error(
        "Thumbnail error : Functions must not be changed (call to setOption on a function name : '" +
          optionName +
          "')"
      );
    else if (Thumbnail[optionName] == undefined) {
      console.error(
        `Thumbnail error : '${optionName}' is not a valide attribute`
      );
    } else if (value != undefined) Thumbnail[optionName] = value;
  },
  setOptions(options) {
    for (let option in options) Thumbnail.setOption(option, options[option]);
  },

  setTimerBeforeClose() {
    if (Thumbnail.timeoutHandler != undefined)
      clearTimeout(Thumbnail.timeoutHandler);
    if (Thumbnail.visible == true && Thumbnail.autoHide) {
      Thumbnail.timeoutHandler = setTimeout(() => {
        // this.$emit("visibility", false);
        Thumbnail.hide();
      }, Thumbnail.autoHideTime);
    }
  },
  show() {
    Thumbnail.setOptions(this.$props);
    // console.log("...Thumbnail", ...Thumbnail);
    // console.log("...this.$props", ...this.$props);
    Thumbnail.visible = true;
    Thumbnail.setTimerBeforeClose();
  },
  hide() {
    Thumbnail.visible = false;
  },
  bind(obj) {
    for (let key in Thumbnail)
      if (typeof Thumbnail[key] == "function")
        Thumbnail[key] = Thumbnail[key].bind(obj);
  },
};

export default {
  name: "ComposantThumbnail",
  props: {
    content: { default: undefined },
    visible: { default: undefined },
    autoHide: { default: undefined },
    autoHideTime: { default: undefined },
    closeCross: { default: undefined },
    position: { default: undefined },
    thumbnailType: { default: undefined },
    detailsButton: { default: undefined },
    width: { default: undefined },
  },
  data: () => {
    return {
      Thumbnail,
    };
  },
  computed: {
    computedClass() {
      return Thumbnail.position + " " + Thumbnail.thumbnailType.toLowerCase();
    },
  },
  mounted: function() {
    Thumbnail.bind(this);
  },
};
</script>

<style lang="scss" scoped>
$border-color: #000;
$neutral-background: #ccc;
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

.clickable {
  padding: 3px;
  &:hover {
    transition-property: background-color;
    transition-duration: 300ms;
    border-radius: 15px;
    background-color: rgb(218, 219, 231);
    cursor: pointer;
  }
}
</style>
