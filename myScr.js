document.querySelector("#mybtn").addEventListener('click',async() =>{
	port = await navigator.serial.requestPort();
	await port.open({baudRate: 115200 });
	const textDecoder =  new TextDecoderStream();
	const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
	const reader = textDecoder.readable.getReader();
	
	while(true){
	const {value,done } = await reader.read();
    if(done){
		reader.releaseLock();
		break;
	}
	console.log(value);
	}
	
});
function runSpeechRecognition() {
		        // get output div reference
		        var output = document.getElementById("output");
		        // get action element reference
		        var action = document.getElementById("action");
                // new speech recognition object
                var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                var recognition = new SpeechRecognition();
				recognition.lang = 'ar';

            
                // This runs when the speech recognition service starts
                recognition.onstart = function() {
                    action.innerHTML = "<small>listening, please speak...</small>";
                };
                
                recognition.onspeechend = function() {
                    action.innerHTML = "<small>stopped listening, hope you are done...</small>";
                    recognition.stop();
                }
              
                // This runs when the speech recognition service returns result
                recognition.onresult = function(event) {
                    var transcript = event.results[0][0].transcript;
                    output.innerHTML =  transcript;
                    output.classList.remove("hide");
					
					if (transcript == "يمين"){
						console.log(transcript);
					send("right"); }
						else if (transcript == "يسار"){
							console.log(transcript);
						send("left"); }
                };
              
                 // start recognition
                 recognition.start();
	        }
			
			async function send(text){
				const textEncoder = new TextEncoderStream();
				const writableStreamClosed= textEncoder.readable.pipeTo(port,writable);
				const writer = textEncoder.writable.getWriter();
				await writer.write(text);
				writer.close();
				await writableStreamClosed;
			}