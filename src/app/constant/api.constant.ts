export class API_URL {
    // static BASE_URL = "https://jjstore-backend.herokuapp.com";
    static BASE_URL = "http://localhost:3001";

    static TestGet = API_URL.BASE_URL + "/"
    static loginURL = API_URL.BASE_URL + "/api/login"
    static createUserURL = API_URL.BASE_URL + "/api/createUser"
    static addproductURL = API_URL.BASE_URL + "/api/addproduct"
    static getListallProductURL = API_URL.BASE_URL + "/api/getListallProduct"
    static saleproductURL = API_URL.BASE_URL + "/api/saleproduct"
    static getListallproductforsaleURL = API_URL.BASE_URL + "/api/getListallproductforsale"
    static getListallproductforshowURL = API_URL.BASE_URL + "/api/getListallproductforshow"
    static barcodescanDetailURL = API_URL.BASE_URL + "/api/barcodescanDetail"
    static createBillURL = API_URL.BASE_URL + "/api/createBill"
    static getListallBillURL = API_URL.BASE_URL + "/api/getListallBill"
    static addbillpriceURL = API_URL.BASE_URL + "/api/addbillprice"

}