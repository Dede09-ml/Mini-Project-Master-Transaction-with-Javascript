import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import PasienService from '../service/pasienServices'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import './index.css'
import FormInput from '../pasien/forminput';

export default class Index extends React.Component {
    
    PasienModel = {
        id : 0,
        name : '',
        bod : '',
        gender : '',
        blood : '',
        rhesus : '',
        height : '',
        weight : '',
        relation : '',
        parent_id : 8
        

    }

    MultiModel = {
        id : 0,
        name : ''
    }

    

    constructor() {
        super()
        this.state = {
            PasienModel : this.PasienModel,
            MultiModel : this.MultiModel,
            mode:'',
            showmodal : false,
            bloodList:[],
            relationList:[],
            errors:{},
            ListPasien:[],
            filter : {
                parent_id : 8,
                search : '',
                order : 'bi.fullname',
                order2 : 'ASC',
                page : 1,
                pagesize : 4,
               
            },
            totaldata : 0,
            ListDeleteId : [],
            ListDeleteName : [],
            selfList :[],
            selectedItems : [],
            checkedItems: new Map()
            


        }
    }

    componentDidMount() {
        this.loadList()
    }


    loadList = async () => {
        this.getSelfList()
        const {filter} = this.state
        const respon = await PasienService.getPasien(filter)
        
        const countdata = await PasienService.countPasien(filter)           
        // console.log(filter)
        if (respon.success) {
            console.log(respon)
            this.setState({
                ListPasien: respon.result,
                totaldata: ( Math.ceil(countdata.result[0].count / filter.pagesize) ) 
            })
        }
        
    }
    

    getSelfList = async () => {
        const {filter} = this.state
        const respon = await PasienService.getSelf(filter)
        this.setState({
            selfList: respon.result
        })
    }

    deleteHandler = (data) => {
        // alert('test')
        this.setState({
            showModal: true,
            mode: 'delete',
            PasienModel : data
        })
    }

    editHandler = async (id) => {
        this.getBloodList()
        this.getRelationList()
        const respon = await PasienService.getById(id)
        // console.log(id)
        if (respon.success) {
            this.setState({
                PasienModel: respon.result,
                mode: 'edit',
                showModal: true
            })
        }
        
    }

    sureDeleteHandler = async (data) => {
        const respon = await PasienService.delete1(data)
        const respon2 = await PasienService.delete2(data) 
        const respon3 = await PasienService.delete3(data)            

        
        if (respon.success) {
            
            alert('Success : ' + respon.result)
            this.loadList()
        } else {
            alert('Error : ' + respon.result)
        }

        this.setState({
            showModal: false,
            mode: '',
            PasienModel: this.PasienModel
        })
    }

    createHandler = async() => {
        this.getBloodList()
        this.getRelationList()
        // alert("success")
        this.setState({
            PasienModel: this.PasienModel,
            mode: 'add',
            showModal: true
        })
    }

    closeHandler = async () => {
        this.setState({
            PasienModel: this.PasienModel,
            showModal: false,
            errors : {}
                
            
            
        })
        
    }

    changeHandler = name => ({ target: { value } }) => {
        this.setState({
            PasienModel: {
                ...this.state.PasienModel,
                [name]: value
            }
            // errors: {}
        })
    }

    checkHandlerGender = name => ({ target: { checked } }) => {
        this.setState({
            PasienModel: {
                ...this.state.PasienModel,
                [name]: checked
            }
        })
    }

    getBloodList = async () => {
        const respon = await PasienService.getBlood()
        this.setState({
            bloodList: respon.result
        })
    }

    selectedBloodHandler = (selectedOption) => {
        this.setState({
            PasienModel: {  
                ...this.state.PasienModel, 
                // loc_id: selectedOption.value,
                blood: selectedOption.label
            }
        })
    }

    getRelationList = async () => {
        const respon = await PasienService.getRelation()
        this.setState({
            relationList: respon.result
        })
    }

    selectedRelationHandler = (selectedOption) => {
        this.setState({
            PasienModel: {  
                ...this.state.PasienModel, 
                // loc_id: selectedOption.value,
                relation: selectedOption.label
            }
        })
    }

    genderPHandler = () => {
        this.setState({
            PasienModel: {  
                ...this.state.PasienModel, 
                gender : 'P'
            }
        })
    }

    genderWHandler = () => {
        this.setState({
            PasienModel: {  
                ...this.state.PasienModel, 
                gender : 'W'
            }
        })
    }

