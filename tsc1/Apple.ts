import Product from './Product';

class Apple extends Product {
    constructor( scale: number ) {
        super();
        this._name = 'Apple';
        this._scale = scale;
    }
}

export default Apple;