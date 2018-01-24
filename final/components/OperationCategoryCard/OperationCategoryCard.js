'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_OPERATION_CATEGORY_CARD } from "../../config/config";
import { MODAL_CONTENT } from "../../data_const/data_const";

import TextInput from '../TextInput/TextInput';
import ButtonSave from '../buttons/ButtonSave/ButtonSave';
import ButtonCancel from '../buttons/ButtonCancel/ButtonCancel';
import ButtonClear from '../buttons/ButtonClear/ButtonClear';

import './OperationCategoryCard.scss';
import {isExists, isNotEmpty, isNotNaN} from "../../utils/utils";
import { fDataSaveOperationCategory, fDataCreateOperationCategory } from "../../network/fData";
import { acUIHideMatGlass } from "../../actions/acUI";

class OperationCategoryCard extends React.PureComponent {

    static propTypes = {
        OperationCategoryCardIsVisible:     PropTypes.bool,
        isNewOperationCategoryAdded:        PropTypes.bool,
        modalContent:                       PropTypes.string,

        operationCategoriesData:            PropTypes.arrayOf(
            PropTypes.shape({
                id:                         PropTypes.number,
                name:                       PropTypes.string,
            })
        ),

        operationCategorySelectedIndex:     PropTypes.number,

        operationCategoryValue:             PropTypes.shape({
            id:                             PropTypes.number,
            name:                           PropTypes.string,
        }),

        operationCategoryValidationData:    PropTypes.shape({
            id:                             PropTypes.string,
            name:                           PropTypes.string,
        }),
    };

    static defaultProps = {
        OperationCategoryCardIsVisible:     false,
        operationCategoryValue: {
            id:                     0,
            name:                   '',
        },
        operationCategoryValidationData: {
            id:                     '',
            name:                   '',
        },
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'OperationCategoryCard_' + OperationCategoryCard.classID;
    };

    constructor( props ) {
        super( props );
        OperationCategoryCard.classID++;
        this.state = {
            htmlID: OperationCategoryCard.getHtmlID( props.htmlID ),
        };
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_OPERATION_CATEGORY_CARD;
        this.classCSS = 'OperationCategoryCard';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'OperationCategoryCard: prepareData: new props: ', props );
        let newState = { operationCategoryValidationData: { ...OperationCategoryCard.defaultProps.operationCategoryValidationData } };
        const { isNewOperationCategoryAdded, operationCategorySelectedIndex, operationCategoriesData } = props;
        // console.log( 'OperationCategoryCard: prepareData: consts: ', isNewOperationCategoryAdded, operationCategorySelectedIndex, operationCategoriesData );
        newState.operationCategoryValue = ( isNewOperationCategoryAdded || operationCategorySelectedIndex < 0 )
            ? { ...OperationCategoryCard.defaultProps.operationCategoryValue }
            : { ...operationCategoriesData[ operationCategorySelectedIndex ] };

