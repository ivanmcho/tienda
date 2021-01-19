import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/reportes/reporte'
import Reporte from './reportes';


const ms2p = (state) => {
    return {
        ...state.reporte,        
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Reporte);