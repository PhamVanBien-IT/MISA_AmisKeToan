<template>
  <div class="overlay">
    <div class="dialog">
      <div class="dialog_header">
        <div class="dialog__title">Cảnh báo</div>
        <div class="icon close" @click="btnCloseDialog"></div>
      </div>
      <div class="dialog__content">
        <div :class="iconDialog"></div>
        <div class="dialog__des">
          {{ label }}
        </div>
      </div>
      <div class="dialog__btn" v-if="diy.state.showBtnDialog">
        <MButtonVue
          label="Hủy"
          class="btn-cancel"
          @click="btnCloseDialog"
          v-if="diy.state.showBtnCancel"
        ></MButtonVue>
        <MButtonVue
          label="Không"
          class="btn-cancel-dialog"
          @click="btnCloseEPLDetailOnClick"
        ></MButtonVue>
        <MButtonVue
          label="Có"
          class="btn-dialog"
          @click="funcEditEmployee"
        ></MButtonVue>
      </div>
      <div class="dialog__btn" v-if="diy.state.showCloseDialog">
        <MButtonVue
          label="Đóng"
          class="btn-dialog"
          @click="btnCloseDialog"
        ></MButtonVue>
      </div>
    </div>
  </div>
</template>
<script>
import MButtonVue from "../button/MButton.vue";

export default {
  inject: ["diy"],
  name: "MDialog",
  props: ["label", "func", "classIcon", "funcEPL"],
  components: {
    MButtonVue,
  },
  created() {
    let me = this;
    me.iconDialog = me.classIcon;
  },
  methods: {
    /**
     * Sự kiện đóng EPLDetail
     * CreatedBy: Bien (4/1/2023)
     */
    btnCloseEPLDetailOnClick() {
      this.diy.clearEPLDetail();
      this.diy.clearDialogDeleteEmployees();
      this.diy.clearDialog();
      this.diy.ShowCloseDialog();
    },

    /**
     * Sự kiện đóng Dialog
     * CreatedBy: Bien (4/1/2023)
     */
    btnCloseDialog() {
      this.diy.clearDialog();
      this.diy.clearDialogDeleteEmployees();
      this.diy.ClearDialogValidate();
      this.diy.clearDialogDevelop();
    },

    /**
     * Hàm truyền dữ liệu ra employeeDetail
     * CreatedBy: Bien (2/1/2023)
     */
    funcEditEmployee() {
      this.$emit("EditEPL", this.funcEPL);
      this.diy.clearDialog();
      this.diy.clearDialogDeleteEmployees();
      this.diy.clearFunctionAll();
      // Hiển thị nút đóng
      this.diy.ShowCloseDialog();
      this.$parent.isFunctionAll = false;
      this.$parent.selectedList = [];
    },
  },

  data() {
    return {
      // Khai báo biến nhận class
      iconDialog: null,

      // Khai báo biến nhận hàm
      funcEmployee: null,
    };
  },
};
</script>
<style scoped>
@import url(./dialog.css);
</style>
