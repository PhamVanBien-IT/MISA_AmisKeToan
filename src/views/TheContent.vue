<template>
  <!-- CONTENT -->
  <div class="content" id="content">
    <!-- CONTENT-HEADER -->
    <div class="content__header" id="content__header">
      <!-- CONTENT-HEADER-LEFT -->
      <div class="content__header__left" id="content__header__left">
        <div class="tooggle__menu__city">
          <div class="icon toggleNav" id="icon" @click="toggleNav"></div>
        </div>
        <div class="city__name" id="city__name">
          CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC
        </div>
      </div>
      <!-- CONTENT-HEADER-RIGHT -->
      <div class="content__header__right">
        <div class="notify icon"></div>
        <div class="avatar"></div>
        <div class="user">
          <div class="user-name">Phạm Văn Biển</div>
          <div class="icon-user"></div>
        </div>
      </div>
    </div>
    <!-- PAGE CONTENT -->
    <!-- CONTENT-PAGE -->
    <EmployeeListVue></EmployeeListVue>
  </div>
</template>
<script>
//  import MComboboxVue from '@/components/combobox/MCombobox.vue';
import EmployeeListVue from "./employee/EmployeeList.vue";

export default {
  inject: ["diy"],
  name: "TheContent",
  components: {
    EmployeeListVue,
    // MComboboxVue,
  },
  methods: {
    /**
     * Hàm ẩn hiện nav
     * CreatedBy: Bien (14/1/2023)
     */
    toggleNav() {
      var arrayIcon = document.querySelectorAll("#icon");
      this.diy.showNavToggle();
      if (!this.diy.state.showNav) {
        document.getElementById("nav").style.width = "50px";
        document.getElementById("content").style.width = "calc(100% - 50px)";
        document.getElementById("cartegory").style.background = "none";
        document.getElementById("nav__header").style.display = "none";
        document.getElementById("nav").style.paddingTop = "56px";
        document.getElementById("content__header__left").style.position =
          "absolute";
        document.getElementById("content__header__left").style.left = "0px";
        document.getElementById("city__name").style.marginLeft = "10px";
        arrayIcon.forEach((element) => {
          element.style.marginLeft = "0px";
        });
      } else {
        document.getElementById("nav").style.width = "200px";
        document.getElementById("cartegory").style.background = "#a7c4ff53";
        document.getElementById("nav__header").style.display = "flex";
        document.getElementById("nav").style.paddingTop = "0px";
        document.getElementById("content__header__left").style.position =
          "static";
        document.getElementById("city__name").style.marginLeft = "0px";
      }
    },
  },
};
</script>
<style scoped>
@import url(../css/layout/content.css);
</style>