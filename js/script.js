//User Constructor
function User(id, name) {
	this.id = id;
	this.name = name;
}

//Issue Constructor
function Issue(id, type, name, sprint, createBy, assignee, description, status, tasks, comments, updatedAt, createdAt){
	this.id = id;
	this.type = type;
	this.name = name;
	this.sprint = sprint;
	this.createBy = createBy;
	this.assignee = assignee;
	this.description = description;
	this.status = status;
	this.tasks = tasks;
	this.comments = comments;
	this.updatedAt = updatedAt;
	this.createdAt = createdAt;
}

//Project constructor
function Project(id){
	this.id = id;
	this.sprints = [];
}

//Comment constructor
function Comment(id, name){
	this.id = id;
	this.name = name;
}

function Sprint(id, name){
	this.id = id;
	this.name = name;
}

var project = new Project(1, "Project1");
var adminUser = new User(1, "User1");
var issueTypes = ['feature', 'bug', 'task'];

var sprints = [];
var issues = [];
var comments = [];

var mapStatusToId = new Map();
var mapSprintsToId = new Map();
var mapIssuesToId = new Map();
var mapCommentsToId = new Map();

document.addEventListener("DOMContentLoaded", onHtmlLoaded);

function onHtmlLoaded() {
	var addSprint = document.getElementById("addSprint");
	addSprint.addEventListener("click", createSprint);
};

function initializeStatuses(){
	mapStatusToId.set(1, 'New');
	mapStatusToId.set(2, 'In progress');
	mapStatusToId.set(3, 'Feedback');
	mapStatusToId.set(4, 'Rework');
	mapStatusToId.set(5, 'Resolved');
	mapStatusToId.set(6, 'Ready for Testing');
}
initializeStatuses();

function createSprint(){	
	var modal = document.getElementById('sprintModal');
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	modal.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
    	modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}

	var createBtn = document.getElementById('createSprint');
	createBtn.onclick = function(){

		//asign a random unique id to the sprint
		var sprintId = Math.floor((Math.random() * 10000) + 1);
		//get sprint name from input box
		var sprintName = document.getElementById("sprintName").value;

		var sprint = new Sprint(sprintId, sprintName);

		//add the new sprint to the existing sprints
		sprints.push(sprint);
		//add sprint to project
		project.sprints.push(sprintId);

		displaySprints();
		modal.style.display = "none";
		//todo clear modal when closing it
	}
}

function displaySprints(){

	var sprintsList = document.getElementById('createdSprints');
	//clear the list before populating it
	sprintsList.innerHTML = "";

	for(var i = 0 ; i < sprints.length; i++){
		var sprint = sprints[i];
		var listItem = document.createElement("li");

		//button to expand the issues in the sprint
		var sprintBtn = document.createElement("button");
		sprintBtn.setAttribute('class', 'btn btn-light');
		sprintBtn.innerHTML = sprint.name;
		sprintBtn.addEventListener('click', function(){
			expandSprint(sprint.id);
		});

		//button to add new issue in sprint
		var addButton = document.createElement("button");
		addButton.setAttribute('class', 'btn icon-btn btn-success');
		addButton.innerHTML = '<span class="glyphicon btn-glyphicon glyphicon-plus img-circle text-success"></span>';
		addButton.addEventListener('click', function(){
			addIssue(sprint.id);
		});

		listItem.appendChild(sprintBtn);
		listItem.appendChild(addButton);
		listItem.setAttribute("id", sprint.id);

		sprintsList.appendChild(listItem);
	}
}

function expandSprint(sprintId){
	//display issues in sprint
	alert('Expand current sprint to display all the issues' + sprintId);
}

function addIssue(sprintId){
	alert('Open modal to add new issue' + sprintId);
}



