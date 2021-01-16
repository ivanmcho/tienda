import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "empresa", //identificador dentro del store.
    "empresa", //endpoint donde realizará las peticiones.
    "EmpresaForm", //Nombre del formulario.
    "/empresa", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);