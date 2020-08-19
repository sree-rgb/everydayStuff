document.addEventListener('DOMContentLoaded', () => {
	startbtn=document.getElementById('startbtn')
	resetbtn=document.getElementById('resetbtn')
	startbtn.onclick= function() {startStop()};
	resetbtn.onclick= function() {resetTime()};
	addbtn.onclick= function() {addTime()};
	
	});

function resetTime(){
	// resets time
	document.getElementById('timer').innerHTML='<span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>'

}

function startStop(){
	//Timer worker
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
