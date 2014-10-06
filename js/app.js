var audioCtx = new (window.AudioContext  || window.webkitAudioContext)(),
	gainNode = audioCtx.createGain(),
	analyser = audioCtx.createAnalyser(),
	volumeDiff = 0.1,
	bufferLength = analyser.fftSize,
	dataArray = new Uint8Array(bufferLength),
	WIDTH = 600,
	HEIGHT = 150,
	source,
	drawVisual;

var	playBtn = document.querySelector('#play'),
	stopBtn = document.querySelector('#stop'),
	gainBtnUp = document.querySelector('#gainup'),
	gainBtnDown = document.querySelector('#gaindown'),
	freqBtnUp100 = document.querySelector('#frequp100'),
	freqBtnDown100 = document.querySelector('#freqdown100'),
	freqBtnUp10 = document.querySelector('#frequp10'),
	freqBtnDown10 = document.querySelector('#freqdown10'),
	freqBtnUp1 = document.querySelector('#frequp1'),
	freqBtnDown1 = document.querySelector('#freqdown1'),
	clearBtn = document.querySelector('#clear'),
	canvas = document.querySelector('#canvas'),
	canvasCtx = canvas.getContext('2d');
	
analyser.fftSize = 2048;
gainNode.connect(analyser);
analyser.connect(audioCtx.destination);

function draw() {

	drawVisual = requestAnimationFrame(draw);
	analyser.getByteTimeDomainData(dataArray);
	canvasCtx.fillStyle = '#000';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
	canvasCtx.lineWidth = 0.5;
    canvasCtx.strokeStyle = '#44DD08';
    canvasCtx.beginPath();
	var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0,
		i;
	
	for(i = 0; i < bufferLength; i++) {
   
		var v = dataArray[i] / 128.0;
		var y = v * HEIGHT/2;

		if(i === 0) {
			canvasCtx.moveTo(x, y);
		} else {
			canvasCtx.lineTo(x, y);
		}

		x += sliceWidth;
	}
	
	canvasCtx.lineTo(canvas.width, canvas.height/2);
	canvasCtx.stroke();
}

function play(){

	if (source) {
		return;
	}
	
	source = audioCtx.createOscillator();
	source.connect(gainNode);
	source.start(0);
	draw();
}

function stop(){

	if (!source) {
		return;
	}
	
	source.stop(0);
	source = null;
}

function incValue( obj, value, limit ){

	if ( obj.value < (limit || 100000) ) {
		
		obj.value += value;
		console.log(obj.name +': '+ obj.value);
	}
}

function decValue( obj, value, limit ){

	if ( obj.value >= limit ) {
		
		obj.value -= value;
		console.log(obj.name +': '+ obj.value);
	}
}

$(playBtn).click(function(){

	play();
});

$(stopBtn).click(function(){

	stop();
});

$(gainBtnUp).click(function(){

	incValue( gainNode.gain, 0.1, 1);
});

$(gainBtnDown).click(function(){

	decValue( gainNode.gain, 0.1, 0 );
});

$(freqBtnUp100).click(function(){

	incValue( source.frequency, 100);
});

$(freqBtnDown100).click(function(){

	decValue( source.frequency, 100, 100);
});

$(freqBtnUp10).click(function(){

	incValue( source.frequency, 10 );
});

$(freqBtnDown10).click(function(){

	decValue( source.frequency, 10, 10);
});

$(freqBtnUp1).click(function(){

	incValue( source.frequency, 1 );
});

$(freqBtnDown1).click(function(){

	decValue( source.frequency, 1, 1);
});

$(clearBtn).click(function(){

	source.frequency.value = 2048;
});