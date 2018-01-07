'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MatGlass from  '../MatGlass/MatGlass';
import { BrowserRouter } from 'react-router-dom';
import PagesRouter from '../../pages/PagesRouter';
import PagesLinks  from '../../pages/PagesLinks';

import { fDataLoadAccounts } from "../../network/fLoader";
import { acShowMatGlass } from "../../actions/acUI";

class Loader extends React.PureComponent {

    static propTypes = {
        accountsData:       PropTypes.arrayOf(
            PropTypes.shape({
                id:         PropTypes.number,
                name:       PropTypes.string,
                amount:     PropTypes.number,
            })
        ),
        accountsLoadStatus: PropTypes.number,
    };

    static defaultProps = {
        accountsLoadStatus: 0,
    };

    classCSS = 'Loader';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( data ) => {
        console.log( 'Loader: prepareData: data: ', data );
        let props = { ...data };
        const { accountsLoadStatus, dispatch,  } = props;
        if ( !accountsLoadStatus ) {
            console.log( 'Accounts needs to be loaded...' );
            dispatch( acShowMatGlass() );
            fDataLoadAccounts(
                dispatch,
                () => { /*console.log( 'Accounts are loaded: ', this.props.accountsData )*/ },
                () => { console.log( 'Error: ', text ) },
            )
        }
    };

    render() {
        return (
            <div className = { this.classCSS }>
                <MatGlass />
                <BrowserRouter>
                    <div className = { this.classCSS + "_router" }>
                        <PagesLinks />
                        <PagesRouter />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = function ( state ) {
    return {
        accountsData:       state.data.accountsData,
        accountsLoadStatus: state.data.accountsLoadStatus,
    }
};

export default connect( mapStateToProps )( Loader );