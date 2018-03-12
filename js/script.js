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

var project = new Project(1, 'Project1');
var adminUser = new User(1, 'User1');
var issueTypes = ['Feature', 'Bug', 'Task'];
var statuses = ['New', 'In progress', 'Feedback', 'Rework', 'Resolved', 'Ready for Testing'];

var sprints = [];
var issues = [];
var comments = [];
var TaskIds = [];
var CommentIds = [];

document.addEventListener("DOMContentLoaded", onHtmlLoaded);

function onHtmlLoaded() {
	var addSprint = document.getElementById('addSprint');
	addSprint.addEventListener('click', createSprint);	
};

function createSprint(){
	var modal = document.getElementById('sprintModal');
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName('close')[0];
	modal.style.display = 'block';

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
    	modal.style.display = 'none';
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = 'none';
	    }
	}

	var createBtn = document.getElementById('createSprint');
	createBtn.onclick = function(){
		//assign a random unique id to the sprint
		var sprintId = Math.floor((Math.random() * 10000) + 1);
		//get sprint name from input box
		var sprintName = document.getElementById('sprintName').value;

		var sprint = new Sprint(sprintId, sprintName);

		//add the new sprint to the existing sprints
		sprints.push(sprint);
		//add sprint to project
		project.sprints.push(sprintId);
		modal.style.display = 'none';
		
		displaySprints();
	}
}

function displaySprints(){

	var sprintsDiv = document.getElementById('sprintPanel');

	for(var i = 0 ; i < sprints.length; i++){

		var sprint = sprints[i];

		var divSprintNameToggle = document.getElementById('sprintNameToggle');

		//if the sprint is new these two variables will be null
		var divClone = document.getElementById(sprint.name + sprint.id);
		var divSprintIssuesClone = document.getElementById('sprintId' + sprint.id);
		//if the current sprint exists, do not create another div for it
		if(document.getElementById(sprint.name + sprint.id) == null){

	// 		<div id="sprintNameToggle" class="panel-heading" style="display: none";>
	// 		    <h4 class="panel-title">
	// 			   <a data-toggle="collapse" href="#sprintId"></a>
	// 		    </h4>
	// 		</div>
			divClone = divSprintNameToggle.cloneNode(true);
			divClone.setAttribute('id', sprint.name + sprint.id);
			var link = divClone.getElementsByTagName('a')[0];
			link.innerHTML = sprint.name;
			link.href = '#sprintId' + sprint.id;	
			divClone.style.marginTop= '50px';
			divClone.style.display = 'flex';
			divClone.style.width = '500px';
			divClone.style.justifyContent = 'space-between';



	// 		<div id="sprintId" class="panel-collapse collapse">
	// 			<ul class="list-group">
	// 			</ul>
	// 		</div>
			var divSprintIssues = document.getElementById('sprintId');
			divSprintIssuesClone = divSprintIssues.cloneNode(true);
			divSprintIssuesClone.setAttribute('id', 'sprintId' + sprint.id);


			var addButton = document.createElement('button');
			addButton.setAttribute('class', 'btn btn-secondary');
			addButton.style.display = 'flex';
			addButton.style.borderRadius = '50px';
			addButton.innerHTML = '<span class=" btn-circle btn-sm glyphicon glyphicon-plus"></span>';
			addButton.addEventListener('click', function(){
				addIssue(sprint.id);
			});

			divClone.appendChild(addButton);	
			sprintsDiv.appendChild(divClone);
			sprintsDiv.appendChild(divSprintIssuesClone);
			
		}

		var ulElement = divSprintIssuesClone.getElementsByTagName('ul')[0];
		//display sprint issues
		ulElement.innerHTML = "";
		for(var j = 0 ; j < issues.length ; j++){
			var issue = issues[j];

			if(issue.sprint == sprint.id) {
				
				var listItem = document.createElement("li");
				listItem.issueId = issue.id;
				listItem.sprintId = sprint.id;
				listItem.addEventListener('click', openIssueDetails);
				listItem.setAttribute('class', 'list-group-item');
				listItem.appendChild(document.createTextNode(issue.name));
				ulElement.appendChild(listItem);
			}
		}
	}
}

