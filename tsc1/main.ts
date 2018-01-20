import Scale from './Scale';
import Product from "./Product";
import Apple from "./Apple";
import Tomato from "./Tomato";

let scale: Scale = new Scale();
let products: Array<Product>;

products[ 0 ] = new Apple( 100 );
products[ 1 ] = new Tomato( 150 );
products[ 2 ] = new Tomato( 130 );
products[ 3 ] = new Apple( 200 );
products[ 4 ] = new Apple( 110 );
products[ 5 ] = new Tomato( 105 );

for ( let i = 0; i < products.length; i++ ) {
    scale.addProduct( products[ i ] );
}

console.log('************************  SCALE  *************************************');
console.log('Total weight of products: ' + scale.getSumScale() );
console.log('List of products: ' + scale.getNameList() );
console.log('**********************************************************************');
