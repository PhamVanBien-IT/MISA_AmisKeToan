<template>
  <div class="combobox">
    <div class="combobox-input">
      <input
        @keydown="keyDownSelectItem"
        @input="onSearchItem"
        v-model="textSelected"
        autocomplete="off"
        :id="id"
        class="text-form"
        type="text"
        :class="classInputCBox"
        :tabindex="tabindex"
      />
      <div class="iconBtnCombobox">
        <button
          class="comobox__button"
          @keydown="keyDownSelectItemBtn"
          @click="onShowHideData"
        ></button>
      </div>
    </div>
    <div v-if="diy.state.ShowDataDeparerment" class="combobox__data">
      <div
        class="combobox-item"
        :ref="`item_${index}`"
        :class="{ 'item-select': index == indexItemSelect }"
        @click="itemOnSelect(entity, index)"
        v-for="(entity, index) in entitySearch"
        :key="index"
        :value="entity[propValue]"
      >
        {{ entity[propName] }}
      </div>
    </div>
  </div>
</template>
<script>
import departmentApi from "@/api/departmentApi";
export default {
  inject: ["diy"],
  name: "MCombobox",
  emits: ["update:modelValue"],
  props: [
    "id",
    "propName",
    "propValue",
    "modelValue",
    "class",
    "tabindex",
  ],
  created() {
    // Lấy dữ liệu của bảng department
    this.getDepartments();

  },
  updated() {
    this.classInputCBox = this.class;
  },
  methods: {
    /**
     * Hàm lấy dữ liệu cho combobox đơn vị
     * CreatedBy: Bien (9/1/2023)
     */
    async getDepartments(){
      // Gắn giá trị kết quả lấy dữ liệu bảng department
      const response = await departmentApi.getDeparmentPaging();

      // Gắn dữ liệu
      this.entities = response.data;  
      this.setItemSelected();
      this.entitySearch = response.data;
    },

    /**
     * Hàm hiển thị Comboboxdata
     * CreatedBy: Bien (9/1/2023)
     */
    onShowHideData() {
      this.diy.ToggleDataDeparerment();
    },

    /**
     * Hàm gắn giá trị cho input khi chọn combobox-item
     * CreatedBy: Bien (9/1/2023)
     */
    itemOnSelect(entity) {
      var me = this;
      // Reset lại danh sách
      this.entitySearch = this.entities;
      this.itemSelected = entity;
      this.textSelected = entity[this.propName];
      this.$emit("update:modelValue", entity[this.propValue]);
      // Set index của item được chọn
      this.indexItemSelect = me.findIndexSelected;
      console.log(this.diy.state.ShowDataDeparerment);
      if(this.diy.state.ShowDataDeparerment){
        this.diy.ClearDataDeparerment();
      }
    },

    /**
     * Hàm gắn giá tìm item tương ứng với modelVue
     * CreatedBy: Bien (9/1/2023)
     */
    setItemSelected() {
      var me = this;
      // Tìm item tướng ứng với modelValue
      let entitySelected = this.entities.find(
        (item) => item[me.propValue] == me.modelValue
      );

      if (entitySelected) {
        this.textSelected = entitySelected[this.propName];
      }
    },

    /**
     * Hàm gắn giá trị theo ô input
     * CreatedBy: Bien (9/1/2023)
     */
    onSearchItem() {
      console.log(this.textSelected);
      var me = this;
      // Tìm item tướng ứng với modelValue
      this.entitySearch = this.entities.filter((item) =>
        item[me.propName].toLowerCase().includes(me.textSelected.toLowerCase())
      );
      this.isShowData = true;
    },
    
    /**
     * Hàm bắt sự kiện keydown của input combobox
     * CreatedBy: Bien ( 11/1/2023)
     */
    keyDownSelectItem(event) {
      const keyCode = event.keyCode;
      switch (keyCode) {
        case this.$MISAEnum.KEY_CODE.ENTER:

          this.unUpIndexItemSelect = true;
          // Xác định item đang chọn dựa vào index
          // eslint-disable-next-line no-case-declarations
          const item = this.entitySearch[this.indexItemSelect];
          this.itemOnSelect(item);
          break;
        case this.$MISAEnum.KEY_CODE.ROW_UP:
          //  Kiểm tra hiển thị
          if (!this.isShowData) {
            this.diy.ShowDataDeparerment();
          }

          if (this.indexItemSelect > 0 && !this.unUpIndexItemSelect) {
            this.indexItemSelect--;
          } else {
            this.unUpIndexItemSelect = false;
          }
          break;
        case this.$MISAEnum.KEY_CODE.ROW_DOWN:
          //  Kiểm tra hiển thị
          if (!this.isShowData) {
            this.diy.ShowDataDeparerment();
          }
          // eslint-disable-next-line no-case-declarations
          let maxLength = this.entitySearch.length;
          if (
            this.indexItemSelect < maxLength - 1 &&
            !this.unUpIndexItemSelect
          ) {
            this.indexItemSelect++;
          } else {
            this.unUpIndexItemSelect = false;
          }
          break;
        default:
          break;
      }
    },

    /**
     * Hàm bắt sự kiện keydown của button hiển thị
     * CreatedBy: Bien ( 11/1/2023)
     */
    keyDownSelectItemBtn(event) {
      const keyCode = event.keyCode;
      switch (keyCode) {
        case this.$MISAEnum.KEY_CODE.ENTER:
          this.diy.ClearDataDeparerment();
          // Xác định item đang chọn dựa vào index
          // eslint-disable-next-line no-case-declarations
          const item = this.entitySearch[this.indexItemSelect];
          this.itemOnSelect(item);
          break;
        case this.$MISAEnum.KEY_CODE.ROW_UP:
          //  Kiểm tra hiển thị
          if (!this.diy.state.ShowDataDeparerment) {
            this.diy.ShowDataDeparerment();
          }
          if (this.indexItemSelect > 0) {
            this.indexItemSelect--;
          }
          break;
        case this.$MISAEnum.KEY_CODE.ROW_DOWN:
          //  Kiểm tra hiển thị
          if (!this.diy.state.ShowDataDeparerment) {
            this.diy.ShowDataDeparerment();
          }
          // eslint-disable-next-line no-case-declarations
          let maxLength = this.entitySearch.length;
          if (this.indexItemSelect < maxLength - 1) {
            this.indexItemSelect++;
          }
          break;
        default:
          break;
      }
    },
  },
  computed: {
    /**
     * Tìm kiếm giá trị được chọn
     * CreatedBy: Bien (9/2/2023)
     */
    findIndexSelected: function () {
      var me = this;
      // Tính index của item đã được chọn
      let findIndex = this.entitySearch.findIndex(
        (item) => item[me.propValue] == me.itemSelected[me.propValue]
      );
      return findIndex;
    },
  },
  data() {
    return {
      // Khai báo biện nhân class
      classInputCBox: null,

      // Khai báo biến nhận giá trị
      entities: [],

      // Khai báo biến chứa entity bị thay đổi
      entitySearch: [],

      // Khai báo biến cho input
      textSelected: null,

      // Khai báo biến ngăn tăng indexItemSelect
      unUpIndexItemSelect: true,

      // Khai báo biến index trong comboxbox__data
      indexItemSelect: null,

      // Khai báo item được chọn
      itemSelected: null,
    };
  },
};
</script>
<style scoped>
@import url(./combobox.css);
</style>
