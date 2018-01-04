'use strict';

import React from 'react';

class PageOperations extends React.PureComponent {
    classCSS = 'App_page_operations';

    render() {
        return (
            <div className = { this.classCSS }>
                Page operations
            </div>
        )
    }
}

export default PageOperations;
