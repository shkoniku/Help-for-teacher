let customTimer;
var TimerDefault;
var stopID;
const audio = new Audio("class-bell.mp3");
const horn = new Audio("air-horn.mp3");
const quiet = new Audio("main_sound.mp3");
var is_sound_on = false;

start();


function start(){	
	//makeCaret();
	loadStudentList();
	//showCountStudents(document.getElementById("studentList").value.split('\n').length);
	/*console.log(document.getElementsByClassName(document.getElementsByClassName("area")[0].title)[2]);
	/*document.getElementById("alternative").children[0].appendChild(document.getElementById("Работа со списком учащихся").children[0]);
	document.getElementById("alternative").lastChild.children[1].children[0].appendChild(document.getElementById("Работа со списком учащихся").children[1]);
	document.getElementById("alternative").style.display = "block";*/
	let areas = document.getElementsByClassName("area");
	for (let i=0; i < areas.length; i++){
		areas[i].onclick = function(){
			if (document.getElementById("alternative").children[0].innerHTML != document.getElementsByClassName(areas[i].title)[0].children[0].innerHTML){
				const table = document.getElementById("alternative");
				const content = document.getElementsByClassName(areas[i].title);
				table.children[0].innerHTML = document.getElementsByClassName(areas[i].title)[0].children[0].innerHTML;
				table.lastChild.children[1].children[0].innerHTML = content[0].children[1].innerHTML;
				table.lastChild.children[1].children[1].innerHTML = content[1].children[1].innerHTML;
				table.lastChild.children[1].children[2].innerHTML = "";
				table.lastChild.children[1].children[2].innerHTML += content[2].innerHTML;
				table.style.display = "block";
			}
			else{
				const table = document.getElementById("alternative");
				table.children[0].innerHTML = "";
				table.lastChild.children[1].children[0].innerHTML = "";
				table.lastChild.children[1].children[1].innerHTML = "";
				table.lastChild.children[1].children[2].innerHTML = "";
				table.style.display = "none";
			}
		}
	}
	document.getElementById("clearStudentList").onclick = clearStudentList;
	document.getElementById("saveStudentList").onclick = saveStudentList;
	document.getElementById("chooseRandomStudent").onclick = RandomStudent;
	document.getElementById("startLesson").onclick = timeWarmup;
	window.clearInterval();
	document.getElementById("stopTimer").onclick = stopTimer;
	document.getElementById("group").onclick = makeGroups;
	document.getElementById("close").onclick = closeImg;
	document.getElementById("startCustomTimer").onclick = startCustomTimer;
	document.getElementById("customTimer").value = "00:00";
	document.getElementById("Timer").value = "05:00";
	document.getElementById("Timer").disabled = true;
	document.getElementById("stopCustomTimer").onclick = stopCustomTimer;
	document.getElementById("manage_sound").onclick = onOffSound;
}


/*function showCountStudents(count){
	document.getElementById("amountStudents").hidden = false;
	document.getElementById("amountStudents").value = "Всего: " + count + " учеников";
}*/


/*function makeCaret(){
	var carets = document.getElementsByClassName("caret");
	var nest = document.getElementsByClassName("nested");
	for (let i = 0; i < carets.length; i++){
		carets[i].addEventListener("click", function(){
			if (nest[i].style.display == "none"){
				nest[i].style.display = "block";
			}
			else{
				nest[i].style.display = "none";
			}
		});
	}
}*/

function clearStudentList(){
	document.getElementById("studentList").value = "";
	document.getElementById("randomStudent").value = "Здесь будет отображен случайный ученик:\n";
	document.getElementById("groups").innerHTML = "";
	localStorage.clear();
}

function saveStudentList()
{
	let students = document.getElementById("studentList");
	localStorage.setItem("studentList", students.value);
}

function loadStudentList()
{
	let students = document.getElementById("studentList");
	students.value = localStorage.getItem("studentList");
}

function RandomStudent()
{
	let list = localStorage.getItem("studentList").split('\n');
	let textArea = document.getElementById("randomStudent");
	textArea.value ="Здесь будет отображен случайный ученик:\n" + list[Math.floor(Math.random() * list.length)];
}

