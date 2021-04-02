import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import { PassThrough } from 'stream';

export default class FormInput extends React.Component {

    constructor(){
        super()
        this.state = {
            selectedOption: {}
        }
    }

    render() {
        const {showModal, closeHandler, mode, PasienModel, changeHandler, bloodList, selectedBloodHandler,
        relationList, selectedRelationHandler, genderPHandler, genderWHandler,
        rhesusMinHandler, rhesusPlusHandler,saveHandler,errors,sureDeleteHandler,
        genderHandler,checkedItems, ListDeleteName, sureMultiDelete, checkHandlerGender } = this.props
        
        let options = bloodList.map(function (item){
            return {value: item.id, label: item.code }
        })

        let options2 = relationList.map(function (item){
            return {value: item.id, label: item.name }
        })



        return (
            <div>
                {/* {JSON.stringify(RelationModel)} */}
               <Modal show={showModal} style={{ opacity: 1 }} onHide={closeHandler}>
                {JSON.stringify(PasienModel)}

                <Modal.Header closeButton>
                
        {mode === 'add' ? <Modal.Title>Tambah Data</Modal.Title> : <div></div> }
        {mode === 'edit' ? <Modal.Title>Ubah Data</Modal.Title> : <div></div> }
        {mode === 'delete' ? <Modal.Title>Hapus Data</Modal.Title> : <div></div> }


                </Modal.Header>

                {mode === 'delete'? 
                    <Modal.Body>
                        <div className="modal-body">
                            <p>Anda yakin akan menghapus pasien</p>
                            <p style={{fontSize:'15pt', marginLeft:'30px'}}>{PasienModel.fullname} </p>
                            <span>Riwayat medis pasien akan tetap tersimpan,
                            namun Anda tidak dapat lagi membuat janji
                            dokter/chat online untuk pasien ini</span>

                        </div>
                    </Modal.Body>
                    : 
                    mode==='multidelete' ?
                    <Modal.Body>
                    <div className="modal-body">
                        <p>Anda yakin akan menghapus pasien</p>
    
                        {ListDeleteName.map(list => {
                            return (
                                <div>
                                <p style={{fontSize:'15pt', marginLeft:'30px'}}>{list} </p>
                                </div>
                            )
                        })}
    
                        <span>Riwayat medis pasien akan tetap tersimpan,
                        namun Anda tidak dapat lagi membuat janji
                        dokter/chat online untuk pasien ini</span>
    
                    </div>
                    </Modal.Body>   
                    :
                <Modal.Body>
                    
                    <label class="control-label" for="name">Nama Lengkap*</label><br />
                    <input class="form-control" type="text" id="name" name="name"  value={PasienModel.name} onChange={changeHandler("name")} />
                     <span style={{color: "red"}}>{errors["name"]}</span><br/><br />
                    <label class="control-label" for="bod">Tanggal Lahir*</label><br />
                    <input class="form-control" type="date" id="bod" name="bod"  value={PasienModel.bod} onChange={changeHandler("bod")} />
                     <span style={{color: "red"}}>{errors["bod"]}</span><br/><br />
                   
                    <label class="control-label" for="jk">Jenis Kelamin*</label>

                  
                    {/* <input type="radio" id="pria" name="jk" style={{marginLeft:'120px'}} checked={PasienModel.gender==="P"} onChange={checkHandlerGender("gender")}/><a>Pria</a>
                    <input type="radio" id="wanita" name="jk" style={{marginLeft:'70px'}} checked={PasienModel.gender==="W"} onChange={checkHandlerGender("gender")}/><a>Wanita</a><br/>
                     */}
                    
                    <input type="radio" id="pria" name="jk" style={{marginLeft:'120px'}} value="P" checked={PasienModel.gender==="P"} onChange={changeHandler("gender")}/><a>Pria</a>
                    <input type="radio" id="wanita" name="jk" style={{marginLeft:'70px'}} value="W" checked={PasienModel.gender==="W"}  onChange={changeHandler("gender")}/><a>Wanita</a><br/>
                    {/* <input type="radio" id="jk" name="jk" style={{marginLeft:'120px'}} onClick={genderPHandler}/><a>Pria</a>
                    <input type="radio" id="jk" name="jk" style={{marginLeft:'70px'}} onClick={genderWHandler}/><a>Wanita</a><br/> */}
                    <span style={{color: "red"}}>{errors["gender"]}</span><br/><br/>
                    
                    
                    <label class="control-label" for="gd">Golongan Darah/Rhesus</label><br/>                    
                    <div class="row">
                        <div class="col-md-5">
                            <Select
                            name="blood"
                            value={{label : PasienModel.blood}}
                            onChange = {selectedBloodHandler}
                            options={options}
                            />
                        </div>
                        <div>
                           
                        <input type="radio" id="gd" name="pos" style={{marginLeft:'40px'}} value="Rh+" checked={PasienModel.rhesus==="Rh+"} onChange={changeHandler("rhesus")}/><a>Rh+</a>
                        <input type="radio" id="gd" name="neg" style={{marginLeft:'70px'}} value="Rh-" checked={PasienModel.rhesus==="Rh-"} onChange={changeHandler("rhesus")}/><a>Rh-</a><br/><br/>
                            
                        </div>
                    </div>
                    

                    <label class="control-label" for="name">Tinggi Badan</label>
                    <label class="control-label" for="name" style={{marginLeft:'130px'}} >Berat Badan</label><br></br>
                    <input class="form" type="text" id="name" name="name" value={PasienModel.height} onChange={changeHandler("height")}/><a>cm</a>
                    <input class="form" type="text" id="name" name="name" style={{marginLeft:'40px'}} value={PasienModel.weight} onChange={changeHandler("weight")}/><a>kg</a><br/><br/>

                    <label class="control-label" for="name">Relasi*</label><br />
                    <Select
                        name="relation"
                        value={{label : PasienModel.relation}}
                        onChange = {selectedRelationHandler}
                        options={options2}
                    /> 
                     <span style={{color: "red"}}>{errors["relation"]}</span><br/>

                    
                </Modal.Body>
                }

                {/* {mode==='multidelete' ?
                <Modal.Body>
                <div className="modal-body">
                    <p>Anda yakin akan menghapus pasien</p>

                    {ListDelete.map(list => {
                        return (
                            <div>
                            <p style={{fontSize:'15pt', marginLeft:'30px'}}>{list} </p>
                            </div>
                        )
                    })}

                    <span>Riwayat medis pasien akan tetap tersimpan,
                    namun Anda tidak dapat lagi membuat janji
                    dokter/chat online untuk pasien ini</span>

                </div>
                </Modal.Body>   
                :
                <Modal.Body>
                    <div></div>
                </Modal.Body>
                } */}

                {mode === 'delete' ?
                <Modal.Footer>
                     <button type="button" classname="btn btn-default" onClick={()=> sureDeleteHandler(PasienModel)} >Ya</button>
                     
                     <button type="button" classname="btn btn-default" data-dismiss="modal" onClick={closeHandler}>Tidak</button>
                </Modal.Footer>
                    :
                mode === 'multidelete' ?
                <Modal.Footer>
                     <button type="button" classname="btn btn-default" onClick={sureMultiDelete} >Ya</button>
                     
                     <button type="button" classname="btn btn-default" data-dismiss="modal" onClick={closeHandler}>Tidak</button>
                </Modal.Footer>
                    :
                <Modal.Footer>
                    <button onClick={saveHandler} >Simpan</button>
                    <button type="button" classname="btn btn-default" data-dismiss="modal" onClick={closeHandler}>Batal</button>
                </Modal.Footer>
                    }
            </Modal>
            </div>
        )
    }
}