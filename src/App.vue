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
                <SwitchIt
                  label="Disable checkbox"
                  v-model="disableDemoCheckBox"
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
                v-model="Thumbnail.content"
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
                  value="neutral"
                  group="thumbnailType"
                  v-model="Thumbnail.thumbnailType"
                />
                <RadioComponent
                  class="radio-component"
                  label="Success"
                  value="success"
                  group="thumbnailType"
                  v-model="Thumbnail.thumbnailType"
                />
                <RadioComponent
                  class="radio-component"
                  label="Error"
                  value="error"
                  group="thumbnailType"
                  v-model="Thumbnail.thumbnailType"
                />
              </div>
              <SwitchIt v-model="Thumbnail.autoHide" label="Auto hide" />
              <SwitchIt v-model="Thumbnail.closeCross" label="Close cross" />
              <button @click="Thumbnail.show">
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
    <!-- v-model="thumbnailVisibility"
      :content="labelContent"
      :thumbnailType="thumbnailType"
      autoHide="true"
      closeCross="true"
      autoHideTime="2000"
      position="center" -->
    <ThumbnailComponent />
    <ModalComponent />
  </div>
</template>

<script>
import CheckboxComponent from "./components/CheckboxComponent";
import EditableFieldComponent from "./components/EditableFieldComponent";
import RadioComponent from "./components/RadioComponent";
import SwitchIt from "./components/SwitchIt";
import ThumbnailComponent, { Thumbnail } from "./components/ThumbnailComponent";
import ModalComponent, { Modal } from "./components/Modal";

export default {
  name: "App",
  data: () => {
    return {
      switchTest: false,
      Thumbnail,
      checked: false,
      radioValue: "One",
      disableDemoCheckBox: false,
      infoIfDisabled: "Test",
      modalType: "Alert",
      captionNo: "No",
      captionYes: "Yes",
      captionButton: "Ok",
      modalAlertType: "Button",
      Modal,
    };
  },
  components: {
    CheckboxComponent,
    EditableFieldComponent,
    ThumbnailComponent,
    RadioComponent,
    ModalComponent,
    SwitchIt,
  },
  computed: {},
  methods: {
    displayModal() {
      if (this.modalType == "Alert") {
        let config;
        if (this.modalAlertType == "Button") {
          config = {
            message: "Hello world !",
            allowQuitOnClick: true,
            captionOk: this.captionButton,
          };
        } else if (this.modalAlertType == "Loader") {
          config = {
            message: "Loader for 2 seconds...",
            allowQuitOnClick: false,
            displayLoader: true,
          };
          setTimeout(() => {
            Modal.hide();
          }, 2000);
        }
        return Modal.alert(config);
      }

      if (this.modalType == "Yes / No")
        return Modal.yesNo({
          message: "What do you want ?",
          captionYes: this.captionYes,
          captionNo: this.captionNo,
          callBackYes: () => {
            Modal.alert("You clicked " + this.captionYes + " !");
          },
          callBackNo: () => {
            Modal.alert("You clicked " + this.captionNo + " !");
          },
        });
    },
  },
  mounted: function() {
    Thumbnail.setOptions({
      closeCross: true,
      autoHideTime: 5000,
      position: "center",
    });
  },
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

.switch-it-component {
  width: 180px;
  margin-bottom: 10px;
}
</style>
