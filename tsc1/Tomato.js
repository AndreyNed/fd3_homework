"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = require("./Product");
var Tomato = (function (_super) {
    __extends(Tomato, _super);
    function Tomato(scale) {
        var _this = _super.call(this) || this;
        _this._name = 'Tomato';
        _this._scale = scale;
        return _this;
    }
    return Tomato;
}(Product_1.default));
exports.default = Tomato;
