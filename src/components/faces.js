import React, { Component } from 'react';
import '../App.css';

class Faces extends Component {

	render() {
        const {faces} = this.props;

		return (
			<div className='faces'>
				<div className="title">Faces</div>
                <div className="data_faces">
					<div>
                        {
                        faces.map((item, i) => 
                            <div>
                                <div>Visage : {i + 1}</div>
                                <div className="tagName" key={i}>Gender : {item.faceAttributes.gender}</div>
                                <div className="tagName" key={i}>Age : {item.faceAttributes.age}</div>
                                <div className="separation"></div>
                                <div className="tagName" key={i}>Height : {item.faceRectangle.height}</div>
                                <div className="tagName" key={i}>Left : {item.faceRectangle.left}</div>
                                <div className="tagName" key={i}>Top : {item.faceRectangle.top}</div>
                                <div className="tagName" key={i}>Width : {item.faceRectangle.width}</div>  
                                <div className="separation"></div>                              
                            </div>
                        )}
                    </div>
                </div>
            </div>
		);
	}
}
export default Faces;