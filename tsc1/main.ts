class Product {
    protected _name: string;
    protected _scale: number;
    
    get name (): string {
        return this._name;
    };
    
    set name ( name: string ) {
        this._name = name;
    }
    
    set scale ( scale: number ) {
        this._scale = scale;
    }
    
    get scale (): number {
        return this._scale;
    };
    
    toString (): string {
        return `[ name: ${ this._name }, scale: ${ this._scale } ]`;
    }
}

class Tomato extends Product {
    constructor( scale: number ) {
        super();
        this._name = 'Tomato';
        this._scale = scale;
    }
}

class Apple extends Product {
    constructor( scale: number ) {
        super();
        this._name = 'Apple';
        this._scale = scale;
    }
}

class Scale {
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

let scale: Scale = new Scale();
let products: Array<Product> = [];

/*products[ 0 ] = new Apple( 100 );
products[ 1 ] = new Tomato( 150 );
products[ 2 ] = new Tomato( 130 );
products[ 3 ] = new Apple( 200 );
products[ 4 ] = new Apple( 110 );
products[ 5 ] = new Tomato( 105 );*/

products.push( new Apple( 100 ) );
products.push( new Tomato( 150 ) );
products.push( new Tomato( 130 ) );
products.push( new Apple( 200 ) );
products.push( new Apple( 110 ) );
products.push( new Tomato( 105 ) );

for ( let i = 0; i < products.length; i++ ) {
    scale.addProduct( products[ i ] );
}

console.log('************************  SCALE  *************************************');
console.log('Total weight of products: ' + scale.getSumScale() );
console.log('List of products: ' + scale.getNameList() );
console.log('**********************************************************************');
