const lastProductId = 29;

const productos = [
{
  "id_producto": 1,
  "title": "producto 1",
  "description": "Juego de sartenes .",
  "price": 5,
  "thumbnail": "imagen22.jpg",
  "code": "P001",
  "stock": 5,
  "status": true,
  "category": "cocina"
},
{
  "id_producto": 2,
  "title": "Reloj de pulsera deportivo",
  "description": "Reloj resistente al agua y diseñado para actividades deportivas.",
  "price": 34.99,
  "thumbnail": "imagen2.jpg",
  "code": "P002",
  "stock": 75,
  "status": true,
  "category": "accesorios"
},
{
  "id_producto": 3,
  "title": "Bolso de viaje",
  "description": "Bolso espacioso y duradero para tus aventuras de viaje.",
  "price": 59.5,
  "thumbnail": "imagen3.jpg",
  "code": "P003",
  "stock": 50,
  "status": true,
  "category": "accesorios"
},
{
  "id_producto": 4,
  "title": "Cámara digital compacta",
  "description": "Cámara fácil de usar con calidad de imagen excepcional.",
  "price": 199.99,
  "thumbnail": "imagen4.jpg",
  "code": "P004",
  "stock": 120,
  "status": true,
  "category": "electrónica"
},
{
  "id_producto": 5,
  "title": "title5",
  "description": "Juego de sartenes .",
  "price": 5,
  "thumbnail": "imagen22.jpg",
  "code": "P005",
  "stock": 5,
  "status": true,
  "category": "cocina"
},
{
  "id_producto": 6,
  "title": "Libro de misterio",
  "description": "Una novela emocionante llena de suspense y giros inesperados.",
  "price": 12.99,
  "thumbnail": "imagen6.jpg",
  "code": "P006",
  "stock": 60,
  "status": true,
  "category": "libros"
},
{
  "id_producto": 7,
  "title": "Camiseta de diseño",
  "description": "Camiseta de algodón con un diseño exclusivo.",
  "price": 29.99,
  "thumbnail": "imagen7.jpg",
  "code": "P007",
  "stock": 80,
  "status": true,
  "category": "ropa"
},
{
  "id_producto": 8,
  "title": "Gafas de sol de moda",
  "description": "Gafas de sol con estilo para proteger tus ojos del sol.",
  "price": 39.95,
  "thumbnail": "imagen8.jpg",
  "code": "P008",
  "stock": 110,
  "status": true,
  "category": "accesorios"
},
{
  "id_producto": 9,
  "title": "Teclado mecánico para juegos",
  "description": "Teclado diseñado para jugadores con retroiluminación LED personalizable.",
  "price": 69.99,
  "thumbnail": "imagen9.jpg",
  "code": "P009",
  "stock": 70,
  "status": true,
  "category": "electrónica"
},
{
  "id_producto": 10,
  "title": "Set de herramientas",
  "description": "Set completo de herramientas de calidad para cualquier proyecto de bricolaje.",
  "price": 79.5,
  "thumbnail": "imagen10.jpg",
  "code": "P010",
  "stock": 95,
  "status": true,
  "category": "herramientas"
},
{
  "id_producto": 11,
  "title": "Perfume floral",
  "description": "Fragancia floral suave y elegante para mujeres.",
  "price": 29.99,
  "thumbnail": "imagen11.jpg",
  "code": "P011",
  "stock": 65,
  "status": true,
  "category": "perfumes"
},
{
  "id_producto": 12,
  "title": "Laptop ultradelgada",
  "description": "Laptop ultradelgada y potente para el trabajo y el entretenimiento.",
  "price": 899.99,
  "thumbnail": "imagen12.jpg",
  "code": "P012",
  "stock": 45,
  "status": true,
  "category": "electrónica"
},
{
  "id_producto": 13,
  "title": "Cepillo de dientes eléctrico",
  "description": "Cepillo de dientes eléctrico con tecnología de limpieza avanzada.",
  "price": 49.95,
  "thumbnail": "imagen13.jpg",
  "code": "P013",
  "stock": 85,
  "status": true,
  "category": "higiene"
},
{
  "id_producto": 14,
  "title": "Pelota de fútbol",
  "description": "Pelota de fútbol oficial para entrenamientos y partidos.",
  "price": 19.99,
  "thumbnail": "imagen14.jpg",
  "code": "P014",
  "stock": 70,
  "status": true,
  "category": "deportes"
},
{
  "id_producto": 15,
  "title": "Mochila resistente al agua",
  "description": "Mochila duradera y resistente al agua para aventuras al aire libre.",
  "price": 54.99,
  "thumbnail": "imagen15.jpg",
  "code": "P015",
  "stock": 55,
  "status": true,
  "category": "accesorios"
},
{
  "id_producto": 16,
  "title": "Caja de herramientas",
  "description": "Caja de herramientas portátil con múltiples compartimentos para organizar tus herramientas.",
  "price": 34.5,
  "thumbnail": "imagen16.jpg",
  "code": "P016",
  "stock": 75,
  "status": true,
  "category": "herramientas"
},
{
  "id_producto": 17,
  "title": "Set de joyería de plata",
  "description": "Set de joyería de plata esterlina con colgantes y pulsera.",
  "price": 89.99,
  "thumbnail": "imagen17.jpg",
  "code": "P017",
  "stock": 40,
  "status": true,
  "category": "joyería"
},
{
  "id_producto": 18,
  "title": "Pantalones vaqueros modernos",
  "description": "Pantalones vaqueros de corte moderno y cómodos para cualquier ocasión.",
  "price": 44.95,
  "thumbnail": "imagen18.jpg",
  "code": "P018",
  "stock": 60,
  "status": true,
  "category": "ropa"
},
{
  "id_producto": 19,
  "title": "Paraguas plegable",
  "description": "Paraguas plegable compacto para mantenerte seco en días de lluvia.",
  "price": 19.99,
  "thumbnail": "imagen19.jpg",
  "code": "P019",
  "stock": 90,
  "status": true,
  "category": "accesorios"
},
{
  "id_producto": 27,
  "title": "Juego de sartenes antiadherentes2",
  "description": "Juego de sartenes antiadherentes de alta calidad para cocinar sin problemas2.",
  "price": 69.99,
  "thumbnail": "imagen20.jpg",
  "code": "P02313232s",
  "stock": 505,
  "status": true,
  "category": "cocina"
},
{
  "id_producto": 28,
  "title": "Juego de sartenes antiadherentes2",
  "description": "Juego de sartenes antiadherentes de alta calidad para cocinar sin problemas2.",
  "price": 69.99,
  "thumbnail": "imagen20.jpg",
  "code": "20231107",
  "stock": 505,
  "status": true,
  "category": "cocina"
}
];

        module.exports =
        {productos,
  
          lastProductId
};