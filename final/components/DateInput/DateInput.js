"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import IconCalendar from '../icons/IconCalendar';
import Calendar     from './Calendar';

import Label from '../Label/Label';

import { isExists } from "../../utils/utils";

require('./DateInput.scss');

class DateInput extends React.PureComponent {

    static displayTypes = {
        block:              'dBlock',
        inlineBlock:        'dInlineBlock',
        hidden:             'dHidden',
        none:               'dNone',
    };

    static position = {
        top:                    'top',
        bottom:                 'bottom',
        left:                   'left',
        right:                  'right',
        middle:                 'middle',
    };

    static propTypes = {
        htmlID:             PropTypes.string,
        label:              PropTypes.string,
        withLabel:          PropTypes.bool,
        defValue:           PropTypes.object, // default value
        value:              PropTypes.object,
        editValue:          PropTypes.string,
        showCalendar:       PropTypes.bool,   // calendar is dropped / not dropped
        display:            PropTypes.oneOf([
            DateInput.displayTypes.block,
            DateInput.displayTypes.inlineBlock,
            DateInput.displayTypes.hidden,
            DateInput.displayTypes.none,
        ]),
        isReadOnly:         PropTypes.bool,   // changing is not allowed
        isUpdateByDefValue: PropTypes.bool,   // new defValue replaces old value / old state.value will not be replaced
        showYearsBox:       PropTypes.bool,
        options:                PropTypes.shape({
            labelBoxWidth:      PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            inputBoxWidth:      PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            labelPosition:      PropTypes.oneOf([
                DateInput.position.left,
                DateInput.position.right,
                DateInput.position.top,
                DateInput.position.bottom,
            ]),
            labelVerticalAlign: PropTypes.oneOf([
                DateInput.position.top,
                DateInput.position.middle,
                DateInput.position.bottom,
            ]),
        }),
        cbChanged:          PropTypes.func,
        callbacks:          PropTypes.object,
    };

    static defaultProps = {
        label:              '',
        withLabel:          true,
        isVisible:          true,
        isReadOnly:         false,
        isUpdateByDefValue: true,
        display:            DateInput.displayTypes.inlineBlock,
        showCalendar:       false,
        defValue:           null,
        value:              null,
        editValue:          '',
        showYearsBox:       false,
        options:            {
            labelBoxWidth:    0,
            inputBoxWidth:    0,
            labelPosition:    'top',
            labelVerticalAlign: 'middle',
        },
        cbChanged:          null,
        callbacks:          {},
    };

    static classID = 0;

    static getHtmlID = ( props ) => {
        let htmlID = '';
        if ( props.htmlID !== null &&
            props.htmlID !== undefined &&
            props.htmlID.length > 0 ) {
            htmlID = props.htmlID;
        }
        else {
            htmlID = "DateInput_" + DateInput.classID;
        }
        return htmlID;
    };

    constructor( props ) {
        super( props );
        DateInput.classID++;
        this.state = {
            ...props,
            htmlID: DateInput.getHtmlID( props ),
        }
    }

    classCSS = 'DateInputR';   // name of the className of component

    componentWillMount() {
        this.prepareProps( this.state );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareProps( newProps );
    }

    componentDidMount() {
        this.doStyle();
    }

    componentDidUpdate() {
        this.doStyle();
    }

    prepareProps = ( props ) => {
        let state = ( this.isExists( DateInput.defaultProps ) ) ?
            { ...DateInput.defaultProps } : {};
        let value = null;
        if ( this.isExists( props ) ) {
            state = {
                ...state,
                ...props,
                options: {
                    ...state.options,
                }
            };
            if ( this.isExists( props.options ) ) {
                state.options = {
                    ...state.options,
                    ...props.options,
                }
            }
            if ( this.isExists( props.defValue ) ) {
                value = props.defValue;
            }
        }
        if ( !this.state.isUpdateByDefValue &&
            this.isExists( this.state.value ) ) {
            value = this.state.value;
        }
        state.dateArray =  this.fillDates( value );
        state.yearsArray = this.fillYears( ( this.isExists( value ) ) ? value.getFullYear() : null );
        state.value =      value;
        state.editValue =  this.toStringDate( value );
        this.setState( state, () => {
            // console.log( '%c%s', 'color: blue', 'DateInput: prepareProps: state: ', this.state );
        } );
    };

