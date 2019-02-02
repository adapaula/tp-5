import React, { Component } from 'react';


class Detail extends Component {
    constructor(props) {
    super(props);
    this.state = {
      categories:[],
      myProduct: {},
      description: '',
      price: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/items' + this.props.match.params.id)
        .then(res => {
            return res.json();
        })
        .then(data => {
            this.setState({
                categories: data.category,
                myProduct: data.item,
                description: data.description,
                price: data.item.price
            });
        })
}

    render() {
    
        console.log(this.props)
        return (
            <div className='product-container'>
                <div className='title-container'>
                    <div className='condition'>
                    {this.state.myProduct.condition} - {this.state.myProduct.sold_quantity}<p>vendidos</p>
                </div>
                <p>{this.state.myProduct.title}</p>
                <div className='price-container'>${this.state.price.amount}
                    <span className='decimals'>{this.state.price.decimals} </span>
                </div>
                <div className='btn-buy-container'><button className='btn-buy'>Comprar</button></div>
             </div>
             <div className='img-container'><img src={this.state.myProduct.pictures} alt='' /></div>
             <div className='description-container'>
                <p className='description-title'>Descripción del producto</p>
                <p className='description'>{this.state.description}</p>
            </div>
        </div>
           
        );
    }
}

export default Detail;


/*const Detalle = props => {
    console.log(props.match.params)
    const producto = PRODUCTOS.find(p => p.id === props.match.params.id)
    return (
        <div>
           <img src={producto.thumbnail} />
           <p>{producto.title}</p>
           <p>Precio: {producto.price}</p>
        </div>
    );
};


                     <img src={products.thumbnail} />
                        <p>{products.title}</p>
                        <p>Precio: {products.price}</p>           
                        
----------------------                       
                        
                            constructor(props) {
        super(props);
        this.state = {
            categories: [],
            myProduct: {},
            description: '',
            price: ''
        };
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/items' + this.props.match.params.id)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    categories: data.categories, //category
                    myProduct: data.item,
                    description: data.description,
                    price: data.item.price
                });
            }).bind(this)
    }*/