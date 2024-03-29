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
  showDataDeparerment:false,
  showCloseDialog:true,
  showNotifyError:false,
  showFunctionAll:false,
  showDialogDeleteEmployees:false,
  showBtnCancel:false,
  showDialogDevelop:false,
  showPageSize:false,
});
/**
 * Hàm show dropdown chọn số bản ghi
 * CreatedBy: Bien (20/1/2023)
 */
const togglePageSize = function(){
  state.showPageSize = !state.showPageSize;
}
/**
 * Hàm ẩn dropdown chọn số bản ghi
 * CreatedBy: Bien (20/1/2023)
 */
const clearPageSize = function(){
  state.showPageSize = false;
}
/**
 * Hàm show dialog tính năng đang phát triển
 * CreatedBy: Bien (20/1/2023)
 */
const showDialogDevelop = function(){
  state.showDialogDevelop = true;
}
/**
 * Hàm ẩn dialog khi sai validate dữ liệu
 * CreatedBy: Bien (20/1/2023)
 */
const clearDialogDevelop = function(){
  state.showDialogDevelop = false;
}
/**
 * Hàm hiển thị nút hủy
 * CreatedBy: Bien (18/2/2023)
 */
 const showBtnCancel = function(){
  state.showBtnCancel = true;
}

/**
 * Hàm ẩn nút hủy
 * CreatedBy: Bien (18/2/2023)
 */
const clearBtnCancel = function(){
  state.showBtnCancel = false;
}
/**
 * Hàm hiển thị thao tác thực hiên hàng loạt
 * CreatedBy: Bien (18/2/2023)
 */
const toggleFunctionAll = function(){
  state.showFunctionAll = !state.showFunctionAll;
}
/**
 * Hàm hiển thị thao tác thực hiên hàng loạt
 * CreatedBy: Bien (18/2/2023)
 */
const showFunctionAll = function(){
  state.showFunctionAll = true;
}

/**
 * Hàm ẩn thị thao tác thực hiên hàng loạt
 * CreatedBy: Bien (18/2/2023)
 */
const clearFunctionAll = function(){
  state.showFunctionAll = false;
}

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
const toggleDataDeparerment= function(){
  state.showDataDeparerment = !state.showDataDeparerment;
};

/**
 * Hàm hiển thị danh sách đơn vị
 * CreatedBy: Bien (20/1/2023)
 */
const showDataDeparerment= function(){
  state.showDataDeparerment = true;
};

/**
 * Hàm ẩn danh sách đơn vị
 * CreatedBy: Bien (20/1/2023)
 */
const clearDataDeparerment= function(){
  state.showDataDeparerment = false;
};
/**
 * Hàm show dialog khi sai validate dữ liệu
 * CreatedBy: Bien (20/1/2023)
 */
const showDialogValidate = function(){
  state.showDialogValidate = true;
}
/**
 * Hàm ẩn dialog khi sai validate dữ liệu
 * CreatedBy: Bien (20/1/2023)
 */
const clearDialogValidate = function(){
  state.showDialogValidate = false;
}
/**
 * Hàm ẩn show nút trong dialog khi sai validate dữ liệu
 * CreatedBy: Bien (20/1/2023)
 */
const ShowBtnDialog = function(){
  state.showBtnDialog = true;
};
/**
 * Hàm ẩn nút trong dialog khi sai validate dữ liệu
 * CreatedBy: Bien (20/1/2023)
 */
const ClearBtnDialog = function(){
  state.showBtnDialog = false;
};
/**
 * Hàm hiển thị danh sách chức năng
 * CreatedBy: Bien (15/1/2023)
 */
const showFuncList= function(){
    state.showFuncList = !state.showFuncList;
};
/**
 * Hàm ẩn danh sách chức năng
 * CreatedBy: Bien (15/1/2023)
 */
 const clearFuncList= function(){
  state.showFuncList = false;
};

/**
 * Hàm hiển thị EmployeeDetail
 * CreatedBy: Bien (4/1/2023)
 */
const showEPLDetail = function () {
  state.showEPLDetail = true;
  state.showDialog = false;
};

/**
 * Hàm ẩn EmployeeDetail
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
 * Hàm hiển thị Dialog xóa nhiều
 * CreatedBy: Bien (4/1/2023)
 */
const showDialogDeleteEmployees = function () {
  state.showDialogDeleteEmployees = true;
};

/**
 * Hàm ẩn Dialog xóa nhiều
 * CreatedBy: Bien (4/1/2023)
 */
const clearDialogDeleteEmployees = function () {
  state.showDialogDeleteEmployees = false;
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
 * Hàm hiển thị thông báo
 * CreatedBy: Bien (4/1/2023)
 */
const showNotifyError = function () {
  state.showNotifyError = true;
  setTimeout(() => {
    state.showNotifyError = false;
  }, 2000);
};

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
  showEPLDetail,
  clearEPLDetail,
  showDialog,
  clearDialog,
  showLoading,
  clearLoading,
  showNotify,
  showNavToggle,
  ShowBtnDialog,
  ClearBtnDialog,
  clearDialogValidate,
  showDialogValidate,
  showDataDeparerment,
  toggleDataDeparerment,
  clearDataDeparerment,
  ShowCloseDialog,
  ClearCloseDialog,
  showNotifyError,
  showFunctionAll,
  clearFunctionAll,
  toggleFunctionAll,
  showDialogDeleteEmployees,
  clearDialogDeleteEmployees,
  showBtnCancel,
  clearBtnCancel,
  clearDialogDevelop,
  showDialogDevelop,
  clearPageSize,
  togglePageSize,
  showFuncList,
  clearFuncList
};
