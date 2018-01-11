'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MODAL_CONTENT } from "../../data_const/data_const";

import TextInput from '../TextInput/TextInput';
import ComboInput from '../ComboInput/ComboInput';
import DateInput from '../DateInput/DateInput';

import './OperationCard.scss';

class OperationCard extends React.PureComponent {

    static propTypes = {
        operationCardIsVisible: PropTypes.bool,
        isNewOperationAdded:    PropTypes.bool,
        modalContent:           PropTypes.string,
    };

    static defaultProps = {
        operationCardIsVisible: false,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'OperationCard_' + OperationCard.classID;
    };

    constructor( props ) {
        super( props );
        OperationCard.classID++;
        this.state = {
            htmlID: OperationCard.getHtmlID( props.htmlID ),
        }
    }

    debug_mode = true;

    classCSS = 'OperationCard';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
        console.log( 'OperationCard: prepareData: new props: ', props )

        // todo
    };

    render() {
        const { modalContent, isNewOperationAdded } = this.props;
        return ( modalContent === MODAL_CONTENT.OPERATION_CARD ) &&
            <div className = { this.classCSS }>
                <div className = { this.classCSS + '_form' }>
                    <div className="rows"
                         key="header">
                        <div className="cols col_16 header">
                            <span className = { this.classCSS + '_header' }>
                                {
                                    ( isNewOperationAdded )
                                        ? "Новая операция"
                                        : "Операция"
                                }
                            </span>
                        </div>
                    </div>
                    <div className="rows"
                         key="id">
                        <div className="cols col_16">
                            { "Здесь будут данные - Id" }
                        </div>
                    </div>
                    <div className="rows"
                         key="account">
                        <div className="cols col_16">
                            { "Здесь будут данные - Счет" }
                        </div>
                    </div>
                    <div className="rows"
                         key="category">
                        <div className="cols col_16">
                            { "Здесь будут данные - Категория" }
                        </div>
                    </div>
                    <div className="rows"
                         key="typeSum">
                        <div className="cols col_6"
                             key="type">
                            { "Здесь будут данные - Тип" }
                        </div>
                        <div className="cols col_10"
                             key="sum">
                            { "Здесь будут данные - Сумма" }
                        </div>
                    </div>
                    <div className="rows"
                         key="date">
                        <div className="cols col_16">
                            { "Здесь будут данные - Дата" }
                        </div>
                    </div>
                    <div className="rows"
                         key="comment">
                        <div className="cols col_16">
                            { "Здесь будут данные - Комментарий" }
                        </div>
                    </div>
                </div>
            </div>
    }

}

const mapStateToProps = function ( state ) {
    return {
        accountsData:                   state.data.accountsData,

        isNewOperationAdded:            state.ui.isNewOperationAdded,
        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( OperationCard );