import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/proyecto/proyecto'

import CrearProyecto from './CrearProyecto';


const ms2p = (state) => {
    return {
        ...state.proyecto,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearProyecto);