'use strict';
import {isExists, isNotEmpty, isNotEmptyAll} from "../../utils/utils";
import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_EXCEL_TMPL } from "../../config/config";

/*
* data - обязательный аргумент, который содержит двумерную матрицу значений:
*  - строки: data[ y ],
*  - ячейки: data[ y ][ x ]
*
* columnWidthArg - опциональный аргумент, содержит массив хешей типа { width: "80" } для каждого столбца
*
* styles - опциональный аргумент, содержит стили для заголовка и ячеек - хеш вида:
* {
*     headers: {
*         id: "s62",
*         borders: [
*           {
*               position:  'Bottom' || 'Top' || 'Right' || 'Left'
*               lineStyle: 'Continuous' || ...?
*               weight:    '1'
*           },
*         ],
*         font: {
*             fontName: "Calibri",
*             charSet:  "204",
*             family:   "Swiss",
*             size:     "11",
*             color:    "#000000",
*             bold:     "1"
*         },
*         interior: {
*             color:    "#FDE9D9",
*             pattern:  "Solid"
*         },
*     },
*     cells: {
*         id:           "s63",
*         borders:      [],
*         font:         {},
*         interior:     {},
*     },
* },
*
* document_properties: {
*     author:           'Author',
*     lastAuthor:       'Last author',
*     date:             ((d) => d.toISOString())(new Date())
* },
*
* excelWorkbookProperties: {
*     height: 10005,
*     width:  10005,
*     topX:   120,
*     topY:   135,
* },
*
* defaultRowHeight: '20.0625',
**/

const debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_EXCEL_TMPL;

export const buildDefaultExcelXML = (
    data = [],

    columnsWidthArg = [],

    styles = {
        headers: {
            id: "s62",
            borders: [
                { position: "Bottom", lineStyle: "Continuous", weight: "1" },
                { position: "Top",    lineStyle: "Continuous", weight: "1" },
                { position: "Left",   lineStyle: "Continuous", weight: "1" },
                { position: "Right",  lineStyle: "Continuous", weight: "1" },
            ],
            font: {
                fontName: "Calibri", charSet: "204", family: "Swiss", size: "11", color: "#000000", bold: "1"
            },
            interior: {
                color: "#FDE9D9", pattern: "Solid"
            }
        },
        cells: {
            id: "s63",
            borders: [
                { position: "Bottom", lineStyle: "Continuous", weight: "1" },
                { position: "Top",    lineStyle: "Continuous", weight: "1" },
                { position: "Left",   lineStyle: "Continuous", weight: "1" },
                { position: "Right",  lineStyle: "Continuous", weight: "1" },
            ],
        },
    },

    documentProperties = {
        author:     'Author',
        lastAuthor: 'Last author',
        date:       ((d) => d.toISOString())(new Date())
    },

    excelWorkbookProperties = {
        height: 10005,
        width:  10005,
        topX:   120,
        topY:   135,
    },

    defaultRowHeight = '20.0625',
) => {

    let rowCount =    ( isNotEmpty( data ) ) ? data.length : 0;
    let columnCount = ( isNotEmptyAll( [ data, data[ 0 ] ] ) ) ? data[ 0 ].length : 0;

    let columnsWidth = isNotEmpty( columnsWidthArg )
        ? [ ...columnsWidthArg ]
        : widthCalc( data );
        /*: [
            { width: "20" },
            { width: "80" },
            { width: "30" },
            { width: "40" },
            { width: "40" },
            { width: "80" },
        ];*/

    let rowsData = isNotEmpty( data )
        ? data.map( ( row ) => {
            return {
                autoFitHeight: "0",
                cells: row,
            }
        } )
        : [];

    let stylesId = { headers: styles.headers.id, cells: styles.cells.id };

    let xml = ExcelTmpl.t_header();
    xml += ExcelTmpl.t_documentProperties( documentProperties );
    xml += ExcelTmpl.t_officeDocumentSettings();
    xml += ExcelTmpl.t_excelWorkbook( excelWorkbookProperties );
    xml += ExcelTmpl.t_styles( styles );
    xml += ExcelTmpl.t_worksheet_start();
    xml += ExcelTmpl.t_table_start( {
        columnCount: columnCount,
        rowCount: rowCount,
        defaultRowHeight: defaultRowHeight
    } );
    xml += ExcelTmpl.__getColumns( columnsWidth );
    xml += ExcelTmpl.__getRows( rowsData, stylesId );
    xml += ExcelTmpl.t_table_end();
    xml += ExcelTmpl.t_worksheetOptions();
    xml += ExcelTmpl.t_workSheetWorkBookEnd();

    if ( debug_mode ) {
        console.log( '******************************************************************' );
        console.log( xml );
        console.log( '******************************************************************' );
    }

    return xml;
};


