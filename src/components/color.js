import React, { Component } from 'react';
import '../App.css';

class Color extends Component {

	render() {
        const {colors} = this.props;

		return (
			<div className='color'>
				<div className="title">Color</div>
                <div className="data_categories">
					<div>   
                        Code color: #{colors.accentColor}
                    </div>
					<span className="separation"></span>
					<div>
                        Dominant Color backgroung: {colors.dominantColorBackground}
                    </div>
					<span className="separation"></span>
					<div>
                        Dominant Color foregroung: {colors.dominantColorForeground}
                    </div>
                </div>
            </div>
		);
	}
}
export default Color;