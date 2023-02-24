<template>
  <!-- FORM -->
  <div class="overlay">
    <div
      class="form-container"
      v-on:keydown.esc="btnCloseOnClickIcon"
      v-on:keydown.tab="clearValidate"
      v-on:keyup.ctrl.shift.s.prevent="btnSaveAndAddEmployee"
      v-on:keydown.alt.s.prevent="btnSaveEmployee"
      @click="clearValidate"
    >
      <div class="form-header">
        <div class="icon help tags" data-gloss="Help (F1)"></div>
        <div
          @click="btnCloseOnClickIcon"
          class="icon close-form tags"
          data-gloss="Đóng (ESC)"
          id="close-form-icon"
        ></div>
        <div class="form-title">Thông tin nhân viên</div>
        <div class="client">
          <MCheckboxVue
            v-model="isCustomer"
            style="margin-top: 4px"
          ></MCheckboxVue
          >Là khách hàng
        </div>
        <div class="supplier">
          <MCheckboxVue
            v-model="isSupplier"
            style="margin-top: 4px"
          ></MCheckboxVue>
          Là nhà cung cấp
        </div>
      </div>
      <div class="form-control">
        <div class="form-control-top">
          <div class="form-control-left">
            <div class="row col-g label-text">
              <div class="col-5">Mã <span style="color: red">*</span></div>
              <div class="col-7">Tên <span style="color: red">*</span></div>
            </div>
            <div class="row col-g p-relative">
              <div class="col-5"
              :class="{ 'tags-error': validateList[`EmployeeCode`].isStatus }"
              :data-gloss="validateList[`EmployeeCode`].labelValidate"
              >
                <MInputTextVue
                  v-model="employee.employeeCode"
                  type="text"
                  tabindex="1"
                  class="text-form"
                  id="employeeCode"
                  :ref="inputEmployeeCode"
                  :name="inputEmployeeCode"
                  :class="{ 'bd-red': validateList[`EmployeeCode`].isStatus }"
                ></MInputTextVue>
              </div>
              <div
                class="col-7 p-relative"
                :class="{ 'tags-error': validateList[`FullName`].isStatus }"
                :data-gloss="validateList[`FullName`].labelValidate"
              >
                <MInputTextVue
                  v-model="employee.fullName"
                  tabindex="2"
                  class="text-form"
                  :class="{ 'bd-red': validateList[`FullName`].isStatus }"
                ></MInputTextVue>
              </div>
            </div>
            <div class="col-12 row-g label-text">
              Đơn vị <span style="color: red">*</span>
            </div>
            <div
              class="col-12"
              :class="{
                'tags-error-department': isActiveDepartment,
              }"
              :data-gloss="errorDepartment"
            >
              <MComboboxVue
                id="cbxDepartment"
                propName="departmentName"
                propValue="departmentId"
                v-model="employee.departmentId"
                tabindex="3"
                :class="{ 'bd-red tags-error': isActiveDepartment }"
              ></MComboboxVue>
            </div>
            <div class="col-12 row-g label-text">Chức danh</div>
            <div class="col-12 col-g">
              <MInputTextVue
                type="text"
                tabindex="4"
                class="text-form"
                v-model="employee.position"
              ></MInputTextVue>
            </div>
          </div>
          <div class="form-control-right">
            <div class="row col-g label-text">
              <div class="col-5">Ngày sinh</div>
              <div class="col-7">Giới tính</div>
            </div>
            <div class="row col-g">
              <div
                class="col-5"
              >
                <MInputTextVue
                  v-model="employee.dateOfBirth"
                  type="date"
                  tabindex="5"
                  class="text-form"
                  placeholder="dd/mm/yyyy"
                  :maxDate="maxDateInput"
                  :class="{
                    'text-gray': !employee.dateOfBirth,
                    'bd-red': validateList[`DateOfBirth`].labelValidate,
                  }"
                ></MInputTextVue>
              </div>
              <div class="col-7 row">
                <div
                  class="row col-g1"
                  style="padding-top: 10px; font-size: 14px"
                  @click="setGender"
                >
                  <input
                    value="0"
                    class="input-radio"
                    type="radio"
                    id="male"
                    tabindex="6"
                    name="GenderName"
                    checked
                  />Nam
                  <input
                    value="1"
                    class="input-radio"
                    type="radio"
                    id="female"
                    name="GenderName"
                  />Nữ
                  <input
                    value="2"
                    class="input-radio"
                    type="radio"
                    id="orther"
                    name="GenderName"
                  />Khác
                </div>
              </div>
            </div>
            <div class="row col-g row-g label-text">
              <div class="col-7" title="Chứng minh nhân dân">Số CMND</div>
              <div class="col-5">Ngày cấp</div>
            </div>
            <div class="row col-g">
              <div
                class="col-7"
              >
                <MInputTextVue
                  tabindex="7"
                  class="text-form"
                  v-model="employee.identityNumber"
                  :class="{ 'bd-red': validateList[`IdentityNumber`].isStatus }"
                ></MInputTextVue>
              </div>
              <div
                class="col-5"
              >
                <MInputTextVue
                  type="date"
                  tabindex="8"
                  class="text-form"
                  v-model="employee.identityDate"
                  :maxDate="maxDateInput"
                  :class="{
                    'text-gray': !employee.identityDate,
                    'bd-red': validateList[`IdentityDate`].isStatus,
                  }"
                ></MInputTextVue>
              </div>
            </div>
            <div class="col-12 row-g label-text">Nơi cấp</div>
            <div class="col-12 col-g">
              <MInputTextVue
                tabindex="9"
                class="text-form"
                v-model="employee.identityPlace"
              ></MInputTextVue>
            </div>
          </div>
        </div>
        <div class="form-control-bottom">
          <div class="col-12 row-g label-text">Địa chỉ</div>
          <div class="col-12 col-g">
            <MInputTextVue
              class="text-form"
              v-model="employee.address"
              tabindex="10"
            ></MInputTextVue>
          </div>
          <div class="col-12 row col-g">
            <!-- S -->
            <div class="form-control-left">
              <div class="row col-g row-g label-text">
                <div title="Điện thoại di động" class="col-6">ĐT di động</div>
                <div title="Điện thoại cố định" class="col-6">ĐT cố định</div>
              </div>
              <div class="row col-g">
                <div
                  class="col-6">
                  <MInputTextVue
                    class="text-form"
                    v-model="employee.phoneNumber"
                    tabindex="11"
                    :class="{ 'bd-red': validateList[`PhoneNumber`].isStatus }"
                  ></MInputTextVue>
                </div>
                <div
                  class="col-6">
                  <MInputTextVue
                    v-model="employee.landlineNumber"
                    tabindex="12"
                    class="text-form"
                    :class="{
                      'bd-red': validateList[`LandlineNumber`].isStatus,
                    }"
                  ></MInputTextVue>
                </div>
              </div>
            </div>
            <div class="form-control-right">
              <div class="row col-g row-g label-text">
                <div class="col-6">Email</div>
              </div>
              <div class="row col-g">
                <div
                  class="col-6">
                  <MInputTextVue
                    v-model="employee.email"
                    tabindex="13"
                    class="text-form"
                    :class="{ 'bd-red': validateList[`Email`].isStatus }"
                  ></MInputTextVue>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 row col-g">
            <div class="form-control-left">
              <div class="row col-g row-g label-text">
                <div class="col-6">Tài khoản ngân hàng</div>
                <div class="col-6">Tên ngân hàng</div>
              </div>
              <div class="row col-g">
                <div class="col-6">
                  <MInputTextVue
                    tabindex="14"
                    class="text-form"
                    v-model="employee.bankAccount"
                  ></MInputTextVue>
                </div>
                <div class="col-6">
                  <MInputTextVue
                    tabindex="15"
                    class="text-form"
                    v-model="employee.bankName"
                  ></MInputTextVue>
                </div>
              </div>
            </div>
            <div class="form-control-right">
              <div class="col-6 row-g label-text">Chi nhánh</div>
              <div class="col-6">
                <MInputTextVue
                  v-model="employee.bankBranch"
                  tabindex="16"
                  class="text-form"
                ></MInputTextVue>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-footer">
        <div class="form-footer-left">
          <MButtonVue
            label="Hủy"
            class="btn-cancel"
            @click="btnCloseOnClick"
            tabindex="19"
            v-on:keydown.tab.prevent="inputOnFocus"
          ></MButtonVue>
        </div>
        <div class="form-footer-right">
          <MButtonVue
            label="Cất"
            @click="btnSaveEmployee"
            class="btn-save tags-save"
            tabindex="17"
            data-gloss="Ctrl + s"
          ></MButtonVue>
          <MButtonVue
            label="Cất và Thêm"
            @click="btnSaveAndAddEmployee"
            class="btn tags-save-add"
            tabindex="18"
            data-gloss="Ctrl + Shift + s"
          ></MButtonVue>
        </div>
      </div>
    </div>
    <!-- DIALOG -->
    <MDialogVue
      v-if="diy.state.showDialog"
      :label="this.$MISAResource.CONTENTDIALOG.SAVE"
      classIcon="icondelete"
      @EditEPL="btnSaveEmployee"
    ></MDialogVue>
    <MDialogVue
      v-if="diy.state.showDialogValidate"
      :label="labelValidate"
      classIcon="warning"
    ></MDialogVue>
  </div>
