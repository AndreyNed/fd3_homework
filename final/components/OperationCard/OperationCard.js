'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_OPERATION_CARD } from "../../config/config";
import { MODAL_CONTENT, OPERATION_TYPES } from "../../data_const/data_const";

import TextInput from '../TextInput/TextInput';
import ComboInput from '../ComboInput/ComboInput';
import DateInput from '../DateInput/DateInput';
import NumberInput from '../NumberInput/NumberInput';
import ButtonSave from '../buttons/ButtonSave/ButtonSave';
import ButtonCancel from '../buttons/ButtonCancel/ButtonCancel';
import ButtonClear from '../buttons/ButtonClear/ButtonClear';

import './OperationCard.scss';
import {isExists, isNotEmpty, isNotNaN} from "../../utils/utils";
import { fDataSaveOperation, fDataCreateOperation } from "../../network/fData";
import {acUIHideMatGlass} from "../../actions/acUI";

class OperationCard extends React.PureComponent {

    static propTypes = {
        operationCardIsVisible:     PropTypes.bool,
        isNewOperationAdded:        PropTypes.bool,
        modalContent:               PropTypes.string,

        accountsData:               PropTypes.arrayOf(
            PropTypes.shape({
                id:                 PropTypes.number,
                name:               PropTypes.string,
                amount:             PropTypes.number,
            })
        ),
        operationCategoriesData:    PropTypes.arrayOf(
            PropTypes.shape({
                id:                 PropTypes.number,
                name:               PropTypes.string,
            })
        ),
        operationsData:             PropTypes.arrayOf(
            PropTypes.shape({
                id:                 PropTypes.number,
                accountId:          PropTypes.number,
                categoryId:         PropTypes.number,
                type:               PropTypes.string,
                sum:                PropTypes.number,
                date:               PropTypes.any,
                comment:            PropTypes.string,
            })
        ),

        operationSelectedIndex:     PropTypes.number,

        operationValue:             PropTypes.shape({
            id:                     PropTypes.number,
            accountId:              PropTypes.number,
            categoryId:             PropTypes.number,
            type:                   PropTypes.string,
            sum:                    PropTypes.number,
            date:                   PropTypes.any,
            comment:                PropTypes.string,
        }),

        operationValidationData:    PropTypes.shape({
            accountId:              PropTypes.string,
            categoryId:             PropTypes.string,
            type:                   PropTypes.string,
            sum:                    PropTypes.string,
            date:                   PropTypes.string,
            comment:                PropTypes.string,
        }),
    };

    static defaultProps = {
        operationCardIsVisible: false,
        operationValue: {
            id:                     0,
            accountId:              0,
            categoryId:             0,
            type:                   OPERATION_TYPES.CREDIT,
            sum:                    0,
            date:                   ( ( d ) => d.getTime() )( new Date() ),
            comment:                '',
        },
        operationValidationData: {
            accountId:              '',
            categoryId:             '',
            type:                   '',
            sum:                    '',
            date:                   '',
            comment:                '',
        },
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'OperationCard_' + OperationCard.classID;
    };

    constructor( props ) {
        super( props );
        OperationCard.classID++;
        this.state = {
            htmlID: OperationCard.getHtmlID( props.htmlID ),
        }
    }

    debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_OPERATION_CARD;

