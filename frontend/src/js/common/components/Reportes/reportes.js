import React, {Component} from 'react';

import {
    renderCurrency,
    renderNumber,
    renderFilePicker,
    renderTextArea,
} from "Utils/renderField/renderField";

class Reporte extends Component{

    componentWillMount = () => {
        const { reportePrincipal } = this.props;
        reportePrincipal();
    };

    render(){
        const {data} = this.props;
        console.log("datasf", data);
        return(
            <div>
                <h3></h3>
                <table className = 'table table.bordered'>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Total de Productos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.listado_con_vehiculo.map((registro, i)=>(
                            <tr key={i}>
                                <td>{registro.username}</td>
                                <td>{registro.total_vehiculos}</td>
                                <td><renderCurrency value={registro.total_gastado}></renderCurrency></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Reporte