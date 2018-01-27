'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ComboInput from '../ComboInput/ComboInput';
import DateInput from '../DateInput/DateInput';
import ButtonOk from '../buttons/ButtonOk/ButtonOk';

import {
    CONFIG_DEBUG_MODE,
    CONFIG_DEBUG_MODE_DATE_RANGE_CHART,
} from "../../config/config";

import {
    acCurrencyDynamicSelect,
    acCurrencyDynamicSetStartDate,
    acCurrencyDynamicSetEndDate,
    acCurrencyDynamicShouldBeReloaded,
    acCurrencySetDynamicCurrencyData,
} from "../../actions/acCurrency";

import {isExistsAll, isNotEmpty, isNotEmptyAll} from "../../utils/utils";

import './DateRangeChart.scss';
import {fCurrencyDynamicRates} from "../../network/fCurrency";
import {DISPLAY_TYPES} from "../../data_const/data_const";

class DateRangeChart extends React.PureComponent {

    static propTypes = {
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

        currencyDynamicSource:          PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Date:                   PropTypes.string,
                Cur_OfficialRate:       PropTypes.number,
            })
        ),

        currencyDynamicData:            PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Date:                   PropTypes.objectOf( Date ),
                Cur_OfficialRate:       PropTypes.number,
            })
        ),

        currencyDynamicLoadStatus:      PropTypes.number,
        currencyDynamicPrepareStatus:   PropTypes.number,
        currencyDynamicCurID:           PropTypes.number,
        currencyDynamicStartDate:       PropTypes.objectOf( Date ),
        currencyDynamicEndDate:         PropTypes.objectOf( Date ),
    };

    static defaultProps = {

    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'DateRangeChart_' + DateRangeChart.classID;
    };

    constructor( props ) {
        super( props );
        DateRangeChart.classID++;
        this.state = {
            htmlID: DateRangeChart.getHtmlID( props.htmlID ),
        };
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_DATE_RANGE_CHART;
        this.classCSS = 'DateRangeChart';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'DateRangeChart: prepareData: new props: ', props )

        const {
            dispatch,
            currencyData,
            currencyDynamicSource,
            currencyDynamicData,
            currencyDynamicLoadStatus,
            currencyDynamicPrepareStatus,
            currencyDynamicCurID,
            currencyDynamicStartDate,
            currencyDynamicEndDate,
        } = props;

        if ( !currencyDynamicLoadStatus ) {
            ( this.debug_mode ) &&
                console.log( 'DateRangeChart: prepareData: currencyDynamicData need to be loaded...' );

            let startStr = this.getStringDate( currencyDynamicStartDate );
            let endStr = this.getStringDate( currencyDynamicEndDate );

            ( isNotEmptyAll( [ startStr, endStr ] ) ) &&
            fCurrencyDynamicRates(
                dispatch, null, null,
                {
                    Cur_ID: ( currencyDynamicCurID + '' ),
                    startDate: startStr,
                    endDate:   endStr,
                }
            )
        }

        if ( currencyDynamicLoadStatus === 2 &&
            currencyDynamicPrepareStatus === 0 ) {
            this.prepareCurrencyDynamicData( currencyDynamicSource );
        }
    };

    prepareCurrencyDynamicData = ( currencyDynamicSource ) => {
        ( this.debug_mode ) &&
        console.log( 'DateRangeChart: prepareCurrencyDynamicData: currencyDynamicSource: ', currencyDynamicSource );
        const { dispatch } = this.props;
        let currencyDynamicData = ( isNotEmpty( currencyDynamicSource ) )
            ? currencyDynamicSource.map( ( item ) => {
                let date = new Date( Date.parse( item.Date ) );
                return {
                    ...item,
                    Date: date,
                }
            } )
            : [];
        dispatch( acCurrencySetDynamicCurrencyData( currencyDynamicData ) );
    };

    prepareFormProps = () => {
        const { currencyData, currencyDynamicCurID, currencyDynamicStartDate, currencyDynamicEndDate } = this.props;
        const { block } = DISPLAY_TYPES;
        let listValue = isNotEmpty( currencyData )
            ? currencyData.map( ( item ) => {
                return {
                    Cur_ID: item.Cur_ID,
                    text:   ( item.Cur_Name + ' (' + item.Cur_Abbreviation + ')' ),
                }
            } )
            : null;
        return {
            currId: {
                withLabel: true,
                label:     'Валюта',
                display:   ComboInput.displayTypes.block,
                inputType: ComboInput.inputTypes.comboFilter,
                defValue:  currencyDynamicCurID + '',
                listValue,
                asValue:   'Cur_ID',
                asText:    'text',
                cbChanged: this.curID_cbChanged,
            },

            dateStart: {
                withLabel: true,
                defValue:  currencyDynamicStartDate,
                label:     'Начало периода',
                display:   DateInput.displayTypes.block,
                cbChanged: this.dateStart_cbChanged,
            },

            dateEnd: {
                withLabel: true,
                defValue:  currencyDynamicEndDate,
                label:     'Конец периода',
                display:   DateInput.displayTypes.block,
                cbChanged: this.dateEnd_cbChanged,
            },

            btnOk: {
                label:     'Показать',
                display:   block,
                cbChanged: this.btnOk_cbChanged,
            },
        }
    };

    /* == callbacks == */

    curID_cbChanged = ( value ) => {
        ( this.debug_mode ) && console.log( 'curID_cbChanged: ', value );
        const { dispatch } = this.props;
        dispatch( acCurrencyDynamicSelect( parseInt( value ) ) );
    };

    dateStart_cbChanged = ( value ) => {
        const { dispatch, currencyDynamicEndDate } = this.props;
        if ( isExistsAll( [ value, currencyDynamicEndDate ] ) ) {
            value = ( value <= currencyDynamicEndDate )
            ? value
            : currencyDynamicEndDate;

            /*value = ( currencyDynamicEndDate - value <= 365 )
                ? value
                : currencyDynamicEndDate - 365;*/
        }
        dispatch( acCurrencyDynamicSetStartDate( value ) );
    };

    dateEnd_cbChanged = ( value ) => {
        const { dispatch, currencyDynamicStartDate } = this.props;
        if ( isExistsAll( [ value, currencyDynamicStartDate ] ) ) {
            value = ( value >= currencyDynamicStartDate )
                ? value
                : currencyDynamicStartDate;

            /*value = ( value - currencyDynamicStartDate <= 365 )
                ? value
                : currencyDynamicStartDate + 365;*/
        }
        dispatch( acCurrencyDynamicSetEndDate( value ) );
    };

    btnOk_cbChanged = () => {
        const { dispatch } = this.props;
        dispatch( acCurrencyDynamicShouldBeReloaded() );
    };

    /* == service functions == */

    getMinMaxDelta = ( list, field ) => {
        // console.log( list, field );
        let result = null;
        if ( isNotEmptyAll( [ list, field ] ) ) {
            result = { min: list[ 0 ][ field ], max: 0 };
            for ( let i = 0; i < list.length; i++ ) {
                result.min = Math.min( result.min, list[ i ][ field ] );
                result.max = Math.max( result.max, list[ i ][ field ] );
            }
            result.delta = result.max - result.min;
        }
        return result;
    };

    getStringDate = (date ) => {
        return ( date instanceof Date )
            ? date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate()
            : '';
    };

    getFormattedDateDDMMYYY = ( date ) => {
        let d = new Date( Date.parse( date ) );
        return ( d instanceof Date )
            ? this.N0( d.getDate(), 2 ) + '-' + this.N0( ( d.getMonth() + 1 ), 2 ) + '-' + d.getFullYear()
            : '';
    };

    N0 = ( value, n ) => {
        let v = value + '';
        if ( v.length > n ) {
            return v.substr( 0, n );
        }
        else if ( v.length < n ) {
            while ( v.length < n ) {
                v = '0' + v;
            }
        }
        return v;
    };

    /* == controller == */

    svgMouseOver = (e ) => {
        if ( e.target.tagName === 'path' ) {
            this.legendDate.innerHTML = e.target.dataset.date;
            this.legendRate.innerHTML = e.target.dataset.rate;
            let parentWidth = this.legend.parentElement.offsetWidth;
            let x = e.nativeEvent.offsetX === undefined
                ? e.nativeEvent.layerX
                : e.nativeEvent.offsetX;
            // console.log( x );
            this.legend.style.left = ( x + this.legend.offsetWidth < parentWidth )
                ? x + 'px'
                : ( parentWidth - this.legend.offsetWidth - 4 ) + 'px';
        }
    };

    svgMouseDown = ( e ) => {
        if ( e.target.tagName === 'path' ) {
            e.target.dataset.selected = 'true';
        }
    };

    /* == render functions == */

    renderChart = () => {
        const { currencyDynamicData } = this.props;
        let levels = this.getMinMaxDelta( currencyDynamicData, 'Cur_OfficialRate' );
        // console.log( 'levels: ', levels );
        return (
            <g>
                {
                    ( isNotEmpty( currencyDynamicData ) ) &&
                        currencyDynamicData.map( ( item, index ) => {
                            return (
                                <path className="chart_column"
                                      key = { index }
                                      data-rate = { item.Cur_OfficialRate }
                                      data-date = { this.getFormattedDateDDMMYYY( item.Date ) }
                                      data-selected = 'false'
                                      d = { `M ${ index } 120 V ${ 110 - ( item.Cur_OfficialRate - levels.min ) / levels.delta * 100 }` }
                                      stroke="#0000ff" strokeWidth="1" fill="#0000ff"/>
                            )
                        } )
                }
            </g>
        )
    };

    render() {
        const { currencyDynamicData, currencyDynamicStartDate, currencyDynamicEndDate } = this.props;
        let props = this.prepareFormProps();
        return (
            <div className = { this.classCSS }>
                <div className = { this.classCSS + "_caption" }
                     key="caption">
                    Динамика курса валют за период ( до 365 дней )
                </div>
                <div className="rows options"
                     key="options">
                    <div className="cols col_4"
                         key="currency">
                        <ComboInput { ...props.currId }/>
                    </div>
                    <div className="cols col_4"
                         key="startDate">
                        <DateInput { ...props.dateStart }/>
                    </div>
                    <div className="cols col_4"
                         key="endDate">
                        <DateInput { ...props.dateEnd }/>
                    </div>
                    {
                        ( isExistsAll([ currencyDynamicStartDate, currencyDynamicEndDate ]) ) &&
                        <div className="cols col_4"
                             key="buttonOk">
                            <ButtonOk { ...props.btnOk }/>
                        </div>
                    }
                </div>
                <div className="rows chart_box"
                     key="chart">
                    <div className="cols col_16 chart">
                        {
                            ( isNotEmpty( currencyDynamicData ) )
                            ? <svg className = { this.classCSS + "_chart_image" }
                                   onMouseOver = { this.svgMouseOver }
                                   onMouseDown = { this.svgMouseDown }
                                   width =   "100%"
                                   height =  "300px"
                                   viewBox = { `0 0 ${ currencyDynamicData.length } 120` }
                                   preserveAspectRatio = "none"
                                   xmlns =   "http://www.w3.org/2000/svg">
                                    { this.renderChart() }
                              </svg>
                            : <span>
                                  Нет данных для отображения
                              </span>
                        }
                        {
                            ( isNotEmpty( currencyDynamicData ) ) &&
                            <div className = { this.classCSS + "_legend" }
                                 ref = { ( elm ) => { this.legend = elm } }>
                                <div className = { this.classCSS + "_legend_date" }
                                      key="legend_date"
                                     ref = { ( elm ) => { this.legendDate = elm } }>

                                </div>
                                <div className = { this.classCSS + "_legend_rate" }
                                      key="legend_rate"
                                     ref = { ( elm ) => { this.legendRate = elm } }>

                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function ( state ) {
    return {
        currencyData:                   state.currency.currencyData,
        currencyDynamicSource:          state.currency.currencyDynamicSource,
        currencyDynamicLoadStatus:      state.currency.currencyDynamicLoadStatus,
        currencyDynamicPrepareStatus:   state.currency.currencyDynamicPrepareStatus,
        currencyDynamicData:            state.currency.currencyDynamicData,
        currencyDynamicCurID:           state.currency.currencyDynamicCurID,
        currencyDynamicStartDate:       state.currency.currencyDynamicStartDate,
        currencyDynamicEndDate:         state.currency.currencyDynamicEndDate,
    }
};

export default connect( mapStateToProps )( DateRangeChart );