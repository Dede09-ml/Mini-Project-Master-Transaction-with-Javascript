import axios from 'axios'
import {config} from '../config/config'


const caraBayarService = {
    getAll:(filter) => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/payment' , filter)
            .then(respon => {
                return{
                    success : respon.data.success,
                    result : respon.data.result
                }
            })
            .catch(error=>{
                return{
                    success : false,
                    error : error
                }
            })
        return result
    },


    getPaymentName:() => {
        //http://localhost:8181/api/category
        const result = axios.get(config.apiURL + '/getpaymentname')
            .then(respon => {
                return{
                    success : respon.data.success,
                    result : respon.data.result
                }
            })
            .catch(error=>{
                return{
                    success : false,
                    error : error
                }
            })
        return result
    },


    addData:(data) => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/addpayment', data)
            .then(respon => {
                return{
                    success : respon.data.success,
                    result : respon.data.result
                }
            })
            .catch(error=>{
                return{
                    success : false,
                    error : error
                }
            })
        return result
    },

    getById: (id) => {
        console.log(id)

        const result = axios.get(config.apiURL + '/getpaymentid/' + id)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        console.log(result)
        return result
    },

    editDataPay : (data) => {
        const result = axios.put(config.apiURL + '/updatepayment/' + data.id, data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    },


    deleteData : (data) => {
        const result = axios.put(config.apiURL + '/deletepayment/' + data.id, data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    },

    countPay : (data) => {
        const result = axios.post(config.apiURL + '/countpay', data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    }

    

}

export default caraBayarService