<template>
         <div class="input-checkbox">
        <label>     
            <input type="checkbox" id="chkProdTomove" v-model="select"/>
            <span class="check-box-effect"></span>
        </label>
         </div>
</template>
<script>
export default {
    name:"MCheckbox",
    emits:["update:modelValue"],
    props:["modelValue"],
    created(){
        this.select = this.modelValue;
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
        return{
            // Khai báo biến nhận name
            select :null,
        }
    }
}
</script>
<style scoped>
    @import url(./input.css);
</style>