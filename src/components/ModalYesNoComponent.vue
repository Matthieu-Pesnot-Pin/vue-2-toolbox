<template>
  <div class="composant-modal-oui-non">
    <p class="message" v-html="params.message"></p>
    <div class="separateur1"></div>
    <div class="frame-boutons">
      <button class="bouton-oui" :style="computedWidth" @click="clickSurOui">
        <p class="texte-bouton">{{ texteOui }}</p>
      </button>
      <button class="bouton-non" :style="computedWidth" @click="clickSurNon">
        <p class="texte-bouton">{{ texteNon }}</p>
      </button>
    </div>
  </div>
</template>

<script>
import { Modal } from "./Modal";
export default {
  name: "modalYesNoComponent",
  props: {
    params: {
      default: {},
    },
  },
  computed: {
    texteOui() {
      return this.params.captionYes == undefined
        ? "Yes"
        : this.params.captionYes;
    },
    texteNon() {
      return this.params.captionNo == undefined ? "No" : this.params.captionNo;
    },
    computedWidth() {
      let width = this.texteNon.length;
      if (this.texteOui.length > this.texteNon.length)
        width = this.texteOui.length;
      return "width: " + (width * 9 + 25) + "px;";
    },
  },
  methods: {
    callBackYes() {
      if (this.params.callBackYes != undefined) this.params.callBackYes();
    },
    callBackNo() {
      if (this.params.callBackNo != undefined) this.params.callBackNo();
    },
    quitterModale() {
      if (this.params.waitingContent != undefined && this.params.track)
        Modal.setContent(this.params.waitingContent);
      else Modal.hide();
    },
    clickSurOui() {
      if (this.params.keepOpen !== true) this.quitterModale();
      this.callBackYes();
    },
    clickSurNon() {
      if (this.params.keepOpen !== true) this.quitterModale();
      this.callBackNo();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/css/modal.scss";
.composant-modal-oui-non {
  background-color: $background-color;
  border-radius: 10px;
  padding: 24px 23px 23px 24px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
}
.message {
  @include typo-modal;
  text-align: center;
  margin-bottom: 20px;
}
.separateur1 {
  width: 359px;
  height: 1px;
  background-color: $silver;
  margin-bottom: 20px;
}
.frame-boutons {
  display: flex;
  align-items: center;
  justify-content: center;
}
.bouton-oui {
  background-color: $neutral-btn;
  @include btnHover($neutral-btn);
  margin-right: 44px;
  border-radius: 9px;
  padding: 12px 16px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.texte-bouton {
  @include typo-modal;
  color: $couleur-texte-blanc;
  text-align: center;
}
.bouton-non {
  background-color: $danger-btn;
  @include btnHover($danger-btn);
  border-radius: 9px;
  padding: 12px 16px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
