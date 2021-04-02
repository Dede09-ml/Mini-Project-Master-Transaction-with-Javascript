import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'

export default class FormInput extends React.Component {
    render() {
        const {showModal, closeHandler, changeHandler, saveHandler, PayModel, mode, errors,
        sureDeleteHandler} = this.props
        return (
            <div>
                {/* {JSON.stringify(PayModel)} */}
               <Modal show={showModal} style={{ opacity: 1 }} onHide={closeHandler}>
                <Modal.Header closeButton>
                
        {mode === 'add' ? <Modal.Title>Tambah Data</Modal.Title> : <div></div> }
        {mode === 'edit' ? <Modal.Title>Ubah Data</Modal.Title> : <div></div> }
        {mode === 'delete' ? <Modal.Title>Hapus Data</Modal.Title> : <div></div> }


                </Modal.Header>

                {mode === 'delete'?
                    <Modal.Body>
                        <div className="modal-body">
                            <p>Anda akan menghapus {PayModel.name} ?</p>
                        </div>
                    </Modal.Body>
                    :
                <Modal.Body>
                    
                    <label for="name">name:</label><br />
                    <input type="text" id="name" name="name" value={PayModel.name} onChange={changeHandler("name")} /><br />
                    <span style={{color: "red"}}>{errors["name"]}</span><br/>
                    
                </Modal.Body>
                }

                {mode === 'delete' ?
                <Modal.Footer>
                     <button type="button" classname="btn btn-default" onClick={() => sureDeleteHandler(PayModel)} >Ya</button>
                     
                     <button type="button" classname="btn btn-default" data-dismiss="modal" onClick={closeHandler}>Tidak</button>
                </Modal.Footer>
                    :
                <Modal.Footer>
                    <button onClick={saveHandler}>Simpan</button>
                    <button type="button" classname="btn btn-default" data-dismiss="modal" onClick={closeHandler}>Batal</button>
                </Modal.Footer>
                    }
            </Modal>
            </div>
        )
    }
}