import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/proyecto/proyecto'

import CrearProyectoCliente from './CrearProyectoCliente';


const ms2p = (state) => {
    return {
        ...state.proyecto,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearProyectoCliente);