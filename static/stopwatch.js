document.addEventListener('DOMContentLoaded', () => {
	startbtn=document.getElementById('startbtn')
	resetbtn=document.getElementById('resetbtn')
	startbtn.onclick= function() {startStop()};
	resetbtn.onclick= function() {resetTime()};
	addbtn.onclick= function() {addTime()};
	
	});
// Make timer a class object and construct everything with this class on page load
// Test Block
class Timer{
	instance_number = 1;
	idGenerate(base){
	// Used to Make unique ids for Elements made.
	// Takes a base string as input and returns the base string with instance number as output
  		return (`${base}${this.base_number.toString()}`)
  	}
  	
  	makeTimer(){
  		// function makeTimeElement(){
  		// 	console.log('yes')
  		// }
  		
  		const makeTimeElement = (base) => {
  			var timeElement = document.createElement("span");
  			timeElement.id =this.idGenerate(base)
  			timeElement.textContent='00'
  			return timeElement
    	}
  		this.timer = document.createElement("h1");
		this.timer.id = this.idGenerate('timer')
		this.timer.className="text-white display-1 mx-auto"
		this.timer.append(makeTimeElement('hours'),':',makeTimeElement('minutes'),':',makeTimeElement('seconds'))
		return this.timer
  	}
	constructor(parentS,height, width) {
		this.base_number=this.instance_number
		this.instance_number+=1
  		this.parentS=parentS
    	this.height = height;
    	this.width = width;
		this.outerBox = document.createElement("div"); 
		this.outerBox.className="container-fluid mx-auto"
		this.outerBox.setAttribute("style", `width:${height};height:${height}`);

	document.querySelector('body').append(this.outerBox)
  	}



}
// End of Test Block
function resetTime(){
	document.getElementById('timer').innerHTML='<span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>'

}

function startStop(){
	function stopTimer(intervalID) {
      clearInterval(intervalID);
      startbtn.onclick= function() {startStop()};
      startbtn.innerHTML='Start'
      startbtn.setAttribute("data-state", 'stop')
      startbtn.className="btn btn-light"
    }
    
	var intervalID = window.setInterval(timeChanger,1000);
	startbtn.setAttribute("data-state", 'run')
	startbtn=document.getElementById('startbtn')
	startbtn.innerHTML='Stop'
	startbtn.className="btn btn-outline-light"
	startbtn.onclick=function() {stopTimer(intervalID)};

};
function timeChanger(addM=false){

	var chn = {'seconds':'minutes','minutes':'hours','centiseconds':'seconds'}
	function changer(change){

		sec=parseInt(document.getElementById(change).innerHTML)+1
		if (sec == 60){
			changer(chn[change])
			sec=0
		};
	document.getElementById(change).innerHTML=pad(sec,2)
	};
	if (addM==true){
		changer('minutes')
	}
	else {
	changer('seconds')
		};

	
};
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function addTime(){
	timeChanger(addM=true)

}


function playAlert(){
	var audioElement = document.getElementById('eyealert')
	audioElement.play();

  // The duration variable now holds the duration (in seconds) of the audio clip 
}
function enableCheck(){
	minutes=parseInt(document.getElementById('minutes').textContent)
	startbtn=document.getElementById('startbtn')
	timer_state=(startbtn.getAttribute("data-state")==='run')
	if (timer_state && minutes != 0 && minutes % 3 == 0){
		playAlert()

		return false
	}
	return true
	}
function eyeButtonAudioLoop(){
	// Call enableCheck every 1 minute
	var intervalID = window.setInterval(enableCheck, 60000);
	eyeButton=document.getElementById("eyeButton")
	eyeButton.onclick=function() {clearInterval(intervalID);
	enable_eye();
	};




}

function enable_eye(){
	eyeButton=document.getElementById("eyeButton")
	eyeButton.onclick=enable_eye
	pressed=(eyeButton.getAttribute("aria-pressed") === "true");

	if (!pressed){
		
		eyeButton.className = "btn btn-warning rounded-circle border border-light"; 
		eyeButtonAudioLoop()
		playAlert()
	}
	else{

		eyeButton.className = "btn btn-outline-secondary rounded-circle border border-dark"; 
	};
	eyeButton.setAttribute("aria-pressed", !pressed);
};
// End of Test Block