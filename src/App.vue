<template>
  <div>
    <div class="container py-3">
      <h2>Vue js Toolbox</h2>
      <div class="row row-cols-1 row-cols-md-2 mb-2 text-center">
        <div class='col'>
          <div class='card mb-4 rounded-3 shadow-sm'>
            <div class="card-header">Checkboxes</div>
            <div class="card-body">
              <CheckboxComponent 
                v-model="checked" 
                :disabled="disableDemoCheckBox"
                :disabledInfo="infoIfDisabled"
                label="Click me !"
              />
              <div class="breadcrumb">
                <CheckboxComponent 
                  v-model="disableDemoCheckBox" 
                  label="Disable checkbox"
                />
              </div>
              <div class="breadcrumb">
                <EditableField 
                  label="Click to edit disable info :"
                  default='Click to edit'
                  v-model="infoIfDisabled"
                />
              </div>
              <div v-if="checked">Checked !</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div  class='card mb-4 rounded-3 shadow-sm'>
            <div class="card-header">Editable lablels</div>
            <div class="card-body">
              <div>Thumbnail text :</div>
              <EditableField 
                v-model="labelContent"
                @change="thumbnailVisibility=true"
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div  class='card mb-4 rounded-3 shadow-sm'>
            <div class="card-header">Radio</div>
            <div class="card-body">
              <RadioComponent 
                class="radio-component"
                label='One'
                group="demo" 
                v-model='radioValue' />
              <RadioComponent 
                class="radio-component"
                label='Two'
                group="demo" 
                v-model='radioValue'
              />
            </div>
          </div>
        </div>
        <div class='col'>
        <div class='card mb-4 rounded-3 shadow-sm'>
          <div class="card-header">Thumbnail</div>
          <div class='card-body'>

              <div class='breadcrumb'>
                <div>Thumbnail type :</div>
                <RadioComponent 
                  class="radio-component"
                  label='Neutral'
                  group="thumbnailType" 
                  v-model='thumbnailType'
                />
                <RadioComponent 
                  class="radio-component"
                  label='Success'
                  group="thumbnailType" 
                  v-model='thumbnailType'
                />
                <RadioComponent 
                  class="radio-component"
                  label='Error'
                  group="thumbnailType" 
                  v-model='thumbnailType'
                />
              </div>
              <button @click="thumbnailVisibility = true">Show thumbnail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ThumbnailComponent 
      v-model='thumbnailVisibility'
      autoHide=true
      closeCross=true
      autoHideTime=2000
      :content="labelContent"
      position="center"
      :thumbnailType="thumbnailType"
    />
  </div>
</template>

<script>
import CheckboxComponent from "./components/CheckboxComponent"
import EditableField from "./components/EditableField"
import ThumbnailComponent from "./components/ThumbnailComponent"
import RadioComponent from "./components/RadioComponent"

export default {
  name: 'App',
  data: ()=>{ 
    return {
      checked: false,
      labelContent: 'Thumbnail text',
      thumbnailVisibility: false,
      thumbnailType: 'Neutral',
      radioValue: 'one',
      disableDemoCheckBox: false,
      infoIfDisabled: "Test"
    }
  },
  components: {
    CheckboxComponent,
    EditableField,
    ThumbnailComponent,
    RadioComponent
  },
  // watch: { 
  //   thumbnailType() {
  //     console.log('thumbnailType', this.thumbnailType)
  //   },
  //   radioValue() {
  //     console.log('radioValue', this.radioValue)

  //   }
  // }
}
</script>

<style lang="scss">
#app{
 display: flex;
 justify-content: center;
}

.dflex{
  display: flex;
}

.radio-component {
  // font-size: 2em;
  margin-left: 10px;
  margin-right: auto;
}

.editable-label {
  width: 100%;
}
</style>
