<template>
  <!-- FORM -->
  <div class="overlay">
    <div
      class="form-container"
      v-on:keydown.esc="btnCloseOnClickIcon"
      v-on:keyup.ctrl.shift.s.prevent="btnSaveAndAddEmployee"
    >
      <div class="form-header">
        <div class="icon help"></div>
        <div
          @click="btnCloseOnClickIcon"
          class="icon close-form tags"
          data-gloss="Đóng (ESC)"
          id="close-form-icon"
        ></div>
        <div class="form-title">{{ title }}</div>
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
              <div
                class="col-5"
                :class="{
                  'tags-error-employeecode':
                    validateList[`EmployeeCode`].isStatus,
                }"
                :data-gloss="validateList[`EmployeeCode`].labelValidate"
              >
                <MInputTextVue
                  v-model="employee.employeeCode"
                  type="text"
                  tabindex="1"
                  class="text-form"
                  id="employeeCode"
                  :ref="'EmployeeCode'"
                  :name="'EmployeeCode'"
                  :labelValidate="'Mã'"
                  :regexString="/NV-[0-9]{5,17}\b/"
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
                  :ref="'FullName'"
                  :name="'FullName'"
                  :labelValidate="'Tên'"
                  :class="{ 'bd-red': validateList[`FullName`].isStatus }"
                ></MInputTextVue>
              </div>
            </div>
            <div class="col-12 row-g label-text">
              Đơn vị <span style="color: red">*</span>
            </div>
            <div
              class="col-12 p-relative"
              :class="{
                'tags-error-department': validateList[`Department`].isStatus,
              }"
              :data-gloss="validateList[`Department`].labelValidate"
              v-click-outside-element="onClickOutsideDepartment"
            >
              <MComboboxVue
                id="cbxDepartment"
                propName="departmentName"
                propValue="departmentId"
                v-model="employee.departmentId"
                tabindex="3"
                :ref="'Department'"
                :name="'Department'"
                :labelValidate="'Đơn vị'"
                :class="{
                  'bd-red tags-error': validateList[`Department`].isStatus,
                }"
              ></MComboboxVue>
            </div>
            <div class="col-12 row-g label-text">Chức danh</div>
            <div class="col-12 col-g">
              <MInputTextVue
                type="text"
                tabindex="4"
                class="text-form"
                v-model="employee.position"
                :ref="'Position'"
                :name="'Position'"
              ></MInputTextVue>
            </div>
          </div>
          <div class="form-control-right">
            <div class="row col-g label-text">
              <div class="col-5">Ngày sinh</div>
              <div class="col-7">Giới tính</div>
            </div>
            <div class="row col-g p-relative">
              <div
                class="col-5"
                :class="{
                  'tags-error-date-of-birth':
                    validateList[`DateOfBirth`].isStatus,
                }"
                :data-gloss="validateList[`DateOfBirth`].labelValidate"
              >
                <MInputTextVue
                  v-model="employee.dateOfBirth"
                  type="date"
                  tabindex="5"
                  class="text-form"
                  placeholder="dd/mm/yyyy"
                  :maxDate="maxDateInput"
                  :ref="'DateOfBirth'"
                  :name="'DateOfBirth'"
                  :labelValidate="'Ngày sinh'"
                  :class="{
                    'text-gray': !employee.dateOfBirth,
                    'bd-red': validateList[`DateOfBirth`].isStatus,
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
            <div class="row col-g p-relative">
              <div
                class="col-7"
                :class="{
                  'tags-error-identity-number':
                    validateList[`IdentityNumber`].isStatus,
                }"
                :data-gloss="validateList[`IdentityNumber`].labelValidate"
              >
                <MInputTextVue
                  tabindex="7"
                  class="text-form"
                  v-model="employee.identityNumber"
                  :ref="'IdentityNumber'"
                  :name="'IdentityNumber'"
                  :labelValidate="'Số chứng minh nhân dân'"
                  :regexString="/^([0-9]{12})\b/"
                  :class="{ 'bd-red': validateList[`IdentityNumber`].isStatus }"
                ></MInputTextVue>
              </div>
              <div
                class="col-5"
                :class="{
                  'tags-error-date-identity-date':
                    validateList[`IdentityDate`].isStatus,
                }"
                :data-gloss="validateList[`IdentityDate`].labelValidate"
              >
                <MInputTextVue
                  type="date"
                  tabindex="8"
                  class="text-form"
                  v-model="employee.identityDate"
                  :maxDate="maxDateInput"
                  :ref="'IdentityDate'"
                  :name="'IdentityDate'"
                  :labelValidate="'Ngày cấp'"
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
                :ref="'IdentityPlace'"
                :name="'IdentityPlace'"
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
              :ref="'Address'"
              :name="'Address'"
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
              <div class="row col-g p-relative">
                <div
                  class="col-6"
                  :class="{
                    'tags-error-phone-number':
                      validateList[`PhoneNumber`].isStatus,
                  }"
                  :data-gloss="validateList[`PhoneNumber`].labelValidate"
                >
                  <MInputTextVue
                    class="text-form"
                    v-model="employee.phoneNumber"
                    tabindex="11"
                    :ref="'PhoneNumber'"
                    :name="'PhoneNumber'"
                    :labelValidate="'Điện thoại di động'"
                    :regexString="
                      /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
                    "
                    :class="{ 'bd-red': validateList[`PhoneNumber`].isStatus }"
                  ></MInputTextVue>
                </div>
                <div
                  class="col-6"
                  :class="{
                    'tags-error-landline-number':
                      validateList[`LandlineNumber`].isStatus,
                  }"
                  :data-gloss="validateList[`LandlineNumber`].labelValidate"
                >
                  <MInputTextVue
                    v-model="employee.landlineNumber"
                    tabindex="12"
                    class="text-form"
                    :ref="'LandlineNumber'"
                    :name="'LandlineNumber'"
                    :labelValidate="'Điện thoại cố định'"
                    :regexString="
                      /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
                    "
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
              <div class="row col-g p-relative">
                <div
                  class="col-6"
                  :class="{
                    'tags-error-email': validateList[`Email`].isStatus,
                  }"
                  :data-gloss="validateList[`Email`].labelValidate"
                >
                  <MInputTextVue
                    v-model="employee.email"
                    tabindex="13"
                    class="text-form"
                    :ref="'Email'"
                    :name="'Email'"
                    :labelValidate="'Email'"
                    :regexString="/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/"
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
                    :ref="'BankAccount'"
                    :name="'BankAccount'"
                  ></MInputTextVue>
                </div>
                <div class="col-6">
                  <MInputTextVue
                    tabindex="15"
                    class="text-form"
                    v-model="employee.bankName"
                    :ref="'BankName'"
                    :name="'BankName'"
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
                  :ref="'BankBranch'"
                  :name="'BankBranch'"
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
            v-on:keydown.tab.prevent="inputOnFocus('EmployeeCode')"
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
      :inputValidate="inputValidate"
    ></MDialogVue>
  </div>
