import React from 'react'
import Header from './layout/header'
import Footer from './layout/footer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import relationIndex from './relation'
import cariDokterIndex from './caridokter'
import caraBayarIndex from './carabayar'
import profilIndex from './profil'
import pasienIndex from './pasien'




class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div class="wrapper">
                    <Header />
                    <div class="content-wrapper">
                        <section class="content">
                            <Switch>
                                <Route exact path = '/relation' component = {relationIndex}></Route>
                                <Route exact path = '/caridokter' component = {cariDokterIndex}></Route>
                                <Route exact path = '/carabayar' component = {caraBayarIndex}></Route>
                                <Route exact path = '/profil' component = {profilIndex}></Route>
                                <Route exact path = '/pasien' component = {pasienIndex}></Route>




                            </Switch>
                        </section>
                    </div>
                </div>
                <Footer />

            </BrowserRouter>

        )
    }
}


export default App