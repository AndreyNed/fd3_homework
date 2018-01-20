class Product implements IScalable {
    protected _name: string;
    protected _scale: number;
    
    setName( name: string ):void { this._name = name };
    getName():String { return this._name };
    setScale( scale: number ):void { this._scale = scale };
    getScale():number { return this._scale };
    
    toString (): string {
        return `[ name: ${ this._name }, scale: ${ this._scale } ]`;
    }
}

interface IScalable {
    setName( name: string ):void;
    getName():String;
    setScale( scale: number ):void;
    getScale():number;
}

class Tomato extends Product implements IScalable {
    constructor( scale: number ) {
        super();
        this._name = 'Tomato';
        this._scale = scale;
    }
}

class Apple extends Product implements IScalable {
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
            this._products.forEach( ( product: Product ) => {
                result += product.getScale();
            } );
        }
        return result;
    }
    
    getNameList(): Array<string> {
        return ( this._products !== null && this._products !== undefined )
            ? this._products.map( ( product: Product, index: number ) => product.getName() )
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
