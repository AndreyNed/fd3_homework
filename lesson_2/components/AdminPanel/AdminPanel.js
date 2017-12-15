'use strict';

import React     from 'react';
import PropTypes from 'prop-types';

import ProductList from '../ProductList/ProductList';
import ProductCard from '../ProductCard/ProductCard';
import Button      from '../Button/Button';

import { productsList } from "../../mocks/mock_products";

import './AdminPanel.scss';
import {isExists, getIndexById, isNotEmpty, isNotNaN} from "../../utils/utils";

class AdminPanel extends React.PureComponent {

    constructor( props ) {
        super( props );
        this.state = props;
    }

    static propTupes = {
        selectedProductID:      PropTypes.string,
        productsList:           PropTypes.arrayOf(
            PropTypes.shape({
                id:             PropTypes.string,
                name:           PropTypes.string,
                price:          PropTypes.number,
                count:          PropTypes.number,
                comment:        PropTypes.string,
            })
        ),
        productValue:           PropTypes.shape({
            id:                 PropTypes.string,
            name:               PropTypes.string,
            price:              PropTypes.number,
            count:              PropTypes.number,
            comment:            PropTypes.string,
        }),
        productValidationData:  PropTypes.shape({
            name:               PropTypes.string,
            price:              PropTypes.string,
            count:              PropTypes.string,
            comment:            PropTypes.string,
        }),
        isSorted:               false,
        isProductCardEdited:    false,
        isNewProductCreated:    false,
    };

    static defaultProps = {
        selectedProductID:      '',
        productsList:           productsList,
        productValue:           {
            id:                 '',
            name:               '',
            price:              0,
            count:              0,
            comment:            '',
        },
        productValidationData:  {
            name:               '',
            price:              '',
            count:              '',
            comment:            '',
        },
        isSorted:               false,
        isProductCardEdited:    false,
        isNewProductCreated:    false,
    };

    classCSS = 'AdminPanel';

    componentWillMount() {
        this.prepareState( this.state );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareState( newProps );
    }

    prepareState = ( props ) => {
        let state = { ...AdminPanel.defaultProps };
        if ( isExists( props ) )
            state = {
                ...state,
                ...props,
            };
        this.setState( state, ()=>{} );
    };

    prepareProductList = () => {

        return {
            defValue:          this.state.selectedProductID,
            listValue:         this.state.productsList,
            isSorted:          this.state.isSorted,
            cbItemClicked:     this.pl_cbItemClicked,
            cbCheckboxClicked: this.pl_cbCheckboxClicked,
        }
    };

    prepareProductCard = () => {
        let productIndex = getIndexById(
            this.state.selectedProductID,
            'id',
            this.state.productsList );
        console.log( 'AdminPanel: prepareProductCard: this.state.productsList: ', this.state.productsList );

        return ( productIndex > -1 || this.state.isNewProductCreated )
            ? {
            isVisible:      true,

            id:             {
                defValue:   this.state.productValue.id,
                label:      'id',
                isEditable: false,
                options: {
                    labelBoxWidth:      150,
                    inputBoxWidth:      200,
                },
                cbChanged:  null,
            },
            name:           {
                defValue:   this.state.productValue.name,
                label:      'Название',
                isEditable: this.state.isProductCardEdited || this.state.isNewProductCreated,
                validationMessage: this.state.productValidationData.name,
                options: {
                    labelBoxWidth:      150,
                    inputBoxWidth:      200,
                },
                cbChanged:  this.pc_cbNameChanged,
            },
            price:          {
                defValue:   this.state.productValue.price + '',
                label:      'Цена',
                isEditable: this.state.isProductCardEdited || this.state.isNewProductCreated,
                validationMessage: this.state.productValidationData.price,
                options: {
                    labelBoxWidth:      150,
                    inputBoxWidth:      200,
                },
                cbChanged:  this.pc_cbPriceChanged,
            },
            count:          {
                defValue:   this.state.productValue.count + '',
                label:      'Количество',
                isEditable: this.state.isProductCardEdited || this.state.isNewProductCreated,
                validationMessage: this.state.productValidationData.count,
                options: {
                    labelBoxWidth:      150,
                    inputBoxWidth:      200,
                },
                cbChanged:  this.pc_cbCountChanged,
            },
            comment:        {
                defValue:   this.state.productValue.comment,
                label:      'Комментарий',
                isEditable: this.state.isProductCardEdited || this.state.isNewProductCreated,
                validationMessage: this.state.productValidationData.comment,
                options: {
                    labelBoxWidth:      150,
                    inputBoxWidth:      200,
                },
                cbChanged:  this.pc_cbCommentChanged,
            },
        }
        : null;
    };

