import React, { Component } from 'react';
import '../App.css';


class Categories extends Component {

    render(){
        const {categories} = this.props;

        return(
            <div className='categories'>  
                <div className="title">Categories</div>
                <div className="data_categories">
                    <div className="custom_data">
                        {categories < 0 ? categories[0].name : categories.map((item, i) => 
                            <span className="custom_data">{item.name}, </span>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Categories;
