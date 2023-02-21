/**
 * Hàm khai báo các giá trị số
 * CreatedBy: Bien (11/1/2023)
 */
const MISAEnum = {
    KEY_CODE:{
        ENTER:13, // Enter
        ROW_UP:38,// Nút lên
        ROW_DOWN:40,// Nút xuống
        CTRL:17,// Nút Ctrl
        S:83,// Nút S,
        ESC:27, //Nút ESC
        SHIFT:16,// Nút Shift
    }
    ,
    GENDER:{
        MALE:0, // Giới tính nam
        FEMALE:1, // Giới tính nữ
        ORTHER:2 // Khác
    },
    STATUSCODE:{
        OK:200, // Thành công
        BADREQUEST: 400 // Lỗi dữ liệu nhập vào
    }
}

export default MISAEnum;