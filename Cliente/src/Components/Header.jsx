import React, { Component } from 'react';
import Logo_Ada from '../Image/Ada_Iso_Blanco.png';
import { Link } from "react-router-dom";
import '../css/Header.css';

class Header extends Component {
    constructor(){
        super()
        this.state={
            inputValue: ''
        }
    }
      
    handleInputChange(event){
        const {value} = event.target
        this.setState({
            inputValue: value
        })
    }

    handleKeyPress(e){
        if(e.which === 13) {
            const {inputValue} = this.state
            this.props.searchProduct(inputValue)
        }
    }

    render() {
        const {inputValue} = this.state
       // console.log('app')
        return (
            <header>
                <div className='search-bar-container'>
                    <div className='logo-container'>
                        <a href="/"><img src={Logo_Ada} alt="" /></a>
                    </div>
                    <form>
                        <input onKeyPress={e => this.handleKeyPress(e)} 
                            onChange={e => this.handleInputChange(e)} 
                            value={this.state.inputValue} 
                            type="text"
                            className='input-search'
                            placeholder='¿Qué estás buscando?'
                        />
                      <Link to={`/items?search=${this.state.inputValue}`}>
                            <button onClick={() => this.props.searchProduct(inputValue)} 
                            className='search-btn' type='submit'>
                                <i className="fas fa-search"></i>
                            </button>
                      </Link>
                    </form>
                </div>
            </header>
        );
    }
}

export default Header;