<template>
  <div v-if="visible" class="masque-gris" @click="quitModale">
    <div class="modal-container" :class="computedOverflow" @click.stop>
      <keep-alive>
        <div
          :is="modal.content.componentName"
          v-on:modal-event="contentPassing"
          v-bind="modal.content.props"
        ></div>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export var Modal = {
  yesNo(config) {
    Modal.setContent({
      componentName: "ModalYesNoComponent",
      allowQuitOnClick: config.allowQuitOnClick,
      props: {
        params: {
          ...config,
          waitingContent: this.modal.content,
        },
      },
    });
    Modal.show();
  },
  alert(config) {
    var contenuAlert = {
      componentName: "ModalAlertComponent",
      allowQuitOnClick: config.allowQuitOnClick,
      track: config.track,
      props: { params: undefined },
    };
    if (typeof config == "string") config = { message: config };

    contenuAlert.props = {
      params: {
        ...config,
        waitingContent: this.modal.content,
      },
    };
    this.modal.content = contenuAlert;
    Modal.show();
  },
  show() {
    this.visible = true;
  },
  hide() {
    this.modal.content = undefined;
    this.visible = false;
  },
  setContent(content) {
    this.modal.content = content;
  },
};

export default {
  name: "ModalComponent",
  components: {
    ModalAlertComponent: () => import("./ModalAlertComponent"),
    ModalYesNoComponent: () => import("./ModalYesNoComponent"),
  },
  data: () => {
    return {
      visible: false,
      modal: {
        allowQuitOnClick: false,
        visible: false,
        content: undefined,
        fetchedData: undefined,
      },
    };
  },
  props: {
    content: { default: "" },
    hiddenOverflow: { default: true },
  },
  computed: {
    computedOverflow() {
      if (this.hiddenOverflow) return "autoOverflow";
      else return "hiddenOverflow";
    },
  },
  methods: {
    quitModale() {
      if (this.modal.content.allowQuitOnClick) Modal.hide();
    },
    contentPassing(content) {
      this.$emit("modal-event", content);
    },
  },
  mounted: function() {
    for (let func in Modal) Modal[func] = Modal[func].bind(this);
  },
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

.modal-container {
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
