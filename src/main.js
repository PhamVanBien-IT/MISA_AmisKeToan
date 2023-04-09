import { createApp, provide } from 'vue'
import App from './App.vue';
import diy from './diy';
import MISAEnum from './js/enum';
import MISAResource from './js/resource';
import MISACommon from './js/common';
import MButton from './components/button/MButton.vue';
import MCombobox from './components/combobox/MCombobox.vue';
import MDropdown from "./components/combobox/MDropdown.vue";
import MDialog from "./components/dialog/MDialog.vue";
import MInputText from "./components/input/MInputText.vue";
import MInputMoney from "./components/input/MInputMoney.vue";
import MCheckbox from "./components/input/MCheckbox.vue";
import MDatepicker from "./components/datepicker/MDatepicker.vue";
import vueClickOutsideElement from 'vue-click-outside-element';
import keydown from '@/directive/keydown';

const app = createApp(App);

// Đăng ký các directive
app.directive("keydown",keydown)

app.component("MButtonVue",MButton);
app.component("MComboboxVue",MCombobox);
app.component("MDropdownVue",MDropdown);
app.component("MDialogVue",MDialog);
app.component("MInputTextVue",MInputText);
app.component("MInputMoneyVue",MInputMoney);
app.component("MCheckboxVue",MCheckbox);
app.component("MDatepicker",MDatepicker);
app.provide("diy",diy);
app.use(vueClickOutsideElement)
app.mount('#app');

app.config.productionTip = false;
app.config.globalProperties.$MISAEnum = MISAEnum;
app.config.globalProperties.$MISACommon = MISACommon;
app.config.globalProperties.$MISAResource = MISAResource;

