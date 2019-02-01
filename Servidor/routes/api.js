var express = require('express');
var router = express.Router();
const axios = require('axios');

//Ruta 1- devuelve 4 productos
router.get('/items', function (req, res, next) {
  const q = req.query.q  //la -q- es porque nosotros lo llamamos asi
  axios
    .get('https://api.mercadolibre.com/sites/MLA/search?limit=4&q=' + q)
    .then(result => {
      const categoriesAPI = result.data.available_filters.find(c => c.id === 'category')
      const categories = categoriesAPI.values

      categories.sort(function (a, b) { 
        if (a.results > b.results) {
          return -1;
        }
        if (a.results < b.results) {
          return 1;
        }
        return 0
      })
      // const result = result.data
      // const productos = data.result.map(function (p) {
      const productos = result.data.results.map(function (myProduct) {
        //name: Categories
        // aca digo como quiero transformar el objeto
        return {
          id: myProduct.id,
          title: myProduct.title,
          price: {
            currency: myProduct.currency_id,
            amount: String(myProduct.price).split('.')[0],
            decimals: String(myProduct.price).split('.')[1] || '0'
          },
          picture: myProduct.thumbnail,
          condition: myProduct.condition,
          free_shipping: myProduct.shipping.free_shipping,
          location: myProduct.address.state_name
        }
      })

      res.json({
        category: categories[0],
        items: productos
      })
   })
   .catch(err => console.log('Algo esta mal'+ err))
})


  //Ruta 2 - devuelve 1 producto
  router.get('/items/:id', function (req, res, next) {
    const productID = req.params.id;
    // id: category
    axios
    .get('https://api.mercadolibre.com/items/' + productID)
    .then(resultP => {
      const categoryN = resultP.data.category_id;
      const p = resultP.data; //producto
      axios
      .get('https://api.mercadolibre.com/items/' + productID + '/description')
      .then(resultD => {
       // const description = resultD.data.plain_text;
        axios
        .get('https://api.mercadolibre.com/categories/' + categoryN)
        .then(resultC=> {
          //  const categoryMLA = resultC.data.path_from_root.map(function (p) {
            const categoryMLA = resultC.data.path_from_root.map(a => {return a.name})
            const newProduct = {

              categories: categoryMLA, // {path_from_root:[]}
              item: {              
              id: p.id,
              title: p.title,
              price: {
                currency: p.currency_id,
                amount: String(p.price).split('.')[0],
                decimals: String(p.price).split('.')[1] || '0'
              },
              picture: p.thumbnail,
              condition: p.condition,
              free_shipping: p.shipping.free_shipping,
              sold_quantity: p.sold_quantity,
             description: resultD.data.plain_text
            },
            categoryId: categoryN
          }

      console.log(newProduct)
      res.json(newProduct)
          }) 
      })
      .catch(err => console.log('Algo esta mal'+ err))

    })
})

  module.exports = router;