    doStyle = () => {};

    changed = ( value ) => {
        if ( this.state.cbChanged ) {
            this.state.cbChanged( value )
        }
    };

    // == controller ==
    iconCalendarClick = ( e ) => {
        //console.log( 'DateInput: iconCalendarClick...' );
        e.stopPropagation();
        this.toggleCalendar();
    };

    inputMouseDown = ( e ) => {
        e.stopPropagation();
        this.hideCalendar();
    };

    inputBoxNativeMouseUp = ( e ) => {
        e.stopPropagation();
    };

    documentMouseUp = ( e ) => {
        document.removeEventListener( 'mouseup', this.documentMouseUp );
        if ( this.state.showCalendar ) {
            this.hideCalendar();
        }
    };

    inputFocus = ( e ) => {
        if ( this.state.isReadOnly ) e.currentTarget.blur();
        /*this.setState( {
            isEdited: true,
        }, ()=>{} );*/
    };

    inputBlur = ( e ) => {
        if ( !this.state.isReadOnly ) {
            let value = e.currentTarget.value;
            // console.log( 'DateInput: inputBlur: ', value );
            this.setNewValue( value );
        }
    };

    inputKeyDown = ( e ) => {
        switch( e.keyCode ) {
            case 13:
                e.currentTarget.blur();
                //this.inputBlur( e );
                break;
            case 27:
                let editValue = this.analyzeValue( this.state.editValue );
                let escape = ( this.toStringDate( this.state.value ) === this.toStringDate( editValue ) );
                // console.log( 'ESCAPE: ', escape );
                if ( escape ) {
                    //this.inputBlur( e );
                    e.currentTarget.blur();
                }
                else {
                    this.setState( {
                        editValue: this.toStringDate( this.state.value ),
                    }, () => {} );
                }
                break;
        }
    };

    inputChange = ( e ) => {
        this.setState( {
            editValue: e.currentTarget.value,
        }, ()=>{
            // console.log( "input: ", this.state.editValue );
        } );
    };

    // == action functions ==
    toggleCalendar = () => {
        this.setState( {
            showCalendar: !this.state.showCalendar,
            showYearsBox: false,
        }, ()=>{
            if ( this.state.showCalendar ) {
                let inputBox = ReactDOM.findDOMNode( this.inputBox );
                inputBox.addEventListener( 'mouseup', this.inputBoxNativeMouseUp );
                document.addEventListener( 'mouseup', this.documentMouseUp, false );
            }
        } );
    };

    showCalendar = () => {
        this.setState( {
            showCalendar: true,
            showYearsBox: false,
        }, ()=>{} );
    };

    hideCalendar = () => {
        this.setState( {
            showCalendar: false,
            showYearsBox: false,
        }, ()=>{
            this.changed( this.state.value );
        } );
    };

    hideYearsBox = () => {
        this.setState(
            {
                showYearsBox:  false,
            },
            () => {}
        )
    };

    showYearsBox = () => {
        this.setState(
            {
                showYearsBox:  true,
            },
            () => {}
        )
    };

    setNewValue = ( newValue ) => {
        if ( this.isExists( newValue ) ) {
            let newValue1 = ( this.isNotEmpty( newValue ) ) ? this.analyzeValue( newValue ) : null;
            // console.log( 'setNewValue: ', newValue1 );
            this.setState( {
                value: newValue1,
                editValue:  this.toStringDate( newValue1 ),
                dateArray:  this.fillDates( newValue1 ),
                yearsArray: this.fillYears( ( this.isExists( newValue1 ) ) ? newValue1.getFullYear() : null ),
            }, () => {
                // console.log( 'setNewValue: this.state.value: ', this.state.value );
                this.changed( this.state.value );
            } );
        }
    };

