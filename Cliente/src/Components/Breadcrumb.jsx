import React, { Component } from 'react';

class Breadcrumb extends Component {

     render() {
        return (
      
                <div className='breadcrumb-container'>
                    <div className='breadcrumb'>
                    <ul>
                    <div>{props.categories.name}</div>
                    </ul>
                    
                    </div>
                </div>
    
        );
    }
}

export default Breadcrumb;