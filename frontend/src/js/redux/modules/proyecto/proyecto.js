import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { api } from "api";
import { initialize as initializeForm } from "redux-form";

// ------------------------------------
// Constants
// ------------------------------------

/*
export const { reducers, initialState, actions } = createReducer(
    "proyecto", //identificador dentro del store.
    "proyecto", //endpoint donde realizará las peticiones.
    "ProyectoForm", //Nombre del formulario.
    "/proyecto", //url del componente en el frontend.
);
*/
const SET_EMPRESA = "SET_EMPRESA";
const SHOW_FORM = "SHOW_FORM";

const baseReducer = createReducer(
    "proyecto", //identificador dentro del store.
    "proyecto", //endpoint donde realizará las peticiones.
    "ProyectoForm", //Nombre del formulario.
    "/proyecto" //url del componente en el frontend.
);

const listarProducto = (page = 1) => (dispatch, getStore) => {
    const resource = getStore()["proyecto"];
    const params = { page };
    params.ordering = resource.ordering;
    params.search = resource.search;
    dispatch(baseReducer.actions.setLoader(true));
    api.get("proyecto/productosVendedor", params).then((response) => {
        console.log(response);
        dispatch(baseReducer.actions.setData(response));
        dispatch(baseReducer.actions.setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(baseReducer.actions.setLoader(false));
    });
};

const listarTienda = (page = 1) => (dispatch, getStore) => {
    const resource = getStore()["proyecto"];
    const params = { page };
    params.ordering = resource.ordering;
    params.search = resource.search;
    dispatch(baseReducer.actions.setLoader(true));
    api.get("proyecto/tienda", params).then((response) => {
        console.log(response);
        dispatch(baseReducer.actions.setData(response));
        dispatch(baseReducer.actions.setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(baseReducer.actions.setLoader(false));
    });
};



const registrarProyecto = () => (dispatch, getState) => {
    console.log("NaDA");
    const formData = getState().form.ProyectoForm.values;
    console.log("Hola desde redux proyecto", formData);
    api.post("proyecto", formData)
        .then((response) => {
            const nuevo_elemento = {
                value: response.id,
                label: response.nombre,
            };
            dispatch(showForm(false));
            let formValues = getState().form.ProyectoForm.values;
            formValues = !!formValues ? formValues : {};
            formValues.empresa = nuevo_elemento;
            dispatch(initializeForm("ProyectoForm", formValues));
        })
        .catch((error) => {})
        .finally(() => {});
};

const registrarEmpresa = () => (dispatch, getState) => {
    // console.log("Hola desde redux proyecto", formData);
    const formData = getState().form.ProyectoForm.values;
    console.log("desde redux Empresa", formData);
    api.post("empresa", formData)
        .then((response) => {
            const nuevo_elemento = {
                value: response.id,
                label: response.nombre,
            };
            dispatch(showForm(false));
            let formValues = getState().form.ProyectoForm.values;
            formValues = !!formValues ? formValues : {};
            formValues.empresa = nuevo_elemento;
            dispatch(initializeForm("ProyectoForm", formValues));
        })
        .catch((error) => {})
        .finally(() => {});
};

// const showForm = (show) => (dispatch) => {
//     dispatch({ type: SHOW_FORM, show_form: show });
// };

export const reducers = {
    ...baseReducer.reducers,
    [SET_EMPRESA]: (state, { empresa }) => {
        return {
            ...state,
            empresa,
        };
    },
    // [SHOW_FORM]: (state, { show_form }) => {
    //     return {
    //         ...state,
    //         show_form,
    //     };
    // },
};

export const actions = {
    registrarProyecto,
    registrarEmpresa,
    listarProducto,
    listarTienda,
    // showForm,
    ...baseReducer.actions,
};

export const initialState = {
    empresa: null,
    proyecto: null,
    // show_form: false,
    ...baseReducer.initialState,
};

export default handleActions(reducers, initialState);
