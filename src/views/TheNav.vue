<template>
  <!-- NAV -->
  <div class="nav" id="nav">
    <!-- NAV-HEADER -->
    <div class="nav__header" id="nav__header">
      <div class="toggle icon"></div>
      <div class="logo">
        <div class="logo_image">
          <img
            src="../assets/images/Logo_Module_TiengViet_White.66947422.svg"
            alt="#"
            width="96px"
          />
        </div>
      </div>
    </div>
    <!-- NAV-BODY -->
    <div class="nav__body">
      <div class="catergory boder-category" id="cartegory">
        <div class="icon icon-1" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
          @click="alerDeveloping"
        >
          Tổng quan
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-2" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Tiền mặt
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-3" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Tiền gửi
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-4" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Mua hàng
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-5" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Bán hàng
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-6" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Quản lý hóa đơn
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-7" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Kho
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-8" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Công cụ dụng cụ
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-9" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Tài sản cố định
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-10" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Thuế
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-11" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Giá thành
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-12" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Tổng hợp
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-13" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Ngân sách
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-14" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Báo cáo
        </div>
      </div>
      <div class="catergory">
        <div class="icon icon-15" id="icon"></div>
        <div
          class="catergory-name"
          v-if="diy.state.showNav"
          id="catergory-name"
        >
          Phân tích tài chính
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["diy"],
  name: "TheNav",
  components: {},
};
</script>
<style scoped>
@import url(../css/layout/nav.css);
</style>