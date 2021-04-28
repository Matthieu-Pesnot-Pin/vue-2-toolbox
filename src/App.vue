<template>
  <div>
    <div class="container py-3">
      <h2>Vue js Toolbox</h2>
      <div class="row row-cols-1 row-cols-md-2 mb-2 text-center">
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header">Checkboxes</div>
            <div class="card-body">
              <div class="dflex">
                <CheckboxComponent
                  v-model="checked"
                  :disabled="disableDemoCheckBox"
                  :disabledInfo="infoIfDisabled"
                  label="Click me !"
                />
                <div v-if="checked">Checked !</div>
              </div>

              <div class="breadcrumb">
                <CheckboxComponent
                  v-model="disableDemoCheckBox"
                  label="Disable checkbox"
                />
              </div>
              <div class="breadcrumb">
                <EditableFieldComponent
                  label="Click to edit disable info :"
                  default="Click to edit"
                  v-model="infoIfDisabled"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header">Editable lablels</div>
            <div class="card-body">
              <div>Thumbnail text :</div>
              <EditableFieldComponent
                v-model="labelContent"
                @change="thumbnailVisibility = true"
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header">Radio</div>
            <div class="card-body">
              <RadioComponent
                class="radio-component"
                label="One"
                group="demo"
                v-model="radioValue"
              />
              <RadioComponent
                class="radio-component"
                label="Two"
                group="demo"
                v-model="radioValue"
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header">Thumbnail</div>
            <div class="card-body">
              <div class="breadcrumb">
                <div>Thumbnail type :</div>
                <RadioComponent
                  class="radio-component"
                  label="Neutral"
                  group="thumbnailType"
                  v-model="thumbnailType"
                />
                <RadioComponent
                  class="radio-component"
                  label="Success"
                  group="thumbnailType"
                  v-model="thumbnailType"
                />
                <RadioComponent
                  class="radio-component"
                  label="Error"
                  group="thumbnailType"
                  v-model="thumbnailType"
                />
              </div>
              <button @click="thumbnailVisibility = true">
                Show thumbnail
              </button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header">Modal</div>
            <div class="card-body">
              <RadioComponent
                class="radio-component"
                label="Alert"
                group="modalType"
                v-model="modalType"
              />
              <RadioComponent
                class="radio-component"
                label="Yes / No"
                group="modalType"
                v-model="modalType"
              />
              <div v-if="modalType == 'Alert'">
                <RadioComponent
                  class="radio-component"
                  label="Button"
                  group="modalAlertType"
                  v-model="modalAlertType"
                />
                <RadioComponent
                  class="radio-component"
                  label="Loader"
                  group="modalAlertType"
                  v-model="modalAlertType"
                />
                <EditableFieldComponent
                  v-if="modalAlertType == 'Button'"
                  default="Click to edit"
                  label="Button caption"
                  v-model="captionButton"
                />
              </div>
              <div v-else-if="modalType == 'Yes / No'">
                <EditableFieldComponent
                  label="Caption Yes"
                  v-model="captionYes"
                />
                <EditableFieldComponent
                  default="Click to edit"
                  label="Caption No"
                  v-model="captionNo"
                />
              </div>

              <button @click="displayModal">
                Show modal window
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ThumbnailComponent
      v-model="thumbnailVisibility"
      :content="labelContent"
      :thumbnailType="thumbnailType"
      autoHide="true"
      closeCross="true"
      autoHideTime="2000"
      position="center"
    />
    <ModalContainerComponent
      v-model="modale.visible"
      :content="modale.content"
    />
    <!-- v-on:modale-event='modaleFetch' -->
  </div>
</template>

<script>
import CheckboxComponent from "./components/CheckboxComponent";
import EditableFieldComponent from "./components/EditableFieldComponent";
import ThumbnailComponent from "./components/ThumbnailComponent";
import RadioComponent from "./components/RadioComponent";
import ModalContainerComponent from "./components/ModalContainerComponent";
import { mapActions, mapState } from "vuex";

const STATES_TO_MAP = ["modale"];

export default {
  name: "App",
  data: () => {
    return {
      checked: false,
      labelContent: "Thumbnail text",
      thumbnailVisibility: false,
      thumbnailType: "Neutral",
      radioValue: "One",
      disableDemoCheckBox: false,
      infoIfDisabled: "Test",
      modalType: "Alert",
      captionNo: "No",
      captionYes: "Yes",
      captionButton: "Ok",
      modalAlertType: "Button",
    };
  },
  components: {
    CheckboxComponent,
    EditableFieldComponent,
    ThumbnailComponent,
    RadioComponent,
    ModalContainerComponent,
  },
  computed: {
    ...mapState([STATES_TO_MAP]),
  },
  methods: {
    ...mapActions(["modalAlert", "modalYesNo", "modalComponent", "modalHide"]),
    displayModal() {
      if (this.modalType == "Alert") {
        let config;
        if (this.modalAlertType == "Button") {
          config = {
            message: "Here you are !",
            allowQuitOnClick: true,
            captionOk: this.captionButton,
          };
        } else if (this.modalAlertType == "Loader") {
          config = {
            message: "Loader for 2 seconds...",
            allowQuitOnClick: true,
            displayLoader: true,
          };
          setTimeout(() => {
            this.modalHide();
          }, 2000);
        }
        return this.modalAlert(config);
      }

      if (this.modalType == "Yes / No")
        return this.modalYesNo({
          message: "What do you want ?",
          captionYes: this.captionYes,
          captionNo: this.captionNo,
          callBackYes: () => {
            this.modalAlert("You clicked " + this.captionYes + " !");
          },
          callBackNo: () => {
            this.modalAlert("You clicked " + this.captionNo + " !");
          },
        });
    },
  },
  mounted: function() {},
};
</script>

<style lang="scss">
#app {
  display: flex;
  justify-content: center;
}

.dflex {
  display: flex;
}

.radio-component {
  // font-size: 2em;
  margin-left: 10px;
  // width: 200px;
}

.editable-field {
  width: 100%;
}
</style>
