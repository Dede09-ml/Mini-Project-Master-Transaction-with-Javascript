import React from 'react'

class Header extends React.Component {
    render() {
        return (
            <div>
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            </ul>
            
        <div class='col'>
            <div class="input-group input-group-sm">
             <div class="input-group-append">
            
            </div>
            </div>
        </div>
        {/* <div class="user-panel mt-3 pb-3 d-flex">
        <div class="image">
        <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"/>
        </div>
        <div class="info">
        <a href="#" class="d-block">Alexander Pierce</a>
        </div>
    </div> */}
        
        </nav>
        <aside class="main-sidebar sidebar-dark-primary elevation-4" style={{backgroundColor:'#b8e2f2'}}>
<a href="index3.html" class="brand-link mt-3">
  <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
    />
  <span class="brand-text font-weight-bold">MED.ID</span>
</a>
<div class="sidebar" style={{marginTop:'50px'}}>

  <nav class="mt-2">
    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

      <li class="nav-item has-treeview menu-open">
                                <ul class="nav nav-treeview">
                                    <li class="nav-item has-treeview">
                                        <a href="./relation" class="nav-link">
                                        {/* <i class="fas fa-users"></i> */}
                                            <p>
                                                HUBUNGAN PASIEN
                                            </p>
                                        </a>
                                    </li>
                                </ul>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item has-treeview">
                                        <a href="./caridokter" class="nav-link">
                                        {/* <i class="fas fa-search"></i> */}

                                            <p>
                                                CARI DOKTER
                                            </p>
                                        </a>
                                    </li>
                                </ul>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item has-treeview">
                                        <a href="./carabayar" class="nav-link">
                                        {/* <i class="fas fa-money-bill-wave"></i> */}

                                            <p>
                                                CARA PEMBAYARAN
                                            </p>
                                        </a>
                                    </li>
                                </ul>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item has-treeview">
                                        <a href="./profil" class="nav-link">
                                        {/* <i class="fas fa-money-bill-wave"></i> */}

                                            <p>
                                                PROFIL
                                            </p>
                                        </a>
                                    </li>
                                </ul>
      </li>
    </ul>
  </nav>

</div>
</aside>



        </div>
                            )
                        }
                    }
export default Header