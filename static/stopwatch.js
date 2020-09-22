document.addEventListener('DOMContentLoaded', () => {
	startbtn=document.getElementById('startbtn')
	resetbtn=document.getElementById('resetbtn')
	startbtn.onclick= function() {startStop()};
	resetbtn.onclick= function() {resetTime()};
	addbtn.onclick= function() {addTime()};

	//Disabling html body to test new class based stopwatch
	const raw_timer=document.getElementById('raw_timer')
	const raw_eye=document.getElementById('raw_eye')
	raw_timer.setAttribute('style','display:none;')
	raw_eye.setAttribute('style','display:none;')
	//End of Disabling

	Home_timer=new StopWatch('#Home','500px;','200px;')
	Home_timer.addToParent()
	Home_timer.displayEyeAlertsrc()
	});
// Make timer a class object and construct everything with this class on page load

// Objects Block
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
	getAttribute(attribute){
		return this.the_object.getAttribute(attribute)
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
	addClass(class_name){
		var current_class=this.the_object.className
		this.the_object.className=`${current_class} ${class_name}`
	}
}
class CustomButton extends CustomObject {
	default_base_class='btn'
	constructor(btn_text='No Text',btn_class='btn-light'){

		super('button',`btn ${btn_class}`)


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
//Important variable .Somehow assigining it inside class doesnt work. Accessed from timer constructor
Timer_instance_number=1
class AlertSound extends CustomObject{
	constructor(audio_src){
		super('audio')
		this.source_file=document.createElement('source')
		this.source_file.setAttribute('src',`${audio_src}`)
		this.the_object.append(this.source_file)
	}
	playAlert(){
		this.the_object.play()
	}
	getSource(){
		return this.source_file.src
	}
	changeSource(audio_src){
		this.source_file.setAttribute('src',`${audio_src}`)
	}
}

class Timer{
	idGenerate(base){
	// Used to Make unique ids for Elements made.
	// Takes a base string as input and returns the base string with instance number as output
  		return (`${base}${this.base_number.toString()}`)
  	}
  	makeTopBar(){
  		this.top_bar=new CustomContainer('ul','list-group list-group-horizontal-sm  text-white mx-auto')

  	}
  	getTopBarButton(){
  		var thebutton=new CustomButton('','btn-outline-secondary rounded-circle border border-secondary')
  		thebutton.state_change=(state)=>{
			thebutton.setAttribute({'class':(state=='on')? 'btn btn-secondary rounded-circle border border-secondary':' btn btn-outline-secondary rounded-circle border border-secondary'})
		}

		return thebutton
  	}
  	getTopBarListItem(){
  		return new CustomContainer('li','list-group-item bg-dark')

  	}

  	makeEyeTracker(){
		this.eye_button=this.getTopBarButton()
		this.eye_button.the_object.innerHTML='&#128065;'
		this.eye_button.setAttribute({'id':this.idGenerate('eyeButton'),'type':'button','aria-pressed':'false'})
		this.alert_eye=new AlertSound("uploads/alert1.wav")
		this.alert_eye.setAttribute({'id':this.idGenerate('eyealert')})
		this.eye_button.defineClick(this.define_eyeclick())
		this.eye_list=this.getTopBarListItem()
		this.eye_list.append(this.eye_button.getObject(),this.alert_eye.getObject())
		this.top_bar.append(this.eye_list.getObject())
		// this.top_bar.append(this.eye_button.getObject(),this.alert_eye.getObject())
	}
	define_eyeclick(){
		//needs to defined in stopwatch instead
		return ()=>{
			var alert_func = ()=>{
				var temp_min=parseInt(this.minute.getTextContent())
				if (temp_min != 0 && (temp_min%3)==0 && this.is_running()){
				this.alert_eye.playAlert()
			}
				
			}
			this.eye_button.state_change('on')
			var intervalID = window.setInterval(alert_func, 60000);
			this.alert_eye.playAlert()
			this.eye_button.defineClick(()=>{
				clearInterval(intervalID);
				this.eye_button.defineClick(this.define_eyeclick())
				this.eye_button.state_change('off')
			})
		}
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
		this.timer.append(this.hour.getObject(),':',this.minute.getObject(),':',this.second.getObject())
  	}

	constructor(parentS,height, width) {
		// Timer_instance_number accessed from outside
		// not really using height
		this.base_number=self.Timer_instance_number
		self.Timer_instance_number=self.Timer_instance_number+1

  		this.parentS=parentS
    	this.height = height;
    	this.width = width;
  	}
  	resetTimer(){
  		this.second.resetToDefaultValue();
  		this.minute.resetToDefaultValue();
  		this.hour.resetToDefaultValue();

  	}
  	
  	timeChanger(addM=false){
  		// Could be improved by using getLeftElement method

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
			document.getElementById(change).innerHTML=this.pad(sec,2)
  		};
  		if (addM==true){
			this.changer(this.idGenerate('minutes'))
		}
		else {
				this.changer(this.idGenerate('seconds'))
		};
  	};
  	pad(n, width, z) {
  		z = z || '0';
  		n = n + '';
  		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}
}
class StopWatch extends Timer {
	addToParent(){
  		// Many function used to add the object to parent 
  		this.makeButtonBox()
  		parent=document.querySelector(this.parentS)
  		parent.append(this.outer_box.getObject())
  	}
  	make50timeout(){
  		this.timeout50=this.getTopBarButton()
  		this.timeout50.setTextContent('50')
  		this.timeout50.setAttribute({'id':this.idGenerate('timeout50Button'),'type':'button','aria-pressed':'false'})
  		this.alert_timeout50=new AlertSound("static/Store_Door_Chime-Mike_Koenig3.wav")
		this.alert_timeout50.setAttribute({'id':this.idGenerate('timeout50alert')})
		this.timeout50.defineClick(this.define_50timeoutclick())
		this.timeout50list=this.getTopBarListItem()
		this.timeout50list.append(this.timeout50.getObject(),this.alert_timeout50.getObject())
		this.top_bar.append(this.timeout50list.getObject())
  	}
  	define_50timeoutclick(){
  		// this and alerteye could be replaced with one single function
  		
  		return ()=>{
  		var alert_func2 = ()=>{
			var temp_min=parseInt(this.minute.getTextContent())
			if (temp_min == 50 && this.is_running()){
			this.alert_timeout50.playAlert()
			}
		}
		this.timeout50.state_change('on')
			var intervalID = window.setInterval(alert_func2, 30000);
			this.alert_timeout50.playAlert()
			this.timeout50.defineClick(()=>{
				clearInterval(intervalID);
				this.timeout50.defineClick(this.define_50timeoutclick())
				this.timeout50.state_change('off')
			})
		}


  	}

