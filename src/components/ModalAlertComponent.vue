<template>
  <div class="composant-modal-alert">
    <p class="message" v-html="params.message"></p>
    <div class="separateur1"></div>
    <button
      ref="OKdiv"
      v-if="!params.displayLoader"
      @click="quitterFenetreModale"
      @keypress.enter="quitterFenetreModale"
      class="frame-ok"
    >
      <p class="bouton-ok">{{ params.captionOk }}</p>
    </button>
    <div v-else class="loader">
      <div class="lds-dual-ring"></div>
    </div>
  </div>
</template>

<script>
import { Modal } from "./Modal";

export default {
  name: "modalAlertComponent",
  props: {
    params: {
      message: { default: "Informations" },
      displayLoader: { default: false },
      captionOk: { default: "Ok" },
    },
  },
  methods: {
    quitterFenetreModale() {
      if (this.params.waitingContent != undefined && this.params.track)
        Modal.setContent(this.params.waitingContent);
      else Modal.hide();
      if (this.params.callBack != undefined) this.params.callBack();
    },
  },
  mounted: function() {
    if (this.params.captionOk == undefined) this.params.captionOk = "Ok";
    this.$forceUpdate();
  },
};
</script>

<style lang="scss" scoped>
@import "src/css/modal.scss";
.composant-modal-alert {
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
  width: 300px;
  height: 1px;
  background-color: $silver;
  // margin-bottom: 20px;
}
.frame-ok {
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  border: none;

  background-color: $neutral-btn;
  @include btnHover($neutral-btn);

  border-radius: 9px;
  padding: 8px 16px;
  margin-top: 20px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.4);
}
.bouton-ok {
  @include typo-modal;
  color: $couleur-texte-blanc;
}
.loader {
  height: 13px;
  border-radius: 9px;
  padding: 12px 16px;
  align-self: stretch;
  text-align: center;
  margin: 10px 0 20px 0;
}

.lds-dual-ring {
  display: inline-block;
  width: 34px;
  height: 34px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 34px;
  height: 34px;
  margin: 0px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  border: 2px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
