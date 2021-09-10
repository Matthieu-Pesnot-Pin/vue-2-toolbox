<template>
    <div class='editable-field'>
        <div class="label" v-html="label"></div>
        <div
            v-if="!editionMode" 
            v-html="contenuMisEnForme"
            class="content"
            :class="computedClass"
            @dblclick="makeItEditable('dblClick')"
            @click="makeItEditable('singleClick')"
        >
        </div>
        <select 
            v-else-if="format=='select'" 
            ref='input'
            class="content" 
            name="labelList" 
            id="labelList"
            @change="synchroVmodel(true)"
            v-model="privateContent"
            @blur="synchroVmodel(saveOnBlur)"
        >
            <option v-for="(option, index) of selectList" :value="option" :key="index">{{ option }}</option>
        </select>
        <textarea
            v-else-if="format=='textarea'" 
            ref='input'
            class="content" 
            v-model="privateContent"
            @keypress.enter.exact="synchroVmodel(true)"
            @keydown.esc="synchroVmodel(false)"
            @blur="synchroVmodel(saveOnBlur)"
            style="width: 100%;"
            :rows="rowsNumber"
        >
        </textarea>
        <input 
            v-else
            ref='input'
            class="content input"
            :type="typeComputed"
            :maxlength="length"
            v-model="privateContent"
            @keydown.esc="synchroVmodel(false)"
            @keypress.enter="synchroVmodel(true)"
            @blur="synchroVmodel(saveOnBlur)"
        />
    </div>
</template>

<script>
/**
 *  Champ de texte editable par double clic. 
 *  Options :  
 *      - label: label displayed before the editable field
 *      - editOnSingleClick: true (default)/ false. When false, double click enable edit mode. When true, single click does.
 *      - locked : true / false. Prevent from enabling edit mode
*       - length = max length of input (text)
 *      - format : 
 *          - default : text
 *          - 'date' : displays date field in edit mode
 *          - 'select' : 
 *              - diplays select type input
 *              - fills it with 'selectList' props
 *              - data value (and not its list index ) is emitted on change or to v-model prop
 *          - textarea : 
 *              - displays a textarea input
 *              - default rows number : 5, change it with rows="n"
 *              - if rows isn't set, textarea's size will adapt to the text length
 * 
 * 
 */

export default {
    name: 'EditableFieldComponent',
    model:{
        prop:'content',
        event:'change'
    },
    data: function () {
        return {
            editionMode: false,
            privateContent: this.content == "" ? this.default : this.content,
        }
    },
    props: {
        content: { default: '' },
        locked: { default : false },
        format: { default: '' },
        selectList: { default: '' },
        saveOnBlur: { default : true },
        rows: { default : undefined },
        length: { default : ''},
        editOnSingleClick: { default : true},
        label: { default: "Editable field : " },
        default: { default: ""}

    },
    computed: {
        computedClass() {
            return this.privateContent == this.default ? 'placeHolderSytle' : ''
        },
        typeComputed() {
            if (this.format == 'date') return 'date'
            else return 'text'
        },
        contenuMisEnForme() {
            if (this.format != 'date') return this.privateContent != undefined ?  this.privateContent.replace(/\n/g, "<br>").replace('\r', '<br>') : undefined
            let date = this.privateContent.split('-').reverse().join('/')
            // if (!testDate(date)) return '--'
            return date
        },
        rowsNumber() {
            if (this.rows == undefined){
                let countLines = this.privateContent.match(/\n/g);
                if (countLines != undefined) return countLines.length + 2;
                else return 5;
            } else return this.rows
        }
    },
    methods: {
        makeItEditable(eventType) {
            if (eventType == 'singleClick') this.$emit('click')
            if ((eventType == 'singleClick' && this.editOnSingleClick) || eventType=='dblClick') {
                let newMode = true && !this.locked
                if (newMode && this.privateContent == this.default) this.privateContent==''
                this.editionMode=(newMode)
                this.$nextTick(()=>{
                    if (this.editionMode) this.$refs.input.focus()
                })
            }
        },
        synchroVmodel(applyChanges) {
            if ((this.privateContent != this.content) && applyChanges) {
                if (this.privateContent=="") this.privateContent = this.default
                this.$emit('change', this.privateContent)
            } else this.privateContent = this.content
            this.editionMode = false
        }
    },
    watch: {
        content() {
            this.privateContent = this.content
        }
    }
}
</script>
 
<style scoped lang="scss">
.editable-field{
    display: flex;
    white-space: nowrap;
    overflow: visible;
    flex-wrap: nowrap;
    .label {
        margin-right: 10px;
    }
}

.placeHolderSytle{
    color: #888;
}

.content{
    height: 100%;
    min-height: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;    
}

input { 
    width: 100%;
}
</style>