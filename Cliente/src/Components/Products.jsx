import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Icono_Envio from '../Image/Icono_Envio.png';
import '../css/Products.css';


class Products extends Component {

    render() {
        
        console.log(this.props)
     
        return (
            <div>
            <div className='category-container'>{this.props.categories.name}</div>
               
                {this.props.products.map((p, index) => (

                    <div className='product-container'key={index}>
                        <Link to={`/items/${p.id}`}>
                        <div className='img-container'><img src={p.picture} /></div>
                        <div className='title-container'>{p.title}</div>
                        <div className='pice-container'><p>$ {p.price.amount}</p></div>
                        <div className='shipping-container'>{p.free_shipping && (
                            <span className='free-shipping'><img src={Icono_Envio} alt='envio gratis' /></span>)}</div>
                        <div className='location-container'>{p.location}</div>
                        </Link>
                    </div>
                ))}

            </div>
        )
    }
}

export default Products;



