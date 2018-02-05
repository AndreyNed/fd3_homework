'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_ACCOUNT_CARD } from "../../config/config";
import { MODAL_CONTENT } from "../../data_const/data_const";

import TextInput from '../TextInput/TextInput';
import ComboInput from '../ComboInput/ComboInput';
import ButtonSave from '../buttons/ButtonSave/ButtonSave';
import ButtonCancel from '../buttons/ButtonCancel/ButtonCancel';
import ButtonClear from '../buttons/ButtonClear/ButtonClear';

import './AccountCard.scss';
import {isExists, isNotEmpty, isNotNaN} from "../../utils/utils";
import { fDataSaveAccount, fDataCreateAccount } from "../../network/fData";
import { acUIHideMatGlass} from "../../actions/acUI";

class AccountCard extends React.PureComponent {

    static propTypes = {
        AccountCardIsVisible:       PropTypes.bool,
        isNewAccountAdded:          PropTypes.bool,
        modalContent:               PropTypes.string,

        accountsData:               PropTypes.arrayOf(
            PropTypes.shape({
                id:                 PropTypes.number,
                name:               PropTypes.string,
                comment:            PropTypes.string,
                currency:           PropTypes.number,
            })
        ),

        accountSelectedIndex:       PropTypes.number,

        accountValue:               PropTypes.shape({
            id:                     PropTypes.number,
            name:                   PropTypes.string,
            comment:                PropTypes.string,
            currency:               PropTypes.number,
        }),

        accountValidationData:      PropTypes.shape({
            id:                     PropTypes.string,
            name:                   PropTypes.string,
            comment:                PropTypes.string,
            currency:               PropTypes.string,
        }),
    };

    static defaultProps = {
        AccountCardIsVisible:       false,
        accountValue: {
            id:                     0,
            name:                   '',
            comment:                '',
            currency:               -1,
        },
        accountValidationData: {
            id:                     '',
            name:                   '',
            comment:                '',
            currency:               '',
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
        };
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

        newState.accountValue = ( isNewAccountAdded || accountSelectedIndex < 0 )
            ? { ...AccountCard.defaultProps.accountValue }
            : { ...accountsData[ accountSelectedIndex ] };

        this.setState( { ...newState }, () => {
            ( this.debug_mode ) &&
                console.log( 'AccountCard: prepareData: new state: ', this.state );
        } );
    };

