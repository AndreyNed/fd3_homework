var goodsArr = [
    { id: 0, name: 'Ель зеленая, 180 см', price: 20, count: 15, photoURL: './assets/img/photo_0.jpg' },
    { id: 1, name: 'Ель зеленая, 200 см', price: 25, count: 15, photoURL: './assets/img/photo_1.jpg' },
    { id: 2, name: 'Ель зеленая, 220 см', price: 30, count: 10, photoURL: './assets/img/photo_2.jpg' },
    { id: 3, name: 'Ель зеленая, 240 см', price: 35, count: 10, photoURL: './assets/img/photo_3.jpg' },
    { id: 4, name: 'Ель зеленая, 260 см', price: 40, count: 5,  photoURL: './assets/img/photo_4.jpg' },
    { id: 5, name: 'Ель зеленая, 280 см', price: 45, count: 5,  photoURL: './assets/img/photo_5.jpg' },
    { id: 6, name: 'Ель зеленая, 300 см', price: 50, count: 5,  photoURL: './assets/img/photo_6.jpg' }
];

ReactDOM.render(
    React.createElement( IShopComponent, { goods: goodsArr } ),
    document.getElementById( 'container' )
);
