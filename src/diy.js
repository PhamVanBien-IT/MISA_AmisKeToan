import { reactive, readonly } from "vue";

/**
 * Khai báo biến state
 * CreatedBy: Bien (4/1/2023)
 */
const state = reactive({
  showEPLDetail: false,
  showDialog: false,
  showNotify: false,
  showLoading: false,
  showNav: true,
  showFuncList: false,
  showBtnDialog: true,
  showDialogValidate: false,
  ShowDataDeparerment:false,
  showCloseDialog:true,
});
/**
 * Hàm hiển thị nút đóng cho dialog
 * CreatedBy: Bien (20/1/2023)
 */
const ShowCloseDialog= function(){
  state.showCloseDialog = true;
};

/**
 * Hàm hiển thị nút đóng cho dialog
 * CreatedBy: Bien (20/1/2023)
 */
const ClearCloseDialog= function(){
  state.showCloseDialog = false;
};
/**
 * Hàm hiển thị funcList
 * CreatedBy: Bien (20/1/2023)
 */
const ToggleDataDeparerment= function(){
  state.ShowDataDeparerment = !state.ShowDataDeparerment;
};

/**
 * Hàm hiển thị funcList
 * CreatedBy: Bien (20/1/2023)
 */
const ShowDataDeparerment= function(){
  state.ShowDataDeparerment = true;
};

/**
 * Hàm hiển thị funcList
 * CreatedBy: Bien (20/1/2023)
 */
const ClearDataDeparerment= function(){
  state.ShowDataDeparerment = false;
};
/**
 * Hàm show dialog khi trùng mã
 * CreatedBy: Bien (20/1/2023)
 */
const ShowDialogValidate = function(){
  state.showDialogValidate = true;
}
/**
 * Hàm ẩn dialog khi trùng mã
 * CreatedBy: Bien (20/1/2023)
 */
const ClearDialogValidate = function(){
  state.showDialogValidate = false;
}
/**
 * Hàm ẩn show nút trong dialog khi trùng mã
 * CreatedBy: Bien (20/1/2023)
 */
const ShowBtnDialog = function(){
  state.showBtnDialog = true;
};
/**
 * Hàm ẩn nút trong dialog khi trùng mã
 * CreatedBy: Bien (20/1/2023)
 */
const ClearBtnDialog = function(){
  state.showBtnDialog = false;
};
/**
 * Hàm hiển thị funcList
 * CreatedBy: Bien (15/1/2023)
 */
const showFuncList= function(){
    state.showFuncList = !state.showFuncList;
};
/**
 * Hàm hiển thị EPLDetail
 * CreatedBy: Bien (4/1/2023)
 */
const setEPLDetail = function () {
  state.showEPLDetail = true;
  state.showDialog = false;
};

/**
 * Hàm ẩn EPLDetail
 * CreatedBy: Bien (4/1/2023)
 */
const clearEPLDetail = function () {
  state.showEPLDetail = false;
};

/**
 * Hàm hiển thị Dialog
 * CreatedBy: Bien (4/1/2023)
 */
const showDialog = function () {
  state.showDialog = true;
};

/**
 * Hàm ẩn Dialog
 * CreatedBy: Bien (4/1/2023)
 */
const clearDialog = function () {
  state.showDialog = false;
};

/**
 * Hàm hiển thị thông báo
 * CreatedBy: Bien (4/1/2023)
 */
const showNotify = function () {
  state.showNotify = true;
  setTimeout(() => {
    state.showNotify = false;
  }, 2000);
};
/**
 * Hàm hiển thị EPLList
 * CreatedBy: Bien (4/1/2023)
 */
// const showEPLList = function(){
//     state.showEPLList = true;
// }
/**
 * Hàm hiển thị nav
 * CreatedBy: Bien (14/1/2023)
 */
const showNavToggle = function () {
  state.showNav = !state.showNav;
};
/**
 * Hàm hiển thị Loading
 * CreatedBy: Bien (11/1/2023)
 */
const showLoading = function () {
  state.showLoading = true;
};

/**
 * Hàm ẩn Loading
 * CreatedBy: Bien (11/1/2023)
 */
const clearLoading = function () {
  state.showLoading = false;
};
export default {
  state: readonly(state),
  setEPLDetail,
  clearEPLDetail,
  showDialog,
  clearDialog,
  showLoading,
  clearLoading,
  showNotify,
  showNavToggle,
  showFuncList,
  ShowBtnDialog,
  ClearBtnDialog,
  ClearDialogValidate,
  ShowDialogValidate,
  ShowDataDeparerment,
  ToggleDataDeparerment,
  ClearDataDeparerment,
  ShowCloseDialog,
  ClearCloseDialog
};
