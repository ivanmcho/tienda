import React, { Component } from "react";
import PropTypes from "prop-types";
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";


class Sucursal extends Component {
    componentWillMount = () => {
        this.props.listar();
    };

    render() {
        console.log("ESTADO: ", this.props);
        const {
            data,
            loader,
            searchChange,
            onPageChange,
            onSortChange,
            eliminar,
            listar,
            page,
        } = this.props;

        return (
            <div className="d-flex flex-column w-100 px-3">
                <div className="page-header pl-1 pt-3 no-gutters row">
                    <div className="text-sm-left text-center text-md-left mb-sm-0 col-12 col-sm-4">
                        <div
                            style={{
                                border: "1px solid #B3B8BC",
                                borderRadius:
                                    "0.8640833497047424px 22px 22px 0.8640833497047424px",
                                width: 100,
                                height: 25,
                                lineHeight: "23px",
                                textAlign: "center",
                                letterSpacing: "-0.36px",
                            }}
                            className="txt-12"
                        >
                            Empresas
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-wrap mb-2  mt-4">
                    <h3 className="txt-22-n color-003 w-50">empresas</h3>

                    <div className="d-flex flex-row justify-content-between align-items-center flex-fill ">
                        <a className="btn-primario2" href="/#/empresa/create">
                            Agregar Empresa
                        </a>

                        <div className="flex-fill d-flex align-items-center ml-3">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => searchChange(e.target.value)}
                                placeholder="Buscar..."
                                style={{
                                    border: "2px solid #E5E5E5",
                                    borderRadius: "12px",
                                    paddingRight: "35px",
                                }}
                            />

                        </div>
                    </div>
                </div>
                <Grid
                    data={data}
                    loading={loader}
                    onPageChange={listar}
                    onSortChange={onSortChange}
                    page={page}
                >
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "empresa",
                            // ver: "empresa",
                            eliminar,
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                    <TableHeaderColumn isKey dataField="nombre" dataSort>
                        Nombre
                    </TableHeaderColumn>
                </Grid>
            </div>
        );
    }
}

export default Sucursal;
