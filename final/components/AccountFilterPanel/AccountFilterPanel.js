'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DateInput from '../DateInput/DateInput';
import ButtonOk from '../buttons/ButtonOk/ButtonOk';
import ButtonCancel from '../buttons/ButtonCancel/ButtonCancel';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_ACCOUNT_FILTER_PANEL, CONFIG_UI_MODE_TIMEOUT, USER_LOGIN } from '../../config/config';
import {DATA_TYPES, MODAL_CONTENT} from '../../data_const/data_const';

import { acDataAccountSetFilters } from '../../actions/acData';
import {acUIHideMatGlass} from '../../actions/acUI';

import '../../utils/utils';

import './AccountFilterPanel.scss';

class AccountFilterPanel extends React.PureComponent {

    static propTypes = {
        accountsData:                   PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                comment:                PropTypes.string,
                currency:               PropTypes.number,
            })
        ),
        operationCategoriesData:        PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                comment:                PropTypes.string,
            })
        ),
        accountFilters:                 PropTypes.shape({
            accountFilterDateStart:     PropTypes.objectOf( Date ),
            accountFilterDateEnd:       PropTypes.objectOf( Date ),
            accountFilterCategories:    PropTypes.arrayOf(
                PropTypes.number,
            ),
            accountFilterAccounts:      PropTypes.arrayOf(
                PropTypes.number,
            ),
        }),

        modalContent:                   PropTypes.string,
    };

    static defaultProps = {

    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'AccountFilterPanel_' + AccountFilterPanel.classID;
    };

    constructor( props ) {
        super( props );
        AccountFilterPanel.classID++;
        this.state = {
            htmlID: AccountFilterPanel.getHtmlID( props.htmlID ),
        };
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_ACCOUNT_FILTER_PANEL;
        this.classCSS = 'AccountFilterPanel';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'AccountFilterPanel: prepareData: new props: ', props )
        
        // todo
    };

    filterProps = () => {
        return {
            dateStart: {
                withLabel:      true,
                label:          'Начало периода',
                display:        DateInput.displayTypes.block,

            },
            dateEnd: {
                withLabel:      true,
                label:          'конец',
                display:        DateInput.displayTypes.block,

            },
            btnOk: {
                label:          'Применить',

            },
            btnCancel: {
                label:          'Сбросить',
                withLabel:      true,
                cbChanged:      this.btnCancel_cbChanged,
            },
        }
    };

    /* == callbacks == */

    btnCancel_cbChanged = () => {
        const { dispatch } = this.props;
        dispatch( acDataAccountSetFilters( {
            accountFilterDateStart:  null,
            accountFilterDateEnd:    null,
            accountFilterCategories: null,
            accountFilterAccounts:   null,
        } ) );
        dispatch( acUIHideMatGlass() );
    };

    /* == controller == */

    formClick = (e ) => {
        e.stopPropagation();
        e.preventDefault();
    };

    /* == render functions == */

    render() {
        const { modalContent } = this.props;
        const { ACCOUNT_FILTERS } = MODAL_CONTENT;
        let props = this.filterProps();
        return ( modalContent === ACCOUNT_FILTERS ) &&
            <div className = { this.classCSS }
                 onClick={ this.formClick }>
                <div className = { `${ this.classCSS }_form` }>
                    <div className="rows"
                         key="header">
                        <div className="cols col_16 header">
                            <span className = { this.classCSS + '_header' }>
                                Панель фильтров
                            </span>
                        </div>
                    </div>
                    <div className="rows filter_period"
                         key="filter_period">
                        <div className="cols col_8"
                             key="period_start">
                            <DateInput { ...props.dateStart } />
                        </div>
                        <div className="cols col_8"
                             key="period_end">
                            <DateInput { ...props.dateEnd } />
                        </div>
                    </div>
                    <div className = { `${ this.classCSS }_buttons_panel rows` }
                         key="button_panel">
                        <div className="cols col_4"
                             key="button_ok">
                            <ButtonOk { ...props.btnOk } />
                        </div>
                        <div className="cols col_4"
                             key="button_cancel">
                            <ButtonCancel { ...props.btnCancel } />
                        </div>
                    </div>
                </div>
            </div>
    }
}

const mapStateToProps = function ( state ) {
    return {
        accountsData:                   state.data.accountsData,
        operationCategoriesData:        state.data.operationCategoriesData,
        accountFilters:                 state.data.accountFilters,

        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( AccountFilterPanel );