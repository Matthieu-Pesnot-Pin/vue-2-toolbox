<template>
    <div 
        class="option"
        :class="disabled && disabledInfo != undefined ? 'infobulle':''" 
        :bulle-content="disabledInfo"
    >
        <input 
            type="checkbox" 
            v-model="privateChecked" 
            :id="'checkbox-' + labelComputed + '-' + idSalt()" 
            @change="update"
            :disabled="disabled"
        >
        <label :for="'checkbox-' + labelComputed + '-' + idSalt()">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'ComposantCheckbox',
    model: {
        prop: 'checked',
        event: 'update'
    },
    data: ()=>{
        return { 
            salt: undefined
        }
    },
    props: {
        disabled: { default: false }, // true / false
        disabledInfo: { default: undefined }, // Text to display when disabled and hovering
        checked: { default: false }, // checkbox status - v-model prop
        label: { default: 'Option'} // checkbox label
    },
    computed: {
        labelComputed() {
            return this.label.replace(/ /g, '-')
        }
    },
    methods: {
        update(){
            this.$emit('update', this.privateChecked);
        },
        idSalt() {
            if (this.salt == undefined) this.salt = Math.round(Math.random()*1000000)
            return this.salt
        }
    },
    created: function () {
        this.privateChecked = this.checked
    }
}
</script>

<style lang="scss" scoped>
.option {
  & label {
    margin-top: auto;
    margin-bottom: auto;
  }
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  margin-bottom: 20px;
}

input[type="checkbox"] {
  margin-right: 15px;
}
</style>