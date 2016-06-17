import Vue from 'vue'

let resource = require('vue-resource');
let AlertConstructor = Vue.extend(require('./components/control/Alert'));

let base64url = require('base64-url');


class ApiClient {
    constructor() {
        this.installed = false;
        this.urls = {
            store_info: "/api/store_info",
            api_get_laundry_ticket: "/api/",
            api_get_vip: "",
            laundry_list: "",
            vip_list: "",
        }
        
    }
    
    alert(response){
        if (this.alertInstance) return;
        this.alertInstance = new AlertConstructor({
            el: document.createElement('div'),
            data() {
                console.log(response);
                let d =  {
                    status:response.data.status,
                    message: response.data.message,
                };
                if(response.status==200){
                    if (d.status){
                        d.data = response.data.Data;
                    }else{
                        d.err = response.data.Data;
                    }
                }else{
                    d.status = false;
                    d.message = "操作失败";
                    d.err = response.data;
                }
                return d;
            }
        });
        this.alertInstance.$appendTo(document.body);
        console.log("alert");
        setTimeout(() => {
                    this.alertInstance.$remove();
                    this.alertInstance = null;
                    console.log("remove in alert");
                }, 2000);
    }
    
 
    toBase64(content){
        let result = base64url.encode(content);
        return result;
    }

    install(Vue, options) {
        Vue.prototype.$apis = this;
        if (options != undefined) {
            this.options = options;
            this.domain = options.domain;
            this.urls = options.urls;
        }
        // result dialog
        this.alertInstance = null;
        
        this.debug = true;
        
        this.installed = true;
    }
}

var Apis = new ApiClient();

export default Apis