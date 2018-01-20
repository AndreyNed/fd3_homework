class Product {

    constructor(){}

    protected _name: string;
    protected _scale: number;

    get name (): string {
        return this._name;
    };

    set name ( name: String ) {
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

export default Product;