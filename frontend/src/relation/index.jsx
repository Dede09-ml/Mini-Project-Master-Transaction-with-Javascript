import React from 'react'
import './index.css'
import RelationService from '../service/relationServices'
import FormInput from './forminput'

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export default class Index extends React.Component {

    RelationModel = {
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
            ListRelation : [],
            RelationModel : this.RelationModel,
            showModal : false,
            mode : '',
            errors : {},
            filter : {
                search : ''
            },
            allName : {
                name : ''
            }

        }

    }

    componentDidMount() {
        this.loadList()
        this.getAllName()
    }
    loadList = async () => {
        const {filter} = this.state
        const respon = await RelationService.getAll(filter)
        this.getAllName()

        // console.log(filter)
        if (respon.success) {
            this.setState({
                ListRelation: respon.result
            })
        }
    }

    createHandler = async () => {
        this.getAllName()
        this.setState({
            RelationModel: this.RelationModel,
            mode: 'add',
            showModal: true
        })
    }

    
    closeHandler = async () => {
        this.setState({
            RelationModel: this.RelationModel,
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
            RelationModel: data
        })
    }

    editHandler = async (id) => {
        const respon = await RelationService.getById(id)
        // console.log(id)
        if (respon.success) {
            this.setState({
                RelationModel: respon.result,
                mode: 'edit',
                showModal: true
            })
        }
        
    }

    changeHandler = name => ({ target: { value } }) => {
        
        this.setState({
            RelationModel: {
                ...this.state.RelationModel,
                [name]: value
            }
        })
    }

    saveHandler = async () => {
        const { RelationModel, mode ,showModal} = this.state
        
        if (mode === 'edit') {
            if (this.validationHandler() && this.checkDuplic()) {
                const respon = await RelationService.editData(RelationModel)
                if (respon.success) {
                    alert('Success : ' + respon.result)
                    this.loadList()
                    this.setState({
                        RelationModel: this.RelationModel,
                        showModal: false
                    })
                    } else {
                        alert('Error : ' + respon.result)
                    }
                }
            }
        else {
            if (this.validationHandler() && this.checkDuplic() ) {
                
                RelationModel.name = RelationModel.name.trim()
                console.log(RelationModel)
                const respon = await RelationService.addData(RelationModel)

                if (respon.success) {
                    alert('Success : ' + respon.result)
                    this.loadList()
                    this.setState({
                        RelationModel: this.RelationModel,
                        showModal: false
                    })
                } else {
                    alert('Error : ' + respon.result)
                }
            }
        }
    }

    sureDeleteHandler = async (data) => {
        const respon = await RelationService.deleteData(data)
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
            RelationModel: this.RelationModel
        })
    }


    validationHandler = () => {
        const { RelationModel } = this.state

        let errors = {}
        let formIsValid = true
        //Name
        if (!RelationModel["name"]) {
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
        const { RelationModel, allName } = this.state
        let errors = {}
        let formisValid = true

        for (let i = 0; i < allName.length; i++) {
            allName[i].name = (allName[i].name).toLowerCase()

            if ((RelationModel['name'].toLowerCase() == allName[i].name) && (RelationModel['id'] != allName[i].id))  {
                formisValid = false;
                errors["name"] = "Nama Tidak Boleh Sama ";
            }
        }

        this.setState({
            errors: errors
        })
        return formisValid
    }

    getAllName = async() => {
        const respon = await RelationService.getName()
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



    render() {
        const {ListRelation, showModal, mode, errors, RelationModel, filter,allName} = this.state
           return (
               <div>
                <h3>Hubungan Pasien</h3>
                  
                   {JSON.stringify(allName)}
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
                RelationModel={RelationModel}
                mode={mode}
                errors={errors}
                sureDeleteHandler={this.sureDeleteHandler}
                editHandler = { this.editHandler}
                deleteHandler = { this.deleteHandler}
                checkDuplic ={this.checkDuplic}

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
                            ListRelation.map(data => {
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
               </div>           
                 
        )
    }


}