function stopTimer(){
	audio.pause();
	audio.currentTime = 0;
	//clearInterval(stopID);
	clearInterval(TimerDefault);
	document.getElementById("modal").style.display = "none";
	document.getElementById("startLesson").disabled = false;
	document.getElementById("Timer").value = "05:00";
}

function timeWarmup()
{
	let listExercises = ["base.png", "arm_away.png", "cycle_by_arms.png"];
	document.getElementById("startLesson").disabled = true;	
	TimerDefault = setInterval(function(){		
		let time = Number(document.getElementById("Timer").value.split(":")[0] * 60) + Number(document.getElementById("Timer").value.split(":")[1]);								
		if (time > 0){
			time -= 1;
			let str = "";
			if (Math.floor(time/60) < 10){
				str = "0" + Math.floor(time/60);
			}
			else{
				str += Math.floor(time/60);
			}
			str += ":";
			if (Math.floor(time%60) < 10){
				str += "0" + time%60;
			}
			else{
				str += time%60;
			}					
			document.getElementById("Timer").value = str;
		}
		else{
			document.getElementById("Timer").valye = "05:00";
			clearInterval(TimerDefault);					
		}
		}, 1000);
	setTimeout(function(){
		stopID = setInterval(function(){
			document.getElementById("img").src = listExercises[Math.floor(Math.random() * listExercises.length)];
		}, 10000);
		document.getElementById("modal").style.display = "block";
		audio.play();	
	}, 300000);
	
	}

function makeGroups()
{
	document.getElementById("groups").innerHTML = "";
	let size = Number(document.getElementById("sizeGroup").value);
	let amount = Number(document.getElementById("amountGroup").value);
	let studentList = localStorage.getItem("studentList").split("\n");
	var count = Math.floor(studentList.length / amount);
	var number = Math.ceil(studentList.length / size);
	if ((amount < studentList.length) && (amount > 0)){
		for (let j = 0; j < amount; j++){
			console.log(j);
			var arr = [];
			count = Math.ceil(studentList.length / (amount - j));
			for (let i = 0; i < count; i++){
				let index = Math.floor(Math.random() * studentList.length);
				arr.push(studentList[index]);
				studentList.splice(index, 1);
			}
			makeNewGroup(arr, j + 1);
		}
	}
	else if (size){
		for (let i = 0; i < number; i++){
			var arr = [];
			for (let j = 0; j < size; j++){
				let index = Math.floor(Math.random() * studentList.length);
				arr.push(studentList[index]);
				studentList.splice(index, 1);
			}
			makeNewGroup(arr, i + 1);
		}
	}
	else{
		alert("Неверно введённые условия для построения групп");
	}
}


function makeNewGroup(partStudentList, N)
{
	const group = document.createElement("textarea");
	group.rows = "10";
	group.cols = "50";
	group.value = "Группа №" + N + "\n" + partStudentList.join("\n");
	document.getElementById("groups").appendChild(group);
}

function closeImg(){
	document.getElementById("modal").style.display = "none";
	clearInterval(stopID);
	document.getElementById("Timer").value = "05:00";
	document.getElementById("startLesson").disabled = false;	
}

function startCustomTimer(){
	document.getElementById("customTimer").disabled = true;
	customTimer = setInterval( function (){
		let time = Number(document.getElementById("customTimer").value.split(":")[0])*60 + Number(document.getElementById("customTimer").value.split(":")[1]);
		if (time > 0){
			time -= 1;
			let str = "";
			if (Math.floor(time/60) < 10){
				str = "0" + Math.floor(time/60);
			}
			else{
				str += Math.floor(time/60);
			}
			str += ":";
			if (Math.floor(time%60) < 10){
				str += "0" + time%60;
			}
			else{
				str += time%60;
			}
			document.getElementById("customTimer").value = str;
		}
		else{
			clearInterval(customTimer);
			document.getElementById("customTimer").disabled = false;
			horn.play();
		}
	}, 1000);
}

function stopCustomTimer(){
	document.getElementById("customTimer").disabled = false;
	clearInterval(customTimer);
}

function onOffSound(){
	if (is_sound_on){
		document.getElementById("manage_sound").children[0].src = "sound_image_off.png";
		quiet.pause();
		is_sound_on = false;
	}
	else{
		quiet.loop = true;
		quiet.play();
		is_sound_on = true;
		document.getElementById("manage_sound").children[0].src = "sound_image_on.png";
	}
}
