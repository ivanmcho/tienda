import React, { Component } from "react";
import Formulario from "./FormularioCliente";

class CrearProyecto extends Component {
    componentWillMount = () => {
        const { match, leer } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            leer(id);
        }
    };

    actualizarFormulario = (data) => {
        const { editar } = this.props;
        editar(data.id, data);
    };

    render() {
        const {
            match,
            registrarProyecto,
            crear,
            registrarEmpresa,
            location,
            valorPro,
            crearCompra,
        } = this.props;

        const funcionEnvio = match.params.id
            ? this.actualizarFormulario
            : crear;

        // const {showForm, show_form} = this.props;

        console.log("Crear Proyecto", this.props);
        return (
            <div className="d-flex flex-column w-100">
                <Formulario
                    onSubmit={crearCompra}
                    funcionRegistro={this.props.funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    ver={location.pathname.includes("ver")}
                    registrarEmpresa={registrarEmpresa}

                    // showForm={showForm}
                    // show_form={show_form}
                />
            </div>
        );
    }
}

export default CrearProyecto;
