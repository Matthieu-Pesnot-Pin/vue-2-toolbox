<template>
    <div 
        class="option"
        :class="disabled && disabledInfo != undefined ? 'infobulle':''" 
        :bulle-content="disabledInfo"
    >
        <input 
            type="checkbox" 
            v-model="privateChecked" 
            :id="idComputed" 
            :disabled="disabled"
            @change='update'
        >
        <label :for="idComputed">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'ComposantCheckbox',
    model: {
        prop: 'checked',
        event: 'change'
    },
    data: function () {
        return { 
            salt: undefined,
            privateChecked: this.checked
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
        },
        idComputed() {
            return 'checkbox-' + this.labelComputed + '-' + this.idSalt()
        }
    },
    methods: {
        update(){
            this.$emit('change', this.privateChecked);
        },
        idSalt() {
            if (this.salt == undefined) this.salt = Math.round(Math.random()*1000000)
            return this.salt
        }
    }
}
</script>

<style lang="scss" scoped>
$backGroundColor: #FFF;

.option {
  & label {
    margin-top: auto;
    margin-bottom: auto;
  }
  display: flex;
  align-items: center;
  justify-content: left;
  display: inline-block;
  height: 100%;
}

input[type="checkbox"] {
    
  margin-right: 15px;
}

.infobulle {
  position: relative;
  cursor: help;
}
/* on génère un élément :after lors du survol et du focus :*/
.infobulle:hover::after{
  text-align: center;
  content: attr(bulle-content); 
  background-color: $backGroundColor;
  padding: 5px;
  border-radius: 15px;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.4);
  min-width: 250px; 
  max-width: 400px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%); /* on centre horizontalement  */
  z-index: 1; /* pour s'afficher au dessus des éléments en position relative */
}

</style>