'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonLabel from '../components/buttons/ButtonLabel/ButtonLabel';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_PAGE_SETTINGS } from "../config/config";
import { ALIGN_TYPES, SETTINGS_MODES } from "../data_const/data_const";

import { acUISetSettingsMode } from "../actions/acUI";

import './PageSettings.scss';

class PageSettings extends React.PureComponent {

    static propTypes = {

        settingsMode:                   PropTypes.oneOf([
            SETTINGS_MODES.ACCOUNTS,
            SETTINGS_MODES.OPERATION_CATEGORIES,
        ]),

        accountsData:                   PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                amount:                 PropTypes.number,
            })
        ),

        accountSaveStatus:              PropTypes.number,
        accountDeleteStatus:            PropTypes.number,
        accountsLoadStatus:             PropTypes.number,

        accountValue:                   PropTypes.shape({
            id:                         PropTypes.number,
            name:                       PropTypes.string,
            amount:                     PropTypes.number,
        }),

        accountSelectedIndex:           PropTypes.number,

        operationCategoriesData:        PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
            })
        ),

        operationCategoryValue:         PropTypes.shape({
            id:                         PropTypes.number,
            name:                       PropTypes.string,
        }),

        operationCategorySelectedIndex: PropTypes.number,

        operationCategorySaveStatus:    PropTypes.number,
        operationCategoryDeleteStatus:  PropTypes.number,
        operationCategoriesLoadStatus:  PropTypes.number,
    };

    static defaultProps = {

    };

    constructor( props ) {
        super( props );

        this.classCSS = 'PageSettings';
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_PAGE_SETTINGS;
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'Page settings: prepareData: props: ', props );

    };

    /* == prepare props == */

    leftPanelProps = () => {

        return {
            btnAccounts: {
                label: 'Счета',
                options: {
                    labelAlign: ALIGN_TYPES.LEFT,
                },
                cbChanged: this.btnAccounts_cbChanged,
            },
            btnOperationCategories: {
                label: 'Категории',
                options: {
                    labelAlign: ALIGN_TYPES.LEFT,
                },
                cbChanged: this.btnOperationCategories_cbChanged,
            },
        }
    };

    /* == callbacks == */

    btnAccounts_cbChanged = () => {
        const { dispatch } = this.props;
        dispatch( acUISetSettingsMode( SETTINGS_MODES.ACCOUNTS ) );
    };

    btnOperationCategories_cbChanged = () => {
        const { dispatch } = this.props;
        dispatch( acUISetSettingsMode( SETTINGS_MODES.OPERATION_CATEGORIES ) );
    };

    /* == render functions == */

    renderLeftSection = () => {
        let props = this.leftPanelProps();
        return (
            <div className = { this.classCSS + '_left_section' }>
                <div className = { 'rows ' + 'btn_accounts' }
                     key="btn_accounts">
                    <div className="cols col_16">
                        <ButtonLabel { ...props.btnAccounts }/>
                    </div>
                </div>
                <div className = { 'rows ' + 'btn_operation_categories' }
                     key="btn_operationCategories">
                    <div className="cols col_16">
                        <ButtonLabel { ...props.btnOperationCategories }/>
                    </div>
                </div>
            </div>
        )
    };

    renderMainSection = () => {
        return (
            <div className = { this.classCSS + '_main_section' }>
                MAIN SECTION
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
        settingsMode:                   state.ui.settingsMode,

        accountsData:                   state.data.accountsData,
        accountValue:                   state.data.accountValue,
        accountSelectedIndex:           state.data.accountSelectedIndex,
        operationCategoriesData:        state.data.operationCategoriesData,
        operationCategoryValue:         state.data.operationCategoryValue,
        operationCategorySelectedIndex: state.data.operationCategorySelectedIndex,

        accountSaveStatus:              state.data.accountSaveStatus,
        accountDeleteStatus:            state.data.accountDeleteStatus,
        accountsLoadStatus:             state.data.accountsLoadStatus,
        operationCategorySaveStatus:    state.data.operationCategorySaveStatus,
        operationCategoryDeleteStatus:  state.data.operationCategoryDeleteStatus,
        operationCategoriesLoadStatus:  state.data.operationCategoriesLoadStatus,
    }
};

export default connect( mapStateToProps )( PageSettings );
