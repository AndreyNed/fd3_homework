'use strict';

import React from 'react';

class PageAbout extends React.PureComponent {
    classCSS = 'App_page_about';

    render() {
        return (
            <div className = { this.classCSS }>
                Page about
            </div>
        )
    }
}

export default PageAbout;
