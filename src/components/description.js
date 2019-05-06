import React, { Component } from 'react';
import '../App.css';


class Description extends Component {

    render(){
        const {description} = this.props;

        return(
            <div className='description'>
                <div className="title">Description</div>
                <div className="data_description">
					<div className="custom_data">
						{description.captions[0].text}
					</div>
                    <div className="separation"></div>
					<div>
						{Math.floor((description.captions[0].confidence) * 100) + "%"}
					</div>
                    <div className="separation"></div>
                    <div className="descriptionTagBox"> 
                        {description.tags.map((item, i) => 
                            <span className="tagName" key={i}>- {item}</span>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Description;