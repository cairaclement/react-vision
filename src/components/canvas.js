import React, { Component } from 'react';
import '../App.css';


class Canvas extends Component {

    componentDidUpdate = () => {
        this.draw()
    }

    componentDidMount = () => {
        this.draw()
    }

    draw = () => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.restore();
        const image = new Image();
        image.src = this.props.value;
        image.onload = () => {
            context.drawImage(image, 0, 0, this.canvasA.width, this.canvasA.height);
			if (this.props.faces[0] !== undefined) {
				for(let i = 0; i < this.props.faces.length; i++){
					this.drawLeftEye(context, i)	
					this.drawRightEye(context, i)
					this.drawEyebrowLeft(context, i)
					this.drawEyebrowRight(context, i)
					this.drawMouth(context, i)
					this.drawNose(context, i)
					this.drawFaces(context, i)
					this.addFilterMouth(context, i)
					this.addFilterRightEye(context, i)
					this.addFilterLeftEye(context, i)
				}
			};
		}
	}

	drawFaces = (context, i) => {
		context.font = "20px Roboto";
		context.fillStyle = "black";
		context.strokeStyle = "#FF0000";
		context.strokeRect(this.props.faces[i].faceRectangle.left, this.props.faces[i].faceRectangle.top, this.props.faces[i].faceRectangle.width, this.props.faces[i].faceRectangle.height);
		context.fillText(i + 1, this.props.faces[i].faceRectangle.left + 10, this.props.faces[i].faceRectangle.top - 10);
	}

    drawLeftEye = (context, i) => {
		context.fillStyle = "#FF0000";

		context.fillRect(this.props.faces[i].faceLandmarks.eyeLeftInner.x, this.props.faces[i].faceLandmarks.eyeLeftInner.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.eyeLeftBottom.x, this.props.faces[i].faceLandmarks.eyeLeftBottom.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.eyeLeftOuter.x, this.props.faces[i].faceLandmarks.eyeLeftOuter.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.eyeLeftTop.x, this.props.faces[i].faceLandmarks.eyeLeftTop.y, 4, 4);
    }
    
    drawRightEye = (context, i) => {
        context.fillStyle = "#FF0000";
		context.fillRect(this.props.faces[i].faceLandmarks.eyeRightBottom.x, this.props.faces[i].faceLandmarks.eyeRightBottom.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.eyeRightTop.x, this.props.faces[i].faceLandmarks.eyeRightTop.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.eyeRightInner.x, this.props.faces[i].faceLandmarks.eyeRightInner.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.eyeRightOuter.x, this.props.faces[i].faceLandmarks.eyeRightOuter.y, 4, 4);
    }

	drawEyebrowLeft = (context, i) => {
		context.fillStyle = "blue";
		context.fillRect(this.props.faces[i].faceLandmarks.eyebrowLeftInner.x, this.props.faces[i].faceLandmarks.eyebrowLeftInner.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.eyebrowLeftOuter.x, this.props.faces[i].faceLandmarks.eyebrowLeftOuter.y, 4, 4);
	}

	drawEyebrowRight = (context, i) => {
		context.fillStyle = "blue";
		context.fillRect(this.props.faces[i].faceLandmarks.eyebrowRightInner.x, this.props.faces[i].faceLandmarks.eyebrowRightInner.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.eyebrowRightOuter.x, this.props.faces[i].faceLandmarks.eyebrowRightOuter.y, 4, 4);
	}

	drawMouth = (context, i) => {
		context.fillStyle = "yellow";
		context.fillRect(this.props.faces[i].faceLandmarks.mouthLeft.x, this.props.faces[i].faceLandmarks.mouthLeft.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.mouthRight.x, this.props.faces[i].faceLandmarks.mouthRight.y, 4, 4);
	}

	drawNose = (context, i) => {
		context.fillStyle = "green";
		context.fillRect(this.props.faces[i].faceLandmarks.noseLeftAlarOutTip.x, this.props.faces[i].faceLandmarks.noseLeftAlarOutTip.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.noseLeftAlarTop.x, this.props.faces[i].faceLandmarks.noseLeftAlarTop.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.noseRightAlarOutTip.x, this.props.faces[i].faceLandmarks.noseLeftAlarOutTip.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.noseRightAlarTop.x, this.props.faces[i].faceLandmarks.noseLeftAlarTop.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.noseRootLeft.x, this.props.faces[i].faceLandmarks.noseRootLeft.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.noseRootRight.x, this.props.faces[i].faceLandmarks.noseRootRight.y, 4, 4);
		context.fillRect(this.props.faces[i].faceLandmarks.noseTip.x, this.props.faces[i].faceLandmarks.noseTip.y, 4, 4);
	}

	addFilterMouth = (context, i) => {
		const angle = this.getAngle(i)
		const angleRadians = angle * Math.PI / 180

		const x = this.props.faces[i].faceLandmarks.mouthLeft.x
		const y = this.props.faces[i].faceLandmarks.mouthLeft.y
		const width = (this.props.faces[i].faceLandmarks.mouthRight.x - this.props.faces[i].faceLandmarks.mouthLeft.x)
		const mouthHeight = this.props.faces[i].faceRectangle.height / 5
		const mouthHeigth = this.props.faces[i].faceRectangle.height / 17

		var imageObj1 = new Image();
		imageObj1.src = 'https://www.icone-png.com/png/24/23742.png'
		imageObj1.onload = function() {
			context.save()
			context.translate(x, y);
			context.rotate(angleRadians);
			context.drawImage(imageObj1, 0, 0 - mouthHeigth, width, mouthHeight)
			context.restore()
		}
	}

	addFilterRightEye = (context, i) => {
		var imgRightEye = new Image();
		imgRightEye.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeTiqe-2wzTF2_YH1oyNVDgFz49IkqQ6etNfoKpuQyD7v201pQ2Q"

		const width = (this.props.faces[i].faceLandmarks.eyeRightOuter.x - this.props.faces[i].faceLandmarks.eyeRightInner.x)
		const height = (this.props.faces[i].faceLandmarks.eyeRightBottom.y - this.props.faces[i].faceLandmarks.eyeRightTop.y)
		const x = this.props.faces[i].faceLandmarks.eyeRightInner.x
		const y = (this.props.faces[i].faceLandmarks.eyeRightInner.y - height) + (height/2)
		const angle = this.getAngle(i)
		const angleRadians = angle * Math.PI / 180
		console.log(angle)
		imgRightEye.onload = function() {
			context.save()
			context.translate(x, y);
			context.rotate(angleRadians);
			context.drawImage(imgRightEye, 0, 0, width, height)
			context.restore()
		}
	}

	addFilterLeftEye = (context, i) => {
		var imgLeftEye = new Image();
		imgLeftEye.src = "data:image/png;base64,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"
		const angle = this.getAngle(i)
		const angleRadians = angle * Math.PI / 180

		const width = (this.props.faces[i].faceLandmarks.eyeLeftInner.x - this.props.faces[i].faceLandmarks.eyeLeftOuter.x)
		const height = (this.props.faces[i].faceLandmarks.eyeLeftBottom.y - this.props.faces[i].faceLandmarks.eyeLeftTop.y)
		const x = this.props.faces[i].faceLandmarks.eyeLeftOuter.x
		const y = (this.props.faces[i].faceLandmarks.eyeLeftOuter.y - height) + (height/2)

		imgLeftEye.onload = function() {
			context.save()
			context.translate(x, y);
			context.rotate(angleRadians);
			context.drawImage(imgLeftEye, 0, 0, width, height)
			context.restore()
		}
	}

	getAngle = (i) => {
		const p1 = {x : this.props.faces[i].faceLandmarks.mouthLeft.x,
					y : this.props.faces[i].faceLandmarks.mouthLeft.y}
		const p2 = {x : this.props.faces[i].faceLandmarks.mouthRight.x,
					y : this.props.faces[i].faceLandmarks.mouthRight.y}

		const angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
		return angleDeg;
	}



	render() {
        const {metadata} = this.props;

		return (
            <div className="canvas">
                <canvas id="canvas" ref={canvasA => this.canvasA = canvasA} width={metadata.width} height={metadata.height}></canvas>
            </div>                        
		);
	}
}

export default Canvas;
                 