function addIssue(sprintId){
	var issueModal = document.getElementById('issueModalSave');
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName('closeIssueSave')[0];
	issueModal.style.display = 'block';

	//When the user clicks on <span> (x), close the modal
	span.onclick = function() {
    	issueModal.style.display = 'none';
	}

	//When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == issueModal) {
	        issueModal.style.display = 'none';
	    }
	}

	var saveIssueBtn = document.getElementById('saveModalIssueCreateEdit');
	saveIssueBtn.issueModal = issueModal;
	saveIssueBtn.sprintId = sprintId;
	saveIssueBtn.addEventListener('click', storeIssueAndDisplay);	
}

function addSubtask(event){

	var issueModal = document.getElementById('issueModalAddSubtask');
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName('closeIssueSave')[0];
	issueModal.style.display = 'block';

	//When the user clicks on <span> (x), close the modal
	span.onclick = function() {
    	issueModal.style.display = 'none';
	}

	//When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == issueModal) {
	        issueModal.style.display = 'none';
	    }
	}

	var	sprintId = event.target.sprintId;
	var	parentIssueId = event.target.issueId;

	var saveIssueBtn = document.getElementById('saveModalSubtask');
	saveIssueBtn.issueModal = issueModal;
	saveIssueBtn.sprintId = sprintId;
	saveIssueBtn.parentIssueId = parentIssueId;
	saveIssueBtn.addEventListener('click', storeSubTaskIntoParentTask);
}

function storeSubTaskIntoParentTask(event){

	var parentIssueId = event.target.parentIssueId;
	var sprintId = event.target.sprintId;
	var modal = event.target.issueModal;

	var subTaskId = Math.floor((Math.random() * 10000) + 1);
	var name = modal.querySelector('#issueName').value;
	var type = 'Task';
	var description = modal.querySelector('#issueDescription').value;
	var status = 0//New;
	var tasks = [];
	var comments = [];
	var updatedAt = new Date();
	var createdAt = new Date();

							//id, 	   type, name, sprint,   createBy,     assignee,     description, status, tasks, comments, updatedAt, createdAt
	var subTask = new Issue(subTaskId, type, name, sprintId, adminUser.id, adminUser.id, description, status, tasks, comments, updatedAt, createdAt);
	issues.push(subTask);

	//get parrent issue
	var parentIssueToUpdate = getIssueById(parentIssueId);
	//add subtask to parent issue tasks
	parentIssueToUpdate.tasks.push(subTaskId);
	event.target.issueModal.style.display = 'none';
	displaySprints();
}

function storeIssueAndDisplay(event){
	saveIssue(event.target.sprintId, event.target.issueModal);
	event.target.issueModal.style.display = 'none';
	displaySprints();
}

