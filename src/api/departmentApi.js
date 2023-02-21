import axiosClient from "./axiosClient";

const baseUrl = "Departments/";


/**
 * Các API liên quan đến Department
 * CreatedBy: Bien (25/01/2023)
 */
const departmentApi = {
    /**
     * API lấy danh sách department
     * @returns danh sách department
     * CreatedBy: Bien (25/01/2023)
     */
    getDeparmentPaging: () => {
        try {
            return axiosClient.get(baseUrl + `filter?pageNumber=1&pageSize=20`);
        } catch (error) {
            console.log(error);
        }
    },
};

export default departmentApi;