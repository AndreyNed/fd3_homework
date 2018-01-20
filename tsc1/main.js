var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Product = (function () {
    function Product() {
    }
    Object.defineProperty(Product.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Product.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (scale) {
            this._scale = scale;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Product.prototype.toString = function () {
        return "[ name: " + this._name + ", scale: " + this._scale + " ]";
    };
    return Product;
}());
var Tomato = (function (_super) {
    __extends(Tomato, _super);
    function Tomato(scale) {
        var _this = _super.call(this) || this;
        _this._name = 'Tomato';
        _this._scale = scale;
        return _this;
    }
    return Tomato;
}(Product));
var Apple = (function (_super) {
    __extends(Apple, _super);
    function Apple(scale) {
        var _this = _super.call(this) || this;
        _this._name = 'Apple';
        _this._scale = scale;
        return _this;
    }
    return Apple;
}(Product));
var Scale = (function () {
    function Scale() {
    }
    Object.defineProperty(Scale.prototype, "products", {
        get: function () {
            return this._products;
        },
        set: function (products) {
            this._products = products;
        },
        enumerable: true,
        configurable: true
    });
    Scale.prototype.addProduct = function (product) {
        if (this._products === null || this._products === undefined) {
            this._products = [product];
        }
        else {
            this._products.push(product);
        }
    };
    Scale.prototype.getSumScale = function () {
        var result = 0;
        if (this._products !== null && this._products !== undefined) {
            this._products.forEach(function (product, index) {
                result += product.scale;
            });
        }
        return result;
    };
    Scale.prototype.getNameList = function () {
        return (this._products !== null && this._products !== undefined)
            ? this._products.map(function (product, index) { return product.name; })
            : null;
    };
    Scale.prototype.toString = function () {
        return (this._products !== null && this._products !== undefined)
            ? this._products.join('; ')
            : '';
    };
    return Scale;
}());
var scale = new Scale();
var products = [];
/*products[ 0 ] = new Apple( 100 );
products[ 1 ] = new Tomato( 150 );
products[ 2 ] = new Tomato( 130 );
products[ 3 ] = new Apple( 200 );
products[ 4 ] = new Apple( 110 );
products[ 5 ] = new Tomato( 105 );*/
products.push(new Apple(100));
products.push(new Tomato(150));
products.push(new Tomato(130));
products.push(new Apple(200));
products.push(new Apple(110));
products.push(new Tomato(105));
for (var i = 0; i < products.length; i++) {
    scale.addProduct(products[i]);
}
console.log('************************  SCALE  *************************************');
console.log('Total weight of products: ' + scale.getSumScale());
console.log('List of products: ' + scale.getNameList());
console.log('**********************************************************************');