function openIssueDetails(event){

	var issueId = event.target.issueId;
	var openedIssue = getIssueById(issueId);

	var issueModal;
	var span;
	var saveIssueBtn;
	var addCommentBtn;
	var commentsModal;
	var divCommentToggle;
	var divCommentUl;
	var divCommentsPanel;

	if(openedIssue.type === 'Task'){
		issueModal = document.getElementById('issueModalSubtaskDisplay');
		commentsModal = document.getElementById('subtaskComments');
		span = document.getElementsByClassName('closeSubtask')[0];
		saveIssueBtn = document.getElementById('saveEditModalSubtask');
		addCommentBtn = document.getElementById('addCommentTask');
		divCommentToggle = document.getElementById('subtaskCommentToggle');
		divCommentUl = document.getElementById('subtaskCommentId');
		divCommentsPanel = document.getElementById('subtaskPanelComments');

	} else { //Feature/Bug 
		issueModal = document.getElementById('issueModal');
		commentsModal = document.getElementById('issueComments');
		span = document.getElementsByClassName('closeIssue')[0];
		saveIssueBtn = document.getElementById('saveModalIssue');
		addCommentBtn = document.getElementById('addComment');
		divCommentToggle = document.getElementById('issueCommentToggle');
		divCommentUl = document.getElementById('commentId');
		divCommentsPanel = document.getElementById('issueCommentsPanel');

		var subtasks = openedIssue.tasks;
		
		if(subtasks.length > 0){
			//the Feature/Bug has subtasks
			var subtaskPanelDiv = document.getElementById('subtaskPanel');

			var issueSubtasksDiv = document.getElementById('issueSubtaskToggle');
			var divClone = issueSubtasksDiv.cloneNode(true);
			var link = divClone.getElementsByTagName('a')[0];

			var divIssueSubtasks = document.getElementById('subtaskId');
			var divIssueSubtasksClone = divIssueSubtasks.cloneNode(true);

			subtaskPanelDiv.innerHTML = "";
			subtaskPanelDiv.appendChild(divClone);
			subtaskPanelDiv.appendChild(divIssueSubtasksClone);

			var ulElement = divIssueSubtasksClone.getElementsByTagName('ul')[0];
			ulElement.innerHTML = "";
			//display Feature/Bug subtasks
			for(var i = 0 ; i < subtasks.length; i++){

				var subtaskId = subtasks[i];
				var subtask = getIssueById(subtaskId);

				var listItem = document.createElement("li");
				listItem.issueId = subtask.id;
				listItem.sprintId = subtask.sprint;
				listItem.addEventListener('click', openIssueDetails);
				listItem.setAttribute('class', 'list-group-item');
				listItem.appendChild(document.createTextNode(subtask.name));
				ulElement.appendChild(listItem);
			}
		}
	}

	var issueComments = openedIssue.comments;

	var divCommentToggleClone = divCommentToggle.cloneNode(true);
	var divCommentUlClone = divCommentUl.cloneNode(true);


	var ulElementComments = divCommentUlClone.getElementsByTagName('ul')[0];
	ulElementComments.innerHTML = "";

	for(var k = 0 ; k < issueComments.length; k++){

		var commentId = issueComments[k];
		var comment = getCommentById(commentId);
		//display issue comments
		var commentItem = document.createElement("li");
		commentItem.commentId = commentId;
		commentItem.issueId = openedIssue.id;
		//no event on comment, just display 
		//commentItem.addEventListener('click', openComment);
		commentItem.setAttribute('class', 'list-group-item');
		commentItem.appendChild(document.createTextNode(comment.name));
		ulElementComments.appendChild(commentItem);
	}

	divCommentsPanel.innerHTML = "";
	divCommentsPanel.appendChild(divCommentToggleClone);
	divCommentsPanel.appendChild(divCommentUlClone);


	// Get the <span> element that closes the modal
	issueModal.style.display = 'block';

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
    	issueModal.style.display = 'none';
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == issueModal) {
	        issueModal.style.display = 'none';
	    }
	}

	//fill fields for the issue that we just opened
	issueModal.querySelector('#issueName').value = openedIssue.name;
	issueModal.querySelector('#issueType').value = openedIssue.type;
	issueModal.querySelector('#issueDescription').value = openedIssue.description;
	issueModal.querySelector('#issueStatus').value = getStatusById(openedIssue.status);//todo modify to use ids
	issueModal.querySelector('#issueCreatedBy').value = getUserNameByUserId(openedIssue.createdBy);
	issueModal.querySelector('#issueAssignee').value = getUserNameByUserId(openedIssue.assignee);//todo modify to take username based in user id
	issueModal.querySelector('#issueUpdatedAt').value = openedIssue.updatedAt;
	issueModal.querySelector('#issueCreatedAt').value = openedIssue.createdAt;

	

	if(openedIssue.type === 'Task'){
		document.getElementById('addSubtask').disabled =true;
	} else {
		issueModal.querySelector('#issueSprintName').value = getSprintById(openedIssue.sprint);
		document.getElementById('addSubtask').disabled =false;
		var addSubtaskBtn = document.getElementById('addSubtask');
		addSubtaskBtn.issueModal = issueModal;
		addSubtaskBtn.sprintId = event.target.sprintId;
		addSubtaskBtn.issueId = event.target.issueId;
		addSubtaskBtn.addEventListener('click', addSubtask);	
	}

	addCommentBtn.issueModal = issueModal;
	addCommentBtn.sprintId = event.target.sprintId;
	addCommentBtn.issueId = event.target.issueId;
	addCommentBtn.addEventListener('click', addComment);

	saveIssueBtn.issueModal = issueModal;
	saveIssueBtn.sprintId = event.target.sprintId;
	saveIssueBtn.issueId = event.target.issueId;
	saveIssueBtn.addEventListener('click', editIssue);
}

function saveIssue(sprintId, issueModal){
	var name = issueModal.querySelector('#issueName').value;
	var type = issueModal.querySelector('#issueType').value;
	var description = issueModal.querySelector('#issueDescription').value;
	var status = issueModal.querySelector('#issueStatus').value;
	var tasks = [];
	var comments = [];
	var updatedAt = new Date();
	var createdAt = new Date();

	var issueId = Math.floor((Math.random() * 10000) + 1);
						//id, 	   type, name, sprint,   createBy,     assignee,     description, status, tasks, comments, updatedAt, createdAt
	var issue = new Issue(issueId, type, name, sprintId, adminUser.id, adminUser.id, description, 0, tasks, comments, updatedAt, createdAt);
	issues.push(issue);
}

