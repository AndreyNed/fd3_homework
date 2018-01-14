'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_DELETE_CONFIRMATION } from "../../config/config";
import { MODAL_CONTENT } from "../../data_const/data_const";

import ButtonSave from '../buttons/ButtonSave/ButtonSave';
import ButtonOk from '../buttons/ButtonOk/ButtonOk';
import ButtonCancel from '../buttons/ButtonCancel/ButtonCancel';

import './DeleteConfirmation.scss';
import {acUIHideMatGlass} from "../../actions/acUI";

class DeleteConfirmation extends React.PureComponent {

    static propTypes = {
        modalContent:               PropTypes.string,
        cbChanged:                  PropTypes.func,
    };

    static defaultProps = {
        cbChanged:                  null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'DeleteConfirmation_' + DeleteConfirmation.classID;
    };

    constructor( props ) {
        super( props );
        DeleteConfirmation.classID++;
        this.state = {
            htmlID: DeleteConfirmation.getHtmlID( props.htmlID ),
        }
    }

    debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_DELETE_CONFIRMATION;

    classCSS = 'DeleteConfirmation';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
        console.log( 'DeleteConfirmation: prepareData: new props: ', props );
    };

    formProps = () => {
        const { isNewOperationAdded } = this.props;
        return {
            header: {
                title:  "Подтвердите удаление",
            },
            btnOk: {
                label: 'Ок',
                cbChanged: this.btnOk_cbChanged,
            },
            btnCancel: {
                label: 'Отменить',
                cbChanged: this.btnCancel_cbChanged,
            },
        }
    };

    /* == callbacks == */

    btnOk_cbChanged = () => {
        console.log( "Удалить" );
        /*const { operationValue } = this.state;
        const { isNewOperationAdded } = this.props;
        const validation = this.validate_operation( operationValue );
        if ( validation.result ) {
            ( isNewOperationAdded )
                ? this.createOperation( operationValue )
                : this.saveOperationChanges( operationValue );
        }
        else {
            this.setState( { operationValidationData: validation.operationValidationData } );
        }*/
    };

    btnCancel_cbChanged = () => {
        const {dispatch} = this.props;
        dispatch( acUIHideMatGlass() );
    };

    /* == controller == */

    formClick = ( e ) => {
        e.stopPropagation();
    };

    /* == renders == */

    render() {
        const { modalContent } = this.props;
        let props = this.formProps();
        return ( modalContent === MODAL_CONTENT.DELETE_CONFIRMATION ) &&
            <div className = { this.classCSS }
                 onClick = { this.formClick }>
                <div className = { this.classCSS + '_form' }>
                    <div className="rows"
                         key="header">
                        <div className="cols col_16 header">
                            <span className = { this.classCSS + '_header' }>
                                { props.header.title }
                            </span>
                        </div>
                    </div>
                    <div className={ "rows " + this.classCSS + "_buttons_panel" }>
                        <div className="cols col_8"
                             key="Сохранить">
                            <ButtonOk { ...props.btnOk }/>
                        </div>
                        <div className="cols col_8"
                             key="Отменить">
                            <ButtonCancel { ...props.btnCancel }/>
                        </div>
                    </div>
                </div>
            </div>
    }

}

const mapStateToProps = function ( state ) {
    return {
        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( DeleteConfirmation );