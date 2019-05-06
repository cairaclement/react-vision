import React, { Component } from 'react';
import axios from 'axios';
import Categories from './components/categories';
import Description from './components/description';
import Color from './components/color';
import Faces from './components/faces';
import Canvas from './components/canvas';

import './App.css';

const api_key = process.env.REACT_APP_API_KEY;
const face_api_key = process.env.REACT_APP_FACE_API_KEY;

const uriBase = 'https://francecentral.api.cognitive.microsoft.com/vision/v1.0/analyze';
const faceBase = 'https://francecentral.api.cognitive.microsoft.com/face/v1.0/detect';

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			apiResult: {},
			apiFaceResult: {},
			value: '',
			isApiResult: false,
			isApiFaceResult: false			
		};
	}

	fetchDataFromApi = (event) => {
		event.preventDefault();


		axios.post(`${faceBase}?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender&subscription-key=${face_api_key}`,
			{
				url: this.state.value
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Ocp-Apim-Subscription-Key' : face_api_key,
				}
			})
			.then((res) => {
				this.setState({apiFaceResult: res.data}, () => console.log('state updated'))
				this.setState({isApiFaceResult: true})
			})
			.catch(err => console.error({err})
		)

		axios.post(`${uriBase}?visualFeatures=Categories,Description,Color&language=en`, 
			{
				url: this.state.value
			}, 
			{
				headers: {
				'Content-Type': 'application/json',
				'Ocp-Apim-Subscription-Key' : api_key
				}
			})
			.then((res) => {
				this.setState({apiResult: res.data}, () => console.log('state updated'))
				this.setState({isApiResult: true})
			})
			.catch(err => console.error({err}))
		
	}

	handleChange = event => this.setState({value: event.target.value});

	render() {
		const {apiResult, apiFaceResult , value, isApiFaceResult, isApiResult} = this.state;

		const colors = apiResult != null ? apiResult.color : null;
		const description = apiResult != null ? apiResult.description : null;
		const categories = apiResult != null ? apiResult.categories : null;
		const metadata = apiResult != null ? apiResult.metadata : null;
		const faces = apiFaceResult != null ? apiFaceResult : null;

		return (
            <div className="App">
                <form className="form_container"
                    onSubmit={this.fetchDataFromApi}>
                    <label>
                        Name:
                        <input type="text" value={value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {isApiResult && 
                    <div className="size_container_data">
						<Canvas faces={faces} value={value} metadata={metadata}/>
                        <div className="container_data">
							<Categories categories={categories}/>
                            <hr/>
                            <Description description={description} />
                            <hr/>                       
                            <Color colors={colors}/>
							<hr/> 
							{isApiFaceResult &&
								<div>
									<Faces faces={faces}  />
									<hr/> 
								</div>
							}
                        </div>
                    </div>
				} 
            </div>
        );
	}
}

export default App;

							

