'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_CURRENCY_LIST_CARD } from "../../config/config";
import {DISPLAY_TYPES, MODAL_CONTENT} from "../../data_const/data_const";

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

        currencyData:                   PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Date:                   PropTypes.objectOf( Date ),
                Cur_Abbreviation:       PropTypes.string,
                Cur_Scale:              PropTypes.number,
                Cur_Name:               PropTypes.string,
                Cur_OfficialRate:       PropTypes.number,
            })
        ),
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
        currencyData:                   [],
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
            currencyListSelectedIndex: -1,
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
    };

    formProps = () => {
        let { currencyListSelectedIndex } = this.state;
        const { currencyListData, currencyData, isNewCurrencyListAdded } = this.props;
        const { block, none } = DISPLAY_TYPES;

        // подготовить список значений для ComboInput
        let listValue = ( !isNotEmpty( currencyData ) )
            ? null
            : ( !isNotEmpty( currencyListData ) )
                ? [ ...currencyData ]
                : currencyData.filter( ( item ) => {
                    return ( findArrayItemIndex( currencyListData, { code: item.Cur_Code } ) === -1 );
                } );

        // подготовить значение по умолчанию для ComboInput
        let defValue = '';
        if ( isNotEmpty( listValue ) ) {
            defValue = ( currencyListSelectedIndex > -1 )
                ? currencyData[ currencyListSelectedIndex ].Cur_Code
                : '';
                 // : listValue[ 0 ].Cur_Code;
        }

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
                defValue,
                listValue,
                asValue: 'Cur_Code',
                asText: 'Cur_Name',
                cbChanged: this.listItem_cbChanged,
            },
            btnOk: {
                label: 'Сохранить',
                display: ( currencyListSelectedIndex > -1 ) ? block : none,
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
        // console.log( 'CurrencyListCard: listItem_cbChanged: ', value );
        const { currencyData } = this.props;
        let currencyListSelectedIndex = findArrayItemIndex( currencyData, { Cur_Code: value } );

        this.setState( { currencyListSelectedIndex }, () => {
            ( this.debug_mode ) &&
                console.log( 'CurrencyListCard: listItem_cbChanged: state: ', this.state );
        } );
    };

    btnSave_cbChanged = () => {
        const { currencyListSelectedIndex } = this.state;
        const { currencyData } = this.props;
        // console.log( "TEST: currencyData: ", currencyData );

        if ( isNotEmpty( currencyData ) && currencyListSelectedIndex > -1 ) {

            const {
                Cur_Code,
                Cur_Name,
                Cur_Abbreviation,
                Cur_Scale,
                Cur_OfficialRate,
                Date
            } = currencyData[ currencyListSelectedIndex ];

            let currencyListValue = {
                code: Cur_Code,
                name: Cur_Name,
                abbreviation: Cur_Abbreviation,
                scale: Cur_Scale,
                rate: Cur_OfficialRate,
                updated: Date.getTime()
            };

            ( this.debug_mode ) &&
                console.log( "CurrencyListCard: btnSave_cbChanged: currencyListValue: ", currencyListValue );
            this.createCurrencyListItem( currencyListValue )
        }



        // ( isNewCurrencyListAdded )
            // ?
            // : this.saveCurrencyListItem( currencyListValue );
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
        fDataCreateCurrencyToList( this.props.dispatch, null, null, newCurrencyListItem );
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
        currencyListValue:         state.data.currencyListValue,

        currencyData:              state.currency.currencyData,

        isNewCurrencyListAdded:    state.ui.isNewCurrencyListAdded,
        modalContent:              state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( CurrencyListCard );