    // == callbacks ==
    calendarBtnPrevClick = ( e ) => {
        e.preventDefault();
        e.stopPropagation();
        let date = ( this.isExists( this.state.value ) ) ?
            this.state.value : new Date();
        let newDate = new Date( date.getFullYear(),
                                date.getMonth() - 1,
                                date.getDate() );
        let testDate = new Date( date.getFullYear(),
                                 date.getMonth() - 1 );
        if ( testDate.getMonth() !== newDate.getMonth() ) {
            newDate.setDate( 31 - newDate.getDate() );
            newDate.setMonth( newDate.getMonth() - 1 );
        }
        this.setState( {
            value: newDate,
            editValue: this.toStringDate( newDate ),
            dateArray : this.fillDates( newDate )
        }, () => {
            // this.changed( this.state.value );
        } )
    };

    calendarBtnNextClick = ( e ) => {
        e.preventDefault();
        e.stopPropagation();
        let date = ( this.isExists( this.state.value ) ) ?
            this.state.value : new Date();
        let newDate = new Date( date.getFullYear(),
                                date.getMonth() + 1,
                                date.getDate() );
        let testDate = new Date( date.getFullYear(),
            date.getMonth() + 1 );
        if ( testDate.getMonth() !== newDate.getMonth() ) {
            newDate.setDate( 31 - newDate.getDate() );
            newDate.setMonth( newDate.getMonth() - 1 );
        }
        this.setState( {
            value: newDate,
            editValue: this.toStringDate( newDate ),
            dateArray : this.fillDates( newDate )
        }, () => {
            // this.changed( this.state.value );
        } )
    };

    calendarElmClick = ( e ) => {
        e.stopPropagation();
        e.preventDefault();
        let t = new Date();
        if ( this.isExists( e.target.dataset.value ) ) {
            let elmValue = e.target.dataset.value;
            t.setTime( Date.parse( elmValue ) );
            let dateArray = this.fillDates( t );
            this.setState( {
                    value:        t,
                    editValue:    this.toStringDate( t ),
                    dateArray:    dateArray,
                    // showCalendar: !this.state.showCalendar,
                },
                () => {
                    // this.changed( this.state.value );
                    this.hideCalendar();
                } );
        }
    };

    headInputClick = ( e ) => {
        this.showYearsBox();
    };

    yearsTableClick = ( e ) => {
        if ( this.isExists( e.target.dataset.value ) ) {
            let t = new Date( e.target.dataset.value );
            let date = ( this.isExists( this.state.value ) ) ?
                this.state.value : new Date();
            t.setMonth( date.getMonth() );
            t.setDate( date.getDate() );
            this.setState( {
                value:     t,
                editValue: this.toStringDate( t ),
                dateArray: this.fillDates( t )
            }, () => {
                // this.changed( this.state.value );
                // console.log( 'yearsTableClick: ', this.state.value );
                this.hideYearsBox();
            } )
        }
    };

    yearsBtnPrevClick = ( e ) => {
        this.setState( {
            yearsArray: this.fillYears( this.state.yearsArray[ 4 ] - 9 )
        }, () => {
            //console.log( this.state.yearsArray );
        } )
    };

    yearsBtnNextClick = ( e ) => {
        this.setState( {
            yearsArray: this.fillYears( this.state.yearsArray[ 4 ] + 9 )
        }, () => {
            //console.log( this.state.yearsArray );
        } )
    };

    // == additional functions ==
    isExists = ( value ) => ( value !== null && value !== undefined );

    isNotEmpty = ( value ) => ( value !== null && value !== undefined && value.length > 0 );

    isGTZero = ( value ) => ( value !== null && value !== undefined && !isNaN( value ) && value > 0 );

