<template>
  <!-- FORM -->
  <div
    class="overlay"
    v-on:keydown="clearValidate"
    v-on:keyup.ctrl.shift.s = "btnSaveAndAddEmployee"
    @click="clearValidate"
  >
    <div class="form-container">
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
          <MCheckboxVue style="margin-top: 4px"></MCheckboxVue>Là khách hàng
        </div>
        <div class="supplier">
          <MCheckboxVue style="margin-top: 4px"></MCheckboxVue> Là nhà cung cấp
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
              <div class="col-5">
                <MInputTextVue
                  v-model="employee.employeeCode"
                  type="text"
                  tabindex="1"
                  class="text-form"
                  :class="[isActiveCode ? 'bd-red' : '']"
                  id="employeeCode"
                ></MInputTextVue>
              </div>
              <div class="col-7 p-relative"
                :class="[isActive ? 'tags-error' :'']"
                :data-gloss="errorFullName">
                <MInputTextVue
                  v-model="employee.fullName"
                  tabindex="2"
                  class="text-form"
                  :class="[isActive ? 'bd-red' : '']"
                ></MInputTextVue>
              </div>
            </div>
            <div class="col-12 row-g label-text">
              Đơn vị <span style="color: red">*</span>
            </div>
            <div class="col-12"
            :class="[isActive ? 'tags-error-department' :'']"
            :data-gloss="errorDepartment"
            >
              <MComboboxVue
                id="cbxDepartment"
                propName="departmentName"
                propValue="departmentId"
                v-model="employee.departmentId"
                tabindex="3"
                :class="[isActiveDepartment ? 'bd-red tags-error' : '']"
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
              <!-- <MInputMoneyVue
                class="text-form"
                type="text"
                tabindex="4"
                v-model="salary"
              >
              </MInputMoneyVue> -->
            </div>
          </div>
          <div class="form-control-right">
            <div class="row col-g label-text">
              <div class="col-5">Ngày sinh</div>
              <div class="col-7">Giới tính</div>
            </div>
            <div class="row col-g">
              <div class="col-5">
                <MInputTextVue
                  v-model="employee.dateOfBirth"
                  type="date"
                  tabindex="5"
                  class="text-form"
                  :maxDate="maxDateInput"
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
              <div class="col-7">
                <MInputTextVue
                  tabindex="7"
                  class="text-form"
                  v-model="employee.identityNumber"
                ></MInputTextVue>
              </div>
              <div class="col-5">
                <MInputTextVue
                  type="date"
                  tabindex="8"
                  class="text-form"
                  v-model="employee.identityDate"
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
                <div class="col-6">
                  <MInputTextVue
                    class="text-form"
                    v-model="employee.phoneNumber"
                    tabindex="11"
                  ></MInputTextVue>
                </div>
                <div class="col-6">
                  <MInputTextVue
                    v-model="employee.landlineNumber"
                    tabindex="12"
                    class="text-form"
                  ></MInputTextVue>
                </div>
              </div>
            </div>
            <div class="form-control-right">
              <div class="row col-g row-g label-text">
                <div class="col-6">Email</div>
              </div>
              <div class="row col-g">
                <div class="col-6">
                  <MInputTextVue
                    v-model="employee.email"
                    tabindex="13"
                    class="text-form"
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
          ></MButtonVue>
        </div>
        <div class="form-footer-right">
          <MButtonVue
            label="Cất"
            @click="btnSaveEmployee"
            class="btn-save"
            tabindex="17"
          ></MButtonVue>
          <MButtonVue
            label="Cất và Thêm"
            @click="btnSaveAndAddEmployee"
            class="btn"
            tabindex="18"
          ></MButtonVue>
        </div>
      </div>
    </div>
    <!-- DIALOG -->
    <MDialogVue
      v-if="diy.state.showDialog"
      label="Dữ liệu đã thay đổi. Bạn có muốn cất không"
      classIcon="icondelete"
      @EditEPL="btnSaveEmployee"
    ></MDialogVue>
    <MDialogVue
      v-if="diy.state.showDialogValidate"
      :label="lableValidateDepartment"
      classIcon="warning"
    ></MDialogVue>
  </div>
