document.addEventListener('DOMContentLoaded', () => {
	startbtn=document.getElementById('startbtn')
	resetbtn=document.getElementById('resetbtn')
	startbtn.onclick= function() {startStop()};
	resetbtn.onclick= function() {resetTime()};
	addbtn.onclick= function() {addTime()};
	
	});
// Make timer a class object and construct everything with this class on page load
// Test Block
class CustomObject{

	constructor(element_type='div',ele_class=''){
		this.the_object = document.createElement("button");
		this.the_object.className=`${ele_class}`

	}
	setObjectAttribute(attributes){
		// sets the button attributes with an object.

	}
	getObject(){
		return this.the_object
	}
}
class CustomButton extends CustomObject {
	default_base_class='btn'
	constructor(btn_text='No Text',btn_class='btn-light'){

		super('button',`btn ${btn_class}`)
		// console.log('yippie')
		// this.the_object = document.createElement("button");

		// this.the_object.className=`${this.default_base_class} ${btn_class}`
		this.the_object.textContent=btn_text
	}
}
class Timer{
	instance_number = 1;
	idGenerate(base){
	// Used to Make unique ids for Elements made.
	// Takes a base string as input and returns the base string with instance number as output
  		return (`${base}${this.base_number.toString()}`)
  	}
  	
  	makeTimer(start_number='00'){
  		
  		const makeTimeElement = (base,start_number) => {
  			var timeElement = document.createElement("span");
  			timeElement.id =this.idGenerate(base)
  			timeElement.textContent=start_number

  			return timeElement
    	}
  		this.timer = document.createElement("h1");
		this.timer.id = this.idGenerate('timer')
		this.timer.className="text-white display-1 mx-auto"
		this.timer.append(makeTimeElement('hours',start_number),':',makeTimeElement('minutes',start_number),':',makeTimeElement('seconds',start_number))
		console.log('newversrion')
		return this.timer
  	}
	constructor(parentS,height, width) {
		this.base_number=this.instance_number
		this.instance_number+=1
  		this.parentS=parentS
    	this.height = height;
    	this.width = width;
		// this.outerBox = document.createElement("div"); 
		// this.outerBox.className="container-fluid mx-auto"
		// this.outerBox.setAttribute("style", `width:${height};height:${height}`);
  	}
}
class StopWatch extends Timer {
	makeButtonBox(width='200px',ob_class='mx-auto'){
		const makeButton = (btn_text=undefined,btn_class=undefined)=>{
			var temp_button=new CustomButton(btn_text,btn_class)
			return temp_button.getObject()
		}
		// this.strtbtn=CustomButton('Start')
		this.strtbtn=makeButton('Start')
		this.strtbtn.id=this.idGenerate('startbtn')
		this.strtbtn.setAttribute("data-state","stop");
		this.rstbtn=makeButton('Reset')
		this.rstbtn.id=this.idGenerate('resetbtn')
		this.increment1btn=makeButton('+1','btn-secondary btn-sm')
		this.increment1btn.id=this.idGenerate('addbtn')
		this.increment1btn.type="button"
		this.button_box = document.createElement("div");
		this.button_box.className =ob_class
		this.button_box.setAttribute("style",`width:${width};`)
		this.button_box.append(this.strtbtn,'\t',this.rstbtn,'\t',this.increment1btn)

		// TestCode
		document.body.append(this.button_box)
		// End of test code
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