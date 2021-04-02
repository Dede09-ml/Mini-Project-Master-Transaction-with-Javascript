import React from 'react'
import './index.css'
import CariDokterService from '../service/cariDokterServices'
import FormInput from './forminput'

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export default class Index extends React.Component {

    CariModel = {
        // loc_id : 0,
        loc_name : '',
        name : '',
        spes : '',
        treatment : '',
        page : 1,
        pagesize : '4'
    }


    constructor() {
        super()
        this.state = {
            locationList : [],
            spesList : [],
            treatList : [],
            CariModel : this.CariModel,
            RSList : [],
            scheduleList :[],

            errors:{},
            searchList :[],
            showModal : true,
            mode : '',
            // filter : {
            //     page : '1'
            // },
            
            totaldata : 1

        }
        this.getLocationList()
        this.getSpesList()
        this.getTreatList()
    
    
    
       
            
    }

    

    changeHandler = name => ({ target: { value } }) => {
        this.setState({
            CariModel: {
                ...this.state.CariModel,
                [name]: value
            }
            // errors: {}
        })
    }
    
    
    closeHandler = async () => {
        this.setState({
            // RelationModel: this.RelationModel,
            showModal: false,
            errors : {
                spes : ''
            }
        })
    }

    modalHandler = async () => {
        this.getLocationList()
        this.getSpesList()
        this.getTreatList()
        this.setState({
            CariModel: this.CariModel,
            // searchList:[],
            showModal: true,
            errors : {
                spes : ''
            }
        })
    }

    selectedLocHandler = (selectedOption) => {
        this.setState({
            CariModel: {  
                ...this.state.CariModel,
                loc_name: selectedOption.label,
                // name : '',
                // spes : '',
                // treatment : ''

            }
        })
    }

    getLocationList = async () => {
        const respon = await CariDokterService.getLoc()
        this.setState({
            locationList: respon.result
        })
    }

    selectedSpesHandler = (selectedOption) => {
        this.setState({
            CariModel: { 
                ...this.state.CariModel, 
                // loc_id: selectedOption.value,
                spes: selectedOption.label,
                treatment : ''
            }
        })
    }

    getSpesList = async () => {
        const respon = await CariDokterService.getSpes()
        this.setState({
            ...this.state.CariModel, 
            spesList: respon.result
        })
    }


    selectedTreatHandler = (selectedOption) => {
        this.setState({
            CariModel: {  
                ...this.state.CariModel, 
                // loc_id: selectedOption.value,
                treatment: selectedOption.label
            }
        })
    }

    getTreatList = async () => {
        const respon = await CariDokterService.getTreat()
        this.setState({
            treatList: respon.result
        })
    }

    validationHandler = () => {
        const { CariModel } = this.state

        let errors = {}
        let formIsValid = true
        //Name
        if (!CariModel["spes"]) {
            formIsValid = false,
            errors["spes"] = "* Pilihan spesialisasi harus diisi"
                
        }

        this.setState({ errors: errors })
        return formIsValid
    }


    searchHandler = async (fullname) => {
        this.getScheduleList()
        const {searchList, CariModel} = this.state
        // const respon = await CariDokterService.showSearch(CariModel)
        // console.log(respon)
        // if (respon.success) {
            // this.setState({
            //     mode : 'search'
            // })
        // }     
      

        if (this.validationHandler()) {
            const {CariModel} = this.state
            const respon = await CariDokterService.showSearch(CariModel) 
            const countdata = await CariDokterService.countdata(CariModel) 
           this.getRSHandler()
            

            if (respon.success) {
                this.setState({
                    searchList: respon.result,
                    showModal : false,
                    mode : 'search',
                    totaldata: Math.ceil(countdata.result[0].count / CariModel.pagesize)
                })
                
            } else {
                alert('Error : ' + respon.result)
            }
        }
    }

    clearHandler = async () => {
        this.setState({
            CariModel : this.CariModel,
            // searchList :[],
            showModal : true
        })
    }

    getRSHandler = async () => {
        const respon = await CariDokterService.getRS() 
        if (respon.success) {
            this.setState({
                RSList: respon.result
            })
        }
    }

    getScheduleList = async () => {
        const respon = await CariDokterService.getSchedule() 
        if (respon.success) {
            this.setState({
                scheduleList: respon.result
            })
        }
    }

    componentDidMount() {
        
        this.loadList()
        localStorage.setItem('id', 2)
    }
    loadList = async () => {
        // this.searchHandler()
        
    }

    onChangePage = (number) => {
        const { CariModel } = this.state
        // console.log(CariModel)
        this.setState({
            CariModel : {
                ...this.state.CariModel,
                ["page"] : number
            }
        }, ()=> this.searchHandler() )
        

    }

    renderPagination() {
        let items = []
        const { CariModel, totaldata } = this.state
        // console.log(CariModel)
        for (let number = 1; number <= totaldata; number++) {
            items.push(
                <PaginationItem key={number} active={number === CariModel.page}>
                    <PaginationLink onClick={() => this.onChangePage(number)} >
                        {number}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        return (
            <Pagination>{items}</Pagination>
        )
    }
   


    render() {
        const {showModal, locationList, CariModel, spesList, treatList, searchList, errors,mode,RSList,scheduleList} = this.state

           return (
               <div>
                   {/* {JSON.stringify(scheduleList)} */}
                  
                        {/* <button class="btn btn-success btn-lg" onClick={this.modalHandler}>
                    
                            <i class="fas fa-search"></i>
                        </button> */}
                    {/* <div class="col-lg-3 col-6">               
                        <div class="small-box bg-info" >
                             <div class="inner" style={{width : '150px', height : '100px'}}>
                                 <i class="fas fa-search pull-right" style={{fontSize : '50px'}}></i> 
                             </div>
                             <a href="#" class="small-box-footer">
                                 Cari Dokter
                            </a>
                        </div>
                     </div> */}
                    
                    <FormInput 
                    changeHandler = {this.changeHandler}
                    showModal = {showModal}
                    closeHandler = {this.closeHandler}
                    selectedLocHandler={this.selectedLocHandler}
                    locationList={locationList}
                    CariModel={CariModel}
                    spesList={spesList}
                    selectedSpesHandler={this.selectedSpesHandler}
                    treatList={treatList}
                    selectedTreatHandler={this.selectedTreatHandler}
                    searchList={searchList}
                    searchHandler={this.searchHandler}
                    errors={errors}
                    clearHandler={this.clearHandler}
                    RSList={RSList}
                     />
                     

                    <br></br>
                    
                    <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-1">
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-left">
                                    <li class="breadcrumb-item"><a href="index3.html">Beranda</a></li>
                                    <li class="breadcrumb-item active">Cari Dokter</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                    {mode === 'search' ? 
                     <div style={{textAlign:'right'}}>
                     <button class="btn btn-lg" style={{backgroundColor:'#b8e2f2'}} onClick={this.modalHandler}>
                        Ulangi pencarian
                    </button>
                     
                        <div class="float-left" style={{marginLeft:'10px',fontSize:'10pt',textAlign:'left'}}>
                            Hasil pencarian berdasarkan kata kunci:
                            {CariModel.loc_name ===''? <a></a> : <a> Lokasi {CariModel.loc_name}, </a>}
                            {CariModel.spes ===''? <a></a> : <a> Spesialisasi : {CariModel.spes},</a>}
                            {CariModel.treatment ===''? <a></a> : <a> Tindakan : {CariModel.treatment},</a>}
                            {CariModel.name ===''? <a></a> : <a> Nama dokter : {CariModel.name}</a>}
                        </div>
                    </div> 
                    
                                 
                    :
                    <div></div> 
                    }     
                    
                                                         

                    <br></br>
                     <div class="row">
                         
                     {searchList.map(data => {
                           
                            return (
                            
                                            <div class="col-lg-6 col-6">
                                                {/* {JSON.stringify(data)} */}
                                                <div class="small-box" style={{borderStyle:'solid', borderWidth:'5px',borderColor:'#b8e2f2'}}>
                                                    <div class="inner">
                                                        <img class="rounded-circle float-right" style={{width :'100px', height:'100px'}} src={data.image_path} />

                                                        <h1>{data.fullname}</h1>
                                                        <span>{data.specialization}</span><br/>

                                                        <span>{data.pengalaman} Tahun Pengalaman</span><br/>
                                                        
                                                        {RSList.map(item => {
                                                            if(item.fullname === data.fullname){
                                                                
                                                                return (
                                                                    <div>
                                                                    
                                                                 <span>{item.location}</span> <br/>
                                                                    
                                                                    </div>
                                                                )
                                                            }
                                                        })}

                                                        {scheduleList.map(sc => {
                                                            if(sc.fullname === data.fullname && sc.jam_sekarang>=parseInt(sc.start) && sc.jam_sekarang<=parseInt(sc.end) && sc.hari_ini == sc.day){
                                                                
                                                                return (
                                                                    <div>
                                                                    
                                                                    <button class="btn float-right"  style={{backgroundColor:'#00FA9A'}} >Chat</button><br/><br/>

                                                                    
                                                                    </div>
                                                                )
                                                            } else if(sc.fullname === data.fullname){
                                                                return (
                                                                    <div>
                                                                    
                                                                    <button class="btn float-right"  style={{backgroundColor:'#A9A9A9'}} >Offline</button><br/><br/>

                                                                    
                                                                    </div>
                                                                )
                                                            }
                                                        })}


                                                        {/* <p>{data.location}</p> */}
                                                       {/* <button class="btn float-right"  style={{backgroundColor:'#b8e2f2'}} >Chat</button><br/><br/> */}
                                                        <button class="btn" type="button" style={{backgroundColor:'#b8e2f2', marginLeft:'170px'}}>Lihat info lebih banyak</button>
                                                        
                                                        <button class="btn btn-info float-right" >Buat Janji</button>
                                                  
                                                    </div>
                                                    <div class="row">
                                                         </div><br></br>
                                                </div>
                                            </div>

                            

                                )
                            
                        })
                    }

                    
                </div>
                {mode === 'search' ?
                this.renderPagination()
                :
                <div></div>}
               </div>           
                 
        )
    }


}