function editIssue(event){

	var issueId = event.target.issueId;
	var sprintId = event.target.sprintId;
	var issueModal = event.target.issueModal;

	var name = issueModal.querySelector('#issueName').value;
	var type = issueModal.querySelector('#issueType').value;
	var sprint = issueModal.querySelector('#issueSprintName').value;

	var assigneeId = issueModal.querySelector('#issueAssignee').value;
	var description = issueModal.querySelector('#issueDescription').value;
	var status = issueModal.querySelector('#issueStatus').value;

	//if it is a feature/bug and the status is changed to Resolved, save the issue with the status Ready for Testing
	if(status === 'Resolved' && ( type === 'Bug' ||  type === 'Feature')){
		status = 'Ready for Testing';
	}

	var updatedAt = new Date();

	var existingIssue = getIssueById(issueId);
	var existingIssueSubtasks = existingIssue.tasks;

	if(status !== getStatusById(existingIssue.status)){
		//status of issue changed so we want to update all it's tasks with the same status
		var newStatus = getStatusId(status);
		
		for(var i = 0 ; i < existingIssueSubtasks.length ; i++){
			var task = getIssueById(existingIssueSubtasks[i]);
			task.status = newStatus;
		}
	}

	//if the issue is moved to another sprint
	//move all the subtasks to that sprint
	if(existingIssue.sprint !== getSprintId(sprint)){
		existingIssue.sprint = getSprintId(sprint);
		for ( s = 0 ; s < existingIssueSubtasks.length ; s++){
			getIssueById(existingIssueSubtasks[s]).sprint = getSprintId(sprint);
		}
	}

	if(existingIssue){
		existingIssue.name = name;
		existingIssue.type = type;
		existingIssue.assignee = assigneeId;
		existingIssue.description = description;
		existingIssue.status = getStatusId(status);
		existingIssue.updatedAt = updatedAt;
		alert('Updated');
		issueModal.style.display = 'none';
	} else {
		alert('Something went wrong');
	}

	displaySprints();
}

function addComment(event){
	var commentModal = document.getElementById('commentModal');
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName('closeComment')[0];
	commentModal.style.display = 'block';

	//When the user clicks on <span> (x), close the modal
	span.onclick = function() {
    	commentModal.style.display = 'none';
	}

	//When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == commentModal) {
	        commentModal.style.display = 'none';
	    }
	}

	var addCommentBtn = document.getElementById('createComment');
	addCommentBtn.commentModal = commentModal;
	addCommentBtn.issueId = event.target.issueId;
	addCommentBtn.sprintId = sprintId;
	addCommentBtn.addEventListener('click', saveComment);
}

function saveComment(event){
	var commentModal = event.target.commentModal;

	var parrentIssueId = event.target.issueId;
	var parrentIssue = getIssueById(parrentIssueId);
	var parrentIssueComments = parrentIssue.comments;
	
	var text = commentModal.querySelector('#commentText').value;

	var commentId = Math.floor((Math.random() * 10000) + 1);
	var comment = new Comment(commentId, text);

	comments.push(comment);
	parrentIssueComments.push(commentId);
	commentModal.style.display = 'none';
}

function getIssueById(issueId){
	for(var i = 0 ; i < issues.length; i++){
		if(issueId == issues[i].id){
			return issues[i];
		}
	}
	return null;
}

function getUserNameByUserId(userId){
	//we only have one user
	return adminUser.name;
}

function getStatusById(statusId){
	return statuses[statusId];
}

function getStatusId(status){
	for(var i = 0 ; i < statuses.length; i++){
		if(statuses[i] === status){
			return i;
		}
	}
}

function getSprintById(sprintId){
	for(var i = 0 ; i < sprints.length; i++){
		if(sprintId == sprints[i].id){
			return sprints[i].name;
		}
	}
}

function getSprintId(sprintName){
	for(var i = 0 ; i < sprints.length; i++){
		if(sprintName == sprints[i].name){
			return sprints[i].id;
		}
	}
}

function getCommentById(commentId){
	for(var i = 0 ; i < comments.length; i++){
		if(commentId == comments[i].id){
			return comments[i];
		}
	}
}