/*
* data - двумерная матрица значений ( числа, строки )
*
* Функция возвращает массив ширин столбцов, рассчитанных на основании их содержимого
* */
const widthCalc = ( data, commonWidth = 1200 ) => {
    let columnData = [];
    if ( isNotEmptyAll( [ data, data[ 0 ] ] ) ) {
        columnData = data[ 0 ].map( () => 0 );
        ( debug_mode ) && console.log( 'widthCalc: columnData: ', columnData );
        for ( let y = 0; y < data.length; y++ ) {
            // расчет максимального количества символов в ячейке для каждого столбца
            for ( let x = 0; x < data[ 0 ].length; x++ ) {
                let cellLength = ( ( s ) => s.length )( data[ y ][ x ] + '' );
                ( debug_mode ) && console.log( 'widthCalc: cellLength (y, x): ', y,',', x,': ', cellLength );
                columnData[ x ] =  Math.max( columnData[ x ], cellLength );
            }
            ( debug_mode ) && console.log( 'widthCalc: columnData (y): ', y,': ', columnData );
        }
    }
    ( debug_mode ) && console.log( 'widthCalc: final columnData: ', columnData );

    let maxLength = 1;
    let minLength = data[ 0 ][ 0 ];

    columnData.forEach( ( item ) => {
        maxLength = Math.max( maxLength, item );
        minLength = Math.min( minLength, item );
    } );

    minLength = ( minLength > 0 ) ? minLength : 1;

    ( debug_mode ) && console.log( 'widthCalc: min / max: ', minLength, ' / ', maxLength );

    let diff = maxLength / minLength;

    diff = ( diff > 30 ) ? 30 : diff;

    columnData = columnData.map( ( item ) => item = ( item > diff ) ? diff : item );

    let commonLength = 0;
    columnData.forEach( ( item ) => { commonLength += item } );
    ( debug_mode ) && console.log( 'widthCalc: final commonLength: ', commonLength );
    let widthData = columnData.map( ( item ) => { return { width: Math.floor( item / commonLength * commonWidth ) } } );

    return widthData;
};

