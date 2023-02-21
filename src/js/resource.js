/**
 * Hàm khai báo các giá trị chữ
 * CreatedBy: Bien (11/1/2023)
 */
const MISAResource = {
	ERRORVALIDATE: {
		ErrorEmployeeCode : "Mã không được để trống", 
        ErrorFullName : "Tên không được để trống",
        ErrorDepartment : "Đơn vị không được để trống",
		EXISTEMPLOYEECODE:(item) => `Mã nhân viên <${item}> đã tồn tại trong hệ thống.`
		
	},
	CONTENTDIALOG:{
		DELETE:(item) => `Bạn có muốn xóa nhân viên <${item}> không?`,
		SAVE:"Dữ liệu đã thay đổi. Bạn có muốn cất không?",
		DELETES:"Bạn có muốn xóa những nhân viên đã chọn không?"
	}
};

export default MISAResource;