    fillDates = ( newDate ) => {
        if ( !this.isExists( newDate ) ) {
            newDate = new Date();
        }
        let startDate = new Date( newDate.getFullYear(), newDate.getMonth() );
        let day = startDate.getDay() - 1;
        day = ( day < 0 ) ? 6: day; // 0 - Monday
        startDate.setDate( startDate.getDate() - day );
        // console.log( 'DateInput: fillDate: startDate: ', startDate );
        let countDays = 0;
        let dateArray = [];
        for ( let j = 0; j < 6; j++ ) {
            dateArray[ j ] = [];
            for ( let i = 0; i < 7; i++ ) {
                dateArray[ j ][ i ] = new Date( startDate.getFullYear(),
                    startDate.getMonth(),
                    startDate.getDate() + countDays );
                countDays++;
            }
        }
        return dateArray;
    };

    fillYears = ( newYear ) => {
        let yearArray = null;
        newYear = ( this.isExists( newYear ) ) ? newYear : ( ( date ) => date.getFullYear() )( new Date() );
        // console.log( 'fillYears: newYear: ', newYear );
        if ( this.isExists( newYear ) ) {
            yearArray = [];
            let testDate = new Date();
            if ( newYear > ( testDate.getFullYear() + 96 ) ) {
                newYear = testDate.getFullYear() + 96;
            } else if ( newYear < 1904 ) {
                newYear = 1904;
            }
            for ( let i = newYear - 4; i < newYear + 5; i++ ) {
                yearArray.push( i );
            }
        }
        return yearArray;
    };

    // == special DateTimeFunctions ==
    analyzeValue = ( value ) => {
        let newValue = this.primaryEditorValueAnalysis( value ); // returns { date: ..., month: ..., years: ... }
        newValue = this.dateValuesValidation( newValue.date, newValue.month, newValue.year );
        newValue = new Date( newValue.year, newValue.month, newValue.date );
        return newValue;
    };

    primaryEditorValueAnalysis = ( value ) => {
        let tempDate = new Date();
        let date =  '';
        let month = '';
        let year =  '';
        if ( this.isNotEmpty( value ) ) {
            //remove non-numbers from start and from the end
            let newValue = this.smartStrTrim( value );
            //find date
            newValue = this.checkNumberTillLengthOrNonNumber( newValue, 0, 2 );
            date = parseInt( newValue.value ) || tempDate.getDate();
            newValue = this.smartStrTrim( newValue.substring );
            newValue = this.checkNumberTillLengthOrNonNumber( newValue, 0, 2 );
            month = parseInt( newValue.value ) || ( tempDate.getMonth() + 1 );
            newValue = this.smartStrTrim( newValue.substring );
            newValue = this.checkNumberTillLengthOrNonNumber( newValue, 0, 4 );
            year = parseInt( this.primaryYearAnalysis( newValue.value ) ) || tempDate.getFullYear();
            //console.log( 'primaryAnalysis: date: ', date, ': month: ',month, ':year: ', year );
        }
        return { date: date, month: month, year: year };
    };

    smartStrTrim = ( value ) => {
        let newValue = '';
        if ( this.isNotEmpty( value ) ) {
            let i = 0;
            let t = parseInt( value.charAt( i ) );
            while( i < value.length && ( t === null || t === undefined || isNaN( t ) ) ) {
                t = parseInt( value.charAt( i ) );
                i++;
            }
            i = ( i > 0 ) ? --i : i;

            newValue = value.substring( i );
            if ( newValue.length > 0 )
                i = newValue.length - 1;
            do {
                t = parseInt( newValue.charAt( i ) );
                i--;
            } while( i >= 0 && ( t === null || t === undefined || isNaN( t ) ) );
            i = ( i >= 0 ) ? ( i + 2 ) : 0;
            newValue = newValue.substring( 0, i );
        }
        return newValue;
    };

