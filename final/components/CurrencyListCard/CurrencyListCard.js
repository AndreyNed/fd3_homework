'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_CURRENCY_LIST_CARD } from "../../config/config";
import { MODAL_CONTENT } from "../../data_const/data_const";

import TextInput from '../TextInput/TextInput';
import ComboInput from '../ComboInput/ComboInput';
import ButtonSave from '../buttons/ButtonSave/ButtonSave';
import ButtonCancel from '../buttons/ButtonCancel/ButtonCancel';
import ButtonClear from '../buttons/ButtonClear/ButtonClear';

import './CurrencyListCard.scss';
import {findArrayItemIndex, isExists, isNotEmpty, isNotNaN} from "../../utils/utils";
import { fDataSaveCurrencyToList, fDataCreateCurrencyToList } from "../../network/fData";
import { acUIHideMatGlass } from "../../actions/acUI";

class CurrencyListCard extends React.PureComponent {

    static propTypes = {
        currencyListCardIsVisible:      PropTypes.bool,
        isNewCurrencyListAdded:         PropTypes.bool,
        modalContent:                   PropTypes.string,

        currencyListData:               PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                code:                   PropTypes.string,
                name:                   PropTypes.string,
                abbreviation:           PropTypes.string,
                scale:                  PropTypes.number,
                rate:                   PropTypes.number,
                updated:                PropTypes.number,
            })
        ),

        currencyListSelectedIndex:      PropTypes.number,

        currencyListValue:              PropTypes.shape({
            id:                         PropTypes.number,
            code:                       PropTypes.string,
            name:                       PropTypes.string,
            abbreviation:               PropTypes.string,
            scale:                      PropTypes.number,
            rate:                       PropTypes.number,
            updated:                    PropTypes.number,
        }),
    };

    static defaultProps = {
        currencyListCardIsVisible:      false,
        currencyListValue: {
            id:                         0,
            code:                       '',
            name:                       '',
            abbreviation:               '',
            scale:                      1,
            rate:                       0,
            updated:                    ( ( d ) => d.getTime() )( new Date() ),
        },
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'CurrencyListCard_' + CurrencyListCard.classID;
    };

    constructor( props ) {
        super( props );
        CurrencyListCard.classID++;
        this.state = {
            htmlID: CurrencyListCard.getHtmlID( props.htmlID ),
        };
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_CURRENCY_LIST_CARD;
        this.classCSS = 'CurrencyListCard';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'CurrencyListCard: prepareData: new props: ', props );

        let newState = {
            currencyListValidationData: { ...CurrencyListCard.defaultProps.currencyListValidationData }
        };

        const {
            isNewCurrencyListAdded,
            currencyListSelectedIndex,
            currencyListData
        } = props;

        // console.log( 'CurrencyListCard: prepareData: consts: ', isNewCurrencyListAdded, CurrencyListSelectedIndex, CurrencyListData );
        newState.currencyListValue = ( isNewCurrencyListAdded || currencyListSelectedIndex < 0 )
            ? { ...CurrencyListCard.defaultProps.currencyListValue }
            : { ...currencyListData[ currencyListSelectedIndex ] };

        this.setState( { ...newState }, () => {
            ( this.debug_mode ) &&
                console.log( 'CurrencyListCard: prepareData: new state: ', this.state );
        } );
    };

    formProps = () => {
        const {  } = this.state.currencyListValue;
        const { currencyListData, currencyData, isNewCurrencyListAdded } = this.props;

        let listValue = ( !isNotEmpty( currencyData ) )
            ? null
            : ( !isNotEmpty( currencyListData ) )
                ? [ ...currencyData ]
                : currencyData.filter( ( item ) => {
                    return ( findArrayItemIndex( currencyListData, { code: item.Cur_Code } ) === -1 );
                } );
        return {
            header: {
                title:  ( isNewCurrencyListAdded )
                    ? "Новая валюта счета"
                    : "Валюта счета",
            },
            currencySelector: {
                withLabel: true,
                label: 'Название валюты',
                isReadOnly: false,
                inputType: ComboInput.inputTypes.comboFilter,
                display: ComboInput.displayTypes.block,
                listValue,
                asValue: 'Cur_Code',
                asText: 'Cur_Name',
                cbChanged: null,
            },
            btnOk: {
                label: 'Сохранить',
                cbChanged: this.btnSave_cbChanged,
            },
            btnCancel: {
                label: 'Отменить',
                cbChanged: this.btnCancel_cbChanged,
            },
        }
    };

    /* == callbacks == */

    listItem_cbChanged = ( value ) => {
        console.log( 'CurrencyListCard: listItem_cbChanged: ', value );
        /*const { currencyListValue } = this.state;
        let newCurrencyListValue = { ...currencyListValue };
        newCurrencyListValue.name = ( isNotEmpty( value ) )
            ? value
            : '';
        this.setState( {
            currencyListValue: newCurrencyListValue,
        } );*/
    };

    btnSave_cbChanged = () => {
        const { currencyListValue } = this.state;
        const { isNewCurrencyListAdded } = this.props;
        ( isNewCurrencyListAdded )
            ? this.createCurrencyListItem( currencyListValue )
            : this.saveCurrencyListItem( currencyListValue );
    };

    btnCancel_cbChanged = () => {
        const {dispatch} = this.props;
        dispatch( acUIHideMatGlass() );
    };

    /* == controller == */

    formClick = ( e ) => {
        e.stopPropagation();
    };

    /* == action functions == */

    createCurrencyListItem = ( newCurrencyListItem ) => {
        ( this.debug_mode ) &&
            console.log( 'CurrencyListCard: createCurrencyListItem: ', newCurrencyListItem );
        // fDataCreateCurrencyToList( this.props.dispatch, null, null, newCurrencyListItem );
    };

    saveCurrencyListItem = (CurrencyListItem ) => {
        ( this.debug_mode ) &&
            console.log( 'CurrencyListCard: saveCurrencyListItem: ', CurrencyListItem );
        // fDataSaveCurrencyToList( this.props.dispatch, null, null, CurrencyListItem );
    };

    /* == renders == */

    render() {
        const { modalContent, isNewCurrencyListAdded } = this.props;
        const { CURRENCY_LIST_CARD } = MODAL_CONTENT;
        let props = this.formProps();
        return ( modalContent === CURRENCY_LIST_CARD ) &&
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
                    <div className='rows currency_row'
                         key='currency_row'>
                        <div className="cols col_16 currency_col">
                            <ComboInput { ...props.currencySelector }/>
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
                    </div>
                </div>
            </div>
    }

}

const mapStateToProps = function ( state ) {
    return {
        currencyListData:          state.data.currencyListData,
        currencyListSelectedIndex: state.data.currencyListSelectedIndex,

        currencyData:              state.currency.currencyData,

        isNewCurrencyListAdded:    state.ui.isNewCurrencyListAdded,
        modalContent:              state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( CurrencyListCard );