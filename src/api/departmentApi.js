import axiosClient from "./axiosClient";

const baseUrl = "Departments/";


/**
 * Các API liên quan đến Department
 * Author: LHH - 04/01/23
 */
const departmentApi = {
    getDeparmentPaging: () => {
        try {
            return axiosClient.get(baseUrl + `filter?pageNumber=1&pageSize=20`);
        } catch (error) {
            console.log(error);
        }
    },
    // getByFilter: (pageNumber,pageSize, filter) => {
    //     try {
    //         return axiosClient.get(baseUrl + `filter?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // },
 
    // getNewEmpCode: () => {
    // 	try {
    // 		return axiosClient.get(baseUrl + "NewEmployeeCode");
    // 	} catch (error) {
    // 		console.log(error);
    // 	}
    // },
    // getEmpById: (id) => {
    //     try {
    //         return axiosClient.get(baseUrl + id);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    // createEmp: (employee) => {
    //     try {
    //         return axiosClient.post(baseUrl, employee);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    // updateEmp: (id, newEmployee) => {
    //     try {
    //         return axiosClient.put(baseUrl + id, newEmployee);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    // deleteEmp: (id) => {
    //     try {
    //         return axiosClient.delete(baseUrl + id);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
};

export default departmentApi;