    checkNumberTillLengthOrNonNumber = ( value, startPos, length ) => {
        let endPos = 0;
        if ( this.isNotEmpty( value ) ) {
            startPos = ( startPos !== null &&
                startPos !== undefined &&
                !isNaN( startPos ) ) ?
                startPos : 0 ;
            endPos = ( ( startPos + length ) <= value.length ) ?
                ( startPos + length - 1 ) : ( value.length - 1 );
        }
        let i = startPos;
        let t = parseInt( value.charAt( i ) );
        while( i <= endPos && t !== null && t !== undefined && !isNaN( t ) ) {
            t = parseInt( value.charAt( i ) );
            i++;
        }
        i = ( i === startPos ) ? i :
            ( t === null || t=== undefined || isNaN( t ) ) ? --i : i;
        let newValue = value.substring( startPos, i );
        return { value: newValue, substring: value.substring( i ) };
    };

    primaryYearAnalysis = ( year ) => {
        let nYear;
        if ( year !== null && year !== undefined && year.length > 0 ) {
            if ( year.length < 3 ) {
                nYear = parseInt( year );
                nYear = ( nYear > 40 && nYear < 100 ) ? ( 1900 + nYear ) : ( 2000 + nYear );
                nYear = nYear + '';
            }
            else nYear = year;
        }
        return nYear;
    };

    dateValuesValidation = ( date, month, year ) => {
        if ( this.isExists( date ) && this.isExists( month ) && this.isExists( year ) ) {
            //months 1..12 as it was filled in
            let testDate = new Date();
            let nYear = ( year < 1904 ) ? 1904 :
                ( year > ( testDate.getFullYear() + 96 ) ) ?
                    testDate.getFullYear() + 96 : year;
            let nMonth = month - 1;
            nMonth = ( nMonth < 0 ) ? 0 : ( nMonth > 11 ) ? 11 : nMonth;
            //months 0..11
            let months31 = [ 0, 2, 4, 6, 7, 9, 11 ];
            let months30 = [ 3, 5, 8, 10 ];
            let nDate = ( date < 1 ) ? 1 : date;
            if ( nMonth !== 1 ) {
                nDate = ( date > 31 && ( months31.indexOf( nMonth ) > -1 ) ) ? 31 :
                    date > 30 && ( months30.indexOf( nMonth ) > -1 ) ? 30 :
                        nDate;
            }
            else {
                nDate = ( nDate > 29 && this.isLeapYear( nYear ) ) ? 29 :
                    ( nDate > 28 ) ? 28 : nDate;
            }
            //returns months 0..11 for Date object
            return { date: nDate, month: nMonth, year: nYear }
        }
        else {
            return { date: date, month: month, year: year };
        }
    };

    toStringDate = ( dateObj ) => {
        if ( this.isExists( dateObj ) && this.isExists( dateObj.getFullYear ) ) {
            let year =  dateObj.getFullYear();
            let month = ( dateObj.getMonth() + 1 ) + '';
            let date =  dateObj.getDate() + '';
            month = ( month.length < 2 ) ? ( '0' + month ) : month;
            date =  ( date.length < 2 ) ? ( '0' + date ) : date;
            return ( date + '.' + month + '.' + year );
        } else return '';
    };

    // == render functions ==
    renderLabel = () => {
        const { labelBoxWidth } = this.props.options;
        return (
            ( this.state.withLabel ) &&
            <div className = { this.classCSS + "_label_box" }
                 key = { "label_box" }
                 style = {{
                     width: ( isExists( labelBoxWidth ) && labelBoxWidth !== 0 )
                         ? labelBoxWidth
                         : 'auto',
                 }}
                 data-label_vertical_align = { this.state.options.labelVerticalAlign || 'middle' }>
                {
                    ( this.isNotEmpty( this.state.label ) ) ?
                        <Label postfixClassName = { this.classCSS }
                               htmlFor = { this.state.htmlID }
                               label =   { this.state.label }/> : null
                }
            </div>
        )
    };

