var express = require('express');
var router = express.Router();


/* GET home page. */
/* 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

// Route con parametros
router.get("/api/items?q=:query", (req, res) => {
  // res.send("funciona!");
  // console.log(req.params);
  res.send(req.params);
});

router.get("/api/items/:id", (req, res) => {
  // res.send("funciona!");
  // console.log(req.params);
  res.send(req.params);
});

module.exports = router;

//TP
//Las vistas tiene que ser navegables de manera independiente y sus URLs son:

// Cuadro de búsqueda: /
// Listado de productos: /items?search=
// Detalle de un producto: /items/:id

//En el servidor, construir los siguientes endpoints (rutas):

//    /api/items?q=:query
//Debe hacer un request al siguiente endpoint 
//de la API de Mercado Libre: 
//https://api.mercadolibre.com/sites/MLA/search?q=:query


//    /api/items/:id
// Debe hacer un requeste a los siguientes endpoints de la API de Mercado Libre:

// https://api.mercadolibre.com/items/:id
// https://api.mercadolibre.com/items/:id/description