export const ExcelTmpl = {

    t_header: () => `
<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
    `,

    /*
    * data:
    * - author - string
    * - lastAuthor - string
    * - date - ( 2018-01-11T12:26:06Z )
    * */
    t_documentProperties: (
        data = {
            author: 'Author',
            lastAuthor: 'Last author',
            date: ((d) => d.toISOString())(new Date())
        } ) => `
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>${ data.author || 'Author' }</Author>
  <LastAuthor>${ data.lastAuthor || 'Last author' }</LastAuthor>
  <Created>${ data.date || ((d) => d.toDateString())(new Date()) }</Created>
  <Version>14.00</Version>
 </DocumentProperties>
    `,

    t_officeDocumentSettings: () => `
 <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">
  <AllowPNG/>
 </OfficeDocumentSettings>
    `,

    /*
    * height - 10005
    * width - 10005
    * topX - 120
    * topY - 135
    * */
    t_excelWorkbook: ( data = {
        height: 10005,
        width:  10005,
        topX:   120,
        topY:   135,
    } ) => `
 <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
  <WindowHeight>${ data.height }</WindowHeight>
  <WindowWidth>${ data.width }</WindowWidth>
  <WindowTopX>${ data.topX }</WindowTopX>
  <WindowTopY>${ data.topY }</WindowTopY>
  <RefModeR1C1/>
  <ProtectStructure>False</ProtectStructure>
  <ProtectWindows>False</ProtectWindows>
 </ExcelWorkbook>
    `,

    /*
    * styles = строка-шаблон с элементами стиля
    * строку можно получить методом __getStyle
    * */
    t_styles: (
        stylesArg = {
            headers: {
                id: "s62",
                borders: [
                    { position: "Bottom", lineStyle: "Continuous", weight: "1" },
                    { position: "Top",    lineStyle: "Continuous", weight: "1" },
                    { position: "Left",   lineStyle: "Continuous", weight: "1" },
                    { position: "Right",  lineStyle: "Continuous", weight: "1" },
                ],
                font: { fontName: "Calibri", charSet: "204", family: "Swiss", size: "11", color: "#000000", bold: "1" },
                interior: { color: "#FDE9D9", pattern: "Solid" },
            },
            cells: {
                id: "s63",
                borders: [
                    { position: "Bottom", lineStyle: "Continuous", weight: "1" },
                    { position: "Top",    lineStyle: "Continuous", weight: "1" },
                    { position: "Left",   lineStyle: "Continuous", weight: "1" },
                    { position: "Right",  lineStyle: "Continuous", weight: "1" },
                ],
            }
        }
    ) => {
        const { headers, cells } = stylesArg;
        let styles = ExcelTmpl.__getStyle( headers ) + ExcelTmpl.__getStyle( cells );

        return `
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Borders/>
   <Font ss:FontName="Calibri" x:CharSet="204" x:Family="Swiss" ss:Size="11"
    ss:Color="#000000"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  ${ styles }
 </Styles>
    `;
    },

    /*
    * id - s62
    * borders - [ {
    *  - position - 'Bottom' || 'Top' || 'Right' || 'Left'
    *  - lineStyle - 'Continuous' || ...?
    *  - weight - '1'
    * } ]
    * */
    __getStyle: (data ) => {
        let borders = '';
        if ( isNotEmpty( data.borders ) ) {
            borders += `<Borders>`;
            data.borders.forEach( ( borderItem ) => {
                borders += `
    <Border ss:Position="${ borderItem.position }" ss:LineStyle="${ borderItem.lineStyle }" ss:Weight="${ borderItem.weight }"/>` });
            borders += `
   </Borders>`;
        }

        let fontValue = '';
        if ( isExists( data.font ) ) {
            const { fontName, charSet, family, size } = data.font;
            fontValue = `<Font ss:FontName="${ fontName }" x:CharSet="${ charSet }" x:Family="${ family }" ss:Size="${ size }" ss:Color="#000000" ss:Bold="1"/>`
        }

        let interior = '';
        if ( isExists( data.interior ) ) {
            const { color, pattern } = data.interior;
            interior = `<Interior ss:Color="${ color }" ss:Pattern="${ pattern }"/>`;
        }

        return `
  <Style ss:ID="${ data.id }">
   ${ borders }
   ${ fontValue }
   ${ interior }
  </Style>`
    },

    t_worksheet_start: () => `
 <Worksheet ss:Name="Sheet1">
    `,

    /*
    * data =
    *  - columnCount
    *  - rowCount
    *  - defaultRowHeight - '20.0625'
    * */
    t_table_start: ( data = {
        columnCount: 0,
        rowCount: 0,
        defaultRowHeight: "20.0625",
    } ) => `
  <Table ss:ExpandedColumnCount="${ data.columnCount }" ss:ExpandedRowCount="${ data.rowCount }"
         x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="${ data.defaultRowHeight }">
    `,

    /*
    * data = [ { width: ".." }, { width: ".." }, ... ] ( по количеству столбцов )
    * */
    __getColumns: (data = [] ) => {
        let columns = '';
        isNotEmpty( data )
            ? data.forEach( ( column ) => {
                columns += `
   <Column ss:Width="${ column.width }"/>` } )
            : '';
        return columns;
    },

    /*
    * data = [ { autoFitHeight: 0, cells: [ c1, c2, ... ] }, ... ]
    *
    * stylesId: {
    *     headers: id1, - используется для cells[ 0 ]
    *     cells:   id2, - используется для cells[ 1 - .. ]
    * }
    * */
    __getRows: ( data, stylesId ) => {
        let rows = '';
        isNotEmpty( data )
            ? data.forEach( ( row, index ) => {
                let styleId = ( index === 0 ) ? stylesId.headers : stylesId.cells;
                rows += ExcelTmpl.__getRow( row, styleId );
            } )
            : '';
        return rows;
    },

    __getRow: ( rowArg, styleId ) => {
        let row = `
   <Row ss:AutoFitHeight="${ rowArg.autoFitHeight }">`;
        row += ExcelTmpl.__getCells( rowArg.cells, styleId );
        row += `
   </Row>
        `;
        return row;
    },

    __getCells: ( data, styleId ) => {
        let cells = ``;
        if ( isNotEmpty( data ) ) {
            data.forEach( ( cell ) => {
                let type = ( typeof cell ) === "number" ? "Number" : "String";
                cells += `
    <Cell ss:StyleID="${ styleId }"><Data ss:Type="${ type }">${ cell }</Data></Cell>`;
            } );
        }
        return cells;
    },

    t_table_end: () => `
  </Table>
    `,

    t_worksheetOptions: () => `
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <Unsynced/>
   <Selected/>
   <Panes>
    <Pane>
     <Number>3</Number>
     <ActiveRow>2</ActiveRow>
     <ActiveCol>1</ActiveCol>
     <RangeSelection>R1C2:R1C2</RangeSelection>
    </Pane>
   </Panes>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
    `,

    t_workSheetWorkBookEnd: () => `
 </Worksheet>
</Workbook>`,
};