        this.setState( { ...newState }, () => {
            ( this.debug_mode ) &&
                console.log( 'OperationCategoryCard: prepareData: new state: ', this.state );
        } );
    };

    formProps = () => {
        const { name } = this.state.operationCategoryValue;
        const { operationCategoriesData, isNewOperationCategoryAdded } = this.props;
        return {
            header: {
                title:  ( isNewOperationCategoryAdded )
                    ? "Новая категория операций"
                    : "Категория операций",
            },
            name: {
                label:              'Категория',
                defValue:           name,
                withLabel:          true,
                display:            TextInput.displayTypes.block,
                inputType:          TextInput.inputTypes.text,
                options: {
                    addedClass:     ( isNotEmpty( this.state.operationCategoryValidationData.name ) ) && 'validation_failed',
                    labelPosition:  TextInput.position.left,
                    labelBoxWidth:  '35%',
                    inputBoxWidth:  '65%',
                },
                cbChanged: this.name_cbChanged,
            },
            btnOk: {
                label: 'Сохранить',
                cbChanged: this.btnSave_cbChanged,
            },
            btnCancel: {
                label: 'Отменить',
                cbChanged: this.btnCancel_cbChanged,
            },
            btnClear: {
                label: 'Очистить',
                cbChanged: this.btnClear_cbChanged,
            },
        }
    };

    /* == callbacks == */

    name_cbChanged = ( value ) => {
        const { operationCategoryValue, operationCategoryValidationData } = this.state;
        let newOperationCategoryValue = { ...operationCategoryValue };
        newOperationCategoryValue.name = ( isNotEmpty( value ) )
            ? value
            : '';
        let validationHint = this.validate_name( newOperationCategoryValue.name );
        let newOperationCategoryValidationData = { ...operationCategoryValidationData, name: validationHint };
        // console.log('name: ', newOperationCategoryValue.name, ': ', typeof newOperationCategoryValue.name );
        this.setState( {
            operationCategoryValue: newOperationCategoryValue,
            operationCategoryValidationData: newOperationCategoryValidationData,
        } );
    };

    btnSave_cbChanged = () => {
        const { operationCategoryValue } = this.state;
        const { isNewOperationCategoryAdded } = this.props;
        const validation = this.validate_operationCategory( operationCategoryValue );
        if ( validation.result ) {
            ( isNewOperationCategoryAdded )
                ? this.createOperationCategory( operationCategoryValue )
                : this.saveOperationCategoryChanges( operationCategoryValue );
        }
        else {
            this.setState( { operationCategoryValidationData: validation.operationCategoryValidationData } );
        }
    };

    btnCancel_cbChanged = () => {
        const {dispatch} = this.props;
        dispatch( acUIHideMatGlass() );
    };

    btnClear_cbChanged = () => {
        const { id } = this.state.operationCategoryValue;
        const defaultOperationCategoryValue = OperationCategoryCard.defaultProps.operationCategoryValue;
        let newOperationCategoryValue = { ...defaultOperationCategoryValue, id };
        let validation = this.validate_operationCategory( newOperationCategoryValue );
        this.setState( {
            operationCategoryValue: newOperationCategoryValue,
            operationCategoryValidationData: validation.operationCategoryValidationData,
        } );
    };

    /* == controller == */

    formClick = ( e ) => {
        e.stopPropagation();
    };

    /* == action functions == */

    createOperationCategory = ( newOperationCategory ) => {
        ( this.debug_mode ) && console.log( 'OperationCategoryCard: createOperationCategory: ', newOperationCategory );
        fDataCreateOperationCategory( this.props.dispatch, null, null, newOperationCategory );
    };

    saveOperationCategoryChanges = ( operationCategory ) => {
        ( this.debug_mode ) && console.log( 'OperationCategoryCard: saveOperationCategoryChanges: ', operationCategory );
        fDataSaveOperationCategory( this.props.dispatch, null, null, operationCategory );
    };

    /* == validation == */

    validate_operationCategory = ( data ) => {
        const { name } = data;
        let result = true;
        let operationCategoryValidationData = { ...OperationCategoryCard.defaultProps.operationCategoryValidationData };

        let validationHint = this.validate_name( name );
        operationCategoryValidationData.name = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        ( this.debug_mode ) && console.log( 'validate_operationCategory: ', result );
        return { result, operationCategoryValidationData };
    };

    validate_name = ( value ) => {
        let validationHint = ( isNotEmpty( value ) ) ? '' : 'Поле не должно быть пустым';
        ( this.debug_mode ) && console.log( 'validate_name: ', validationHint );
        return validationHint;
    };

    /* == renders == */

    render() {
        const { modalContent, isNewOperationCategoryAdded } = this.props;
        const { name } = this.state.operationCategoryValidationData;
        let props = this.formProps();
        return ( modalContent === MODAL_CONTENT.OPERATION_CATEGORY_CARD ) &&
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
                    <div className="rows"
                         key="name">
                        <div className="cols col_16">
                            <TextInput { ...props.name } />
                            <div className="validation_hint_box">
                                <label className="validation_hint">
                                    { name || '\xa0' }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={ "rows " + this.classCSS + "_buttons_panel" }>
                        <div className="cols col_4"
                             key="Сохранить">
                            <ButtonSave { ...props.btnOk }/>
                        </div>
                        <div className="cols col_4"
                             key="Отменить">
                            <ButtonCancel { ...props.btnCancel }/>
                        </div>
                        <div className="cols col_4"
                             key="Очистить">
                            <ButtonClear { ...props.btnClear }/>
                        </div>
                    </div>
                </div>
            </div>
    }

}

const mapStateToProps = function ( state ) {
    return {
        operationCategoriesData:        state.data.operationCategoriesData,
        operationCategorySelectedIndex: state.data.operationCategorySelectedIndex,

        isNewOperationCategoryAdded:    state.ui.isNewOperationCategoryAdded,
        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( OperationCategoryCard );