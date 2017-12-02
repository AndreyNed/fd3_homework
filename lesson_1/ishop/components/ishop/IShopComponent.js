var IShopComponent = React.createClass({

    displayName: 'IShopComponent',

    goods: [],

    propTypes: {
        goods: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id:       React.PropTypes.number,
                name:     React.PropTypes.string,
                price:    React.PropTypes.number,
                count:    React.PropTypes.number,
                amount:   React.PropTypes.number,
                photoURL: React.PropTypes.string
            })
        )
    },

    getDefaultProps: function() {
        return {
            goods: []
        }
    },

    render: function() {
        var totalAmount = 0;

        var tableHeader = React.DOM.thead(
            { className: 'IShop_table_head' },
            React.DOM.tr(
                { className: 'IShop_table_head_row' },
                React.DOM.th(
                    { key: 'th_0', className: 'IShop_table_head_cell' },
                    'id'
                ),
                React.DOM.th(
                    { key: 'th_1', className: 'IShop_table_head_cell' },
                    'Название товара'
                ),
                React.DOM.th(
                    { key: 'th_2', className: 'IShop_table_head_cell' },
                    'Цена'
                ),
                React.DOM.th(
                    { key: 'th_3', className: 'IShop_table_head_cell' },
                    'Количество'
                ),
                React.DOM.th(
                    { key: 'th_4', className: 'IShop_table_head_cell' },
                    'Стоимость'
                ),
                React.DOM.th(
                    { key: 'th_5', className: 'IShop_table_head_cell' },
                    'Фото (URL)'
                )
            )
        );

        var rows = null;
        console.log( 'IShop: props: ', this.props );

        if ( this.props.goods !== null &&
             this.props.goods !== undefined &&
             this.props.goods.length > 0 ) {
            rows = this.props.goods.map(
                function( item ) {
                    totalAmount += ( item.price * item.count );
                    return React.DOM.tr(
                        { key: item.id, className: 'IShop_table_body_row' },
                        React.DOM.td(
                            { key: item.id + '_0', className: 'IShop_table_body_cell id' },
                            item.id
                        ),
                        React.DOM.td(
                            { key: item.id + '_1', className: 'IShop_table_body_cell name' },
                            item.name
                        ),
                        React.DOM.td(
                            { key: item.id + '_2', className: 'IShop_table_body_cell price' },
                            item.price
                        ),
                        React.DOM.td(
                            { key: item.id + '_3', className: 'IShop_table_body_cell count' },
                            item.count
                        ),
                        React.DOM.td(
                            { key: item.id + '_4', className: 'IShop_table_body_cell amount' },
                            ( item.count * item.price )
                        ),
                        React.DOM.td(
                            { key: item.id + '_5', className: 'IShop_table_body_cell photoURL' },
                            item.photoURL
                        )
                    )
                }
            );
        }

        var tableFooter = React.DOM.tfoot(
            { className: 'IShop_table_foot' },
            React.DOM.tr(
                { className: 'IShop_table_foot_row' },
                React.DOM.td(
                    { key: 'td_0', className: 'IShop_table_foot_cell' }
                ),
                React.DOM.td(
                    { key: 'td_1', className: 'IShop_table_foot_cell' },
                    'Общая стоимость'
                ),
                React.DOM.td(
                    { key: 'td_2', className: 'IShop_table_foot_cell' }
                ),
                React.DOM.td(
                    { key: 'td_3', className: 'IShop_table_foot_cell' }
                ),
                React.DOM.td(
                    { key: 'td_4', className: 'IShop_table_foot_cell  total_amount' },
                    totalAmount
                ),
                React.DOM.td(
                    { key: 'td_5', className: 'IShop_table_foot_cell' }
                )
            )
        );

        return (
            React.DOM.div(
                { className: 'IShop' },
                React.DOM.h1( { className: 'IShop_header' }, 'IShop' ),
                React.DOM.table(
                    { className: 'IShop_table' },
                    tableHeader,
                    React.DOM.tbody(
                        { className: 'IShop_table_body' },
                        rows
                    ),
                    tableFooter
                )
            )
        );

    }

});