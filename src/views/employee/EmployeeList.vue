<template>
  <div class="content__page">
    <!-- PAGE-HEADER -->
    <div class="page__header">
      <div class="title">
        <p>Nhân viên</p>
      </div>
      <div class="add">
        <MButtonVue
          label="Thêm mới nhân viên"
          class="btn"
          @click="btnAddOnClick"
        ></MButtonVue>
      </div>
    </div>
    <!-- PAGE-CONTENT -->
    <div class="page__main">
      <!-- PAGE-MAIN-HEADER -->
      <div class="page__main__header">
        <!-- SEARCH-INPUT -->
        <div class="search__text">
          <div class="text-field">
            <MInputTextVue
              placeholder="Tìm theo mã, tên nhân viên"
              class="input-search"
              v-model="textSearch"
              @input="searchEmployee"
            ></MInputTextVue>
          </div>
          <div class="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D9D9D9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        <div class="refresh icon" @click="btnRefreshOnClick"></div>
      </div>
      <!-- PAGE-MAIN-TABLE -->
      <div class="page_body">
        <div class="page__main__table">
          <table id="tbEmployeseList">
            <thead>
              <tr>
                <td class="tb-head td-center td-cb" style="width: 60px">
                  <!-- <MCheckboxVue
                    v-model="select_all"
                    @click="selectAll"
                  ></MCheckboxVue> -->
                  <label>
                    <input
                      type="checkbox"
                      id="chkProdTomove"
                      v-model="select_all"
                      @click="selectAll"
                    />
                    <span class="check-box-effect"></span>
                  </label>
                  <!-- <input type="checkbox" v-model="select_all" @click="selectAll"> -->
                </td>
                <td class="tb-head td-left" style="width: 250px">
                  MÃ NHÂN VIÊN
                </td>
                <td class="tb-head td-left" style="width: 450px">
                  TÊN NHÂN VIÊN
                </td>
                <td class="tb-head td-left" style="width: 250px">GIỚI TÍNH</td>
                <td class="tb-head td-center" style="width: 200px">
                  NGÀY SINH
                </td>
                <td
                  class="tb-head td-left"
                  style="width: 250px"
                  title="Số chứng minh nhân dân"
                >
                  SỐ CMND
                </td>
                <td class="tb-head td-center" style="width: 250px">NGÀY CẤP</td>
                <td class="tb-head td-left" style="width: 200px">NƠI CẤP</td>
                <td class="tb-head td-left" style="width: 230px">
                  SỐ TÀI KHOẢN
                </td>
                <td
                  class="tb-head td-left"
                  title="Chi nhánh tài khoản ngân hàng"
                  style="width: 500px"
                >
                  CHI NHÁNH TK NGÂN HÀNG
                </td>
                <td class="tb-head td-center td-func" style="width: 120px">
                  CHỨC NĂNG
                </td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in employee"
                :key="index"
                @dblclick="rowOnDblClick(item)"
                @click="btnSelectItem($event, item)"
              >
                <td class="td-center td-cb" style="width: 60px">
                  <!-- <MCheckboxVue :value="item.EmployeeId" v-model="selected"></MCheckboxVue> -->
                  <label>
                    <input
                      type="checkbox"
                      id="chkProdTomove"
                      :value="item.employeeId"
                      v-model="selected"
                    />
                    <span class="check-box-effect"></span>
                  </label>
                </td>
                <td class="td-left" style="width: 250px">
                  {{ item.employeeCode || "" }}
                </td>
                <td class="td-left" style="width: 450px">
                  {{ item.fullName || "" }}
                </td>
                <td class="td-left" style="width: 200px">
                  {{ item.genderName || "" }}
                </td>
                <td class="td-center" style="width: 200px">
                  {{ this.$MISACommon.formatDate(item.dateOfBirth) || "" }}
                </td>
                <td class="td-left" style="width: 250px">{{ item.identityNumber ||"" }}</td>
                <td class="td-center" style="width: 250px">{{ this.$MISACommon.formatDate(item.identityDate) || "" }}</td>
                <td class="td-left" style="width: 200px">{{item.identityPlace ||"" }}</td>
                <td class="td-left" style="width: 230px">
                  {{ item.bankAccount || "" }}
                </td>
                <td class="td-left" style="width: 500px">
                  {{ item.bankBranch || ""}}
                </td>
                <td class="td-func td-center" style="width: 120px">
                  <div class="edit-data" @click="rowOnDblClick(item)">Sửa</div>
                  <div
                    class="btn-funclist"
                    @click="btnShowFuncList($event, item)"
                  >
                    <div class="icon-funclist"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <MLoadingVue></MLoadingVue>
      </div>
      <!-- PAGE-MAIN-FOOTER -->
      <div class="page__main__footer">
        <!-- PAGE-MAIN-FOOTER-LEFT -->
        <div class="page__main__footer__left">
          Tổng số: <span style="font-weight: 600">{{ totalRecord }}</span> bản
          ghi
        </div>
        <!-- PAGE-MAIN-FOOTER-RIGHT -->
        <div class="page__main__footer__right">
          <div class="cbbox-number">
            <MDropdownVue
              :pageNumverRecord="pagination"
              @pageSize="setPageNumber"
            ></MDropdownVue>
          </div>
          <div class="pading">
            <div class="page-list mgl-8">
              <paginate
                :page-count="totalPage"
                :page-range="3"
                :margin-pages="1"
                :click-handler="clickCallback"
                :prev-text="'Truớc'"
                :page-class="'page-item'"
                :prev-class="'prev-btn'"
                :next-class="'next-btn'"
                :next-text="'Sau'"
                :container-class="'pagination'"
              ></paginate>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- DIALOG -->
  <MDialogVue
    v-if="diy.state.showDialog"
    label="Bạn có chắc chắn muốn xóa"
    classIcon="warning"
    @EditEPL="deleteEPL"
  ></MDialogVue>
  <teleport to="body">
    <div
      class="func-data"
      id="func-data"
      :style="[isDropdown ? dropdownPosition : dropdownPositionReverse]"
      v-if="showFuncList"
    >
      <div class="funclist-item">Nhân bản</div>
      <div class="funclist-item" @click="btnDeleteEmployee(item)">Xóa</div>
      <div class="funclist-item">Ngưng sử dụng</div>
    </div>
    <div
      class="boder-item-active"
      :style="activePosition"
      @click="clearFuncList"
      v-if="showFuncList"
      id="boder-item-active"
    ></div>
    <div class="bg-select-item" :style="activeBackground"></div>
  </teleport>
  <EmployeeDetailVue
    :id="employeeIDUpdate"
    v-if="diy.state.showEPLDetail"
  ></EmployeeDetailVue>
  <!-- NOTIFY -->
  <MNotifyVue v-if="diy.state.showNotify"></MNotifyVue>
