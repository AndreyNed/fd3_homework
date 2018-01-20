"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Product;
