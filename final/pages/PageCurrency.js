'use strict';

import React from 'react';
import { connect } from 'react-redux';

import SmartGrid from '../components/SmartGrid/SmartGrid';

import './PageCurrency.scss';
import {USER_LOGIN} from "../config/config";
import {ALIGN_TYPES, DATA_TYPES, SORTING} from "../data_const/data_const";

class PageCurrency extends React.PureComponent {

    constructor( props ) {
        super( props );
        this.classCSS = 'PageCurrency';
        this.debug_mode = true;
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

            body: currencyData.map( ( item, index ) => {
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
            } ),


        }
    };

    render() {
        let props = this.prepareTableProps();
        return (
            <div className = { this.classCSS }>
                <div className="wrapper">
                    <SmartGrid { ...props }/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function ( state ) {
    return {
        currencyLoadStatus:             state.currency.currencyLoadStatus,
        currencySaveStatus:             state.currency.currencySaveStatus,
        currencySource:                 state.currency.currencySource,
        currencyData:                   state.currency.currencyData,

        currencySelectedIndex:          state.currency.currencySelectedIndex,

        matGlassIsVisible:              state.ui.matGlassIsVisible,
        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( PageCurrency );
