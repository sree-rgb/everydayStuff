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
		this.the_object = document.createElement(element_type);
		if (ele_class != ''){
			this.the_object.className=`${ele_class}`
		}

	}
	setAttribute(attributes){
		// sets the button attributes with an object.
		for (const [key, value] of Object.entries(attributes)) {
			this.the_object.setAttribute(key,value)
		}

	}
	getObject(){
		return this.the_object
	}
	getTextContent(){
		return this.the_object.textContent
	}
	setTextContent(text_content){
		this.the_object.textContent=text_content
		return true
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
	defineClick(onclick_function){
		this.the_object.onclick=onclick_function
	}
}
class CustomContainer extends CustomObject{
	constructor(container_type="div",container_class=''){
		super(container_type,container_class)

	}
	append(...args){
		this.the_object.append(...args)

	}
	getChild(childNum){
		return this.the_object.getChild(childNum)
	}
}
class CustomText extends CustomObject{
	constructor(text_type="p",text_class='',text_content=''){
		super(text_type,text_class)
		this.setTextContent(text_content)

	}


}
class TimeElementObject extends CustomText{
	constructor(ele_name,def_value,text_type="h1",text_class=''){
		super(text_type,text_class,def_value)
		this.ele_name=ele_name
		this.setAttribute({'id':ele_name})
		this.def_value=def_value
		this.current_value=def_value
	}

	setLeftElement(ele){
		// The Time value that is on the left side of this value
		// For example for seconds this is minutes, for minutes hours and so on
		this.left_ele=ele

	}
	getLeftElement(){
		// The Time value that is on the left side of this value
		// For example for seconds this is minutes, for minutes hours and so on
		return this.left_ele
	}
	getCurrentValue(){
		return this.current_value
	}
	resetToDefaultValue(){
		this.setTextContent(this.def_value)
		this.current_value=this.def_value
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
    	this.timer = new CustomContainer('h1','text-white display-1 mx-auto')
    	this.timer.setAttribute({'id':this.idGenerate('timer')})
    	this.second = new TimeElementObject(this.idGenerate('seconds'),'00','span','',start_number)
    	this.minute = new TimeElementObject(this.idGenerate('minutes'),'00','span','',start_number)
    	this.hour 	= new TimeElementObject(this.idGenerate('hours'),'00','span','',start_number)
    	this.second.resetToDefaultValue()
  		// this.timer = document.createElement("h1");
		// this.timer.id = this.idGenerate('timer')
		// this.timer.className="text-white display-1 mx-auto"
		this.timer.append(this.hour.getObject(),':',this.minute.getObject(),':',this.second.getObject())
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
  	
  	timeChanger(addM=false){


  		const t_sec=this.idGenerate('seconds')
  		const t_min=this.idGenerate('minutes')
  		const t_hours=this.idGenerate('hours')
  		const t_centiseconds=this.idGenerate('centiseconds')
		var chn = {[t_sec]:t_min,[t_min]:t_hours,[t_centiseconds]:t_sec}
  		// var chn = {this.idGenerate('seconds'):this.idGenerate('minutes'),this.idGenerate('minutes'):this.idGenerate('hours'),this.idGenerate('centiseconds'):this.idGenerate('seconds')}
  		this.changer=(change)=>{

  			sec=parseInt(document.getElementById(change).innerHTML)+1
  			if (sec == 60){
				this.changer(chn[change])
				var sec=0
			};
			document.getElementById(change).innerHTML=pad(sec,2)
  		};
  		if (addM==true){
			this.changer(this.idGenerate('minutes'))
		}
		else {
				this.changer(this.idGenerate('seconds'))
		};
  	};
}
class StopWatch extends Timer {

	makeButtonBox(width='200px'){

		this.strtbtn=new CustomButton('Start')
		this.strtbtn.setAttribute({'id':this.idGenerate('startbtn'),'data-state':"stop"})
		this.strtbtn.state_change=(new_state)=>{
			// toggles the class and data-state variable for 'start' and 'stop' states.
			if (new_state=='start'){
				this.strtbtn.setAttribute({'class':'btn btn-outline-light','data-state':"run"})
			}
			else{
				this.strtbtn.setAttribute({'class':'btn btn-light','data-state':"stop"})
			}
		}
		
		this.rstbtn=new CustomButton('Reset')
		this.rstbtn.setAttribute({'id':this.idGenerate('resetbtn')})
		this.increment1btn=new CustomButton('+1','btn-secondary btn-sm')
		this.increment1btn.setAttribute({'id':this.idGenerate('addbtn'),'type':"button"})

		this.button_box = new CustomContainer("div",'mx-auto');
		this.button_box.setAttribute({"style":`width:${width};`})
		this.button_box.append(this.strtbtn.getObject(),'\t',this.rstbtn.getObject(),'\t',this.increment1btn.getObject())
		
		this.outer_box=new CustomContainer("div",'container-fluid mx-auto');
		this.outer_box.setAttribute({'style':`width:${this.width}`})
		this.makeTimer()
		this.outer_box.append(this.timer.getObject(),this.button_box.getObject())


		// TestCode
		document.body.append(this.outer_box.getObject())
		this.strtbtn.defineClick(this.define_startStop())
		// End of test code
	}
	define_startStop(){
		return ()=>{

			var intervalID = window.setInterval(()=>{
				this.timeChanger();}
				,1000);
		}


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
	startbtn=document.getElementById('startbtn')
	startbtn.setAttribute("data-state", 'run')
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