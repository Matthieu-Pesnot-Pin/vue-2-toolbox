<template>
  <div class='radio'>
      <input 
        type="radio" 
        :name="radioGroup"
        :id="idComputed()" 
        :value="value" 
        @change="$emit('change', value)"
      /><label :for="idComputed()">{{ label }}</label>
  </div>
</template>

<script>
export default {
    name: 'ComposantRadio',
    model: {
        prop: 'vModelValue',
        event: 'change'
    },
    props: {
        radioGroup: {default: 'defaultGroupe'}, // The group among which the radio is picked by user
        vModelValue: {default: 'empty'},        // prop only used for v-model
        label: { default: 'empty'},             // the displayed label
        value: {                                // the value sent to v-model or to @change event
            default: function () {              // Default is the label value, which allows you to only fill the label value
                return this.label
            }
        }
    },
    data: ()=>{
        return { 
            salt: undefined,
            privateValue: 'empty'
        }
    },
    methods: {
        update(){
            this.$emit('change', this.privateValue);
        },
        idSalt() {
            if (this.salt == undefined) this.salt = Math.round(Math.random()*1000000)
            return this.salt
        },
        idComputed() {
            return 'radio-' + this.labelComputed + '-' + this.idSalt()
        }
    },
    computed: {
        labelComputed() {
            return this.label.replace(/ /g, '-')
        }
    }
}
</script>

<style lang="scss">
// .radio{

// }
input {
    margin-right: 3px;
}
</style>