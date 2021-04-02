import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'

import './index.css'

export default class Index extends React.Component {
    
    constructor() {
        super()
        this.state = {
            mode:''


        }
    }



    render() {

        const {mode} = this.state
      
        return (
            <div>
               

               <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>Profile</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Beranda</a></li>
                                    <li class="breadcrumb-item active">Profil</li>
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
                                        <h3 class="profile-username text-center">fullname</h3>
                                        <p class="text-muted text-center" style={{ marginBottom: '0' }}>Bronze Member</p>
                                        <p class="text-muted text-center" style={{ marginTop: '0' }}>Since created_on</p>
                                        <ul class="list-group list-group-unbordered mb-3">
                                            <li class="list-group-item">
                                                <a href='./pasien' class="float-left">Pasien</a>
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

                            <div class="col-md-9">
                                <div class="card card-primary card-tabs">
                                    <div class="card-header p-0 pt-1">
                                        <ul class="nav nav-tabs" id="custom-tabs-five-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="custom-tabs-five-overlay-tab" data-toggle="pill" href="#profil" role="tab" aria-controls="custom-tabs-five-overlay" aria-selected="true"><strong>Profil</strong></a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="custom-tabs-five-overlay-dark-tab" data-toggle="pill" href="#pembayaran" role="tab" aria-controls="custom-tabs-five-overlay-dark" aria-selected="false"><strong>Pembayaran</strong></a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="custom-tabs-five-normal-tab" data-toggle="pill" href="#alamat" role="tab" aria-controls="custom-tabs-five-normal" aria-selected="false"><strong>Alamat</strong></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content" id="custom-tabs-five-tabContent">
                                            <div class="tab-pane fade show active" id="profil" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-tab">
                                                <div class="card card-primary">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-9 col-sm-6 col-md-6">
                                                                <div class="float-sm-right">
                                                                    <a href='#'>
                                                                        <i class="fas fa-pencil-alt mr-1"></i>
                                                                    Ubah
                                                                    </a>
                                                                </div>
                                                                <strong><i class="far fa-file-alt mr-1" style={{ marginBottom: '1.5rem' }}></i> Data Pribadi</strong>
                                                                <p style={{ marginBottom: '0.5rem' }}>Nama Lengkap</p>
                                                                <span class="text-muted" style={{ marginBottom: '0rem' }}>fullname</span>
                                                                <hr />

                                                                <p style={{ marginBottom: '0.5rem' }}>Tanggal Lahir</p>
                                                                <span class="text-muted" style={{ marginBottom: '0rem' }}>dob</span>
                                                                <hr />
                                                                <p style={{ marginBottom: '0.5rem' }}>Nomor Handphone</p>
                                                                <span class="text-muted" style={{ marginBottom: '0rem' }}>mobile_phone</span>
                                                                <hr />
                                                            </div>

                                                            <div class="col-6 col-sm-6 col-md-6">
                                                                <strong><i class="far fa-user mr-1" style={{ marginBottom: '1.5rem' }}></i> Data Akun</strong>
                                                                <p style={{ marginBottom: '0.5rem' }}>Email
                                                                <div class="float-sm-right">
                                                                        <a href='#' onClick={""}>
                                                                            <i class="fas fa-pencil-alt mr-1"></i>
                                                                            Ubah
                                                                        </a>
                                                                    </div>
                                                                </p>
                                                                <span class="text-muted" style={{ marginBottom: '0rem' }}>email</span>
                                                                <hr />
                                                                <p style={{ marginBottom: '0.5rem' }}>Password
                                                                <div class="float-sm-right">
                                                                        <a href='#'>
                                                                            <i class="fas fa-pencil-alt mr-1"></i>
                                                                            Ubah
                                                                        </a>
                                                                    </div>
                                                                </p>
                                                                <input type="password" class="text-muted" style={{ marginBottom: '0rem' }}
                                                                    readOnly="readonly"></input>
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="pembayaran" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-dark-tab">
                                                <input type="text" ></input>
                                            </div>
                                            <div class="tab-pane fade" id="alamat" role="tabpanel" aria-labelledby="custom-tabs-five-normal-tab">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        )
    }
}