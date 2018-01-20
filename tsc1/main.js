"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scale_1 = require("./Scale");
var Apple_1 = require("./Apple");
var Tomato_1 = require("./Tomato");
var scale = new Scale_1.default();
var products;
products[0] = new Apple_1.default(100);
products[1] = new Tomato_1.default(150);
products[2] = new Tomato_1.default(130);
products[3] = new Apple_1.default(200);
products[4] = new Apple_1.default(110);
products[5] = new Tomato_1.default(105);
for (var i = 0; i < products.length; i++) {
    scale.addProduct(products[i]);
}
console.log('************************  SCALE  *************************************');
console.log('Total weight of products: ' + scale.getSumScale());
console.log('List of products: ' + scale.getNameList());
console.log('**********************************************************************');
