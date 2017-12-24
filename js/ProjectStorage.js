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

function ProjectStorage(Planet){
	this.defaultProjectName = _("My Project");
	this.LocalStorage = null;
	this.data = null;
	this.LocalStorageKey = "ProjectData";

	this.generateID = function(){
		var n = Date.now();
		var prefix = n.toString();
		var suffix = ""
		for (var i = 0; i<3; i++){
			suffix+=Math.floor(Math.random()*10).toString();
		}
		return prefix+suffix;
	};

	this.saveLocally = function(data, image){
		if (this.data.CurrentProject===undefined){
			this.initialiseNewProject();
		}
		var c = this.data.CurrentProject;
		this.data.Projects[c].ProjectData = data;
		this.data.Projects[c].ProjectImage = image;
		this.data.Projects[c].DateLastModified = Date.now();
		this.save();
	};

	this.initialiseNewProject = function(name,data,image){
		if (name===undefined){
			name=this.defaultProjectName;
		}
		if (data===undefined){
			data=null;
		}
		if (image===undefined){
			image=null;
		}
		var c = this.generateID();
		this.data.CurrentProject = c;
		this.data.Projects[c]={};
		this.data.Projects[c].ProjectName = name;
		this.data.Projects[c].ProjectData = data;
		this.data.Projects[c].ProjectImage = image;
		this.data.Projects[c].PublishedData = null;
		this.data.Projects[c].DateLastModified = Date.now();
		this.save();
	};

	this.renameProject = function(id, name){
		this.data.Projects[id].ProjectName = name;
		this.save();
	};

	this.addPublishedData = function(id, data){
		this.data.Projects[id].PublishedData = data;
		this.save();
	};

	this.deleteProject = function(id){
		delete this.data.Projects[id];
		this.save();
		Planet.LocalPlanet.updateProjects();
	};

	this.getCurrentProjectID = function(){
		return this.data.CurrentProject;
	};

	//Ancillary Functions

	this.set = function(key, obj){
		var jsonobj = JSON.stringify(obj);
		this.LocalStorage.setItem(key,jsonobj);
	};

	this.get = function(key){
		var jsonobj = this.LocalStorage.getItem(key);
		if (jsonobj===null||jsonobj===""){
			return null;
		}
		try {
			return JSON.parse(jsonobj);
		} catch (e){
			console.log(e);
			return null;
		}
	};

	this.save = function(){
		this.set(this.LocalStorageKey,this.data);
	};

	this.restore = function(){
		this.data = this.get(this.LocalStorageKey);
	};

	this.initialiseStorage = function(){
		this.data = {};
		this.data.Projects = {};
		this.data.DefaultCreatorName = "anonymous";
		this.save();
	};

	this.getDefaultCreatorName = function(){
		return this.data.DefaultCreatorName;
	};

	this.init = function(){
		this.LocalStorage = Planet.LocalStorage;
		this.restore();
		if (this.data===null){
			this.initialiseStorage();
		}
	};
};