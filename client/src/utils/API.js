import axios from "axios";

export default {

    googleLogin: (patientData) => {
        return axios.post("/api/user/google", patientData);
    },
    localLogIn: (loginData) => {
        return axios.post("/api/user/locallogin", loginData);  
    },
    getGoogleId: () => {
        return axios.get("/api/googleclientid");
    },
    createAccount: (newUser)=> {
        return axios.post("/api/user/signup", newUser);
    },
    searchById: (id) => {
        // console.log("api", id)
        return axios.get("/api/user/get/" + id );
    },
    searchByGoogleId: (id) => {
        // console.log("api", id)
        return axios.get("/api/user/google/type/" + id );
    },
    createPhoto: (data) => {
        return axios.post("/api/courses/photo",  data);
    },
    updateById: (id, object) => {
        return axios.post("/api/user/post/" + id, object);
    },
    updateByGoogleId: (id, object) => {
        return axios.post("/api/user/google/type/" + id, object);
    },
    getCourses: () => {
        return axios.get("/api/courses");
    },
    hash: (url) => {
        return axios.post("/api/payment/hash", url)
    },
    deleteAdminCourse: (id) => {
        return axios.delete("api/courses/"+id)
    },
    addCourse: (course) => {
        return axios.post("api/courses/", course)
    },
    getKey: () => {
        return axios.get("api/payment/")
    },
    getRefNo: () => {
        return axios.get("api/payment/refno")
    },
    initiateOrder: (order) => {
        return axios.post("api/payment/order", order)
    },
    loadAllPaymentHistory: () => {
        return axios.get("api/payment/allhistory")
    },
    load30PaymentHistory: () => {
        return axios.get("api/payment/30history")
    },
    searchPaymentByEmail: (email) => {
        return axios.post("/api/payment/", email);
    },
}