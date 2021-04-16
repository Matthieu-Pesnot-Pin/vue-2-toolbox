<template>
  <div>
    <div class="main">
      <CheckboxComponent v-model="checked" />
      <div v-if="checked">Checked !</div>
      <EditableLabel 
        class="editable-label"
        :content="labelContent"
      />
    </div>
  </div>
</template>

<script>
import CheckboxComponent from "./components/CheckboxComponent"
import EditableLabel from "./components/EditableLabel"
export default {
  name: 'App',
  data: ()=>{ 
    return {
      checked: false,
      labelContent: 'Vide'
    }
  },
  components: {
    CheckboxComponent,
    EditableLabel
  },
  watch: {
    checked() {
      console.log(this.checked);
    }
  }
}
</script>

<style lang="scss">
#app{
 display: flex;
 justify-content: center;
}

.main{
  
}

.editable-label {
  border: 1px solid #000;
  width: 200px;
}
</style>