</template>
<script>
import employeeApi from "@/api/employeeApi";
export default {
  inject: ["diy"],
  name: "EmployeeDetail",
  props: [
    "id",
    "duplicateEmployeeCode",
    "duplicateEmployeeIndex",
  ],
  components: {},
  created() {
    if (this.id) {
      this.getEmployeeByID();
    } else {
      this.employee = {};
      this.setEmployeeCode();
    }
  },
  mounted() {
    this.$refs[this.inputEmployeeCode].onFocus();
  },
  methods: {
    /**
     * Hàm focus cho input EmployeeCode
     * CreatedBy: Bien (22/02/2023)
     */
    inputOnFocus() {
      this.$refs[this.inputEmployeeCode].onFocus();
    },
    /**
     * Hàm thực hiện sự kiện khi nhấn nút cất và thêm
     * CreatedBy: Bien (4/1/2023)
     */
    btnSaveAndAddEmployee() {
      this.validateEmployee();
      this.isSaveEmployee = false;
      if (
        this.employee.employeeCode &&
        this.employee.fullName &&
        this.employee.departmentId
      ) {
        this.saveEmployee(this.id);
      }
    },

    /**
     * Hàm thực hiện sự kiện khi nhấn nút cất
     * CreatedBy: Bien (10/1/2023)
     */
    btnSaveEmployee() {
      // Kiểm tra dữ liệu đầu vào
      this.validateEmployee();
      this.isSaveEmployee = true;
      if (
        this.employee.employeeCode &&
        this.employee.fullName &&
        this.employee.departmentId
      ) {
        this.saveEmployee(this.id);
      }
    },
    /**
     * Hàm xử lí thêm mới nhân viên
     * CreatedBy: Bien (21/02/2023)
     */
    async createEmployee() {
      // Nhận dữ liệu sau khi thêm nhân viên
      const response = await employeeApi.createEmp(this.employee);

      console.log("Posting data", response);

      if (response.errorCode == this.$MISAEnum.ERRORCODE.SUCCESS) {
        this.diy.showNotify();

        this.$parent.textSearch = "";
        this.$parent.clickCallback(1);
        this.setEmployeeCode();
        this.employee = {};
        // Thực hiện khi click nút cất
        if (this.isSaveEmployee) {
          this.diy.clearEPLDetail();
        }
        this.$parent.duplicateEmployeeCode = null;
      } else {
        switch (response.response.status) {
          case this.$MISAEnum.STATUSCODE.INSERT:
            break;
          case this.$MISAEnum.STATUSCODE.BADREQUEST:
            var moreInfo = response.response.data.moreInfo;
            if (
              response.response.data.errorCode ==
              this.$MISAEnum.ERRORCODE.VALIDATERROR
            ) {
              this.errorValidate(moreInfo[0].value);
              moreInfo.forEach((item) => {
                this.validateList[`${item.key}`].labelValidate = item.value;
                this.validateList[`${item.key}`].isStatus = true;
              });
            }
            break;
          case this.$MISAEnum.STATUSCODE.INTERNALSERVER:
            this.errorValidate(
              this.$MISAResource.ERRORVALIDATE.ERRORDEPARTMENT
            );
            break;
          default:
            break;
        }
      }
    },

    /**
     * Hàm xử lí sửa thông tin nhân viên
     * CreatedBy: Bien (21/02/2023)
     */
    async updateEmployee(employeeId, employee) {
      // Nhận dữ liệu sau khi sửa nhân viên
      const response = await employeeApi.updateEmp(employeeId, employee);
      console.log("Posting data", response);

      if (response.errorCode == this.$MISAEnum.ERRORCODE.SUCCESS) {
        this.$parent.clickCallback(this.$parent.indexPage);
        this.employee = {};
        this.$parent.employeeIDUpdate = null;
        this.setEmployeeCode();

        // Thực hiện khi click nút cất
        if (this.isSaveEmployee) {
          this.diy.clearEPLDetail();
        }
      } else {
        switch (response.response.status) {
          case this.$MISAEnum.STATUSCODE.INSERT:
            break;
          case this.$MISAEnum.STATUSCODE.BADREQUEST:
            var moreInfo = response.response.data.moreInfo;
            if (
              response.response.data.errorCode ==
              this.$MISAEnum.ERRORCODE.VALIDATERROR
            ) {
              this.errorValidate(moreInfo.value);
              moreInfo.forEach((item) => {
                this.validateList[`${item.key}`].labelValidate = item.value;
                this.validateList[`${item.key}`].isStatus = true;
              });
            }
            break;
          case this.$MISAEnum.STATUSCODE.INTERNALSERVER:
            this.errorValidate(
              this.$MISAResource.ERRORVALIDATE.ERRORDEPARTMENT
            );
            break;
          default:
            break;
        }
      }
    },

    /**
     *  Hàm thực hiện lưu nhân viên
     * CreatedBy: Bien(10/1/2023)
     */
    saveEmployee(employeeId) {
      try {
        // Kiểm id nhân viên có tồn tại hay không để biết nhiệm vụ là thêm hay sửa
        if (employeeId != null) {
          // Kiểm tra xem có phải chắc năng nhân bản hay không
          if (!this.duplicateEmployeeCode) {
            this.updateEmployee(employeeId, this.employee);
          } else {
            this.createEmployee();
          }
        } else {
          this.createEmployee();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm thông báo lỗi trùng mã nhân viên
     * CreatedBy: Bien (21/2/2023)
     */
    errorValidate(messageError) {
      // Gắn giá trị cho label dialog
      this.labelValidate = messageError;

      // Ẩn nút trong dialog khi tên để trống
      this.diy.ClearBtnDialog();

      // Hiển thị dialog khi tên để trống
      this.diy.ShowDialogValidate();
    },
    /**
     * Loại bỏ validate và set phím tắt cho form EmployeeDetail
     * CreatedBy: Bien (5/1/2023)
     */
    clearValidate() {
      if (this.employee.fullName != null) {
        this.validateList[`FullName`].isStatus = false;
      }
      if (this.employee.employeeCode != null) {
        this.validateList[`EmployeeCode`].isStatus = false;
      }
      if (this.employee.departmentId != null) {
        this.isActiveDepartment = false;
      }
      if (this.employee.identityNumber != null) {
        this.validateList[`IdentityNumber`].isStatus = false;
      }
      if (this.employee.phoneNumber != null) {
        this.validateList[`PhoneNumber`].isStatus = false;
      }
      if (this.employee.landlineNumber != null) {
        this.validateList[`LandlineNumber`].isStatus = false;
      }
      if (this.employee.email != null) {
        this.validateList[`Email`].isStatus = false;
      } 
    },

    /**
     * Hàm kiểm tra dữ liệu đầu vào employeeCode
     * CreatedBy: Bien (10/1/2023)
     */
    validateEmployee() {
      if (!this.employee.employeeCode) {
        this.validateList[`EmployeeCode`].isStatus = true;

        // Gắn giá trị cho label dialog
        this.validateList[`EmployeeCode`].labelValidate = this.$MISAResource.ERRORVALIDATE.EMPLOYEECODE;

        this.errorValidate(this.validateList[`EmployeeCode`].labelValidate);

        // Ẩn nút trong dialog khi mã để trống
        this.diy.ClearBtnDialog();

        // Hiển thị dialog khi mã để trống
        this.diy.ShowDialogValidate();
      }

      if (!this.employee.fullName) {
        this.validateList[`FullName`].isStatus = true;

        this.validateList[`FullName`].labelValidate =
          this.$MISAResource.ERRORVALIDATE.FULLNAME;

        this.errorValidate(this.validateList[`FullName`].labelValidate);

        // Ẩn nút trong dialog khi tên để trống
        this.diy.ClearBtnDialog();

        // Hiển thị dialog khi tên để trống
        this.diy.ShowDialogValidate();
      }

      if (!this.employee.departmentId) {
        this.isActiveDepartment = true;

        this.errorDepartment = this.$MISAResource.ERRORVALIDATE.DEPARTMENT;

        // Ẩn nút trong dialog khi tên để trống
        this.diy.ClearBtnDialog();

        // Hiển thị dialog khi tên để trống
        this.diy.ShowDialogValidate();
        if (!this.employee.fullName) {
          this.errorValidate(this.validateList[`FullName`].labelValidate);
        } else {
          this.errorValidate(this.errorDepartment);
        }
      }
    },
    /**
     * Hàm gắn giá trị cho form employeeDetail theo id nhân viên
     * CreatedBy: Bien (11/1/2023)
     */
    async getEmployeeByID() {
      if (this.id) {
        // Nhận dữ liệu sau khi lấy nhân viên theo id
        const response = await employeeApi.getEmpById(this.id);

        console.log(response);

        this.employee = response.data;
        this.employee.dateOfBirth = this.$MISACommon.formatDateReverse(
          this.employee.dateOfBirth
        );
        this.employee.identityDate = this.$MISACommon.formatDateReverse(
          this.employee.identityDate
        );
        // Chọn giới tính theo phần tử chọn
        this.getGender();
      }
      if (this.duplicateEmployeeCode) {
        this.employee.employeeCode = this.duplicateEmployeeCode;
        this.employee.employeeIndex = this.duplicateEmployeeIndex;
      }
    },

    /**
     * Hàm set giá trị mặc định cho employeeCode
     * CreateBy: Bien (11/1/2023)
     */
    async setEmployeeCode() {
      // Nhận dữ liệu mã nhân viên mới
      const response = await employeeApi.getEmpNewCode();

      this.employee.employeeCode = response.EmployeeCode;
      this.employee.employeeIndex = response.EmployeeIndex;
    },

    /**
     * Hàm gắn giá trị cho giới tính nhân viên khi chọn trong form EmployeeDeatail
     * CreatedBy: Bien (8/1/2023)
     */
    setGender() {
      let listGender = document.querySelectorAll("input[name='GenderName']");
      let findSelected = () => {
        let selected = document.querySelector(
          "input[name='GenderName']:checked"
        ).value;
        if (selected == this.$MISAEnum.GENDER.MALE) {
          this.employee.gender = this.$MISAEnum.GENDER.MALE;
        } else if (selected == this.$MISAEnum.GENDER.FEMALE) {
          this.employee.gender = this.$MISAEnum.GENDER.FEMALE;
        } else {
          this.employee.gender = this.$MISAEnum.GENDER.ORTHER;
        }
      };
      listGender.forEach((radioBtn) => {
        radioBtn.addEventListener("change", findSelected);
      });
    },

    /**
     * Hàm checked input[Radio] tương ứng với giới tính khi hiển thị form EmployeeDetail
     * CreatedBy: Bien (10/1/2023)
     */
    getGender() {
      if (this.employee.gender == this.$MISAEnum.GENDER.MALE) {
        document.getElementById("male").checked = true;
      } else if (this.employee.gender == this.$MISAEnum.GENDER.FEMALE) {
        document.getElementById("female").checked = true;
      } else if (this.employee.gender == this.$MISAEnum.GENDER.ORTHER) {
        document.getElementById("orther").checked = true;
      }
    },

    /**
     * Sự kiện đóng form EmployeeDetail
     * CreatedBy: Bien (4/1/2023)
     */
    btnCloseOnClick() {
      this.diy.clearEPLDetail();
      this.diy.showEPLDetail();
    },

    /**
     * Sự kiện hiển thị dialog khi click icon X
     * CreatedBy: Bien (9/1/2023)
     */
    btnCloseOnClickIcon() {
      this.diy.showDialog();
      this.diy.ShowBtnDialog();
      this.diy.ClearCloseDialog();
      this.diy.showBtnCancel();
    },
  },
  watch: {
    /**
     * Hàm lắng nghe sự đổi của input tiền
     * @param {Gía trị mới của tiền} newValue
     */
    salary: function (newValue) {
      var me = this;
      me.salary = newValue;
      console.log("Tiền đã thay đổi:", newValue);
    },
  },
  data() {
    return {
      // Khai báo biến nhập giá trị check là khách hàng
      isCustomer: false,

      // Khai báo biến nhập giá trị check là nhà cung cấp
      isSupplier: false,

      // Khai báo biến gắn giá trị cho input EmployeeCode
      inputEmployeeCode: "inputEmployeeCode",

      // Khai báo biến nhận giá trị lỗi validate
      validateList: {
        EmployeeCode: {
          labelValidate: null,
          isStatus: false,
        },
        FullName: {
          labelValidate: null,
          isStatus: false,
        },
        DepartmentId: {
          labelValidate: null,
          isStatus: false,
        },
        DateOfBirth: {
          labelValidate: null,
          isStatus: false,
        },
        IdentityDate: {
          labelValidate: null,
          isStatus: false,
        },
        LandlineNumber: {
          labelValidate: null,
          isStatus: false,
        },
        PhoneNumber: {
          labelValidate: null,
          isStatus: false,
        },
        Email: {
          labelValidate: null,
          isStatus: false,
        },
        IdentityNumber: {
          labelValidate: null,
          isStatus: false,
        },
      },

      // Khai báo biến nhận giá trị lỗi department
      errorDepartment: null,

      // Khai báo biến max thời gian
      maxDateInput: this.$MISACommon.formatDateReverse(Date.now()),

      // Khai báo biến salary
      salary: null,

      // Khai báo một đối tượng employee
      employee: {},

      // Khai báo biến hiển thị label dialog đơn vị không được để trống
      labelValidate: null,

      // Khai báo biến bắt lỗi để trống department
      isActiveDepartment: null,

      // Khai báo biến checked gender
      isCheckedGender: null,

      // Khai báo biến nhân id
      employeeID: null,

      // Khai báo biến thể thiện thực hiện hành động cất
      isSaveEmployee: false,
    };
  },
};
</script>
<style scoped>
@import url(./employee.css);
</style>
