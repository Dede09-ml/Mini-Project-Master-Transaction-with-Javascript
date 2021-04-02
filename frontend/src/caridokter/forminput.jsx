import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'

export default class FormInput extends React.Component {

    constructor(){
        super()
        this.state = {
            selectedOption: {},
            
        }
    }



    render() {
        const {showModal, closeHandler, selectedLocHandler, locationList, spesList, selectedSpesHandler,
        treatList, selectedTreatHandler, searchList, searchHandler, 
        changeHandler, CariModel, errors, clearHandler} = this.props

        let options = locationList.map(function (item){
            return {value: item.id, label: item.name }
        })

        let options2 = spesList.map(function (item){
            return {value: item.id, label: item.name }
        })

        let options3 = treatList.map(function (item){
            return {value: item.id, label: item.name }
        })
 
        return (
            <div>
                {/* {JSON.stringify(treatList)} */}
                
              <Modal show={showModal} style={{ opacity: 1 }} onHide={closeHandler}>
                <Modal.Header closeButton>
                <Modal.Title>
                        Cari Dokter
                </Modal.Title>
                </Modal.Header>

                
                <Modal.Body>
                   {/* {JSON.stringify(CariModel)} */}

                    <p>Masukkan minimal 1 kata kunci untuk pencarian dokter anda</p>
                    <label class="control-label" for="lokasi">Lokasi</label><br />
                    {/* <input class="form-control" type="text" id="lokasi" name="lokasi" /><br /> */}
                    {/* <span style={{color: "red"}}>{errors["name"]}</span><br/> */}
                    <Select
                        name="Lokasi"
                        value={{label : CariModel.loc_name}}
                        onChange = {selectedLocHandler}
                        options={options}
                    /><br/>

                    <label class="control-label" for="name">Nama Dokter</label><br />
                    <input class="form-control" type="text" id="name" name="name"  value={CariModel.name} onChange={changeHandler("name")} /><br />

                    <label class="control-label" for="spes">Spesialisasi/Sub-Spesialisasi*</label><br />
                    {/* <input  class="form-control" type="text" id="spes" name="spes" /><br /> */}
                    <Select
                        name="Spesialization"
                        value={{label : CariModel.spes}}
                        onChange = {selectedSpesHandler}
                        options={options2}
                    />
                    <span style={{color: "red"}}>{errors["spes"]}</span><br/>
                    <br/>

                    <label class="control-label" for="tind">Tindakan Medis</label><br />
                    {/* <input class="form-control" type="text" id="tind" name="tind" /><br /> */}
                    <Select
                        name="Treatment"
                        value={{label : CariModel.treatment}}
                        onChange = {selectedTreatHandler}
                        options={options3}
                    /><br/>
                    
                </Modal.Body>
               
                <Modal.Footer>
                    <button onClick={clearHandler}>Atur Ulang</button>
                    <button type="button" classname="btn btn-info" onClick={searchHandler}>Cari</button>
                </Modal.Footer>
                    
            </Modal>
            </div>
        )
    }
}