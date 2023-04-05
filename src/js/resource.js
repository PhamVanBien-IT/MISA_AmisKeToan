/**
 * Hàm khai báo các giá trị chữ
 * CreatedBy: Bien (11/1/2023)
 */
const MISAResource = {
	ERRORVALIDATE: {
		FORMATCODE:"Mã nhân viên không đúng định dạng <NV-XXXXX>",
		EXISTEMPLOYEECODE:(item) => `Mã nhân viên <${item}> đã tồn tại trong hệ thống.`,
		REQUIRED:(item) => `${item} không được để trống`, 
		INVALIDFORMAT:(item) => `${item} không đúng định dạng`,
		INVALIDDATETIME:(item) => `${item} lớn hơn ngày hiện tại`,
	},
	CONTENTDIALOG:{
		DELETE:(item) => `Bạn có muốn xóa nhân viên <${item}> không?`,
		SAVE:"Dữ liệu đã thay đổi. Bạn có muốn cất không?",
		DELETES:"Bạn có muốn xóa những nhân viên đã chọn không?",
		DEVELOPING:"Chức năng đang phát triển."
	},
	TITLEFORM:{
		ADD: "Thông tin nhân viên",
		UPDATE:"Sửa nhân viên"
	},
	NOTIFY:{
		ADD:(item) =>` ${item} đã được thêm vào hệ thống`,
		DELETE:(item) =>` ${item} đã được xóa khỏi hệ thống`,
		UPDATE:(item) => `${item} đã được cập nhật vào hệ thống`
	}
};

export default MISAResource;