'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_ACCOUNT_CARD } from "../../config/config";
import { MODAL_CONTENT, OPERATION_TYPES } from "../../data_const/data_const";

import TextInput from '../TextInput/TextInput';
import ComboInput from '../ComboInput/ComboInput';
import DateInput from '../DateInput/DateInput';
import NumberInput from '../NumberInput/NumberInput';
import ButtonSave from '../buttons/ButtonSave/ButtonSave';
import ButtonCancel from '../buttons/ButtonCancel/ButtonCancel';
import ButtonClear from '../buttons/ButtonClear/ButtonClear';

import './AccountCard.scss';
import {isExists, isNotEmpty, isNotNaN} from "../../utils/utils";
import { fDataSaveOperation, fDataCreateOperation } from "../../network/fData";
import {acUIHideMatGlass} from "../../actions/acUI";

class AccountCard extends React.PureComponent {

    static propTypes = {
        AccountCardIsVisible:       PropTypes.bool,
        isNewAccountAdded:          PropTypes.bool,
        modalContent:               PropTypes.string,

        accountsData:               PropTypes.arrayOf(
            PropTypes.shape({
                id:                 PropTypes.number,
                name:               PropTypes.string,
                amount:             PropTypes.number,
            })
        ),

        accountSelectedIndex:       PropTypes.number,

        accountValue:               PropTypes.shape({
            id:                     PropTypes.number,
            name:                   PropTypes.string,
            amount:                 PropTypes.number,
        }),

        accountValidationData:      PropTypes.shape({
            id:                     PropTypes.string,
            name:                   PropTypes.string,
            amount:                 PropTypes.string,
        }),
    };

    static defaultProps = {
        AccountCardIsVisible:       false,
        accountValue: {
            id:                     0,
            name:                   '',
            amount:                 0,
        },
        accountValidationData: {
            id:                     '',
            name:                   '',
            amount:                 '',
        },
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'AccountCard_' + AccountCard.classID;
    };

    constructor( props ) {
        super( props );
        AccountCard.classID++;
        this.state = {
            htmlID: AccountCard.getHtmlID( props.htmlID ),
        }
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_ACCOUNT_CARD;
        this.classCSS = 'AccountCard';
    }



    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'AccountCard: prepareData: new props: ', props );
        let newState = { accountValidationData: { ...AccountCard.defaultProps.accountValidationData } };
        const { isNewAccountAdded, accountSelectedIndex, accountsData } = props;
        // console.log( 'AccountCard: prepareData: consts: ', isNewAccountAdded, accountSelectedIndex, accountsData );
        newState.accountValue = ( isNewAccountAdded )
            ? { ...AccountCard.defaultProps.accountValue }
            : { ...accountsData[ accountSelectedIndex ] };

        this.setState( { ...newState }, () => {
            ( this.debug_mode ) &&
                console.log( 'AccountCard: prepareData: new state: ', this.state );
        } );
    };

    formProps = () => {
        const { name, amount } = this.state.accountValue;
        const { accountsData, isNewAccountAdded } = this.props;
        return {
            header: {
                title:  ( isNewAccountAdded )
                    ? "Новый счет"
                    : "Счет",
            },
            name: {
                label:              'Счет',
                defValue:           name,
                withLabel:          true,
                display:            TextInput.displayTypes.block,
                inputType:          TextInput.inputTypes.text,
                options: {
                    addedClass:     ( isNotEmpty( this.state.accountValidationData.name ) ) && 'validation_failed',
                    labelPosition:  TextInput.position.left,
                    labelBoxWidth:  '35%',
                    inputBoxWidth:  '65%',
                },
                cbChanged: null, // this.name_cbChanged,
            },
            amount: {
                label:              'Сумма',
                defValue:           amount,
                withLabel:          true,
                display:            NumberInput.displayTypes.block,
                options: {
                    addedClass:     ( isNotEmpty( this.state.accountValidationData.amount ) ) && 'validation_failed',
                    labelPosition:  NumberInput.position.left,
                    labelBoxWidth:  '35%',
                    inputBoxWidth:  '65%',
                },
                cbChanged: null, // this.amount_cbChanged,
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
        const defaultOperationValue = AccountCard.defaultProps.operationValue;
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
        ( this.debug_mode ) && console.log( 'AccountCard: createOperation: ', newOperation );
        fDataCreateOperation( this.props.dispatch, null, null, newOperation );
    };*/

    /*saveOperationChanges = ( operation ) => {
        ( this.debug_mode ) && console.log( 'AccountCard: saveOperationChanges: ', operation );
        fDataSaveOperation( this.props.dispatch, null, null, operation );
    };*/

    /* == validation == */

    validate_account = ( data ) => {
        const { name, amount } = data;
        let result = true;
        let accountValidationData = { ...AccountCard.defaultProps.accountValidationData };

        let validationHint = this.validate_name( name );
        accountValidationData.name = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        validationHint = this.validate_amount( amount );
        accountValidationData.amount = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        ( this.debug_mode ) && console.log( 'validate_account: ', result );
        return { result, accountValidationData };
    };

    validate_name = ( value ) => {
        let validationHint = ( isNotEmpty( value ) ) ? '' : 'Поле не должно быть пустым';
        ( this.debug_mode ) && console.log( 'validate_name: ', validationHint );
        return validationHint;
    };

    /*validate_categoryId = ( value ) => {
        let validationHint = ( value > 0 ) ? '' : 'Поле не должно быть пустым';
        ( this.debug_mode ) && console.log( 'validate_categoryId: ', validationHint );
        return validationHint;
    };*/

    /*validate_type = ( value ) => {
        let validationHint = ( isNotEmpty( value ) ) ? '' : 'Поле не должно быть пустым';
        ( this.debug_mode ) && console.log( 'validate_type: ', validationHint );
        return validationHint;
    };*/

    validate_amount = ( value ) => {
        let validationHint = ( value > 0 ) ? '' : 'Значение поля должно быть > 0';
        ( this.debug_mode ) && console.log( 'validate_amount: ', validationHint );
        return validationHint;
    };

    /*validate_date = ( value ) => {
        let validationHint = ( isExists( value ) && value > 0 ) ? '' : 'Поле не должно быть пустым';
        ( this.debug_mode ) && console.log( 'validate_date: ', validationHint );
        return validationHint;
    };*/

    /*validate_comment = ( value ) => {
        // let validationHint = ( value > 0 ) ? '' : 'Поле не должно быть пустым';
        let validationHint = '';
        ( this.debug_mode ) && console.log( 'validate_comment: ', validationHint );
        return validationHint;
    };*/

    /* == renders == */

    render() {
        const { modalContent, isNewAccountAdded } = this.props;
        const { name, amount } = this.state.accountValidationData;
        let props = this.formProps();
        return ( modalContent === MODAL_CONTENT.ACCOUNT_CARD ) &&
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
                    <div className="rows"
                         key="typeSum">
                        <div className="cols col_16"
                             key="amount">
                            <NumberInput { ...props.amount } />
                            <div className="validation_hint_box">
                                <label className="validation_hint">
                                    { amount || '\xa0' }
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
        accountSelectedIndex:           state.data.accountSelectedIndex,

        isNewAccountAdded:              state.ui.isNewAccountAdded,
        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( AccountCard );