	makeButtonBox(width='17em;'){

		this.strtbtn=new CustomButton('Start')
		this.strtbtn.setAttribute({'id':this.idGenerate('startbtn'),'data-state':"stop"})
		this.strtbtn.addClass('spaceButtons')
		this.strtbtn.state_change=(new_state)=>{
			// toggles the class and data-state variable for 'start' and 'stop' states.
			if (new_state=='run'){
				this.strtbtn.setAttribute({'class':'btn btn-outline-light spaceButtons','data-state':"run"})
				this.strtbtn.setTextContent('Stop')
			}
			else{
				this.strtbtn.setAttribute({'class':'btn btn-light spaceButtons','data-state':"stop"})
				this.strtbtn.setTextContent('Start')
			}
		}
		
		this.rstbtn=new CustomButton('Reset')
		this.rstbtn.setAttribute({'id':this.idGenerate('resetbtn')})
		this.rstbtn.addClass('spaceButtons')
		this.increment1btn=new CustomButton('+1','btn-secondary btn-sm')
		this.increment1btn.setAttribute({'id':this.idGenerate('addbtn'),'type':"button"})

		this.button_box = new CustomContainer("div",'mx-auto');
		this.button_box.setAttribute({"style":`width:${width};`})
		this.button_box.append(this.strtbtn.getObject(),'\t',this.rstbtn.getObject(),'\t',this.increment1btn.getObject())
		
		this.outer_box=new CustomContainer("div",'container-fluid mx-auto');
		// this.outer_box.setAttribute({'style':`width:500px;`})
		this.outer_box.setAttribute({'style':`width:25.7em;`})
		this.makeTimer()
		// Makes,makes eye tracker from super class,timeout50 from this class and appends top bar to outerbox.
		//This portion could be later modified to add it only to main page
		this.makeTopBar()
		this.makeEyeTracker()
		this.make50timeout()
		this.outer_box.append(this.top_bar.getObject())
		// End of making eye tracker.

		//outer_box is the final stopwatch object with everything
		this.outer_box.append(this.timer.getObject(),this.button_box.getObject())

		//defining button actions
		this.strtbtn.defineClick(this.define_startStop())
		this.rstbtn.defineClick(this.define_reset())
		this.increment1btn.defineClick(this.addM())
		//End of defining button actions


	}
	define_startStop(){
		return ()=>{

			var intervalID = window.setInterval(()=>{
				this.timeChanger();}
				,1000);
			this.strtbtn.state_change('run')
			this.strtbtn.defineClick(()=>{
				clearInterval(intervalID)
				this.strtbtn.state_change('stop')
				this.strtbtn.defineClick(this.define_startStop())

			})
		}


	}
	define_reset(){
		return ()=>{
			this.resetTimer()
		}

	}
	is_running(){
		return (this.strtbtn.getAttribute('data-state')=='run')
	}
	addM(){
		// add minutes with time changer
		return ()=>{
			this.timeChanger(true)
		}
	}
	//Temp way to change eye alert file name
	displayEyeAlertsrc(){
		var filename=''
		filename=this.alert_eye.getSource()
		filename=filename.split('/')
		filename=filename[filename.length-1]
		document.getElementById('eyeAlertSrcInput').value=filename
		document.getElementById('eyeSave').onclick=()=>{
			var temp_filename = document.getElementById('eyeAlertSrcInput').value
			temp_filename='uploads/'+temp_filename
			this.changeEyeAlertsrc(temp_filename)
		}
	}
	changeEyeAlertsrc(src){
		this.alert_eye.changeSource(src)

	}
	//End of eye alert filename
}

class theModal{
	//Not yet Implemented
	constructor(){

	}

}

// End of Objects Block
