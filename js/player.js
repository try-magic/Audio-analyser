/*// создаем аудио контекст
var context = new window.AudioContext(); //
// переменные для буфера, источника и получателя
var buffer, source, destination, track;

var track = document.querySelector('audio').src; 

// функция для подгрузки файла в буфер
context.decodeAudioData(track,
    function(decodedArrayBuffer) {
      // получаем декодированный буфер
      buffer = decodedArrayBuffer;
    }, function(e) {
      console.log('Error decoding file', e);
});

// функция начала воспроизведения
var play = function(){
  // создаем источник
  source = context.createBufferSource();
  // подключаем буфер к источнику
  source.buffer = buffer;
  // дефолтный получатель звука
  destination = context.destination;
  // подключаем источник к получателю
  source.connect(destination);
  // воспроизводим
  source.start(0);
}

// функция остановки воспроизведения
var stop = function(){
  source.stop(0);
}

loadSoundFile('audio/./track.mp3');*/