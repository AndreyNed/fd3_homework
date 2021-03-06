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

import { DRAG_MODE } from "../../data_const/data_const";

import {
    acCurrencyDynamicSelect,
    acCurrencyDynamicSetStartDate,
    acCurrencyDynamicSetEndDate,
    acCurrencyDynamicShouldBeReloaded,
    acCurrencySetDynamicCurrencyData,
    acCurrencyDynamicSetStartPoint,
    acCurrencyDynamicSetEndPoint,
    acCurrencyDynamicSetPoints,
} from "../../actions/acCurrency";

import {findArrayItemIndex, isExists, isExistsAll, isNotEmpty, isNotEmptyAll} from "../../utils/utils";

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
        currencyDynamicStartPoint:      PropTypes.shape({
            date:                       PropTypes.objectOf( Date ),
            dateStr:                    PropTypes.string,
            rate:                       PropTypes.number,
        }),
        currencyDynamicEndPoint:        PropTypes.shape({
            date:                       PropTypes.objectOf( Date ),
            dateStr:                    PropTypes.string,
            rate:                       PropTypes.number,
        }),
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
            htmlID:     DateRangeChart.getHtmlID( props.htmlID ),
        };
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_DATE_RANGE_CHART;
        this.dragMode = DRAG_MODE.NONE;
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
        if ( isNotEmpty( currencyDynamicData ) ) {
            let startPoint = {
                date:    currencyDynamicData[ 0 ].Date,
                dateStr: this.getFormattedDateDDMMYYY( currencyDynamicData[ 0 ].Date ),
                rate:    currencyDynamicData[ 0 ].Cur_OfficialRate,
            };
            let last = currencyDynamicData.length - 1;
            let endPoint = {
                date:    currencyDynamicData[ last ].Date,
                dateStr: this.getFormattedDateDDMMYYY( currencyDynamicData[ last ].Date ),
                rate:    currencyDynamicData[ last ].Cur_OfficialRate,
            };
            dispatch( acCurrencyDynamicSetPoints( startPoint, endPoint ) );
        }
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

    getCurrency = () => {
        const { currencyData, currencyDynamicData } = this.props;
        if ( isNotEmptyAll( [ currencyDynamicData, currencyData ] ) ) {
            let Cur_ID = currencyDynamicData[ 0 ].Cur_ID;
            let index = findArrayItemIndex( currencyData, { Cur_ID: Cur_ID } );
            // console.log( 'TEST: index: ', index );
            const { Cur_Scale, Cur_Name, Cur_QuotName, Cur_Abbreviation } = currencyData[ index ];
            return {
                scale: Cur_Scale,
                name:  Cur_Name,
                quotName: Cur_QuotName,
                abbreviation: Cur_Abbreviation,
            };
        }
        return { scale: 0, name: '', Cur_QuotName: '', abbreviation: '' };
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

    svgMouseOver = ( e ) => {
        // e.preventDefault();
        if ( e.target.tagName === 'path' && ('point' in e.target.dataset) ) {
            this.legendDate.innerHTML = e.target.dataset.date_str;
            this.legendRate.innerHTML = e.target.dataset.rate;
            let parentWidth = this.legend.parentElement.offsetWidth;
            let x = e.nativeEvent.offsetX === undefined
                ? e.nativeEvent.layerX
                : e.nativeEvent.offsetX;
            // console.log( x );
            this.legend.style.left = ( x + this.legend.offsetWidth < parentWidth )
                ? x + 'px'
                : ( parentWidth - this.legend.offsetWidth - 8 ) + 'px';
        }
    };

    svgMouseOut = ( e ) => {
        this.legendDate.innerHTML = '';
        this.legendRate.innerHTML = '';
    };

    svgMouseDown = ( e ) => {
        if ( e.target.tagName === 'path' ) {
            const { point } = e.target.dataset;
            this.dragMode = point;
            // console.log( 'svgMouseDown: dragMode: ', this.dragMode );
        }
    };

    svgMouseUp = ( e ) => {
        if ( e.target.tagName === 'path' ) {
            e.target.dataset.selected = 'true';

            const { dispatch } = this.props;
            const { date, date_str, rate, point } = e.target.dataset;
            const { NONE, START_POINT, END_POINT } = DRAG_MODE;

            let pointCur = { date: new Date( Date.parse( date ) ), dateStr: date_str, rate: parseFloat( rate ) };
            // console.log( 'svgMouseUp: point: ', pointCur );
            switch ( this.dragMode ) {
                case START_POINT:
                    dispatch( acCurrencyDynamicSetStartPoint( pointCur ) );
                    break;
                case END_POINT:
                    dispatch( acCurrencyDynamicSetEndPoint( pointCur ) );
                    break;
            }
            // console.log( 'svgMouseUp: dragMode: ', this.dragMode );
        }
    };

    /* == render functions == */

    renderChart = ( levels ) => {
        const { currencyDynamicData, currencyDynamicStartPoint, currencyDynamicEndPoint } = this.props;
        const { START_POINT, END_POINT, NONE } = DRAG_MODE;
        return ( isNotEmpty( currencyDynamicData) ) &&
            <g>
                {
                    currencyDynamicData.map( ( item, index ) => {
                        let itemDateValue = item.Date.getTime();
                        return (
                            <path className="chart_column"
                                  key = { index }
                                  data-rate = { item.Cur_OfficialRate }
                                  data-date_str = { this.getFormattedDateDDMMYYY( item.Date ) }
                                  data-date = { item.Date }
                                  data-point = {
                                      ( itemDateValue === currencyDynamicStartPoint.date.getTime() )
                                          ? START_POINT
                                          : ( itemDateValue === currencyDynamicEndPoint.date.getTime() )
                                          ? END_POINT
                                          : NONE
                                  }
                                  data-selected = 'false'
                                  d = { `M ${ index + 0.5 } 120 V ${ 110 - ( item.Cur_OfficialRate - levels.min ) / levels.delta * 100 }` }
                                  stroke="#0000ff" strokeWidth="1" fill="#0000ff"/>
                        )
                    } )
                }
                {
                    ( isExists( currencyDynamicStartPoint.rate ) ) &&
                        <path d = { `M 0 ${ 110 - ( currencyDynamicStartPoint.rate - levels.min ) / levels.delta * 100 } H ${ currencyDynamicData.length }` }
                              stroke="#ff0000"
                              strokeWidth="1"
                              fill="none"
                        />
                }
                {
                    ( isExists( currencyDynamicEndPoint.rate ) ) &&
                    <path d = { `M 0 ${ 110 - ( currencyDynamicEndPoint.rate - levels.min ) / levels.delta * 100 } H ${ currencyDynamicData.length }` }
                          stroke="#ff0000"
                          strokeWidth="1"
                          fill="none"
                    />
                }
            </g>
    };

    render() {
        ( this.debug_mode ) && console.log( 'DateRangeChart: RENDER...' );
        const {
            currencyDynamicData,
            currencyDynamicStartDate,
            currencyDynamicEndDate,
            currencyDynamicStartPoint,
            currencyDynamicEndPoint
        } = this.props;
        let props = this.prepareFormProps();
        let ratesDelta = ( currencyDynamicEndPoint.rate - currencyDynamicStartPoint.rate ) / currencyDynamicEndPoint.rate * 100;
        ratesDelta = Math.round( ratesDelta * 100 ) / 100;
        let levels = this.getMinMaxDelta( currencyDynamicData, 'Cur_OfficialRate' );
        let currency = this.getCurrency();

        return (
            <div className = { this.classCSS }>
                <div className = { this.classCSS + "_caption" }
                     key="caption">
                    { `Динамика курса валют за период (до 365 дней):` }
                    <div className = { this.classCSS + "_subcaption" }>
                        { `Белорусских рублей (BYN) за ${ currency.quotName } (${ currency.abbreviation })` }
                    </div>
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
                    <div className="cols col_1 os_y_note_box"
                         key="chart_os_y_note">
                        <div className="os_y_note"
                             key="os_y_note">
                            { `Курс (BYN / ${ currency.scale } ${ currency.abbreviation })` }
                        </div>
                    </div>
                    <div className="cols col_15 chart">
                        {
                            ( isNotEmpty( currencyDynamicData ) ) &&
                            <div className="os_y_zero"
                                 key="os_y_zero">
                                { Math.round( ( levels.min + levels.delta * 0.1 ) * 1000 ) / 1000 }
                            </div>
                        }
                        {
                            ( isNotEmpty( currencyDynamicData ) )
                            ? <svg className = { this.classCSS + "_chart_image" }
                                   onMouseOver = { this.svgMouseOver }
                                   onMouseOut = { this.svgMouseOut }
                                   onMouseDown = { this.svgMouseDown }
                                   onMouseUp = { this.svgMouseUp }
                                   width =   "100%"
                                   height =  "300px"
                                   viewBox = { `0 0 ${ currencyDynamicData.length + 0.5 } 120` }
                                   preserveAspectRatio = "none"
                                   xmlns =   "http://www.w3.org/2000/svg">
                                    { this.renderChart( levels ) }
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
                {
                    ( isNotEmpty( currencyDynamicData ) ) &&
                    <div className="rows os_x"
                         key="chart_os_x">
                        <div className="cols col_1"
                             key="os_x_empty">
                        </div>
                        <div className="cols col_15 os_x_note_box"
                             key="os_x_note_box">
                            <div className="os_x_note">
                                Период (дни)
                            </div>
                        </div>
                    </div>
                }
                {
                    ( isNotEmpty( currencyDynamicData ) ) &&
                        <div className="rows points_info">
                            <div className="cols col_5 info_rates"
                                 key="info_rates">
                                <div className="rows"
                                     key="info_rates_start">
                                    <div className="cols col_16">
                                        <label className = { this.classCSS + "_rates_start" }>
                                            { `Точка 1: ${ currencyDynamicStartPoint.dateStr } (${ currencyDynamicStartPoint.rate })` }
                                        </label>
                                    </div>
                                </div>
                                <div className="rows"
                                     key="info_rates_end">
                                    <div className="cols col_16">
                                        <label className = { this.classCSS + "_rates_end" }>
                                            { `Точка 2: ${ currencyDynamicEndPoint.dateStr } (${ currencyDynamicEndPoint.rate })` }
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="cols col_5 info_delta"
                                 key="info_delta">
                                { `Изменение курса: ${ ratesDelta }%` }
                            </div>
                        </div>
                }
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
        currencyDynamicStartPoint:      state.currency.currencyDynamicStartPoint,
        currencyDynamicEndPoint:        state.currency.currencyDynamicEndPoint,
    }
};

export default connect( mapStateToProps )( DateRangeChart );