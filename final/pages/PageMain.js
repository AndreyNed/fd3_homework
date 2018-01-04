'use strict';

import React from 'react';

class PageMain extends React.PureComponent {
    classCSS = 'App_page_main';

    render() {
        return (
            <div className = { this.classCSS }>
                Page main
            </div>
        )
    }
}

export default PageMain;
