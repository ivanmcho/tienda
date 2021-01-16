import React, { Component } from "react";
import Formulario from "./Formulario";

class CrearEmpresa extends Component {
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
        const { match, crear, location } = this.props;
        const funcionEnvio = match.params.id
            ? this.actualizarFormulario
            : crear;

        return (
            <div className="d-flex flex-column w-100">
                <Formulario
                    onSubmit={funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    ver={location.pathname.includes("ver")}
                />
            </div>
        );
    }
}

export default CrearEmpresa;