    calendarRender = () => {
        return (
            ( this.state.showCalendar ) &&
            <Calendar value = { ( this.isExists( this.state.value ) ) ?
                                  this.state.value :
                                  ( (date) => date )( new Date() ) }
                      postfixClassName =  { this.classCSS }
                      ref = { ( elm ) => { this.calendarElm = elm } }
                      isShowed =          { this.state.showCalendar }
                      dateArray =         { this.state.dateArray }
                      yearsArray =        { this.state.yearsArray }
                      showYearsBox =      { this.state.showYearsBox }
                      /*onClick = { this.calendarElmClick }*/
                      calendarPrevClick = { this.calendarBtnPrevClick }
                      calendarNextClick = { this.calendarBtnNextClick }
                      headInputClick =    { this.headInputClick }
                      tableCellClick =    { this.calendarElmClick }
                      yearsTableClick =   { this.yearsTableClick }
                      yearsBtnPrevClick = { this.yearsBtnPrevClick }
                      yearsBtnNextClick = { this.yearsBtnNextClick }/>
        )
    };

    renderInputBox = () => {
        const { inputBoxWidth } = this.props.options;
        return (
            <div className = { this.classCSS + "_input_box" }
                 key = { "input_box" }
                 ref = { ( elm ) => { this.inputBox = elm } }
                 /*onClick = { this.inputBoxClick }*/
                 style = {{
                     width: ( isExists( inputBoxWidth ) && inputBoxWidth !== 0 )
                         ? inputBoxWidth
                         : 'auto',
                 }}
                 data-label_vertical_align = { this.state.options.labelVerticalAlign || 'middle' }>
                <div className = { this.classCSS + "_input_container" }
                     key = { "input_box_" + 1 }
                     /*onClick = { ( !this.state.isReadOnly ) ? this.inputContainerClick : null }*/>
                    <input type = "text"
                           className = { this.classCSS + "_input" }
                           id = { this.state.htmlID }
                           value = { this.state.editValue }
                           data-readonly = { this.state.isReadOnly }
                           onFocus = { this.inputFocus }
                           onBlur = { this.inputBlur }
                           onMouseDown = { ( !this.state.readOnly ) ? this.inputMouseDown : ()=>{} }
                           onKeyDown = { this.inputKeyDown }
                           onChange = { ( !this.state.isReadOnly ) ? this.inputChange : ()=>{} }/>
                    <div className = { this.classCSS + "_icon_container" }
                         data-readonly = { this.state.isReadOnly }>
                        <IconCalendar className = "DateInputR_icon_calendar"
                                      ref =    { ( elm ) => { this.iconCalendar = elm } }
                                      height = '16px'
                                      width  = '16px'
                                      color  = '#808080'
                                      colorInactive = '#d3d3d3'
                                      isActive = { !Boolean( this.state.isReadOnly ) }
                                      onClick = { ( !Boolean( this.state.isReadOnly ) ) ?
                                          this.iconCalendarClick : ()=>{} }/>
                    </div>
                </div>
                { this.calendarRender() }
            </div>
        )
    };

    renderIfLeftOrTop = () => {
        return [
            this.renderLabel(),
            this.renderInputBox(),
        ]
    };

    renderIfRightOrBottom = () => {
        return [
            this.renderInputBox(),
            this.renderLabel(),
        ]
    };

    render() {
        return (
            <div className = { this.classCSS + ' ' + ( this.state.options.addedClass || '' ) }
                 data-display = { this.state.display || DateInput.displayTypes.block }
                 data-label_position = { this.state.options.labelPosition || 'top' }>
                {
                    ( this.state.options.labelPosition === 'top' ||
                        this.state.options.labelPosition === 'left' ) ?
                        this.renderIfLeftOrTop() : this.renderIfRightOrBottom()
                }

            </div>
        )
    }

}

export default DateInput;
