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
    acCurrencyDynamicShouldBeReloaded,
} from "../../actions/acCurrency";

import {isNotEmpty, isNotEmptyAll} from "../../utils/utils";

import './DateRangeChart.scss';

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

        currencyDynamicData:            PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Date:                   PropTypes.objectOf( Date ),
                Cur_OfficialRate:       PropTypes.number,
            })
        ),

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
    };

    prepareFormProps = () => {
        const { currencyData, currencyDynamicCurID } = this.props;
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
                label:     'Начало периода',
            },

            dateEnd: {
                withLabel: true,
                label:     'Конец периода',
            },

            btnOk: {
                cbChanged: this.btnOk_cbChanged,
            },
        }
    };

    /* == callbacks == */

    curID_cbChanged = ( value ) => {
        // console.log( 'curID_cbChanged: ', value );
        const { dispatch } = this.props;
        dispatch( acCurrencyDynamicSelect( parseInt( value ) ) );
    };

    btnOk_cbChanged = () => {
        const { dispatch } = this.props;
        dispatch( acCurrencyDynamicShouldBeReloaded() );
    };

    /* == service functions == */

    getMinMaxDelta = ( list, field ) => {
        console.log( list, field );
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

    /* == render functions == */

    renderChart = () => {
        const { currencyDynamicData } = this.props;
        let levels = this.getMinMaxDelta( currencyDynamicData, 'Cur_OfficialRate' );
        console.log( 'levels: ', levels );
        return (
            <g>
                {
                    ( isNotEmpty( currencyDynamicData ) ) &&
                        currencyDynamicData.map( ( item, index ) => {
                            return (
                                <path key = { index }
                                      d = { `M ${ index } 100 V ${ ( item.Cur_OfficialRate - levels.min ) / levels.delta * 100 }` }
                                      stroke="#0000ff" strokeWidth="1" fill="#0000ff"/>
                            )
                        } )
                }
            </g>
        )
    };

    render() {
        const { currencyDynamicData } = this.props;
        let props = this.prepareFormProps();
        return (
            <div className = { this.classCSS }>
                <div className = { this.classCSS + "_caption" }
                     key="caption">
                    Динамика курса валют за период ( НБРБ )
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
                    <div className="cols col_4"
                         key="buttonOk">
                        <ButtonOk { ...props.btnOk }/>
                    </div>
                </div>
                <div className="rows chart"
                     key="chart">
                    <div className="cols col_16">
                        {
                            ( isNotEmpty( currencyDynamicData ) )
                            ? <svg className = { this.classCSS + "_chart_image" }
                                   width =   "100%"
                                   height =  "300px"
                                   viewBox = "0 0 365 100"
                                   preserveAspectRatio = "none"
                                   xmlns =   "http://www.w3.org/2000/svg">
                                    { this.renderChart() }
                              </svg>
                            : <span>
                                  Нет данных для отображения
                              </span>
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
        currencyDynamicData:            state.currency.currencyDynamicData,
        currencyDynamicCurID:           state.currency.currencyDynamicCurID,
        currencyDynamicStartDate:       state.currency.currencyDynamicStartDate,
        currencyDynamicEndDate:         state.currency.currencyDynamicEndDate,
    }
};

export default connect( mapStateToProps )( DateRangeChart );