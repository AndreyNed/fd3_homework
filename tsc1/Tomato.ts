import Product from './Product';

class Tomato extends Product {
    constructor( scale: number ) {
        super();
        this._name = 'Tomato';
        this._scale = scale;
    }
}

export default Tomato;