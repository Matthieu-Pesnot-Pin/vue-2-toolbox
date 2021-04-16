<template>
  <div>
    <div class="main">
      <div class="dflex">
        <CheckboxComponent v-model="checked" />
        <div v-if="checked">Checked !</div>
      </div>
      <div class="dflex">
        <div>Thumbnail text :</div>
        <EditableLabel 
          class="editable-label"
          v-model="labelContent"
          @change="thumbnailVisibility=true"
        />
      </div>
    <div>
      <input type="radio" name="thumbnail-type" id="thumbnail-neutral" value="neutral" v-model="thumbnailType"/><label for="thumbnail-neutral">Neutral</label>
      <input type="radio" name="thumbnail-type" id="thumbnail-success" value="success" v-model="thumbnailType"/><label for="thumbnail-success">Success</label>
      <input type="radio" name="thumbnail-type" id="thumbnail-error" value="error" v-model="thumbnailType"/><label for="thumbnail-error">Error</label>
      <button @click="thumbnailVisibility = true">Show thumbnail</button>
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
import EditableLabel from "./components/EditableLabel"
import ThumbnailComponent from "./components/ThumbnailComponent"

export default {
  name: 'App',
  data: ()=>{ 
    return {
      checked: false,
      labelContent: 'Vide',
      thumbnailVisibility: false,
      thumbnailType: 'neutral'
    }
  },
  components: {
    CheckboxComponent,
    EditableLabel,
    ThumbnailComponent
  },
  watch: { 
    thumbnailType() {
    console.log('thumbnailType', this.thumbnailType)

    }
  }
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

.editable-label {
  width: 200px;
}
</style>
