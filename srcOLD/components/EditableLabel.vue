<template>
    <div
        v-if="!editionMode" 
        v-html="contenuMisEnForme"
        class="content"
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
</template>

<script>
/**
 *  Champ de texte editable par double clic. 
 *  Options :  
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
 *              - if rows isn't set, textarea's size will adapte to the text length
 * 
 * 
 */

export default {
    name: 'EditableLabel',
    model:{
        prop:'content',
        event:'change'
    },
    data: function () {
        return {
            editionMode: false,
            privateContent: this.content
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
        editOnSingleClick: { default : true}
    },
    computed: {
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
                this.editionMode=(true && !this.locked)
                this.$nextTick(()=>{
                    if (this.editionMode) this.$refs.input.focus()
                })
            }
        },
        synchroVmodel(applyChanges) {
            if ((this.privateContent != this.content) && applyChanges) {
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
.content{
    height: 100%;
    min-height: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;    
}
</style>