import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');


import CrearEmpresa from "./common/components/Empresa/CrearEmpresaContainer";
import Empresas from "./common/components/Empresa/ListadoContainer";

import Proyectos from "./common/components/Proyecto/ListadoContainer";
import ProyectosVendedor from "./common/components/Proyecto/ListadoContainerBy";
import ProyectosTienda from "./common/components/Proyecto/ListadoContainerTienda";

import CrearProyecto from "./common/components/Proyecto/CrearProyectoContainer";
import Compra from "./common/components/Compra/CrearProyectoContainer";
import CompraCliente from "./common/components/Compra/CrearProyectoClienteContainer";

import Reporte from "./common/components/Reportes/reportesContainer";

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <ProtectedRoute exact path="/empresa" component={Empresas} />
                <ProtectedRoute
                    exact
                    path="/empresa/:id/ver"
                    component={CrearEmpresa}
                />
                <ProtectedRoute
                    exact
                    path="/empresa/:id/editar"
                    component={CrearEmpresa}
                />
                <ProtectedRoute
                    exact
                    path="/empresa/create"
                    component={CrearEmpresa}
                />
                

                {/* ---PROYECTOS-- */}
                <Route exact path="/proyecto" component={Proyectos} />
                <ProtectedRoute exact path="/proyectoVendedor" component={ProyectosVendedor} />
                <ProtectedRoute exact path="/tienda" component={ProyectosTienda} />

                <ProtectedRoute
                    exact
                    path="/proyecto/:id/ver"
                    component={CrearProyecto}
                />
                <ProtectedRoute
                    exact
                    path="/proyecto/:id/editar"
                    component={CrearProyecto}
                />
                <ProtectedRoute
                    exact
                    path="/proyecto/create"
                    component={CrearProyecto}
                />
                {/* ---PROYECTOS-- */}

                <ProtectedRoute
                    exact
                    path="/compra/:id/editar"
                    component={Compra}
                />

                <Route
                    exact
                    path="/compraCliente/:id/editar"
                    component={CompraCliente}
                />

                <ProtectedRoute
                    exact
                    path="/reporte"
                    component={Reporte}
                />

                
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