    formProps = () => {
        const { name, comment, currency } = this.state.accountValue;
        const { accountsData, isNewAccountAdded, currencyListData } = this.props;
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
                cbChanged: this.name_cbChanged,
            },
            currency: {
                label:              'Валюта',
                withLabel:          true,
                defValue:           currency + '',
                display:            ComboInput.displayTypes.block,
                inputType:          ComboInput.inputTypes.comboFilter,
                listValue:          currencyListData,
                asText:             'name',
                asValue:            'id',
                options: {
                    addedClass:     ( isNotEmpty( this.state.accountValidationData.currency ) ) && 'validation_failed',
                    labelPosition:  ComboInput.position.left,
                    labelBoxWidth:  '35%',
                    inputBoxWidth:  '65%',
                },
                cbChanged: this.currency_cbChanged,
            },
            comment: {
                label:              'Комментарий',
                defValue:           comment,
                withLabel:          true,
                display:            TextInput.displayTypes.block,
                inputType:          TextInput.inputTypes.text,
                options: {
                    addedClass:     ( isNotEmpty( this.state.accountValidationData.comment ) ) && 'validation_failed',
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

    name_cbChanged = ( value ) => {
        const { accountValue, accountValidationData } = this.state;
        let newAccountValue = { ...accountValue };
        newAccountValue.name = ( isNotEmpty( value ) )
            ? value
            : '';
        let validationHint = this.validate_name( newAccountValue.name );
        let newAccountValidationData = { ...accountValidationData, name: validationHint };
        // console.log('name: ', newAccountValue.name, ': ', typeof newAccountValue.name );
        this.setState( {
            accountValue:           newAccountValue,
            accountValidationData:  newAccountValidationData,
        } );
    };

    currency_cbChanged = ( value ) => {
        const { accountValue, accountValidationData } = this.state;
        let newAccountValue = { ...accountValue };
        newAccountValue.currency = ( isExists( value ) )
            ? parseInt( value )
            : -1;
        let validationHint = this.validate_currency( newAccountValue.currency );
        let newAccountValidationData = { ...accountValidationData, currency: validationHint };
        // console.log('name: ', newAccountValue.name, ': ', typeof newAccountValue.name );
        this.setState( {
            accountValue:           newAccountValue,
            accountValidationData:  newAccountValidationData,
        } );
    };

    comment_cbChanged = ( value ) => {
        const { accountValue, accountValidationData } = this.state;
        let newAccountValue = { ...accountValue };
        newAccountValue.comment = ( isNotEmpty( value ) )
            ? value
            : '';
        let validationHint = this.validate_comment( newAccountValue.comment );
        let newAccountValidationData = { ...accountValidationData, comment: validationHint };
        // console.log('name: ', newAccountValue.name, ': ', typeof newAccountValue.name );
        this.setState( {
            accountValue:           newAccountValue,
            accountValidationData:  newAccountValidationData,
        } );
    };

    btnSave_cbChanged = () => {
        const { accountValue } = this.state;
        const { isNewAccountAdded } = this.props;
        const validation = this.validate_account( accountValue );
        if ( validation.result ) {
            ( isNewAccountAdded )
                ? this.createAccount( accountValue )
                : this.saveAccountChanges( accountValue );
        }
        else {
            this.setState( { accountValidationData: validation.accountValidationData } );
        }
    };

    btnCancel_cbChanged = () => {
        const {dispatch} = this.props;
        dispatch( acUIHideMatGlass() );
    };

    btnClear_cbChanged = () => {
        const { id } = this.state.accountValue;
        const defaultAccountValue = AccountCard.defaultProps.accountValue;
        let newAccountValue = { ...defaultAccountValue, id };
        let validation = this.validate_account( newAccountValue );
        this.setState( {
            accountValue:          newAccountValue,
            accountValidationData: validation.accountValidationData,
        } );
    };

    /* == controller == */

    formClick = ( e ) => {
        e.stopPropagation();
    };

    /* == action functions == */

    createAccount = ( newAccount ) => {
        const { dispatch } = this.props;
        ( this.debug_mode ) && console.log( 'AccountCard: createAccount: ', newAccount);
        fDataCreateAccount( dispatch, null, null, newAccount);
    };

    saveAccountChanges = ( account ) => {
        const { dispatch } = this.props;
        ( this.debug_mode ) && console.log( 'AccountCard: saveAccountChanges: ', account );
        fDataSaveAccount( dispatch, null, null, account );
    };

    /* == validation == */

    validate_account = ( data ) => {
        const { name, comment, currency } = data;
        let result = true;
        let accountValidationData = { ...AccountCard.defaultProps.accountValidationData };

        let validationHint = this.validate_name( name );
        accountValidationData.name = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        validationHint = this.validate_currency( currency );
        accountValidationData.currency = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        validationHint = this.validate_comment( comment );
        accountValidationData.comment = validationHint;
        result = ( isNotEmpty( validationHint ) ) ? false : result;

        ( this.debug_mode ) && console.log( 'validate_account: ', result );
        return { result, accountValidationData };
    };

    validate_name = ( value ) => {
        let validationHint = ( isNotEmpty( value ) ) ? '' : 'Поле не должно быть пустым';
        ( this.debug_mode ) && console.log( 'validate_name: ', validationHint );
        return validationHint;
    };

    validate_currency = ( value ) => {
        let validationHint = ( !isExists( value ) )
            ? 'Поле не должно быть пустым'
            : ( value < 1 )
                ? 'Значение не выбрано'
                : '';
        ( this.debug_mode ) && console.log( 'validate_name: ', validationHint );
        return validationHint;
    };

    validate_comment = ( value ) => {
        // let validationHint = ( isNotEmpty( value ) ) ? '' : 'Поле не должно быть пустым';
        let validationHint = '';
        ( this.debug_mode ) && console.log( 'validate_comment: ', validationHint );
        return validationHint;
    };

    /* == renders == */

    render() {
        const { modalContent, isNewAccountAdded } = this.props;
        const { ACCOUNT_CARD } = MODAL_CONTENT;
        const { name, comment, currency } = this.state.accountValidationData;
        let props = this.formProps();
        return ( modalContent === ACCOUNT_CARD ) &&
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
                         key="currency">
                        <div className="cols col_16">
                            <ComboInput { ...props.currency } />
                            <div className="validation_hint_box">
                                <label className="validation_hint">
                                    { currency || '\xa0' }
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
        accountSelectedIndex:           state.data.accountSelectedIndex,

        currencyListData:               state.data.currencyListData,

        isNewAccountAdded:              state.ui.isNewAccountAdded,
        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( AccountCard );