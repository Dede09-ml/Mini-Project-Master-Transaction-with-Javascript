import axios from 'axios'
import {config} from '../config/config'


const relationService = {
    getAll:(filter) => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/relation' , filter)
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


    getName:() => {
        //http://localhost:8181/api/category
        const result = axios.get(config.apiURL + '/getname')
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
        const result = axios.post(config.apiURL + '/addrelation', data)
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

        const result = axios.get(config.apiURL + '/getrelationid/' + id)
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

    editData : (data) => {
        const result = axios.put(config.apiURL + '/updaterelation/' + data.id, data)
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
        const result = axios.put(config.apiURL + '/deleterelation/' + data.id, data)
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

export default relationService