import React from 'react'

class Sidebar extends React.Component {
    render() {
        return (
            <div>
                <aside class="main-sidebar sidebar-dark-primary elevation-4">
                    <a href="index.html" class="brand-link">
                        <img src="./dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" />
                        <span class="brand-text font-weight-light">AdminLTE 3</span>
                    </a>

                    <div class="sidebar">
                        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div class="image">
                                <img src="./dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div class="info">
                                <a href="#" class="d-block">Alexander Pierce</a>
                            </div>
                        </div>

                        <nav class="mt-2">
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* <!-- Add icons to the links using the .nav-icon class with font-awesome or any other icon font library --> */}
                                <li class="nav-item has-treeview menu-open">
                                    <a href="#" class="nav-link active">
                                        <i class="nav-icon fas fa-tachometer-alt"></i>
                                        <p>
                                            Dashboard
                                            <i class="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <a href="/category" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Category</p>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="./product" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Product</p>
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </li>
                                <li class="nav-item has-treeview">
                                    <a href="./etalase" class="nav-link">
                                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                        <p>
                                             ETALASE   
                                        </p>
                                    </a>
                                </li>
                                <li class="nav-item has-treeview">
                                    <a href="./relation" class="nav-link">
                                        <p>
                                            HUBUNGAN PASIEN   
                                        </p>
                                    </a>
                                </li>
                                



                            </ul>
                        </nav>
                    </div>
                </aside>
            </div>
        )
    }
}

export default Sidebar