    // genderHandler = (name,sign) => ({ target: { checked } }) => {
    //     this.setState({
    //         PasienModel: {
    //             ...this.state.PasienModel,
    //             [name]: sign
    //         }
    //     })
    // }


    rhesusMinHandler = () => {
        this.setState({
            PasienModel: {  
                ...this.state.PasienModel, 
                rhesus : 'Rh-'
            }
        })
    }

    rhesusPlusHandler = () => {
        this.setState({
            PasienModel: {  
                ...this.state.PasienModel, 
                rhesus : 'Rh+'
            }
        })
    }

    validationHandler = () => {
        const { PasienModel } = this.state

        let errors = {}
        let formIsValid = true
        //Name
        if (!PasienModel["name"]) {
            formIsValid = false,
                errors["name"] = "Nama tidak boleh kosong"
        }
        if (!PasienModel["gender"]) {
            formIsValid = false,
                errors["gender"] = "Jenis kelamin belum dipilih"
        }
        if (!PasienModel["bod"]) {
            formIsValid = false,
                errors["bod"] = "Tanggal lahir belum diisi"
        }
        if (!PasienModel["relation"]) {
            formIsValid = false,
                errors["relation"] = "Relasi tidak boleh kosong"
        }
        this.setState({ errors: errors })
        return formIsValid
    }