</template>
<script>
import employeeApi from "@/api/employeeApi";
export default {
  inject: ["diy"],
  name: "EmployeeDetail",
  props: ["id", "duplicateEmployeeCode", "title"],
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
    this.inputOnFocus("EmployeeCode");
  },
  methods: {
    /**
     * Hàm ẩn danh sách đơn vị khi click ra ngoài
     * CreatedBy: Bien (30/03/2023)
     */
    onClickOutsideDepartment() {
      if (this.diy.state.showEPLDetail) {
        this.diy.clearDataDeparerment();
      }
    },
    /**
     * Hàm focus cho input EmployeeCode
     * CreatedBy: Bien (22/02/2023)
     */
    inputOnFocus(inputName) {
      this.$nextTick(() => {
        this.$refs[inputName].onFocus();
      });
    },
    /**
     * Hàm thực hiện sự kiện khi nhấn nút cất và thêm
     * CreatedBy: Bien (4/1/2023)
     */
    btnSaveAndAddEmployee() {
      try {
        this.validateEmployee();

        this.isSaveEmployee = false;

        if (this.isValidate) {
          this.saveEmployee(this.id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm thực hiện sự kiện khi nhấn nút cất
     * CreatedBy: Bien (10/1/2023)
     */
    btnSaveEmployee() {
      // Kiểm tra dữ liệu đầu vào
      this.validateEmployee();

      // Xác nhận là hành động cất
      this.isSaveEmployee = true;

      if (this.isValidate) {
        this.saveEmployee(this.id);
      }
    },
    /**
     * Hàm xử lí thêm mới nhân viên
     * CreatedBy: Bien (21/02/2023)
     */
    async createEmployee() {
      try {
        // Nhận dữ liệu sau khi thêm nhân viên
        const response = await employeeApi.createEmp(this.employee);

        console.log("Posting data", response);

        if (response.errorCode == this.$MISAEnum.ERRORCODE.SUCCESS) {
          this.$parent.labelInsertValid =
            this.$MISAResource.NOTIFY.ADD("Nhân viên");
          this.diy.showNotify();
          this.$parent.textSearch = "";
          this.$parent.clickCallback(1);
          this.employee = {};
          this.validateList[`isActive`] = false;
          // Thực hiện khi click nút cất
          if (this.isSaveEmployee) {
            this.diy.clearEPLDetail();
          } else {
            this.setEmployeeCode();
            this.inputOnFocus("EmployeeCode");
          }
          this.$parent.duplicateEmployeeCode = null;
        } else {
          this.handleErrorValidate(response);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xử lí sửa thông tin nhân viên
     * CreatedBy: Bien (21/02/2023)
     */
    async updateEmployee(employeeId, employee) {
      try {
        // Nhận dữ liệu sau khi sửa nhân viên
        const response = await employeeApi.updateEmp(employeeId, employee);
        console.log("Posting data", response);

        if (response.errorCode == this.$MISAEnum.ERRORCODE.SUCCESS) {
          this.$parent.labelInsertValid =
            this.$MISAResource.NOTIFY.UPDATE("Nhân viên");
          this.diy.showNotify();
          this.$parent.clickCallback(this.$parent.indexPage);
          this.employee = {};
          this.$parent.employeeIDUpdate = null;

          // Thực hiện khi click nút cất
          if (this.isSaveEmployee) {
            this.diy.clearEPLDetail();
          } else {
            this.setEmployeeCode();
            this.inputOnFocus("EmployeeCode");
          }
        } else {
          this.handleErrorValidate(response);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm handle lỗi validate khi gọi API
     * @param {Kết quả gọi API} res
     * CreatedBy: Bien (24/02/2023)
     */
    handleErrorValidate(res) {
      switch (res.response.status) {
        case this.$MISAEnum.STATUSCODE.OK:
          this.validateList[`isActive`] = false;
          break;
        case this.$MISAEnum.STATUSCODE.BADREQUEST:
          var moreInfo = res.response.data.moreInfo;
          if (
            res.response.data.errorCode == this.$MISAEnum.ERRORCODE.VALIDATERROR
          ) {
            this.showErrorValidate(moreInfo[0].value);
            if (moreInfo[0].key == "EmployeeCode") {
              this.inputValidate = "EmployeeCode";
            }
            this.validateList[`isActive`] = true;
            if (this.validateList[`isActive`]) {
              moreInfo.forEach((item) => {
                this.validateList[`${item.key}`].labelValidate = item.value;
                this.validateList[`${item.key}`].isStatus = true;
              });
            }
          }
          break;
        case this.$MISAEnum.STATUSCODE.INTERNALSERVER:
          if (
            res.response.data.errorCode == this.$MISAEnum.ERRORCODE.UNKNOWNERROR
          ) {
            this.showErrorValidate(
              this.$MISAResource.ERRORVALIDATE.REQUIRED("Đơn vị")
            );
          }
          break;
        default:
          break;
      }
    },
    /**
     *  Hàm thực hiện cất nhân viên
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
     * Hàm thông báo lỗi validate popup
     * CreatedBy: Bien (21/2/2023)
     */
    showErrorValidate(messageError) {
      // Gắn giá trị cho label dialog
      this.labelValidate = messageError;

      // Ẩn nút trong dialog khi tên để trống
      this.diy.ClearBtnDialog();

      // Hiển thị dialog lỗi validate
      this.diy.showDialogValidate();
    },
    /**
     * Hàm validate theo regex
     * @param {Tên trường cần validate} nameInput
     * @param {Chuỗi mẫu} regex
     * @param {Gía trị input} valueInput
     * @param {Tên input lỗi} labelName
     */
    validateRegex(nameInput, regex, valueInput, labelName, showDialog) {
      // Khai báo chuỗi định dạng số điện thoại
      const regexFormat = new RegExp(regex);

      if (regexFormat.test(valueInput)) {
        this.validateList[nameInput].isStatus = false;
      } else {
        if (valueInput != null && valueInput != "") {
          this.validateList[nameInput].isStatus = true;
          this.validateList[nameInput].labelValidate =
            this.$MISAResource.ERRORVALIDATE.INVALIDFORMAT(labelName);
          if (showDialog) {
            this.showErrorValidate(
              this.$MISAResource.ERRORVALIDATE.INVALIDFORMAT(labelName)
            );
            this.inputValidate = nameInput;
          }
          this.isValidate = false;
        }
      }
    },
    /**
     * Hàm kiểm tra ngày
     * @param {Tên trường cần validate} nameInput
     * @param {Gía trị trường cần validate} valueInput
     * @param {Tên trường cần thông báo lỗi} labelName
     * CreatedBy: Bien (04/04/2023)
     */
    validateDateTime(nameInput, valueInput, labelName, showDialog) {
      // Khai báo biến nhận ngày hiện tại
      const dateNow = new Date();

      const inputDate = new Date(valueInput);

      if (inputDate < dateNow && valueInput) {
        this.validateList[nameInput].isStatus = false;
      } else {
        if (valueInput != null && valueInput != "") {
          this.validateList[nameInput].isStatus = true;
          this.validateList[nameInput].labelValidate =
            this.$MISAResource.ERRORVALIDATE.INVALIDDATETIME(labelName);
          if (showDialog) {
            this.showErrorValidate(
              this.$MISAResource.ERRORVALIDATE.INVALIDDATETIME(labelName)
            );
            this.inputValidate = nameInput;
          }
          this.isValidate = false;
        }
      }
    },
    /**
     * Validate dứ liệu đầu vào thông tin nhân viên
     * CreatedBy: Bien (24/02/2023)
     */
    validateEmployee() {
      this.isValidate = true;
      if (this.employee.fullName) {
        this.validateList[`FullName`].isStatus = false;
      } else {
        this.validateList[`FullName`].isStatus = true;
        this.validateList[`FullName`].labelValidate =
          this.$MISAResource.ERRORVALIDATE.REQUIRED("Tên");
        this.showErrorValidate(this.validateList[`FullName`].labelValidate);
        this.inputValidate = "FullName";
        this.isValidate = false;
      }

      if (this.employee.departmentId) {
        this.validateList[`Department`].isStatus = false;
      } else {
        this.validateList[`Department`].isStatus = true;
        this.validateList[`Department`].labelValidate =
          this.$MISAResource.ERRORVALIDATE.REQUIRED("Đơn vị");
        if (this.validateList[`FullName`].isStatus) {
          this.showErrorValidate(this.validateList[`FullName`].labelValidate);
          this.inputValidate = "FullName";
        } else {
          this.showErrorValidate(this.validateList[`Department`].labelValidate);
          this.inputValidate = "Department";
        }
        this.isValidate = false;
      }

      const regexCode = new RegExp(/NV-[0-9]{5,17}\b/);

      if (this.employee.employeeCode) {
        if (regexCode.test(this.employee.employeeCode)) {
          this.validateList[`EmployeeCode`].isStatus = false;
        } else {
          this.validateList[`EmployeeCode`].isStatus = true;
          this.validateList[`EmployeeCode`].labelValidate =
            this.$MISAResource.ERRORVALIDATE.INVALIDFORMAT("Mã");
          this.showErrorValidate(this.$MISAResource.ERRORVALIDATE.FORMATCODE);
          this.isValidate = false;
          this.inputValidate = "EmployeeCode";
        }
      } else {
        this.validateList[`EmployeeCode`].isStatus = true;
        this.validateList[`EmployeeCode`].labelValidate =
          this.$MISAResource.ERRORVALIDATE.REQUIRED("Mã");
        this.showErrorValidate(this.validateList[`EmployeeCode`].labelValidate);
        this.inputValidate = "EmployeeCode";
        this.isValidate = false;
      }

     

      this.validateRegex(
        "LandlineNumber",
        /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
        this.employee.landlineNumber,
        "Điện thoại cố định",
        true
      );
      this.validateRegex(
        "PhoneNumber",
        /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
        this.employee.phoneNumber,
        "Điện thoại di động",
        true
      );
      this.validateRegex(
        "IdentityNumber",
        /^([0-9]{12})\b/,
        this.employee.identityNumber,
        "Số chứng minh nhân dân",
        true
      );
      this.validateRegex(
        "Email",
        /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/,
        this.employee.email,
        "Email",
        true
      );
      this.validateDateTime(
        "IdentityDate",
        this.employee.identityDate,
        "Ngày cấp",
        true
      );
      this.validateDateTime(
        "DateOfBirth",
        this.employee.dateOfBirth,
        "Ngày sinh",
        true
      );
    },
    /**
     * Hàm gắn giá trị cho form employeeDetail theo id nhân viên
     * CreatedBy: Bien (11/1/2023)
     */
    async getEmployeeByID() {
      try {
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
          this.employeeClone = { ...this.employee };
        }
        if (this.duplicateEmployeeCode) {
          this.employee.employeeCode = this.duplicateEmployeeCode;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm set giá trị mặc định cho employeeCode
     * CreateBy: Bien (11/1/2023)
     */
    async setEmployeeCode() {
      try {
        // Nhận dữ liệu mã nhân viên mới
        const response = await employeeApi.getEmpNewCode();
        if (response) {
          this.employee.employeeCode = response.data;
        }
      } catch (error) {
        console.log(error);
      }
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
    },

    /**
     * Sự kiện hiển thị dialog khi click icon X
     * CreatedBy: Bien (9/1/2023)
     */
    btnCloseOnClickIcon() {
      if (this.isEmployeeClone) {
        this.diy.clearEPLDetail();
      } else {
        this.diy.showDialog();
        this.diy.ShowBtnDialog();
        this.diy.ClearCloseDialog();
        this.diy.showBtnCancel();
      }
    },
  },
  watch: {
    /**
     * Theo dõi sự thay đổi của employee
     * CreatedBy: Bien (18/03/2023)
     */
    employee: {
      handler(newValue) {
        if (newValue && this.employeeClone) {
          if (JSON.stringify(newValue) == JSON.stringify(this.employeeClone)) {
            this.isEmployeeClone = true;
          } else {
            this.isEmployeeClone = false;
          }
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      // Khai báo biến theo dõi sự thay đổi của employee
      isEmployeeClone: true,

      // Khai báo biến validate dữ liệu
      isValidate: null,

      // Khai báo biến focus vào lỗi input tương ứng
      inputValidate: null,

      // Khai báo biến nhập giá trị check là khách hàng
      isCustomer: false,

      // Khai báo biến nhập giá trị check là nhà cung cấp
      isSupplier: false,

      // Khai báo biến nhận giá trị lỗi validate
      validateList: {
        isActive: false,
        EmployeeCode: {
          labelValidate: null,
          isStatus: false,
        },
        FullName: {
          labelValidate: null,
          isStatus: false,
        },
        Department: {
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
        Position: {
          labelValidate: null,
          isStatus: false,
        },
        IdentityPlace: {
          labelValidate: null,
          isStatus: false,
        },
        BankAccount: {
          labelValidate: null,
          isStatus: false,
        },
        BankName: {
          labelValidate: null,
          isStatus: false,
        },
        BankBranch: {
          labelValidate: null,
          isStatus: false,
        },
        Address: {
          labelValidate: null,
          isStatus: false,
        },
      },

      // Khai báo biến max thời gian
      maxDateInput: this.$MISACommon.formatDateReverse(Date.now()),

      // Khai báo một đối tượng employee
      employee: {},

      // Khai báo biến hiển thị label dialog đơn vị không được để trống
      labelValidate: null,

      // Khai báo biến nhân id
      employeeID: null,

      // Khai báo biến thể thiện thực hiện hành động cất
      isSaveEmployee: false,

      // Biến lưu tạm thời nhân viên
      employeeClone: {},
    };
  },
};
</script>
<style scoped>
@import url(./employee.css);
</style>
