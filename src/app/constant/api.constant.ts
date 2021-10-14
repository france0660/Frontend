export class API_URL {
    // static BASE_URL = "https://jjstore-backend.herokuapp.com";
    static BASE_URL = "http://localhost:3001";

    static TestGet = API_URL.BASE_URL + "/"
    static loginURL = API_URL.BASE_URL + "/api/login"
    static createUserURL = API_URL.BASE_URL + "/api/createUser"
    static saleProductURL = API_URL.BASE_URL + "/api/saleProduct"
    static getListsaleProductURL = API_URL.BASE_URL + "/api/getListsaleProduct"

}