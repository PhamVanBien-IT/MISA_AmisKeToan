<template>
         <div class="dropdown">
        <input 
        v-model="textSelectTed" 
        disabled
        :id="id" 
        class="dropdown__input" 
        type="text">
        <div class="dropdown__button iconBtndropdown" @click="onShowHideData"></div>
        <div v-show="isShowData" class="dropdown__data">
           <div class="dropdown-item"
           v-for="(item,index) in numverRecord" 
           :key="index"
           :class="{'item-select': index == indexItemSelect}"
           @click="itemOnSelect(item,index)"
           >
            {{item.value}}
           </div>
        </div>
   </div>
</template>
<script>
export default {
    inject:['diy'],
    name:"MDropdown",
    emits:["update:modelValue",'pageSize'],
    props:["id","pageNumverRecord"],
    created(){
        // Nhận giá trị tổng bản ghi
        this.numverRecord = this.pageNumverRecord;
    },
    methods:{
        /**
         * Hàm ẩn và hiển thị danh sách item combobox
         * CreatedBy: Bien (9/1/2023)
         */
        onShowHideData(){
            this.isShowData = !this.isShowData;
        },

        /**
         * Hàm gắn giá trị khi chọn kích thước
         * CreatedBy: Bien (9/1/2023)
         */
        itemOnSelect(item,index){
            this.textSelectTed = item.value;
            this.isShowData = false;
            this.indexItemSelect = index
            this.$emit('pageSize',item.key)
        },
    },
    data(){
        return{
            // Khai báo biến showData
            isShowData: false,

            // Khai báo biến nhận giá trị
            entities : [],

            // Khai báo biến chứa entity bị thay đổi
            entitySearch: [],

            // Khai báo biến cho input
            textSelectTed : "20 bản ghi trên 1 trang",

            // Khai báo biến index trong comboxbox__data
            indexItemSelect: 1,

            // Khai báo biến giá trị cho func
            numverRecord: [],
        }
    }
}
</script>

<style scoped>
    @import url(./combobox.css);
</style>