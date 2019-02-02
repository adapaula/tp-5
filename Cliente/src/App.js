import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Header from './Components/Header';
import Products from './Components/Products';
import Detail from './Components/Detail';
import './css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: []
    }
  }
// componentDidMount()
  searchId(id){
    fetch('http://localhost:3001/api/items?q=' + id)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
       // this.setState({data})
                
      });
    }

    searchProduct(myProduct){
      fetch('http://localhost:3001/api/items?q=' + myProduct)
        .then(res => {
          return res.json();
        })
        .then(data => {
         this.setState({
          categories: data.category,
          products: data.items,
          querySearch: myProduct
        })
        });
      }

      render() {
        return (
          <div className="App">
            <BrowserRouter >
            <div>
             
                <Header searchProduct={myProduct => this.searchProduct(myProduct)} /> 
                <div>
 
                  <Route exact path='/items' render={() =>(
                   <Products
                      products={this.state.products} 
                      categories={this.state.categories}
                      idProducts={id => this.searchId(id)} /> )} 
                    />
                  <Route exact path='/items/:id' render={() =>(<Detail /> )} />
                </div>
              </div>
            </BrowserRouter>
          </div>
        );
      }
    }

export default App;
// <Route exact path='/' component={Header} />