    // == callbacks ==
    pl_cbItemClicked = ( value ) => {
        let index = getIndexById( value, 'id', this.state.productsList );
        let productValue = { ...this.state.productsList[index] };
        this.setState( {
            selectedProductID: value,
            productValue:      productValue,
        }, () => {
            console.log( "ProductList callback item: ", this.state.selectedProductID );
        } );
    };

    pl_cbCheckboxClicked = ( value ) => {
        this.setState( {
            isSorted: value,
        }, () => {
            console.log( "ProductList callback checkbox: ", value );
        } );
    };

    pc_cbNameChanged = ( value ) => {
        let productValue = { ...this.state.productValue };
        productValue.name = value;
        let productValidationData = { ...this.state.productValidationData };
        productValidationData.name = this.valProductName( value );
        this.setState(
            {
                productValue:          productValue,
                productValidationData: productValidationData,
            }, () => {}
        );
    };

    pc_cbPriceChanged = ( value ) => {
        let productValue = { ...this.state.productValue };
        productValue.price = parseFloat( value );
        productValue.price = ( isNotNaN( productValue.price ) )
            ? productValue.price
            : 0;
        let productValidationData = { ...this.state.productValidationData };
        productValidationData.price = this.valProductPrice( value );
        this.setState(
            {
                productValue:          productValue,
                productValidationData: productValidationData,
            }, () => {}
        );
    };

    pc_cbCountChanged = ( value ) => {
        let productValue = { ...this.state.productValue };
        productValue.count = parseInt( value );
        productValue.count = ( isNotNaN( productValue.count ) )
            ? productValue.count
            : 0;
        let productValidationData = { ...this.state.productValidationData };
        productValidationData.count = this.valProductCount( value );
        this.setState(
            {
                productValue:          productValue,
                productValidationData: productValidationData,
            }, () => {}
        );
    };

    pc_cbCommentChanged = ( value ) => {
        let productValue = { ...this.state.productValue };
        productValue.comment = value;
        let productValidationData = { ...this.state.productValidationData };
        productValidationData.comment = this.valProductComment( value );
        this.setState(
            {
                productValue:          productValue,
                productValidationData: productValidationData,
            }, () => {}
        );
    };

    btnPanel_Edit_cbClicked = ( value ) => {
        this.setState( {
            isProductCardEdited: true,
        }, () => {
            console.log( 'btnPanel_Edit_cbClicked: ', this.state.isProductCardEdited );
        } );
    };

    btnPanel_Create_cbClicked = ( value ) => {
        this.setState( {
            isNewProductCreated: true,
            selectedProductID:   '',
            productValue:        { ...AdminPanel.defaultProps.productValue },
        }, () => {
            console.log( 'btnPanel_Edit_cbClicked: ', this.state.isNewProductCreated );
        } );
    };

    btnPanel_Save_cbClicked = ( value ) => {
        this.productSave();
    };

    btnPanel_Cancel_cbClicked = ( value ) => {
        this.setState( {
            isNewProductCreated: false,
            isProductCardEdited: false,
        }, () => {
            console.log( 'btnPanel_Edit_cbClicked: ', this.state.isNewProductCreated );
        } );
    };

    btnPanel_Clear_cbClicked = ( value ) => {
        this.clearProductCard();
    };

    // == action functions ==

