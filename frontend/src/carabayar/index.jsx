import React from 'react'
import './index.css'
import caraBayarService from '../service/caraBayarServices'
import FormInput from './forminput'

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export default class Index extends React.Component {

    PayModel = {
        id: 0,
        name: '',
        created_by: '1',
        modify_by: '1',
        delete_by : '1',
        is_delete: false,
        
        
    }

    constructor() {
        super()
        this.state = {
            ListPayment : [],
            PayModel : this.PayModel,
            showModal : false,
            mode : '',
            errors : {},
            filter : {
                search : '',
                page : 1,
                pagesize : 3
            },
            allName : {
                name : ''
            },
            totaldata : 1

        }

    }

    componentDidMount() {
        this.loadList()
        this.getPayName()
    }
    loadList = async () => {
        const {filter} = this.state
        const respon = await caraBayarService.getAll(filter)
        const countdata = await caraBayarService.countPay(filter)           
        // console.log(filter)
        if (respon.success) {
            this.setState({
                ListPayment: respon.result,
                totaldata: Math.ceil(countdata.result[0].count / filter.pagesize)
            })
        }
        
    }

    createHandler = async () => {
        this.setState({
            PayModel: this.PayModel,
            mode: 'add',
            showModal: true
        })
    }

    
    closeHandler = async () => {
        this.setState({
            PayModel: this.PayModel,
            showModal: false,
            errors : {
                name : ''
            }
            
        })
        
    }

    deleteHandler = (data) => {
        this.setState({
            showModal: true,
            mode: 'delete',
            PayModel: data
        })
    }

    editHandler = async (id) => {
        const respon = await caraBayarService.getById(id)
        // console.log(id)
        if (respon.success) {
            this.setState({
                PayModel: respon.result,
                mode: 'edit',
                showModal: true
            })
        }
        
    }

    changeHandler = name => ({ target: { value } }) => {
        this.setState({
            PayModel: {
                ...this.state.PayModel,
                [name]: value
            }
        })
    }

    saveHandler = async () => {
        const { PayModel, mode ,showModal} = this.state
        if (mode === 'edit') {
            if (this.validationHandler()) {
                const respon = await caraBayarService.editDataPay(PayModel)
                if (respon.success) {
                    alert('Success : ' + respon.result)
                    this.loadList()
                    this.setState({
                        PayModel: this.PayModel,
                        showModal: false
                    })
                    } else {
                        alert('Error : ' + respon.result)
                    }
                }
            }
        else {
            if (this.validationHandler() && this.checkDuplic() ) {

                PayModel.name = PayModel.name.trim()
                const respon = await caraBayarService.addData(PayModel)

                if (respon.success) {
                    alert('Success : ' + respon.result)
                    this.loadList()
                    this.setState({
                        PayModel: this.PayModel,
                        showModal: false
                    })
                } else {
                    alert('Error : ' + respon.result)
                }
            }
        }
    }

    sureDeleteHandler = async (data) => {
        const respon = await caraBayarService.deleteData(data)
        // console.log(data)
        if (respon.success) {
            alert('Success : ' + respon.result)
            this.loadList()
        } else {
            alert('Error : ' + respon.result)
        }

        this.setState({
            showModal: false,
            mode: '',
            PayModel: this.PayModel
        })
    }


    validationHandler = () => {
        const { PayModel } = this.state

        let errors = {}
        let formIsValid = true
        //Name
        if (!PayModel["name"]) {
            formIsValid = false,
                errors["name"] = "Nama tidak boleh kosong"
                
        }
        // if (!CategoryModel["description"]) {
        //     formIsValid = false,
                
        //         errors["description"] = "Cannot be empty"
        // }

        this.setState({ errors: errors })
        return formIsValid
    }

    checkDuplic = () => {
        const { PayModel, allName } = this.state
        let errors = {}
        let formisValid = true

        for (let i = 0; i < allName.length; i++) {
            allName[i].name = (allName[i].name).toLowerCase()
            if ((PayModel['name'].toLowerCase() == allName[i].name) && (PayModel['id'] != allName[i].id)) {
                formisValid = false;
                errors["name"] = "Nama Tidak Boleh Sama ";
            }
        }

        this.setState({
            errors: errors
        })
        return formisValid
    }

    getPayName = async() => {
        const respon = await caraBayarService.getPaymentName()
        this.setState({
            allName : respon.result
        })
    }



    filterHandler = name => ({ target: { value } }) => {
        this.setState({
            filter: {
                ...this.state.filter,
                [name]: value
            }
        })
        // }, ()=> this.loadList() )
    }

    onChangePage = (number) => {
        const { PayModel } = this.state
        // console.log(PayModel)
        this.setState({
            filter : {
                ...this.state.filter,
                ["page"] : number
            }
        // })
        }, ()=> this.loadList() )
    }

    
    previousPage = () => {
        const { filter } = this.state
        // console.log(PayModel)
        if(filter.page > 1){
            this.setState({
                filter : {
                    ...this.state.filter,
                    ["page"] : filter.page-1
                }
        // })
            }, ()=> this.loadList() )
        }
    }

    nextPage = () => {
        const { filter , totaldata} = this.state
        // console.log(PayModel)
        if(filter.page < totaldata){
            this.setState({
                filter : {
                    ...this.state.filter,
                    ["page"] : filter.page+1
                }
        // })
            }, ()=> this.loadList() )
        }
    }

    renderPagination() {
        let items = []
        let awal = 1
        const { filter, totaldata } = this.state
        // console.log(totaldata)
        
        for (let number = awal; number <= totaldata; number++) {
            items.push(
                <PaginationItem key={number} active={number === filter.page} >
                    <PaginationLink onClick={() => this.onChangePage(number)} >
                        {number}
                    </PaginationLink>
                </PaginationItem>
            )

        }

        

      
        
        
        
        return (
            <Pagination >
            <ul class="pagination" style={{position:'fixed', bottom:'70px', right: '30px'}}>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" onClick={this.previousPage}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                
                {items}

                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next"  onClick={this.nextPage}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
            
            </Pagination>
        )
    }



    render() {
        const {ListPayment, showModal, mode, errors, PayModel, filter,allName} = this.state
           return (
               <div>
                <h3>Cara Pembayaran</h3>
                  
                   {/* {JSON.stringify(PayModel)} */}
                <div class="form-inline">

                    <input class="form-control" type="search" placeholder="Search" aria-label="Search" onChange={this.filterHandler("search")}/>
                    <div class="input-group-append">
                            <button class="btn btn-navbar" type="submit" onClick={this.loadList}>
                                <i class="fas fa-search"></i>
                            </button>
                    </div>
                    <ul class="col-9">
                         <button class="btn btn-success btn-lg float-right" onClick={this.createHandler}>Tambah</button>
                    </ul>
                    
                </div>

                    
                <FormInput 
                showModal = {showModal}
                closeHandler = {this.closeHandler}
                changeHandler = {this.changeHandler}
                saveHandler = {this.saveHandler}
                PayModel={PayModel}
                mode={mode}
                errors={errors}
                sureDeleteHandler={this.sureDeleteHandler}
                editHandler = { this.editHandler}
                deleteHandler = { this.deleteHandler}

                />

                    <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th style={{width: '200px'}}>action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            ListPayment.map(data => {
                                return (
                                    <tr key={data.id}>

                                        <td>{data.name}</td>
                                        <td>
                                            <button class="btn btn-info btn-lg" onClick={() => this.editHandler(data.id)} >Edit</button>
                                            <button class="btn btn-danger btn-lg" onClick={() => this.deleteHandler(data)}>Delete</button>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>

                {this.renderPagination()}
               </div>           
                 
        )
    }


}
