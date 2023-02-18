<template>
       <div>
        <input :tabindex="tabindexInput" :type="TypeInput" v-model="value" :id="idInput" :class="classInput" :placeholder="placeholderText" :max="maxDateInput"/>
       </div>
</template>
<script>
export default {
    name:"MInputText",
    emits:["update:modelValue"],
    props: ["class","type","tabindex", "modelValue","placeholder","id","maxDate"],
    created(){
        // Nhận giá trị modelValue
        this.classInput = this.class;
        
        // Nhận giá trị type đã truyền vào
        this.TypeInput = this.type;
        
        // Nhận giá trị placeholder đã truyền vào
        this.placeholderText = this.placeholder;

        // Nhận giá trị tabindex
        this.tabindexInput = this.tabindex;

        // Nhận giá trị id truyền vào
        this.idInput = this.id;

        this.maxDateInput = this.maxDate;
    },
    updated(){
    // Nhận giá trị modelValue
        this.value = this.modelValue;

        // Nhận giá trị class đã truyền vào
        this.classInput = this.class;

    },
    watch:{
    /**
     * Theo dõi sự thay đổi của modelVualue
     * CreatedBy: Bien (16/1/2023)
     */
        value: function(newValue){
            this.$emit("update:modelValue", newValue)
        }
    },
    data(){
        return {
            // Khai báo biến classInput
            classInput : null,

            // Khai báo biến nhận value
            value: null,

            // Khai baso biến nhận type
            TypeInput: null,

            // Khai báo nhận biến tabindex
            tabindexInput: null,

            // Khai báo biến nhận placeholder
            placeholderText : null,

            // Khai báo biến nhận id
            idInput:null,

            // Khai báo biến nhận giá trị ngày lớn nhất
            maxDateInput:null
        }
    },
}
</script>
<style scoped>
    @import url(./input.css);
</style>