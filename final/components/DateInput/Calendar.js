"use strict";

import React from 'react';
import PropTypes from 'prop-types';

require( './Calendar.css' );

class Calendar extends React.PureComponent {

    static defaultProps = {
        value:              new Date(),
        showYearsBox:       false,
    };

    static propTypes ={
        postfixClassName:   PropTypes.string,
        value:              PropTypes.object,
        dateArray:          PropTypes.array,
        yearsArray:         PropTypes.array,
        showYearsBox:       PropTypes.bool,
        isShowed:           PropTypes.bool,
        headInputClick:     PropTypes.func,
        calendarPrevClick:  PropTypes.func,
        calendarNextClick:  PropTypes.func,
        tableCellClick:     PropTypes.func,
        yearsTableClick:    PropTypes.func,
        yearsBtnNextClick:  PropTypes.func,
        yearsBtnPrevClick:  PropTypes.func,

    };

    classCSS = 'CalendarR';

    getDateClassName = ( dateValue ) => {
        let classValue = '';
        if ( dateValue && this.props.value ) {
            let currMonth = this.props.value.getMonth();
            let currDate = this.props.value.getDate();
            let month = dateValue.getMonth();
            let date = dateValue.getDate();
            if ( currMonth === month ) {
                classValue += ' calendar_month_current';
            } else{
                classValue += ' calendar_month_other';
            }
            let day = dateValue.getDay() - 1;
            day = ( day < 0 ) ? 6 : day;
            if ( day < 5 ) {
                classValue += ' calendar_workday';
            } else {
                classValue += ' calendar_weekend';
            }
            if ( month === currMonth && date === currDate ) {
                classValue += ' calendar_current_date';
            }
        }
        return classValue.trim();
    };

    getMonthStr = ( monthNum ) => {
        if ( monthNum >= 0 && monthNum < 12 ) {
            const monthStr = [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь'
            ];
            return monthStr[ monthNum ];
        } else return monthNum;
    };

    render() {
        return (
            <div className= { ( this.props.postfixClassName &&
                this.props.postfixClassName.length > 0 ) ?
                ( this.classCSS + ' ' + this.classCSS + '_' + this.props.postfixClassName ) : this.classCSS }
                value = { this.props.value }
                data-is_showed = { this.props.isShowed }>
                <div className = { this.classCSS + '_head' }
                     onClick = { this.props.onClick }>
                    <div className = { this.classCSS + "_btn " + this.classCSS + "_btn_prev" }
                         onClick = { this.props.calendarPrevClick }>
                        <svg width=  "100%"
                             height= "100%"
                             viewBox="0 0 16 16"
                             preserveAspectRatio = 'none'
                             xmlns =               'http://www.w3.org/2000/svg'>
                            <path d="M 15 1 L 1 8 L 15 15 z"
                                stroke="#d3d3d3" strokeWidth="1" />
                        </svg>
                    </div>
                    <input readOnly = { true }
                           type =     'text'
                           className = { this.classCSS + "_input_month" }
                           value =     { this.getMonthStr( this.props.value.getMonth()) +
                                ', ' + this.props.value.getFullYear() }
                           onClick = { this.props.headInputClick }/>
                    <div className = { this.classCSS + "_btn " + this.classCSS + "_btn_next" }
                         onClick =   { this.props.calendarNextClick }>
                        <svg width=  "100%"
                             height= "100%"
                             viewBox="0 0 16 16"
                             preserveAspectRatio = 'none'
                             xmlns =               'http://www.w3.org/2000/svg'>
                            <path d="M 1 1 L 15 8 L 1 15 z"
                                  stroke="#d3d3d3" strokeWidth="1" />
                        </svg>
                    </div>
                </div>
                <div className = { this.classCSS + '_body' }>
                    <table width =          '100%'
                           cellSpacing =    '0'
                           cellPadding =    '5px'>
                        <thead>
                        <tr>
                            <th>Пн</th>
                            <th>Вт</th>
                            <th>Ср</th>
                            <th>Чт</th>
                            <th>Пт</th>
                            <th>Сб</th>
                            <th>Вс</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.props.dateArray.map( ( week, indexW ) => {
                            return (
                                <tr key = { '.' +indexW }
                                    className = { this.classCSS + "_week week" + indexW }>
                                    { week.map( ( day, indexD ) => {
                                        return (
                                            <td key = { '.' + indexW + '.' + indexD }
                                                className = { this.getDateClassName( day ) }
                                                data-value = { day }
                                                onClick = { this.props.tableCellClick }>
                                                { day.getDate() }
                                            </td>
                                        )
                                    } ) }
                                </tr>
                            )
                        } ) }
                        </tbody>
                    </table>
                </div>
                {
                    ( this.props.showYearsBox ) &&
                    <div className = { this.classCSS + '_years_box ' }>
                        <div className = { this.classCSS + "_years_table_box" }>
                            <table className = { this.classCSS + "_years_table" }
                                   width = "5em"
                                   onClick = { this.props.yearsTableClick }>
                                <tbody>
                                { this.props.yearsArray.map( ( itemY, indexY ) => {
                                    return (
                                        <tr key = { '.' + indexY }>
                                            <td className =  { this.classCSS + "_years_table_cell" }
                                                data-value = { itemY }>
                                                { itemY }
                                            </td>
                                        </tr>
                                    )
                                } ) }
                                </tbody>
                            </table>
                        </div>
                        <div className = { this.classCSS + "_years_btn_box" }>
                            <div className = { this.classCSS + "_years_btn years_btn_prev" }
                                 onClick = { this.props.yearsBtnPrevClick }>
                                <svg width=  "100%"
                                     height= "100%"
                                     viewBox="0 0 16 16"
                                     preserveAspectRatio = 'none'
                                     xmlns =               'http://www.w3.org/2000/svg'>
                                    <path d="M 1 15 L 8 1 L 15 15 z"
                                          stroke="#d3d3d3" strokeWidth="1" />
                                </svg>
                            </div>
                            <div className = { this.classCSS + "_years_btn years_btn_next" }
                                 onClick = { this.props.yearsBtnNextClick }>
                                <svg width=  "100%"
                                     height= "100%"
                                     viewBox="0 0 16 16"
                                     preserveAspectRatio = 'none'
                                     xmlns =               'http://www.w3.org/2000/svg'>
                                    <path d="M 1 1 L 8 15 L 15 1 z"
                                          stroke="#d3d3d3" strokeWidth="1" />
                                </svg>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

}

export default Calendar;