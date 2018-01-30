'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SmartGrid from '../../components/SmartGrid/SmartGrid';
import DateRangeChart from '../../components/DateRangeChart/DateRangeChart';
import ButtonLabel from '../../components/buttons/ButtonLabel/ButtonLabel';

import './PageCurrency.scss';
import { USER_LOGIN, CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_PAGE_CURRENCY } from "../../config/config";
import { ALIGN_TYPES, DATA_TYPES, SORTING, CURRENCY_MODES } from "../../data_const/data_const";

import { acUISetCurrencyMode } from "../../actions/acUI";
import {isNotEmpty} from "../../utils/utils";

class PageCurrency extends React.PureComponent {

    static propTypes = {
        currencyMode:               PropTypes.oneOf([
            CURRENCY_MODES.DAILY_RATES,
            CURRENCY_MODES.DYNAMIC_RATES,
        ]),

        currencyData:               PropTypes.arrayOf(
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

    };

    constructor( props ) {
        super( props );
        this.classCSS = 'PageCurrency';
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_PAGE_CURRENCY;
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'PageCurrency: prepareData: props: ', props );
    };

    prepareLeftSectionProps = () => {
        const { currencyMode } = this.props;
        const { LEFT } = ALIGN_TYPES;
        const { DAILY_RATES, DYNAMIC_RATES } = CURRENCY_MODES;

        return {
            btnDailyRates: {
                label: 'Ежедневный курс',
                isActive: ( currencyMode === DAILY_RATES ),
                options: {
                    labelAlign: LEFT,
                },
                cbChanged: this.btnDailyRates_cbChanged,
            },
            btnDynamicRates: {
                label: 'Курс в динамике',
                isActive: ( currencyMode === DYNAMIC_RATES ),
                options: {
                    labelAlign: LEFT,
                },
                cbChanged: this.btnDynamicRates_cbChanged,
            },
        }
    };

    prepareTableProps = () => {
        const { NUMBER, STRING, DATE } = DATA_TYPES;
        const { NONE } = SORTING;
        const { LEFT, CENTER, RIGHT } = ALIGN_TYPES;
        const { currencyData } = this.props;
        return {
            userLogin:          USER_LOGIN,
            tableName:          'currencyDailyAll',
            withCaption:        true,
            withFilter:         true,
            withFooter:         true,
            withButtonExport:   true,
            caption:            'Официальный курс обмена валют НБ РБ',
            rowsPerPage:        10,
            tableWidth:         '100%',
            textFilterValue:    '',
            primaryId:          'Cur_ID',
            defValue:           null,

            headers: [
                {
                    id:             'Cur_ID',
                    title:          'id',
                    dataType:       NUMBER,
                    align:          RIGHT,
                    isSortable:     true,
                    sorting:        NONE,
                    isSearchable:   true,
                    isVisible:      true,
                    width:          '10%',
                },
                {
                    id:             'Date',
                    title:          'Дата',
                    dataType:       DATE,
                    align:          CENTER,
                    isSortable:     true,
                    sorting:        NONE,
                    isSearchable:   true,
                    isVisible:      true,
                    width:          '15%',
                },
                {
                    id:             'Cur_Abbreviation',
                    title:          'Абревиатура',
                    dataType:       STRING,
                    align:          CENTER,
                    isSortable:     true,
                    sorting:        NONE,
                    isSearchable:   true,
                    isVisible:      true,
                    width:          '15%',
                },
                {
                    id:             'Cur_Scale',
                    title:          'Единицы',
                    dataType:       NUMBER,
                    align:          RIGHT,
                    isSortable:     true,
                    sorting:        NONE,
                    isSearchable:   true,
                    isVisible:      true,
                    width:          '20%',
                },
                {
                    id:             'Cur_Name',
                    title:          'Наименование',
                    dataType:       STRING,
                    align:          LEFT,
                    isSortable:     true,
                    sorting:        NONE,
                    isSearchable:   true,
                    isVisible:      true,
                    width:          '25%',
                },
                {
                    id:             'Cur_OfficialRate',
                    title:          'Курс к бел. рублю',
                    dataType:       NUMBER,
                    align:          RIGHT,
                    isSortable:     true,
                    sorting:        NONE,
                    isSearchable:   false,
                    isVisible:      true,
                    width:          '15%',
                },
            ],

            body: ( isNotEmpty( currencyData ) )
                ? currencyData.map( ( item, index ) => {
                return {
                    rowIndex: index,
                    cells: [
                        {
                            id: "Cur_ID",
                            value: item.Cur_ID,
                        },
                        {
                            id: "Date",
                            value: item.Date,
                        },
                        {
                            id: "Cur_Abbreviation",
                            value: item.Cur_Abbreviation,
                        },
                        {
                            id: "Cur_Scale",
                            value: item.Cur_Scale,
                        },
                        {
                            id: "Cur_Name",
                            value: item.Cur_Name,
                        },
                        {
                            id: "Cur_OfficialRate",
                            value: item.Cur_OfficialRate,
                        },
                    ],
                }
            } )
                : [],
        }
    };

