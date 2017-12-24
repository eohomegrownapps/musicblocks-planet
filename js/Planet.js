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

function Planet(isMusicBlocks){
	this.LocalPlanet = null;
	this.ProjectStorage = null;
	this.ServerInterface = null;
	this.LocalStorage = window.localStorage;
	this.ConnectedToServer = null;
	this.TagsManifest = null;
	this.IsMusicBlocks = isMusicBlocks;

	this.open = function(){
		this.LocalPlanet.updateProjects();
	};

	this.saveLocally = function(data, image){
		this.ProjectStorage.saveLocally(data, image);
	};

	this.init = function(callback){
		this.ProjectStorage = new ProjectStorage(this);
		this.ProjectStorage.init();
		this.ServerInterface = new ServerInterface(this);
		this.ServerInterface.init();
		this.ServerInterface.getTagManifest(function(data){this.initPlanets(data,callback)}.bind(this));
	};

	this.initPlanets = function(tags, callback){
		if (!tags.success){
			this.ConnectedToServer = false;
		} else {
			this.ConnectedToServer = true;
			this.TagsManifest = tags.data;
		}
		this.LocalPlanet = new LocalPlanet(this);
		this.LocalPlanet.init();
		if (callback!=undefined){
			callback();
		}
	};
};