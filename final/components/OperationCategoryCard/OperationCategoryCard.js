'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_OPERATION_CATEGORY_CARD } from "../../config/config";
import { MODAL_CONTENT } from "../../data_const/data_const";

import TextInput from '../TextInput/TextInput';
import NumberInput from '../NumberInput/NumberInput';
import ButtonSave from '../buttons/ButtonSave/ButtonSave';
import ButtonCancel from '../buttons/ButtonCancel/ButtonCancel';
import ButtonClear from '../buttons/ButtonClear/ButtonClear';

import './OperationCategoryCard.scss';
import {isExists, isNotEmpty, isNotNaN} from "../../utils/utils";
import { fDataSaveOperation, fDataCreateOperation } from "../../network/fData";
import {acUIHideMatGlass} from "../../actions/acUI";

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
        newState.operationCategoryValue = ( isNewOperationCategoryAdded )
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
                cbChanged: null, // this.name_cbChanged,
            },
            btnOk: {
                label: 'Сохранить',
                cbChanged: null, // this.btnSave_cbChanged,
            },
            btnCancel: {
                label: 'Отменить',
                cbChanged: null, // this.btnCancel_cbChanged,
            },
            btnClear: {
                label: 'Очистить',
                cbChanged: null, // this.btnClear_cbChanged,
            },
        }
    };

    /* == callbacks == */

    /*account_cbChanged = ( value ) => {
        let newOperationValue = { ...this.state.operationValue };
        newOperationValue.accountId = parseInt( value );
        newOperationValue.accountId = ( isNotNaN( newOperationValue.accountId ) )
            ? newOperationValue.accountId
            : 0;
        let validationHint = this.validate_accountId( newOperationValue.accountId );
        let newOperationValidationData = { ...this.state.operationValidationData, accountId: validationHint };
        // console.log('account: ', newOperationValue.accountId, ': ', typeof newOperationValue.accountId );
        this.setState( {
            operationValue: newOperationValue,
            operationValidationData: newOperationValidationData,
        } );
    };*/

    /*category_cbChanged = ( value ) => {
        let newOperationValue = { ...this.state.operationValue };
        newOperationValue.categoryId = parseInt( value );
        newOperationValue.categoryId = ( isNotNaN( newOperationValue.categoryId ) )
            ? newOperationValue.categoryId
            : 0;
        let validationHint = this.validate_categoryId( newOperationValue.categoryId );
        let newOperationValidationData = { ...this.state.operationValidationData, categoryId: validationHint };
        // console.log('category: ', newOperationValue.categoryId, ': ', typeof newOperationValue.categoryId );
        this.setState( {
            operationValue: newOperationValue,
            operationValidationData: newOperationValidationData,
        } );
    };*/

    /*type_cbChanged = ( value ) => {
        let newOperationValue = { ...this.state.operationValue };
        newOperationValue.type = value;
        let validationHint = this.validate_type( newOperationValue.type );
        let newOperationValidationData = { ...this.state.operationValidationData, type: validationHint };
        // console.log('type: ', newOperationValue.type, ': ', typeof newOperationValue.type );
        this.setState( {
            operationValue: newOperationValue,
            operationValidationData: newOperationValidationData,
        } );
    };*/

    /*sum_cbChanged = ( value ) => {
        let newOperationValue = { ...this.state.operationValue };
        newOperationValue.sum = value;
        newOperationValue.sum = ( isNotNaN( newOperationValue.sum ) && newOperationValue.sum > 0 )
            ? newOperationValue.sum
            : 0;
        let validationHint = this.validate_sum( newOperationValue.sum );
        let newOperationValidationData = { ...this.state.operationValidationData, sum: validationHint };
        // console.log('type: ', newOperationValue.sum, ': ', typeof newOperationValue.sum );
        this.setState( {
            operationValue: newOperationValue,
            operationValidationData: newOperationValidationData,
        } );
    };*/

    /*date_cbChanged = ( value ) => {
        // console.log( 'date: ', value, ': type: ', typeof value, ': is Date: ', value instanceof Date  );
        let newOperationValue = { ...this.state.operationValue };
        newOperationValue.date = ( isExists( value ) ) ? value.getTime() : value;
        // console.log( 'newOperationValue.date: ', newOperationValue.date, ': type: ', typeof newOperationValue.date );
        let validationHint = this.validate_date( newOperationValue.date );
        let newOperationValidationData = { ...this.state.operationValidationData, date: validationHint };
        // console.log( 'date: ', newOperationValue.date );
        this.setState( {
            operationValue: newOperationValue,
            operationValidationData: newOperationValidationData,
        } );
    };*/

    /*comment_cbChanged = ( value ) => {
        let newOperationValue = { ...this.state.operationValue };
        newOperationValue.comment = value;
        let validationHint = this.validate_comment( newOperationValue.comment );
        let newOperationValidationData = { ...this.state.operationValidationData, comment: validationHint };
        // console.log('comment: ', newOperationValue.comment, ': ', typeof newOperationValue.comment );
        this.setState( {
            operationValue: newOperationValue,
            operationValidationData: newOperationValidationData,
        } );
    };*/

    /*btnSave_cbChanged = () => {
        const { operationValue } = this.state;
        const { isNewOperationAdded } = this.props;
        const validation = this.validate_operation( operationValue );
        if ( validation.result ) {
            ( isNewOperationAdded )
                ? this.createOperation( operationValue )
                : this.saveOperationChanges( operationValue );
        }
        else {
            this.setState( { operationValidationData: validation.operationValidationData } );
        }
    };*/

    /*btnCancel_cbChanged = () => {
        const {dispatch} = this.props;
        dispatch( acUIHideMatGlass() );
    };*/

    /*btnClear_cbChanged = () => {
        const { id } = this.state.operationValue;
        const defaultOperationValue = OperationCategoryCard.defaultProps.operationValue;
        let newOperationValue = { ...defaultOperationValue, id };
        let validation = this.validate_operation( newOperationValue );
        this.setState( {
            operationValue: newOperationValue,
            operationValidationData: validation.operationValidationData,
        } );
    };*/

    /* == controller == */

    formClick = ( e ) => {
        e.stopPropagation();
    };

    /* == action functions == */

    /*createOperation = ( newOperation ) => {
        ( this.debug_mode ) && console.log( 'OperationCategoryCard: createOperation: ', newOperation );
        fDataCreateOperation( this.props.dispatch, null, null, newOperation );
    };*/

    /*saveOperationChanges = ( operation ) => {
        ( this.debug_mode ) && console.log( 'OperationCategoryCard: saveOperationChanges: ', operation );
        fDataSaveOperation( this.props.dispatch, null, null, operation );
    };*/

    /* == validation == */

    validate_operationCategory = ( data ) => {
        const { name } = data;
        let result = true;
        let operationCategoryValidationData = { ...OperationCategoryCard.defaultProps.operationCategoryValidationData };

        let validationHint = this.validate_name( name );
        operationCategoryValidationData.name = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        ( this.debug_mode ) && console.log( 'validate_account: ', result );
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