    classCSS = 'OperationCard';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'OperationCard: prepareData: new props: ', props );
        let newState = { operationValidationData: { ...OperationCard.defaultProps.operationValidationData } };
        const { isNewOperationAdded, operationSelectedIndex, operationsData } = props;
        // console.log( 'OperationCard: prepareData: consts: ', isNewOperationAdded, operationSelectedIndex, operationsData );
        newState.operationValue = ( isNewOperationAdded )
            ? { ...OperationCard.defaultProps.operationValue }
            : { ...operationsData[ operationSelectedIndex ] };

        this.setState( { ...newState }, () => {
            ( this.debug_mode ) &&
            ( this.debug_mode ) && console.log( 'OperationCard: prepareData: new state: ', this.state );
        } );
    };

    formProps = () => {
        const { accountId, categoryId, type, sum, date, comment } = this.state.operationValue;
        const { operationCategoriesData, accountsData, isNewOperationAdded } = this.props;
        return {
            header: {
                title:  ( isNewOperationAdded )
                    ? "Новая операция"
                    : "Операция",
            },
            account: {
                label:              'Счет',
                defValue:           accountId + '',
                listValue:          accountsData,
                asText:             'name',
                asValue:            'id',
                withLabel:          true,
                display:            ComboInput.displayTypes.block,
                inputType:          ComboInput.inputTypes.comboFilter,
                isFirstIsEmpty:     true,
                options: {
                    addedClass:     ( isNotEmpty( this.state.operationValidationData.accountId ) ) && 'validation_failed',
                    labelPosition:  ComboInput.position.left,
                    labelBoxWidth:  '35%',
                    inputBoxWidth:  '65%',
                },
                cbChanged: this.account_cbChanged,
            },
            category: {
                label:              'Категория',
                defValue:           categoryId + '',
                listValue:          operationCategoriesData,
                asValue:            'id',
                asText:             'name',
                withLabel:          true,
                display:            ComboInput.displayTypes.block,
                inputType:          ComboInput.inputTypes.comboFilter,
                isFirstIsEmpty:     true,
                options: {
                    addedClass:     ( isNotEmpty( this.state.operationValidationData.categoryId ) ) && 'validation_failed',
                    labelPosition:  TextInput.position.left,
                    labelBoxWidth:  '35%',
                    inputBoxWidth:  '65%',
                },
                cbChanged: this.category_cbChanged,
            },
            type: {
                label:              'Тип',
                defValue:           type,
                listValue:          [
                    { id: "DEBIT", name: "приход" },
                    { id: "CREDIT", name: "расход" },
                ],
                asText:             'name',
                asValue:            'id',
                withLabel:          true,
                display:            ComboInput.displayTypes.block,
                inputType:          ComboInput.inputTypes.comboSimple,
                isFirstIsEmpty:     false,
                options: {
                    addedClass:     ( isNotEmpty( this.state.operationValidationData.type ) ) && 'validation_failed',
                    labelPosition:  ComboInput.position.left,
                    labelBoxWidth:  '35%',
                    inputBoxWidth:  '65%',
                    listBoxHeight:  66,
                },
                cbChanged: this.type_cbChanged,
            },
            sum: {
                label:              'Сумма',
                defValue:           sum,
                withLabel:          true,
                display:            NumberInput.displayTypes.block,
                options: {
                    addedClass:     ( isNotEmpty( this.state.operationValidationData.sum ) ) && 'validation_failed',
                    labelPosition:  NumberInput.position.left,
                    labelBoxWidth:  '35%',
                    inputBoxWidth:  '65%',
                },
                cbChanged: this.sum_cbChanged,
            },
            date: {
                label:              'Дата',
                defValue:           isExists( date ) ? new Date( date ) : null,
                withLabel:          true,
                display:            DateInput.displayTypes.block,
                options: {
                    addedClass:     ( isNotEmpty( this.state.operationValidationData.date ) ) && 'validation_failed',
                    labelPosition:  DateInput.position.left,
                    labelBoxWidth:  '35%',
                    inputBoxWidth:  '65%',
                },
                cbChanged: this.date_cbChanged,
            },
            comment: {
                label:              'Комментарий',
                defValue:           comment,
                withLabel:          true,
                display:            TextInput.displayTypes.block,
                options: {
                    addedClass:     ( isNotEmpty( this.state.operationValidationData.comment ) ) && 'validation_failed',
                    labelPosition:  TextInput.position.left,
                    labelBoxWidth:  '35%',
                    inputBoxWidth:  '65%',
                },
                cbChanged: this.comment_cbChanged,
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

    account_cbChanged = ( value ) => {
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
    };

    category_cbChanged = ( value ) => {
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
    };

    type_cbChanged = ( value ) => {
        let newOperationValue = { ...this.state.operationValue };
        newOperationValue.type = value;
        let validationHint = this.validate_type( newOperationValue.type );
        let newOperationValidationData = { ...this.state.operationValidationData, type: validationHint };
        // console.log('type: ', newOperationValue.type, ': ', typeof newOperationValue.type );
        this.setState( {
            operationValue: newOperationValue,
            operationValidationData: newOperationValidationData,
        } );
    };

    sum_cbChanged = ( value ) => {
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
    };

    date_cbChanged = ( value ) => {
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
    };

    comment_cbChanged = ( value ) => {
        let newOperationValue = { ...this.state.operationValue };
        newOperationValue.comment = value;
        let validationHint = this.validate_comment( newOperationValue.comment );
        let newOperationValidationData = { ...this.state.operationValidationData, comment: validationHint };
        // console.log('comment: ', newOperationValue.comment, ': ', typeof newOperationValue.comment );
        this.setState( {
            operationValue: newOperationValue,
            operationValidationData: newOperationValidationData,
        } );
    };

    btnSave_cbChanged = () => {
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
    };

    btnCancel_cbChanged = () => {
        const {dispatch} = this.props;
        dispatch( acUIHideMatGlass() );
    };

    btnClear_cbChanged = () => {
        const { id } = this.state.operationValue;
        const defaultOperationValue = OperationCard.defaultProps.operationValue;
        let newOperationValue = { ...defaultOperationValue, id };
        let validation = this.validate_operation( newOperationValue );
        this.setState( {
            operationValue: newOperationValue,
            operationValidationData: validation.operationValidationData,
        } );
    };

    /* == controller == */

    formClick = ( e ) => {
        e.stopPropagation();
    };

    /* == action functions == */

    createOperation = ( newOperation ) => {
        ( this.debug_mode ) && console.log( 'OperationCard: createOperation: ', newOperation );
        fDataCreateOperation( this.props.dispatch, null, null, newOperation );
    };

    saveOperationChanges = ( operation ) => {
        ( this.debug_mode ) && console.log( 'OperationCard: saveOperationChanges: ', operation );
        fDataSaveOperation( this.props.dispatch, null, null, operation );
    };

    /* == validation == */

    validate_operation = ( data ) => {
        const { accountId, categoryId, type, sum, date, comment } = data;
        let result = true;
        let operationValidationData = { ...OperationCard.defaultProps.operationValidationData };

        let validationHint = this.validate_accountId( accountId );
        operationValidationData.accountId = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        validationHint = this.validate_categoryId( categoryId );
        operationValidationData.categoryId = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        validationHint = this.validate_type( type );
        operationValidationData.type = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        validationHint = this.validate_sum( sum );
        operationValidationData.sum = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        validationHint = this.validate_date( date );
        operationValidationData.date = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        validationHint = this.validate_comment( comment );
        operationValidationData.comment = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        ( this.debug_mode ) && console.log( 'validate_operation: ', result );
        return { result, operationValidationData };
    };

    validate_accountId = ( value ) => {
        let validationHint = ( value > 0 ) ? '' : 'Поле не должно быть пустым';
        ( this.debug_mode ) && console.log( 'validate_accountId: ', validationHint );
        return validationHint;
    };

    validate_categoryId = ( value ) => {
        let validationHint = ( value > 0 ) ? '' : 'Поле не должно быть пустым';
        ( this.debug_mode ) && console.log( 'validate_categoryId: ', validationHint );
        return validationHint;
    };

    validate_type = ( value ) => {
        let validationHint = ( isNotEmpty( value ) ) ? '' : 'Поле не должно быть пустым';
        ( this.debug_mode ) && console.log( 'validate_type: ', validationHint );
        return validationHint;
    };

    validate_sum = ( value ) => {
        let validationHint = ( value > 0 ) ? '' : 'Значение поля должно быть > 0';
        ( this.debug_mode ) && console.log( 'validate_sum: ', validationHint );
        return validationHint;
    };

    validate_date = ( value ) => {
        let validationHint = ( isExists( value ) && value > 0 ) ? '' : 'Поле не должно быть пустым';
        ( this.debug_mode ) && console.log( 'validate_date: ', validationHint );
        return validationHint;
    };

    validate_comment = ( value ) => {
        // let validationHint = ( value > 0 ) ? '' : 'Поле не должно быть пустым';
        let validationHint = '';
        ( this.debug_mode ) && console.log( 'validate_comment: ', validationHint );
        return validationHint;
    };

    /* == renders == */

    render() {
        const { modalContent, isNewOperationAdded } = this.props;
        const { accountId, categoryId, type, sum, date, comment } = this.state.operationValidationData;
        let props = this.formProps();
        return ( modalContent === MODAL_CONTENT.OPERATION_CARD ) &&
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
                         key="account">
                        <div className="cols col_16">
                            <ComboInput { ...props.account } />
                            <div className="validation_hint_box">
                                <label className="validation_hint">
                                    { accountId || '\xa0' }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="rows"
                         key="category">
                        <div className="cols col_16">
                            <ComboInput { ...props.category } />
                            <div className="validation_hint_box">
                                <label className="validation_hint">
                                    { categoryId || '\xa0' }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="rows"
                         key="typeSum">
                        <div className="cols col_16"
                             key="type">
                            <ComboInput { ...props.type } />
                            <div className="validation_hint_box">
                                <label className="validation_hint">
                                    { type || '\xa0' }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="rows"
                         key="sum">
                        <div className="cols col_16">
                            <NumberInput { ...props.sum } />
                            <div className="validation_hint_box">
                                <label className="validation_hint">
                                    { sum || '\xa0' }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="rows"
                         key="date">
                        <div className="cols col_16">
                            <DateInput { ...props.date } />
                            <div className="validation_hint_box">
                                <label className="validation_hint">
                                    { date || '\xa0' }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="rows"
                         key="comment">
                        <div className="cols col_16">
                            <TextInput { ...props.comment } />
                            <div className="validation_hint_box">
                                <label className="validation_hint">
                                    { comment || '\xa0' }
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
        accountsData:                   state.data.accountsData,
        operationCategoriesData:        state.data.operationCategoriesData,
        operationsData:                 state.data.operationsData,
        operationSelectedIndex:         state.data.operationSelectedIndex,

        isNewOperationAdded:            state.ui.isNewOperationAdded,
        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( OperationCard );