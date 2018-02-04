'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ComboInput from '../ComboInput/ComboInput';
import NumberInput from '../NumberInput/NumberInput';
import ButtonAdd from '../buttons/ButtonAdd/ButtonAdd';
import ButtonDelete from '../buttons/ButtonDelete/ButtonDelete';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_CURRENCY_CALCULATOR, CONFIG_UI_MODE_TIMEOUT, USER_LOGIN } from "../../config/config";
import {DATA_TYPES, DISPLAY_TYPES} from "../../data_const/data_const";
import '../../utils/utils';

import {findArrayItemIndex, isExists, isNotEmpty, isNotNaN} from "../../utils/utils";

import {
    acCurrencySetCalcInpId,
    acCurrencySetCalcInpValue,
    acCurrencySetCalcListValue,
} from "../../actions/acCurrency";

import './CurrencyCalculator.scss';

class CurrencyCalculator extends React.PureComponent {

    static propTypes = {
        currencyData:               PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:             PropTypes.number,
                Date:               PropTypes.objectOf( Date ),
                Cur_Abbreviation:   PropTypes.string,
                Cur_Scale:          PropTypes.number,
                Cur_Name:           PropTypes.string,
                Cur_OfficialRate:   PropTypes.number,
            })
        ),
        calcListValue:              PropTypes.arrayOf(
            PropTypes.shape({
                id:                 PropTypes.number,
                curId:              PropTypes.number,
                scale:              PropTypes.number,
                rate:               PropTypes.number,
            })
        ),
    };

    static defaultProps = {
        currencyData:               null,
        calcListValue:              null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'CurrencyCalculator_' + CurrencyCalculator.classID;
    };

    constructor( props ) {
        super( props );
        CurrencyCalculator.classID++;
        this.state = {
            htmlID: CurrencyCalculator.getHtmlID( props.htmlID ),
        };
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_CURRENCY_CALCULATOR;
        this.classCSS = 'CurrencyCalculator';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
        console.log( 'CurrencyCalculator: prepareData: new props: ', props )
    };

    prepareFormProps = () => {
        const { block } = DISPLAY_TYPES;
        const { currencyData, calcInpId, calcInpValue } = this.props;
        let listValue = ( isNotEmpty( currencyData ) )
            ? currencyData.map( ( item ) => {
                const {
                    Cur_ID,
                    Cur_Name,
                    Cur_Abbreviation
                } = item;
                return {
                    id: Cur_ID + '',
                    name: `${ Cur_Name } (${ Cur_Abbreviation })`
                }
            } )
            : null;
        return {
            inpName: {
                withLabel:  true,
                label:      'Основная валюта',
                display:    ComboInput.displayTypes.block,
                inputType:  ComboInput.inputTypes.comboFilter,
                defValue:   calcInpId + '',
                listValue,
                asValue:    'id',
                asText:     'name',
                options:    {
                    labelPosition:  ComboInput.position.top,
                },
                cbChanged:  this.inpName_cbChanged,
            },
            inpValue: {
                withLabel:  true,
                label:      'Сумма',
                display:    NumberInput.displayTypes.block,
                defValue:   calcInpValue,
                // isReadOnly: true,
                options:    {
                    labelPosition:  ComboInput.position.top,
                },
                cbChanged:  this.inpValue_cbChanged,
            },
            btnAdd: {
                label: 'Добавить валюту',
                display: block,
                cbChanged: this.btnAdd_cbChanged,
            }
        }
    };

    itemProps = ( itemId ) => {
        console.log( `TEST::itemProps: ${itemId}` );
        const { currencyData, calcListValue, dispatch, calcInpValue, calcInpId } = this.props;
        const { block } = DISPLAY_TYPES;
        let curInpIndex = findArrayItemIndex( currencyData, { Cur_ID: calcInpId } );
        // console.log( `TEST: curInpIndex: ${ curInpIndex }` );
        let calcInpRate = ( curInpIndex > -1 )
            ? currencyData[ curInpIndex ].Cur_OfficialRate
            : 1;
        // console.log( `TEST: calcInpRate: ${ calcInpRate }` );
        let calcInpScale = ( curInpIndex > -1 )
            ? currencyData[ curInpIndex ].Cur_Scale
            : 1;
        // console.log( `TEST: curInpScale: ${ calcInpScale }` );
        let itemIdIndex = findArrayItemIndex( calcListValue, { id: itemId } );
        return {
            outName: {
                withLabel: true,
                label: 'Валюта',
                asValue: 'id',
                asText: 'name',
                defValue: ( isExists( calcListValue[ itemIdIndex ] ) ) ? calcListValue[ itemIdIndex ].curId + '' : '',
                display: ComboInput.displayTypes.block,
                cbChanged: ( value ) => {
                    let numValue = parseInt( value );
                    numValue = ( isNotNaN(numValue) ) ? numValue : -1;
                    // Проверка на дубликат
                    /*numValue = ( findArrayItemIndex( calcListValue, { curId: numValue } ) < 0 )
                        ? numValue
                        : -1;*/
                    console.log(`cbChanged: index: ${itemId}, value: ${numValue}`);
                    // индекс в списке выбранных валют
                    // let itemIndex = findArrayItemIndex( calcListValue, { id: itemId } );
                    let newList = [...calcListValue];

                    // индекс в списке курсов валют по Cur_ID
                    let curIndex = findArrayItemIndex(currencyData, {Cur_ID: numValue});
                    const {Cur_Scale, Cur_OfficialRate} = currencyData[curIndex];

                    newList[itemIdIndex] = {
                        ...newList[itemIdIndex],
                        curId: numValue,
                        curRate: Cur_OfficialRate,
                        curScale: Cur_Scale,
                    };

                    console.log(`cbChanged: newList: ${JSON.stringify(newList)}`);
                    dispatch(acCurrencySetCalcListValue(newList));
                },
            },
            outValue: {
                withLabel: true,
                label: 'Сумма',
                defValue: ( isExists( calcListValue[ itemIdIndex ] ) )
                    ? calcInpValue * ( calcListValue[ itemIdIndex ].curScale / calcInpScale * calcInpRate / calcListValue[ itemIdIndex ].curRate)
                    : 0,
                display: NumberInput.displayTypes.block,
                isReadOnly: true,
            },
            btnDel: {
                withLabel: false,
                display: block,
                cbChanged: () => {
                    let newList = calcListValue.filter( ( listItem ) => {
                        return ( listItem.id !== itemId );
                    } );
                    console.log( "TEST: btnDel: newList: ", newList );
                    dispatch( acCurrencySetCalcListValue( newList ) );
                },
            },
        }
    };

    /* == callbacks == */

    inpName_cbChanged = ( value ) => {
        // console.log( value );
        const { dispatch } = this.props;
        const calcInpId = ( isNotEmpty( value ) )
            ? parseInt( value )
            : -1;
        dispatch( acCurrencySetCalcInpId( calcInpId ) );
    };

    inpValue_cbChanged = ( value ) => {
        const { dispatch } = this.props;
        const calcInpValue = ( isExists( value ) )
            ? value
            : 0;
        dispatch( acCurrencySetCalcInpValue( calcInpValue ) );
    };

    btnAdd_cbChanged = () => {
        console.log( "TEST: ADD" );
        this.addCurrency();
    };

    /* == action functions == */

    addCurrency = () => {
        const { dispatch } = this.props;
        let { calcListValue } = this.props;
        if ( !isExists( calcListValue ) ) calcListValue = [];
        calcListValue.push( {
            id: calcListValue.length,
            curId: -1,
            curRate: 1,
            curScale: 1,
        } );
        console.log( "TEST: addCurrency: calcListValue: ", calcListValue );
        dispatch( acCurrencySetCalcListValue( [ ...calcListValue ] ) );
    };

    /* == render functions == */

    renderItems = () => {
        const { calcListValue, currencyData } = this.props;
        const listValue = ( isNotEmpty( currencyData ) )
            ? currencyData.map( ( item ) => {
                const { Cur_ID, Cur_Name, Cur_Abbreviation } = item;
                return {
                    id: Cur_ID,
                    name: `${ Cur_Name } (${ Cur_Abbreviation })`,
                }
            } )
            : null;
        console.log( "TEST:: renderItems: calcListValue: ", calcListValue, "; listValue: ", listValue );
        return ( isNotEmpty( calcListValue ) ) &&
            calcListValue.map( ( item ) => {
                const { id, curId, curScale, curRate } = item;
                let props = this.itemProps( id );
                props.outName.listValue = [ ...listValue ];
                console.log( `TEST: renderItems: item.id ${ item.id }, props.outName.defValue: ${ props.outName.defValue }` );
                return (
                    <div className="rows currency_items"
                         key = { `currency_item_${ id }` }
                         data-row_id = { id }>
                        <div className="cols col_5"
                             key="outName">
                            <ComboInput { ...props.outName } />
                        </div>
                        <div className="cols col_5"
                             key="outValue">
                            <NumberInput { ...props.outValue } />
                        </div>
                        <div className="cols col_2 items_btn_del"
                             key="btnDel">
                            <ButtonDelete { ...props.btnDel } />
                        </div>
                    </div>
                )
            } );
    };

    /*
    * calcListValue: [
    *     {
    *         id,
    *         Cur_ID,
    *         Cur_Scale,
    *         Cur_Rate
    *     },
    * ]
    */
    renderOutput = () => {
        const { calcListValue } = this.props;
        return (
            <div className = { `${ this.classCSS }_output` }>
                {
                    ( isNotEmpty( calcListValue ) )
                    ? this.renderItems()
                    : 'Список валют пуст'
                }
            </div>
        )
    };

    render() {
        const props = this.prepareFormProps();
        return (
            <div className = { this.classCSS }>
                <div className = { `${ this.classCSS }_caption` }
                     key="caption">
                    Калькулятор валют
                </div>
                <div className = { `${ this.classCSS }_currency_input rows` }
                     key="currency_input">
                    <div className="cols col_5"
                         key="combo">
                        <ComboInput { ...props.inpName } />
                    </div>
                    <div className="cols col_5"
                         key="number">
                        <NumberInput { ...props.inpValue } />
                    </div>
                </div>
                { this.renderOutput() }
                <div className = { `${ this.classCSS }_buttons_panel rows` }>
                    <div className="cols col_3">
                        <ButtonAdd { ...props.btnAdd } />
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = function ( state ) {
    return {
        currencyData:                   state.currency.currencyData,
        calcListValue:                  state.currency.calcListValue,
        calcInpId:                      state.currency.calcInpId,
        calcInpValue:                   state.currency.calcInpValue,
    }
};

export default connect( mapStateToProps )( CurrencyCalculator );