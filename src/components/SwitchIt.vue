<template>
  <div class="switch-it-component" @click="switchIt">
    <div class="label">{{ label }}</div>
    <div
      class="switch-it-container"
      :class="backgroundClass"
      :style="styleContainerWidth"
    >
      <div
        class="switch-it"
        :class="positionClass"
        :style="styleSwitchIt"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwitchIt",
  model: {
    prop: "status",
    event: "switchIt",
  },
  props: {
    status: { default: false },
    label: { default: "" },
    height: { default: 17 },
    width: { default: 40 },
  },
  methods: {
    switchIt() {
      this.$emit("switchIt", !this.status);
    },
  },
  computed: {
    positionClass() {
      return "position-" + (this.status ? "on" : "off");
    },
    backgroundClass() {
      return "background-" + (this.status ? "on" : "off");
    },
    styleSwitchIt() {
      let leftPos = this.status ? this.width - this.height - 5 : 0;
      return `
      height:${this.height}px;
      left: ${leftPos}px;
      width:${this.height}px;
      `;
    },
    styleContainerWidth() {
      return `width:${this.width}px;`;
    },
    // styleLabelFontSize() {
    //   return `font-size: ${this.size + 4}px;`;
    // },
    // styleSwitchItComponentHeight() {
    //   return `height:${this.size + 6}px;`;
    // },
    // styleSwitchItWidth() {
    //   if (this.size != undefined) return `width:${this.size}px;`;
    //   else return undefined;
    // },
    // styleSwitchItLeft() {
    //   let leftPos = this.status ? 0 : this.size * 1.5 - 2;
    //   return `left: ${leftPos}px;`;
    // },
  },
};
</script>

<style lang="scss" scoped>
.switch-it-component {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  // height: $height + 6px;
}
.label {
  margin-right: 10px;
  // font-size: $height + 4px;
}
.switch-it-container {
  // width: $height * 2.5 + 4;
  padding: 2px;
  border-radius: 20px;
  border: 1px solid rgb(139, 139, 139);
  transition: background 0.3s;
  /* height: 25px; */
}
.background-on {
  background-color: rgb(144, 255, 144);
}
.background-off {
  background-color: rgb(255, 176, 170);
}
.switch-it {
  // width: $height;
  border-radius: 50%;
  position: relative;
  transition: left 0.3s;
  background-color: white;
}
.position-off {
  // left: 0;
}
.position-on {
  // left: calc(100% * 1.5-2px);
}
</style>
