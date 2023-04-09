/**
 * Hàm định dùng chung
 * CreatedBy: Bien (11/1/2023)
 */
const MISACommon = {
  /**
     * Hàm đinh dạng ngày giờ
     * CreatedBy: Bien (23/12/2023)
     */
  formatDate(datatime) {
    try {
      // Kiểm tra dữ liệu đầu vào khác null
      if (datatime != null && datatime != undefined) {
        // Chuyển thành dữ liệu dd/mm/yy
        datatime = new Date(datatime);

        let date = datatime.getDate();
        date = date < 10 ? `0${date}` : date;

        let month = datatime.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;

        let year = datatime.getFullYear();

        return `${date}/${month}/${year}`;
      } else {
        return "";
      }
    } catch (error) {
      console.log("Lỗi định dạng thời gian" + error);
    }
  },
  /**
  * Hàm đinh dạng ngày giờ YYYY-mm-dd
  * CreatedBy: Bien (23/12/2023)
  */
  formatDateReverse(datatime) {
    try {
      // Kiểm tra dữ liệu đầu vào khác null
      if (datatime != null && datatime != undefined) {
        // Chuyển thành dữ liệu dd/mm/yy
        datatime = new Date(datatime);

        let date = datatime.getDate();
        date = date < 10 ? `0${date}` : date;

        let month = datatime.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;

        let year = datatime.getFullYear();

        return `${year}-${month}-${date}`;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Lỗi định dạng thời gian" + error);
    }
  },
}

export default MISACommon;