    productSave = () => {
        let validationResult = this.valProductCard();
        this.setState(
            {
                productValidationData: validationResult.productValidationData,
            }, () => {
                if ( validationResult.isValid ) {
                    this.setState(
                        {
                            isProductCardEdited: false,
                            isNewProductCreated: false,
                        }, () => {
                            console.log( "Product is going to be saved..." );
                    } );
                }
            }
        );
    };

    clearProductCard = () => {
        console.log( "Product card is going to be cleared..." );
    };

    // == validation functions ==
    valProductName = () => ( isNotEmpty( this.state.productValue.name ) ) ? '' : 'Обязательное поле';

    valProductPrice = () => ( isNotNaN( this.state.productValue.price ) ) ? '' : 'Обязательное поле';

    valProductCount = () => ( isNotNaN( this.state.productValue.count ) ) ? '' : 'Обязательное поле';

    valProductComment = () => ( isNotEmpty( this.state.productValue.comment ) ) ? '' : 'Обязательное поле';

    valProductCard = () => {
        let result = true;
        let productValidationData = { ...AdminPanel.defaultProps.productValidationData };

        productValidationData.name = this.valProductName();
        result = ( isNotEmpty( productValidationData.name ) )
            ? false
            : result;

        productValidationData.price = this.valProductPrice();
        result = ( isNotEmpty( productValidationData.price ) )
            ? false
            : result;

        productValidationData.count = this.valProductCount();
        result = ( isNotEmpty( productValidationData.count ) )
            ? false
            : result;

        productValidationData.comment = this.valProductComment();
        result = ( isNotEmpty( productValidationData.comment ) )
            ? false
            : result;

        return { isValid: result, productValidationData: productValidationData } ;
    };

    // == render ==

    render() {
        let buttonVisibility = {
            edit:   !this.state.isProductCardEdited &&
                    isNotEmpty( this.state.selectedProductID ) &&
                    !this.state.isNewProductCreated,
            create: !this.state.isNewProductCreated &&
                    !this.state.isProductCardEdited,
            save:   this.state.isProductCardEdited || this.state.isNewProductCreated,
            cancel: this.state.isProductCardEdited || this.state.isNewProductCreated,
            clear:  this.state.isProductCardEdited || this.state.isNewProductCreated,
        };

        return (
                <div className = { this.classCSS }>
                    <div className = { this.classCSS + "_left_section" }>
                        <ProductList { ...this.prepareProductList() }/>
                        <div className = { this.classCSS + "_button_panel" }>
                            <Button key = { 'Btn_edit' }
                                    value = 'Редактировать'
                                    isVisible = { buttonVisibility.edit }
                                    options = {{
                                        buttonWidth: 150,
                                    }}
                                    cbClicked = { this.btnPanel_Edit_cbClicked }/>
                            <Button key = { 'Btn_create' }
                                    value = 'Новый товар'
                                    isVisible = { buttonVisibility.create }
                                    options = {{
                                        buttonWidth: 150,
                                    }}
                                    cbClicked = { this.btnPanel_Create_cbClicked }/>
                            <Button key = { 'Btn_save' }
                                    value = 'Сохранить'
                                    isVisible = { buttonVisibility.save }
                                    options = {{
                                        buttonWidth: 150,
                                    }}
                                    cbClicked = { this.btnPanel_Save_cbClicked }/>
                            <Button key = { 'Btn_cancel' }
                                    value = 'Отменить'
                                    isVisible = { buttonVisibility.cancel }
                                    options = {{
                                        buttonWidth: 150,
                                    }}
                                    cbClicked = { this.btnPanel_Cancel_cbClicked }/>
                            <Button key = { 'Btn_clear' }
                                    value = 'Очистить'
                                    isVisible = { buttonVisibility.clear }
                                    options = {{
                                        buttonWidth: 150,
                                    }}
                                    cbClicked = { this.btnPanel_Clear_cbClicked }/>
                        </div>
                    </div>
                    <div className = { this.classCSS + "_main_section" }>
                        <ProductCard { ...this.prepareProductCard() }/>
                    </div>
                </div>
            )
    }

}

export default AdminPanel;