</template>
<script>
import employeeApi from "@/api/employeeApi";
export default {
  inject: ["diy"],
  name: "EmployeeDatail",
  props: ["id", "funcCallBack", "reFreshEmplpoyee"],
  components: {},
  created() {
    if (this.id == null) {
      this.employee = {};
    } else {
      this.getEmployeeByID();
    }
    // Chọn giới tính theo phần tử chọn
    this.getGender();
    if (this.id) {
      this.employee.employeeCode = this.id;
    } else {
      this.setEmployeeCode();
    }

    this.employeeID = this.id;
  },
  methods: {
    /**
     * Sự kiện thêm
     * CreatedBy: Bien (4/1/2023)
     */
    btnSaveAndAddEmployee() {
      this.validateEmployee();
      if (
        this.employee.fullName &&
        this.employee.employeeCode &&
        this.employee.departmentId
      ) {
        this.editEmployee(this.id);
      }
    },

    /**
     * Hàm sửa employee
     * CreatedBy: Bien (10/1/2023)
     */
    btnSaveEmployee() {
      // Kiểm tra dữ liệu đầu vào
      this.validateEmployee();

      if (
        this.employee.fullName &&
        this.employee.employeeCode &&
        this.employee.departmentId
      ) {
        this.editEmployee(this.id);
        this.diy.clearEPLDetail();
      }
    },

    /**
     *  Hàm thêm dữ liệu
     * CreatedBy: Bien(10/1/2023)
     */
    async editEmployee(idE) {
      try {
        this.setGenderName();

        if (idE != null) {
          // Nhận dữ liệu sau khi sửa nhân viên
          const response = await employeeApi.updateEmp(idE, this.employee);

          console.log("Posting data", response);

          this.$parent.clickCallback(this.$parent.indexPage);
          this.setEmployeeCode();
          this.employee = {};
          this.$parent.employeeIDUpdate = null;
        } else {
          // Nhận dữ liệu sau khi thêm nhân viên
          const response = await employeeApi.createEmp(this.employee);

          console.log("Posting data", response);

          this.$parent.textSearch = null;
          this.$parent.clickCallback(1);
          this.setEmployeeCode();
          this.employee = {};
          this.diy.showNotify();
        }
      } catch (error) {
        this.diy.showNotifyError();

        console.log(error);
        this.$parent.labelEmployeeCodeDuplicate = `Mã nhân viên ${this.employee.employeeCode} đã tồn tại`;
      }
    },

    /**
     * Loại bỏ valide và set phím tắt cho form EmployeeDetail
     * CreatedBy: Bien (5/1/2023)
     */
    clearValidate(event) {
      if (this.employee.fullName != null) {
        this.isActive = false;
      }
      if (this.employee.employeeCode != null) {
        this.isActiveCode = false;
      }
      if (this.employee.departmentId != null) {
        this.isActiveDepartment = false;
      }

      const keyCode = event.keyCode;

      switch (keyCode) {
        case this.$MISAEnum.KEY_CODE.ESC:
          this.btnCloseOnClickIcon();
          break;
        default:
          break;
      }
    },

    /**
     * Hàm validate employeeCode
     * CreatedBy: Bien (10/1/2023)
     */
    validateEmployee() {
      if (!this.employee.employeeCode) {
        this.isActiveCode = true;
        
        // Gắn giá trị cho label dialog
        this.lableValidateDepartment = this.$MISAResource.ERRORVALIDATE.ErrorEmployeeCode;
    
        // Ẩn nút trong dialog khi tên để trống
        this.diy.ClearBtnDialog();

        // Hiển thị dialog khi tên để trống
        this.diy.ShowDialogValidate();
      }

      if (!this.employee.fullName) {
        this.isActive = true;

        // Gắn giá trị cho label dialog
        this.lableValidateDepartment =
          this.$MISAResource.ERRORVALIDATE.ErrorFullName;

        this.errorFullName = this.$MISAResource.ERRORVALIDATE.ErrorFullName;
        // Gắn giá trị cho biến kiểm tra tên trống
        this.isValidateName = true;

        // Ẩn nút trong dialog khi tên để trống
        this.diy.ClearBtnDialog();

        // Hiển thị dialog khi tên để trống
        this.diy.ShowDialogValidate();
      } else {
        // Gắn giá trị cho biến kiểm tra tên trống
        this.isValidateName = false;
      }

      if (!this.employee.departmentId) {
        this.isActiveDepartment = true;

        if (this.isValidateName) {
          // Gắn giá trị cho label dialog
          this.lableValidateDepartment =
            this.$MISAResource.ERRORVALIDATE.ErrorFullName;

            this.errorDepartment = this.$MISAResource.ERRORVALIDATE.ErrorDepartment;
        } else {
          // Gắn giá trị cho label dialog
          this.lableValidateDepartment =
            this.$MISAResource.ERRORVALIDATE.ErrorDepartment;
        }
        // Ẩn nút trong dialog khi tên để trống
        this.diy.ClearBtnDialog();

        // Hiển thị dialog khi tên để trống
        this.diy.ShowDialogValidate();
      }
    },

    /**
     * Hàm gắn giá trị cho tên giới tính
     * CreatedBy: Bien (15/1/2023)
     */
    setGenderName() {
      switch (this.employee.gender) {
        case this.$MISAEnum.GENDER.MALE:
          this.employee.genderName = "Nam";
          break;
        case this.$MISAEnum.GENDER.FEMALE:
          this.employee.genderName = "Nữ";
          break;
        case this.$MISAEnum.GENDER.ORTHER:
          this.employee.genderName = "Chưa xác định";
          break;
        default:
          this.employee.genderName = "Nam";
          break;
      }
    },

    /**
     * Hàm gắn giá trị cho employeeDetail theo id
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
      }
    },

    /**
     * Hàm set giá trị mặc định cho employeeCode
     * CreateBy: Bien (11/1/2023)
     */
    async setEmployeeCode() {
      // Nhận dữ liệu sau khi tao ma
      const response = await employeeApi.getEmpNewCode();

      this.employee.employeeCode = response.EmployeeCode;
      this.employee.employeeIndex = response.EmployeeIndex;
    },

    /**
     * Hàm POST lên Api
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
     * Hàm lấy giá trị giới tính khi dbclick
     * CreatedBy: Bien (10/1/2023)
     */
    async getGender() {
      // Nhận dữ liệu sau khi lấy nhân viên theo id
      const response = await employeeApi.getEmpById(this.id);
      this.employees = response.data;
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
    },

    /**
     * Sự kiện hiển thị dialog khi click nút close
     * CreatedBy: Bien (9/1/2023)
     */
    btnCloseOnClickIcon() {
      this.diy.showDialog();

      this.diy.ShowBtnDialog();

      this.diy.ClearCloseDialog();
    },
  },
  watch: {
    salary: function (newValue) {
      var me = this;
      me.salary = newValue;
      console.log("Tiền đã thay đổi:", newValue);
    },
  },
  data() {
    return {
      // Khai báo biến nhận giá trị lỗi department
      errorDepartment: null,

      // Khai báo biến nhận giá trị lỗi FullName
      errorFullName : null,

      // Khai báo biến max thời gian
      maxDateInput: this.$MISACommon.formatDateReverse(Date.now()),

      // Khai báo biến salary
      salary: null,

      // Khai báo một đối tượng employee
      employee: {},

      // Khai báo biến hiển thị label dialog đơn vị không được để trống
      lableValidateDepartment: null,

      // Khai báo biến hiển thị label dialog tên để trống
      isLabelValide: true,

      // Khai báo biến kiểm tra tên để trống
      isValidateName: null,

      // Khai báo biến isActive
      isActiveCode: false,

      // Khai báo biến isActive
      isActive: false,

      // Khai báo biến bắt lỗi để trống department
      isActiveDepartment: false,

      // Khai báo biến boder
      // 'bd-red': "bd-red",

      // Khai báo biến checked gender
      isCheckedGender: null,

      // Khai báo biến nhân id
      employeeID: null,
    };
  },
};
</script>
<style scoped>
@import url(./employee.css);
</style>
