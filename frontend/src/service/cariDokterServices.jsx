import axios from 'axios'
import {config} from '../config/config'


const cariDokterService = {
    getLoc:() => {
        //http://localhost:8181/api/category
        const result = axios.get(config.apiURL + '/location')
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

    getSpes:() => {
        //http://localhost:8181/api/category
        const result = axios.get(config.apiURL + '/spesialization')
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

    getTreat:() => {
        //http://localhost:8181/api/category
        const result = axios.get(config.apiURL + '/treatment')
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

    showSearch:(data) => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/search', data)
        
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

    countdata : (data) => {
        const result = axios.post(config.apiURL + '/count', data)
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

    getRS:() => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/getRS')
        
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

    getSchedule:() => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/getschedule')
        
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
    
    getSchedule:() => {
        //http://localhost:8181/api/category
        const result = axios.get(config.apiURL + '/getschedule')
        
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

}

export default cariDokterService