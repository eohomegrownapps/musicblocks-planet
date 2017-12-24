// Copyright (c) 2017 Euan Ong
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the The GNU Affero General Public
// License as published by the Free Software Foundation; either
// version 3 of the License, or (at your option) any later version.
//
// You should have received a copy of the GNU Affero General Public
// License along with this library; if not, write to the Free Software
// Foundation, 51 Franklin Street, Suite 500 Boston, MA 02110-1335 USA

function LocalPlanet(Planet){
	this.UserIDCookie = "UserID";
	this.UserID = null;
	this.CookieDuration = 3650;
	this.ProjectTable = null;
	this.projects = null;
	this.DeleteModalID = null;
	this.Publisher = null;

	this.prepareUserID = function(){
		var id = getCookie(this.UserIDCookie);
		if (id==""){
			id = Planet.ProjectStorage.generateID();
			setCookie(this.UserIDCookie,id,3650);
		}
		this.UserID = id;
	};
	
	this.updateProjects = function(){
		$('.tooltipped').tooltip('remove');
		this.refreshProjectArray();
		this.initCards();
		this.renderAllProjects();
		$('.tooltipped').tooltip({delay: 50});
	};

	this.refreshProjectArray = function(){
		this.projects = [];
		for (var project in this.ProjectTable){
			if (this.ProjectTable.hasOwnProperty(project)){
				this.projects.push([project,null]);
			}
		}
		var t = this;
		this.projects.sort(function(a,b){return t.ProjectTable[b[0]].DateLastModified-t.ProjectTable[a[0]].DateLastModified;});
	};

	this.initCards = function(){
		for (var i = 0; i<this.projects.length; i++){
			this.projects[i][1] = new LocalCard(Planet);
			this.projects[i][1].init(this.projects[i][0]);
		}
	};

	this.renderAllProjects = function(){
		document.getElementById("local-projects").innerHTML = "";
		for (var i = 0; i<this.projects.length; i++){
			this.projects[i][1].render();
		}
	};

	this.initDeleteModal = function(){
		var t = this;
		document.getElementById("deleter-button").addEventListener('click', function (evt) {
			if (t.DeleteModalID!=null){
				Planet.ProjectStorage.deleteProject(t.DeleteModalID);
			}
		});
	};

	this.openDeleteModal = function(id){
		this.DeleteModalID = id;
		var name = this.ProjectTable[id].ProjectName;
		document.getElementById("deleter-title").textContent = name;
		document.getElementById("deleter-name").textContent = name;
		$('#deleter').modal('open');
	};

	this.init = function(){
		this.prepareUserID();
		this.ProjectTable = Planet.ProjectStorage.data.Projects;
		this.refreshProjectArray();
		this.initDeleteModal();
		this.Publisher = new Publisher(Planet);
		this.Publisher.init();
	};
};