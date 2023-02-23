import axiosClient from "./axiosClient";
import axios from "axios";
const baseUrl = "Employees/";

/**
 * Các API liên quan đến Employee
 * CreatedBy: Bien (20/01/2023)
 */
const employeeApi = {
    /**
     * API xuất khẩu nhân viên
     * CreatedBy: Bien (20/02/2023)
     */
    exportEmployees:() =>{
       try {
        axios({
            url: "https://localhost:7185/api/Employees/ExportExcel",
            method: "GET",
            responseType: "blob",
          }).then((response) => {
            window.open();
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");
    
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "Danh_sach_nhan_vien.xlsx");
    
            fileLink.click();
          });
       } catch (error) {
        console.log(error);
       }
    },
    /**
     * API lấy danh sách nhân viên theo trang
     * @param {* Gía trị trang muốn lấy dữ liệu} pageNumber 
     * @param {* Kích thước của trang} pageSize 
     * @param {* Tên, mã nhân viên muốn tìm kiếm} filter 
     * @returns 
     * CreatedBy: Bien (20/01/2023)
     */
    getEmpPaging: (pageNumber, pageSize, filter) => {
        try {
            if (filter) {
                return axiosClient.get(baseUrl + `filter?pageNumber=${pageNumber}&pageSize=${pageSize}&filter=${filter}`);
            } else {
                return axiosClient.get(baseUrl + `filter?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            }
        } catch (error) {
            console.log(error);
        }
    },
     /**
     * API sinh mã nhân viên mới
     * CreatedBy: Bien (20/01/2023)
     */
    getEmpNewCode: () =>{
        try {
            return axiosClient.get(baseUrl + "NewEmployeeCode")
        } catch (error) {
            console.log(error);
        }
    },
     /**
     * API lấy nhân viên theo id
     * @param {*Id nhân viên muốn lấy} id
     * CreatedBy: Bien (20/01/2023)
     */
    getEmpById: (id) => {
        try {
            return axiosClient.get(baseUrl + id);
        } catch (error) {
            console.log(error);
        }
    },
     /**
     * API thêm nhân viên
     * @param {*Nhân viên muốn thêm} employee
     * CreatedBy: Bien (20/01/2023)
     */
    createEmp: (employee) => {
        try {
            return axiosClient.post(baseUrl, employee);
        } catch (error) {
            console.log(error);
        }
    },
     /**
     * API sửa nhân viên
     * @param {*Id nhân viên muốn xóa} id
     * @param {*Nhân viên muốn sửa} newEmployee
     * CreatedBy: Bien (20/01/2023)
     */
    updateEmp: (id, newEmployee) => {
        try {
            return axiosClient.put(baseUrl + id, newEmployee);
        } catch (error) {
            console.log(error);
        }
    },
     /**
     * API xóa nhân viên
     * @param {*Id nhân viên muốn xóa} id
     * CreatedBy: Bien (20/01/2023)
     */
    deleteEmp: (id) => {
        try {
            return axiosClient.delete(baseUrl + id);
        } catch (error) {
            console.log(error);
        }
    },
     /**
      * API xóa hàng loạt nhân viên
      * @param {*Danh sách id nhân viên muốn xóa} employeeIds 
      * @returns 
      * 1: Nếu xóa thành công
      * 0: Nếu xóa thất bại    
      * CreatedBy: Bien (20/01/2023)
      */
    deleteEmployees:(employeeIds) => {
        try {
            return axios.delete("https://localhost:7185/api/Employees/DeleteEmployees",{
                data: employeeIds
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export default employeeApi;