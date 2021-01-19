import {handleActions} from 'redux-actions';
import {NotificationManager} from 'react-notifications';
import {api} from "../../../utility/api";

export const reportePrincipal=() =>(dispatch, getStore) =>{
    api.get('/reporte/reportePrincipal').then((response)=>{
        console.log("Reporte: ", response);
    }).catch((error)=>{
        NotificationManager.error(
            `The number is ${error.detail}`,
            "ERROR",
            0
        );
    });
}

export const actions = {
    reportePrincipal,
}

export const reducers = {

};

export const initialState = {

};

export default handleActions(reducers, initialState);