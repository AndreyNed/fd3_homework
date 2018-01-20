"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Scale;
