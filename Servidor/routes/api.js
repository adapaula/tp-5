var express = require('express');
var router = express.Router();
const axios = require('axios');

//ruta 1- devuelve 4 productos
router.get('/items', function (req, res, next) {
  const q = req.query.q  //la -q- es porque nosotros lo llamamos asi
  axios
    .get('https://api.mercadolibre.com/sites/MLA/search?limit=4&q=' + q)
    .then(result => {
      const categoriesAPI = result.data.available_filters.find(p => p.id === 'category')
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
      const productos = result.data.results.map(function (p) {
        //name: Categories
        // aca digo como quiero transformar el objeto
        return {
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
          location: p.address.state_name
        }
      })

      res.json({
        category: categories[0],
        items: productos
      })
   })
   .catch(err => console.log('Algo esta mal'+ err))
})


  //ruta 2 - devuelve 1 producto
  router.get('/items/:id', function (req, res, next) {
    const productID = req.params.id;
    // id: category
    axios
    .get('https://api.mercadolibre.com/items/' + productID)
    .then(resultProduct => {
      const categoryNumber = resultProduct.data.category_id;
      const p = resultProduct.data; //producto
      axios
      .get('https://api.mercadolibre.com/items/' + productID + '/description')
      .then(resultDescription => {
        const descriptionProduct = resultDescription.data.plain_text;
        axios
        .get('https://api.mercadolibre.com/categories/' + categoryNumber)
        .then(resultC=> {
          //  const categoryMLA = resultC.data.path_from_root.map(function (p) {
            const categoryMLA = resultC.data.path_from_root.map(c => {return c.name})
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
              sold_quantity: p.sold_quantity
             // description: p.plain_text
            },
            categoryId: categoryNumber,
            description: descriptionProduct
          }

      console.log(newProduct)
      res.json(newProduct)
          }) 
      })
      .catch(err => console.log('Algo esta mal'+ err))

    })
})

  module.exports = router;