</template>
<script>
import axios from "axios";
import _ from 'lodash';
import Paginate from "vuejs-paginate/src/components/Paginate.vue";
import MLoadingVue from "@/components/loading/MLoading.vue";
import EmployeeDetailVue from "./EmployeeDetail.vue";
import MNotifyVue from "@/components/notify/MNotify.vue";

export default {
  inject: ["diy"],
  name: "EmployeeList",
  components: {
    MLoadingVue,
    EmployeeDetailVue,
    MNotifyVue,
    Paginate,
  },
  created() {
    // Gọi hàm clickCallback
    this.clickCallback(1);
  },
  methods: {
    /**
     * Hàm checkall employee
     * CreatedBy: Bien (13/1/2023)
     */
    selectAll() {
      this.selected = [];
      if (!this.select_all) {
        for (let i in this.employee) {
          this.selected.push(this.employee[i].employeeId);
        }
      }
    },
    /**
     * Hàm ẩn funcList
     * CreatedBy: Bien (12/1/2023)
     */
    clearFuncList() {
      this.showFuncList = false;
    },
    /**
     * Hàm gắn giá trị cho pageNumber
     * CreatedBy: Bien (11/1/2023)
     */
    setPageNumber(n) {
      // Gắn giá trị cho biến pageSize
      this.pageSize = n;

      // Uncheckbox all
      this.select_all = false;

      // Gọi hàm set pagation
      this.clickCallback(1);
    },
    // /**
    //  * Hàm tìm kiếm employee
    //  * CreatedBy: Bien (10/1/2023)
    //  */
    searchEmployee: _.debounce(function() {
      this.search(this.textSearch)
    }, 500),

    /**
     * Hàm tìm kiếm trong data
     * CreatedBy: Bien (18/1/2023)
     */
    async search(value) {
      try {
        let me = this;
       // Gọi hàm hiển thị loading
      //  this.diy.showLoading();
      if(!value){
        this.clickCallback(1);
      }else{
        await axios
        .get(
          `https://localhost:7185/api/Employees/filter?filter=${value}&pageSize=${me.pageSize}&pageNumber=1`
        )
        .then((res) => {
          this.employee = res.data.data.data;
        })
        .catch((err) => console.log(err));
      }
      } catch (error) {
          console.log("Lỗi tìm kiếm"+ error);
      }
    
         // Hàm ẩn loading
      // this.diy.clearLoading();
    },
  
    /**
     * Hàm phân trang
     * CreatedBy: Bien (10/1/2023)
     */
    async clickCallback(pageNumber) {
      // Gọi hàm hiển thị loading
      this.diy.showLoading();
      // Gọi hàm loại bỏ checkall
      this.select_all = false;
      this.selected = [];
      let me = this;
      await axios
        .get(
          `https://localhost:7185/api/Employees/filter?pageSize=${me.pageSize}&pageNumber=${pageNumber}`
        )
        .then((res) => {
          this.employee = res.data.data.data;
          this.totalPage = res.data.data.totalPage;
          this.totalRecord = res.data.data.totalRecord;
          this.indexPage = pageNumber;
        })
        .catch((err) => console.log(err));

      // Hàm ẩn loading
      this.diy.clearLoading();
    },
    //
    btnShowFuncList(event, item) {
      // Gắn giá trị cho tọa độ xuất hiện của funcList
      this.positionX = event.clientX;
      this.positionY = event.clientY;
      this.EmployeeIdDelete = item.employeeId;
      this.showFuncList = !this.showFuncList;

      this.isSelect = true;
      if (this.positionY > 556) {
        this.isDropdown = false;
      } else {
        this.isDropdown = true;
      }
    },
    /**
     * Hàm gọi vị trí set background
     * CreatedBy: Bien (13/1/2023)
     */
    btnSelectItem(event, item) {
      this.positionX = event.clientX;
      this.positionY = event.clientY;

      this.EmployeeIdDelete = item.employeeId;
      this.showBackgroudItem = true;
    },
    /**
     * Hàm hỏi trước khi xóa
     * CreatedBy: Bien (10/1/2023)
     */
    btnDeleteEmployee() {
      this.diy.showDialog();
      this.showFuncList = false;

      this.diy.ClearCloseDialog();
    },
    /**
     * Hàm xóa employee
     * CreatedBy: Bien (10/1/2023)
     */
    async deleteEPL() {
      // Hàm hiển thị loading
      this.diy.showLoading();

      await axios
        .delete(
          `https://localhost:7185/api/Employees/${this.EmployeeIdDelete}`
        )
        .then(() => console.log("Xoa thanh cong"))
        .catch((err) => console.log(err))

      this.clickCallback(this.indexPage);

      //Hàm ẩn loading
      this.diy.clearLoading();
    },
    /**
     * Sự kiện mở form EmployeeDetail
     * CreatedBy: Bien (4/1/2023)
     */
    btnAddOnClick() {
      try {
        this.diy.setEPLDetail();
        this.employeeIDUpdate = null;
        this.showFuncList = false;
      } catch (error) {
        console.log("Lỗi hiển thị EmployeeDetail" + error);
      }
    },
    /**
     * Hàm đọc dữ liệu vào EmployeeDetai
     * CreatedBy: Bien (4/1/2023)
     */
    rowOnDblClick(item) {
      // Lấy id của hàng được chọn
      this.employeeIDUpdate = item.employeeId;

      // Gọi hàm hiển thị EmployeeDetail
      this.diy.setEPLDetail();

      // Gọi hàm ẩn func-list
      this.clearFuncList();
    },

    /**
     * Hàm reFreshEPLList
     * CreatedBy: Bien (4/1/2023)
     */
    btnRefreshOnClick() {
      // Gọi hàm tìm kiếm
      this.clickCallback(this.indexPage);
    },
   
  },
  computed: {
    // Hàm set vị trị hiển thị
    dropdownPosition() {
      return {
        top: `calc(${this.positionY}px + 10px)`,
        left: `calc(${this.positionX}px -55px)`,
      };
    },

    // Hàm set vị trí hiển thị phía cuối
    dropdownPositionReverse() {
      return {
        top: `calc(${this.positionY}px - 103px)`,
        left: `calc(${this.positionX}px -55px)`,
      };
    },

    // Hàm set vị trí itemActive
    activePosition() {
      return {
        top: `calc(${this.positionY}px - 10px)`,
        left: `calc(${this.positionX}px - 15px)`,
      };
    },
    // Hàm set vị trí background
    activeBackground() {
      return {
        top: `calc(${this.positionY}px - 9px)`,
        left: `calc(${this.positionX}px -55px)`,
      };
    },
  },
  watch: {
    /**
     * Hàm nắng nghe dữ liệu tìm kiếm
     * CreatedBy: Bien (18/1/2023)
     */
    textSearch: async function () {
     await this.searchEmployee(this.textSearch);
    },

    /**
     * Hàm lắng nghe sự thay đổi checkall
     * CreatedBy: Bien (18/1/2023)
     */
    selected: function () {
      if (this.selected.length == this.pageSize) {
        this.select_all = true;
      } else {
        this.select_all = false;
      }
    },
    deep: true,
  },
  data() {
    return {
      // Khai báo biến hiển thị background khi chọn cột
      showBackgroudItem: false,
      
      // Khai báo biến isDropdown
      isDropdown: true,

      // Khai báo biến selected
      selected: [],

      // Khai báo biến checkall
      select_all: false,

      // Khai báo biến indexPage
      indexPage: null,

      // Khai báo giá trị mặc định của employeeCode khi click nút thêm
      employeeCodeDefault: null,

      //Khai báo biến hiển thị background khi click table
      isSelect: false,

      // Khai báo biến hiển thị tọa độ theo Ox
      positionX: 0,

      // Khai báo biến hiển thị tọa độ theo Oy
      positionY: 0,

      // Khai báo biến loadingEPLList
      loadingEPLList: true,

      // Khai báo biến employees
      employee: {},

      // Khai báo biến showEPLDetail
      showEPLDetail: false,

      // Khai báo biến
      employeeIDUpdate: null,

      // Khai báo biến EmployeeIdDelete
      EmployeeIdDelete: null,

      // Khai báo biến tổng số bản ghi
      totalRecord: null,

      // Khai báo biến toltalPage
      totalPage: 1,

      // Khai báo biến nhận value inputSearch
      textSearch: null,

      // Khai báo biến nhận pageSize
      pageSize: 20,

      // Biến showFuncList
      showFuncList: false,

      // Khai báo mảng page
      pagination: [
        {
          key: 10,
          value: "10 sản phẩm trên 1 trang",
        },
        {
          key: 20,
          value: "20 sản phẩm trên 1 trang",
        },
        {
          key: 30,
          value: "30 sản phẩm trên 1 trang",
        },
        {
          key: 50,
          value: "50 sản phẩm trên 1 trang",
        },
        {
          key: 100,
          value: "100 sản phẩm trên 1 trang",
        },
      ],

      // Khai báo mảng func
      funcList: [
        {
          key: 0,
          value: "Nhân bản",
        },
        {
          key: 1,
          value: "Xóa",
        },
        {
          key: 2,
          value: "Ngưng sử dụng",
        },
      ],
    };
  },
};
</script>
<style>
.pagination {
  list-style: none;
  display: flex;
  padding: unset;
}

.page-item {
  padding: 0 0.5rem;
  height: 20px;
  line-height: 20px;
}

.prev-btn {
  margin-right: 13px;
  margin-top: 3px;
}

.next-btn {
  margin-top: 1px;
  margin-left: 13px;
}

.page-item.active {
  border: 1px solid #e0e0e0;
  font-weight: 700;
  line-height: 18px;
}

@import url(./employee.css);
</style>
