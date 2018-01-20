import Product from './Product';

class Scale {
    constructor() {}

    private _products: Array<Product>;

    set products( products: Array<Product> ) {
        this._products = products;
    }

    get products() {
        return this._products;
    }

    addProduct( product: Product ): void {
        if ( this._products === null || this._products === undefined ) {
            this._products = [ product ];
        }
        else {
            this._products.push( product );
        }
    }

    getSumScale(): number {
        let result: number = 0;
        if ( this._products !== null && this._products !== undefined ) {
            this._products.forEach( ( product: Product, index: number ) => {
                result += product.scale;
            } );
        }
        return result;
    }

    getNameList(): Array<string> {
        return ( this._products !== null && this._products !== undefined )
            ? this._products.map( ( product: Product, index: number ) => product.name )
            : null;
    }

    toString(): string {
        return ( this._products !== null && this._products !== undefined )
            ? this._products.join( '; ' )
            : '';
    }

}

export default Scale;