    saveHandler = async () => {
        const { PasienModel, mode ,showModal} = this.state
        if (mode === 'edit') {
            if (this.validationHandler() ) {
                const respon1 = await PasienService.edit1(PasienModel)
                const respon2 = await PasienService.edit2(PasienModel)
                const respon3 = await PasienService.edit3(PasienModel)

                if (respon1.success) {
                    alert('Success : ' + respon1.result)
                    this.loadList()
                    this.setState({
                        PasienModel: this.PasienModel,
                        showModal: false
                    })
                    } else {
                        alert('Error : ' + respon1.result)
                    }
                }
            }
        else {
            if (this.validationHandler()) {
                const respon1 = await PasienService.add1(PasienModel)
                const respon2 = await PasienService.add2(PasienModel)
                const respon3 = await PasienService.add3(PasienModel)
                
                if (respon1.success) {
                    alert('Success : ' + respon1.result)
                    

                    this.loadList()
                    this.setState({
                        PasienModel: this.PasienModel,
                        showModal: false
                    })
                } else {
                    alert('Error : ' + respon1.result)
                }
            }
        }
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
        const { PasienModel } = this.state
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

    checkHandler = (name) => ({ target: { checked } }) => {
        
        this.setState({
            PasienModel: {
                ...this.state.PasienModel,
                [name]: checked
            }
        })
    }

    getForCheck = (data) => {
        
        const {checkedItems} = this.state
        var selectedItem = []

        const item = data.target.name;
        const num = data.target.id
        const isChecked = data.target.checked;
        const {ListDeleteId, ListDeleteName} = this.state

        this.setState(prevState => ({ 
            checkedItems: prevState.checkedItems.set(item, isChecked),
         }))

        if(isChecked){
            this.setState({
                ListDeleteId : [...ListDeleteId, num] ,
                ListDeleteName : [...ListDeleteName, item] 
            })
        } else {
            var idx_id = 0
            var idx_name = 0

            idx_id = ListDeleteId.indexOf(num)
            ListDeleteId.splice(idx_id,1)

            idx_name = ListDeleteName.indexOf(item)
            ListDeleteName.splice(idx_name,1)
        }
        // selectedItem.push(item) 
    }

    multiDeleteHandler = () => {
        const {ListDeleteId} = this.state
        this.setState({
            showModal: true,
            mode: 'multidelete',
            
        })
    }

    sureMultiDelete = async() =>{
        const{ListDeleteId} = this.state

        for(let i=0; i<ListDeleteId.length; i++){
            const respon = await PasienService.multidelete1(ListDeleteId[i])
            const respon2 = await PasienService.multidelete2(ListDeleteId[i]) 
            const respon3 = await PasienService.multidelete3(ListDeleteId[i])
            if (respon.success && (i == (ListDeleteId.length)-1) ) {
            
                alert('Success : ' + respon.result)
                this.loadList()

                
            } 
            
        }

        this.setState({
            showModal: false,
            mode: '',
            ListDeleteId: [],
            ListDeleteName: []
        })
    }

    orderHandler = (val) => {
        // console.log(val)
        const {filter} = this.state
        let page = 1



        if(filter.page != 1){
            this.setState({
                filter : {
                    ...this.state.filter,
                    ["order"]: val,
                    ["page"] : 1
                }
            }, () => this.loadList() )
        }
        else
        {
            this.setState({
                filter : {
                    ...this.state.filter,
                    ["order"]: val
                }
            }, () => this.loadList() )
        }
        
    }

    sortingHandler = () => {
        const { filter } = this.state
        let sort = ''
        sort = filter.order2 == '' ? 'ASC' : 'DESC'
        sort = filter.order2 == 'DESC' ? 'ASC' : 'DESC'

        this.setState({
            filter: {
                ...this.state.filter,
                ["order2"]: sort
            }
        }, () => this.loadList())

    }

    pagesizeHandler = () => {
        const { filter } = this.state
        let number = ''
        number = filter.pagesize == '4' ? '4' : '2'
        number = filter.pagesize == '2' ? '4' : '2'

        this.setState({
            filter: {
                ...this.state.filter,
                ["pagesize"]: number
            }
        }, () => this.loadList())

    }

    renderPagination() {
        let items = []
        let awal = 1
        const { filter, totaldata } = this.state
        console.log(totaldata)
        
        for (let number = 1; number <= totaldata; number++) {
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
            <ul class="pagination" >
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

        const {mode, showModal,PasienModel, bloodList, relationList,errors, ListPasien,filter,ListDeleteId,
            ListDeleteName, selfList,checkedItems} = this.state
        const Checkbox = ({ type = 'checkbox', name, id, checked = false, onChange }) => (
            <input type={type} name={name} id={id} checked={checked} onChange={onChange} />
          );
      
        return (
            <div>
                {JSON.stringify(selfList)}
                {/* {JSON.stringify(ListDeleteId)} */}

                <FormInput
                mode = {mode}
                showModal = {showModal}
                closeHandler={this.closeHandler}
                PasienModel={PasienModel}
                changeHandler = {this.changeHandler}
                bloodList={bloodList}
                selectedBloodHandler={this.selectedBloodHandler}
                relationList={relationList}
                selectedRelationHandler={this.selectedRelationHandler}
                genderPHandler={this.genderPHandler}
                genderWHandler={this.genderWHandler}
                rhesusMinHandler={this.rhesusMinHandler}
                rhesusPlusHandler={this.rhesusPlusHandler}
                saveHandler={this.saveHandler}
                errors={errors}
                sureDeleteHandler={this.sureDeleteHandler}
                genderHandler={this.genderHandler}
                checkedItems = {checkedItems}
                ListDeleteName = {ListDeleteName}
                sureMultiDelete = {this.sureMultiDelete}
                checkHandlerGender = {this.checkHandlerGender}
                

                
               
                />
               

                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>Profile</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Beranda</a></li>
                                    <li class="breadcrumb-item"><a href="./profil">Profil</a></li>
                                    <li class="breadcrumb-item active">Pasien</li>

                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="card card-primary card-outline">
                                    <div class="card-body box-profile">
                                        <div class="text-center">
                                            <img class="profile-user-img img-fluid img-circle"
                                                src='.\dist\img\folder_dokter\avatar04.png'
                                                alt="User profile picture" />
                                        </div>
                                        {selfList.map(item => {
                                                return (
                                                    <h3 class="profile-username text-center">{item.fullname}</h3>

                                                )})}
                                        {/* <h3 class="profile-username text-center">Dea Kurnia Harysandi</h3> */}
                                        <p class="text-muted text-center" style={{ marginBottom: '0' }}>Bronze Member</p>
                                        <p class="text-muted text-center" style={{ marginTop: '0' }}>Since created_on</p>
                                        <ul class="list-group list-group-unbordered mb-3">
                                            <li class="list-group-item">
                                                <a href='./pasien' class="float-left" >Pasien</a>
                                            </li>
                                            <li class="list-group-item">
                                                <a href='#' class="float-left">Pembelian Obat</a>
                                            </li>
                                            <li class="list-group-item">
                                                <a href='#' class="float-left">Rencana Kedatangan</a>
                                            </li>
                                            <li class="list-group-item">
                                                <a href='#' class="float-left">Riwayat Chat Dokter</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* end card md 3 */}
                            
                            {/* begin */}
                           
                            <div class="col-md-9">
                                
                                <div class="card card-primary card-tabs">
                                    <div class="card-header">
                                        Daftar Pasien
                                    </div><br/>
                                    
                                                                <ul class="form-inline">

                                                                    <input class="form-control" type="search" placeholder="Cari nama pasien" aria-label="Search" onChange={this.filterHandler("search")}/>
                                                                    <div class="input-group-append">
                                                                            <button class="btn btn-navbar" type="submit" onClick={this.loadList}>
                                                                                <i class="fas fa-search"></i>
                                                                            </button>
                                                                            <a class="btn btn-navbar" type="submit" style={{marginLeft:'200px'}} >
                                                                                Urutkan 
                                                                            </a>
                                                                            {filter.order==='bi.fullname'?
                                                                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                     Name
                                                                            </button>
                                                                            :
                                                                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                     Age
                                                                            </button>
                                                                            }
                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#" onClick = {()=> this.orderHandler("bi.fullname")}>Name</a>
                                                                                <a class="dropdown-item" href="#" onClick = {()=> this.orderHandler("cu.dob")}>Age</a>
                                                                                
                                                                            </div>
                                                                    </div>

                                                                </ul><br/>

                                                                <ul class="form">
                                                                        <button class="btn btn-info" type="submit" onClick={this.multiDeleteHandler}>Hapus</button>
                                                                        <button class="btn btn-success float-right" type="submit" style={{marginRight:'30px'}} onClick={this.createHandler}>+ Tambah</button>
                                                                        <button class="btn btn-navbar float-right" style={{marginRight:'30px'}} type="submit"  onClick={this.pagesizeHandler}>
                                                                            {filter.pagesize}
                                                                        </button>

                                                                        {filter.order2 === 'ASC' ?
                                                                        <button class="btn btn-navbar float-right" type="submit" style={{marginRight:'20px'}} onClick={this.sortingHandler}>
                                                                            A-Z
                                                                        </button>
                                                                        :
                                                                        <button class="btn btn-navbar float-right" type="submit" style={{marginRight:'20px'}} onClick={this.sortingHandler}>
                                                                            Z-A
                                                                        </button>
                                                                        }
                                                                        
                                                                </ul>
                                                            

                                                              
                                                                <table>
                                                                    <tbody>
                                                                        
                                                                        {selfList.map(item => {
                                                                            if(filter.page==1){
                                                                            return (
                                                                                <tr >
                                                                                <td style={{verticalAlign:'middle',textAlign:'center'}} >
                                                                                    <input type="checkbox" id="active" name="active" onChange={this.checkHandler("active")}/>
                                                                                </td>
                                                                                <td>
                                                                                    <span style={{color:'#008B8B'}}>{item.fullname}</span><br/>
                                                                                    <span>Diri Sendiri, {item.umur} Tahun</span><br/>
                                                                                    <span>{item.chat} chat</span>
                                                                                </td>
                                                                                <td style={{width: '200px',verticalAlign:'middle',textAlign:'center'}}>
                                                                                    <button class="btn " style={{color:'#008B8B'}} onClick={() => this.editHandler(item.id)}>ubah<i class="far fa-edit"></i></button>
                                                                                    <button class="btn "onClick={() => this.deleteHandler(item)}>hapus<i class="far fa-trash-alt" ></i></button>
                                                                                </td>
                                                                                </tr>
                                                                            )
                                                                            }
                                                                        })}
                                                                                
                                                                    {ListPasien.map( data => {
                                                                        return (
                                                                            <tr key={data.id}>
                                                                                <td style={{verticalAlign:'middle',textAlign:'center'}}>
                                                                                {/* <Checkbox name={data.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} /> */}
                                                                                <Checkbox name={data.fullname} id={data.id} checked={this.state.checkedItems.get(data.fullname)} onChange={this.getForCheck} />

                                                                                    {/* <input class="mycheckbox" type="checkbox" id="active" name="active" onClick={()=>this.getForCheck(data)}/> */}
                                                                                </td>
                                                                                <td>
                                                                                    <span style={{color:'#008B8B'}}>{data.fullname}</span><br/>
                                                                                    <span>{data.name}, {data.umur} Tahun</span><br/>
                                                                                    <span>{data.chat} chat, {data.janji} janji</span>
                                                                                </td>
                                                                                <td style={{width: '200px',verticalAlign:'middle',textAlign:'center'}}>
                                                                                    <button class="btn " style={{color:'#008B8B'}} onClick={() => this.editHandler(data.id)}>ubah<i class="far fa-edit"></i></button>
                                                                                    <button class="btn "onClick={() => this.deleteHandler(data)}>hapus<i class="far fa-trash-alt" ></i></button>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                    }
                                                                    </tbody>
                                                                </table>
                                                                           



                                                                
                                                            

                                </div>
                                <div class="float-right">{this.renderPagination()}</div>
                            </div> 
                            
                            
                            {/* end */} 

                        </div>
                        {/* <div class="float-right">{this.renderPagination()}</div> */}
                    </div>
                </section>
                
            </div >
        )
    }
}