    prepareDynamicRatesProps = () => {
        return {

        }
    };

    /* == callbacks == */

    btnDailyRates_cbChanged = () => {
        const { dispatch } = this.props;
        const { DAILY_RATES } = CURRENCY_MODES;
        dispatch( acUISetCurrencyMode( DAILY_RATES ) );
    };

    btnDynamicRates_cbChanged = () => {
        const { dispatch } = this.props;
        const { DYNAMIC_RATES } = CURRENCY_MODES;
        dispatch( acUISetCurrencyMode( DYNAMIC_RATES ) );
    };

    /* == render functions == */

    renderLeftSection = () => {
        const { currencyMode } = this.props;
        const { DAILY_RATES, DYNAMIC_RATES } = CURRENCY_MODES;
        let props = this.prepareLeftSectionProps();
        return (
            <div className = { this.classCSS + "_left_section" }>
                <div className="rows btn_daily_rates"
                     key="btn_daily_rates">
                    <div className="cols col_16"
                         style = {{
                             fontWeight: ( currencyMode === DAILY_RATES )
                                 ? 'bold'
                                 : 'normal'
                         }}>
                        <ButtonLabel { ...props.btnDailyRates }/>
                    </div>
                </div>
                <div className="rows btn_dynamic_rates"
                     key="btn_dynamic_rates">
                    <div className="cols col_16"
                         style = {{
                             fontWeight: ( currencyMode === DYNAMIC_RATES )
                                 ? 'bold'
                                 : 'normal'
                         }}>
                        <ButtonLabel { ...props.btnDynamicRates }/>
                    </div>
                </div>
            </div>
        )
    };

    renderMainSection = () => {
        const { currencyMode } = this.props;
        const { DAILY_RATES, DYNAMIC_RATES } = CURRENCY_MODES;
        let propsDaily = this.prepareTableProps();
        let propsDynamic = this.prepareDynamicRatesProps();
        return (
            <div className = { this.classCSS + "_main_section" }>
                {
                    ( currencyMode === DAILY_RATES )
                        ? <SmartGrid { ...propsDaily }/>
                        : ( currencyMode === DYNAMIC_RATES )
                            ? <DateRangeChart { ...propsDynamic }/>
                            : null
                }
            </div>
        )
    };

    render() {
        return (

            <div className = { this.classCSS }>
                <div className="wrapper">
                    { this.renderLeftSection() }
                    { this.renderMainSection() }
                </div>
            </div>

        )
    }
}

const mapStateToProps = function ( state ) {
    return {
        // currencyPrepareStatus:          state.currency.currencyPrepareStatus,
        // currencySaveStatus:             state.currency.currencySaveStatus,

        currencyData:                   state.currency.currencyData,

        currencySelectedIndex:          state.currency.currencySelectedIndex,

        // matGlassIsVisible:              state.ui.matGlassIsVisible,
        modalContent:                   state.ui.modalContent,
        currencyMode:                   state.ui.currencyMode,
    }
};

export default connect( mapStateToProps )( PageCurrency );
