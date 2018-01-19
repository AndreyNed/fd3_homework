import React from 'react';
import PropTypes from 'prop-types';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_EXCEL_CONVERTER } from "../../config/config";

import { buildDefaultExcelXML } from "./excelTmpl";
import { Base64 } from "./base64";
import { isNotEmpty } from "../../utils/utils";

class ExcelConverter extends React.PureComponent {

    static propTypes = {
        exportedData:           PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string
                ]),
            )
        ),
        exportToExcelStatus:    PropTypes.number.isRequired,
        cbChanged:              PropTypes.func,
    };

    constructor( props ) {
        super( props );

        this.debug_mode = ((( CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_EXCEL_CONVERTER )));
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( newProps ) => {
        const { exportedData, exportToExcelStatus } = newProps;
        ( this.debug_mode ) && console.log( 'ExcelConverter: prepareData: data: ', newProps );
        if ( exportToExcelStatus === 1 ) {
            ( isNotEmpty( exportedData ) )
                ? this.convertToExcel( newProps )
                : alert( 'Exported data hasn`t been found...' );
        }
    };

    convertToExcel = ( data ) => {
        let { exportToExcelStatus, exportedData } = data;
        if ( exportToExcelStatus === 1 ) {

            this.actionExcel( exportedData );

            if ( this.props.cbChanged ) this.props.cbChanged( {
                exportToExcelStatus: 2,
            } )
        }
    };

    actionExcel = ( data ) => {

        let excelXMLStr = buildDefaultExcelXML( data );
        ( this.debug_mode ) && console.log( excelXMLStr || 'XML still hasn`t been made yet...' );
        let typeMIME = "application/vnd.ms-excel;charset=utf-8;base64,";
        // let typeMIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;base64,";

        let uAgent = window.navigator.userAgent;
        let isMSIE = ( uAgent.indexOf( "MSIE " ) > -1 ) || ( !!uAgent.match( /Trident.*rv\:11\./ ) );
        if ( isMSIE ){
            let blob = new Blob ( [ excelXMLStr ], { type: typeMIME } );
            // let newWindow = window.open("/", "export", 'left=0,top=0,width=1024,height=800,channelmode=no,titlebar=yes,scrollbars=yes,toolbar=no,menubar=no,resizable=yes,copyhistory=no,directories=no,status=yes');
            window.navigator.msSaveBlob( blob, "downloaded_table_" + ( function() { let d = new Date(); return d.toDateString() } )() + ".xls" );
            // newWindow.close();
        }
        else {
            let newWindow = window.open("/", "export");
            newWindow.location.download = "downloaded_table_" + ( ( d ) => d.toDateString() )( new Date() ) + ".xml";
            newWindow.location.href = "data:" + typeMIME + Base64.encode( excelXMLStr );
            ( this.debug_mode ) && console.log( 'newWindow: after', newWindow );
            setTimeout( () => { newWindow.close(); }, 1000 );
        }
    };

    render() {
        return null;
    }

}

export default ExcelConverter;