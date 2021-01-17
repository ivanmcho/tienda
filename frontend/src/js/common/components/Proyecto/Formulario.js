import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField, AsyncSelectField } from "../Utils/renderField";
import { phone } from "../../../utility/validation";
import { api } from "../../../utility/api";
// import CreateModal from '../Utils/renderField/createModal';
import createSelect from "../Utils/renderField/createSelect";
import FormularioEmpresa from "../Empresa/Formulario";
import Modal from "../Utils/Modal/ReactModal";
import {
    renderCurrency,
    renderNumber,
    renderFilePicker,
    renderTextArea,
} from "Utils/renderField/renderField";

const validate = (values) => {
    const errors = {};
    if (!values.nombre) {
        errors.nombre = "Campo requerido";
    }

    if (!values.empresa) {
        errors.empresa = "Campo requerido";
    }

    return errors;
};

const getEmpresas = (search) => {
    let empresas = [];
    return api
        .get("empresa", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((empresa) => {
                    empresas.push({ value: empresa.id, label: empresa.nombre });
                });
            }

            return empresas;
        })
        .catch(() => {
            return [];
        });
};

const ProyectoForm = (props) => {
    const { handleSubmit, actualizar, ver, isNested } = props;

    const {
        showForm,
        show_form,
        registrarEmpresa,
        funcionEnvio,
        funcionRegistro,
        value,
        valorPro,
    } = props;

    return (
        <div className="d-flex flex-column w-100">
            <form onSubmit={handleSubmit}>
                {!isNested && <br></br>}
                <div
                    className={`${!isNested && "card card-small mb-4 p-4 "}`}
                    style={{
                        maxWidth: 530,
                    }}
                >
                    <div>
                        <h3 className="m-0 txt-22-n color-003">
                            {actualizar ? "Actualizar" : "Crear"} Proyecto
                        </h3>
                    </div>

                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-2">
                            <label className="txt-12-n color-057">
                                Empresa
                            </label>
                            <Field
                                name="idEmpresa"
                                placeholder="Empresa"
                                component={createSelect}
                                loadOptions={getEmpresas}
                                className="form-control"
                                value={valorPro}
                                onChange={registrarEmpresa}
                                disabled={ver}
                            ></Field>

                        </div>
                    </div>

                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-4">
                            <label className="txt-12-n color-057">Nombre Del Proyecto</label>
                            <Field
                                component={renderField}
                                name="nombre"
                                disabled={ver}
                            />
                        </div>
                        <div className="form-group has-feedback flex-1 mb-4">
                            <label className="txt-12-n color-057">Precio</label>
                            <Field
                                component={renderCurrency}
                                name="precio"
                                disabled={ver}
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center">
                        {isNested ? null : (
                            <a
                                className="btn-secundario2  mr-2"
                                href="/#/proyecto"
                            >
                                Cancelar
                            </a>
                        )}
                        {!ver && (
                            <button
                                type={isNested ? "button" : "submit"}
                                onClick={isNested ? handleSubmit : null}
                                className="btn-primario2"
                            >
                                {actualizar ? "Actualizar" : "Registrar"}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: "ProyectoForm", // a unique identifier for this form
    validate,
})(ProyectoForm);
