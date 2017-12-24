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

function ServerInterface(Planet){
	this.ServerURL = "http://127.0.0.1/planet-server/index.php";
	this.ConnectionFailureData = {"success":false,"error":"ERROR_CONNECTION_FAILURE"};
	this.APIKey = "3f2d3a4c-c7a4-4c3c-892e-ac43784f7381";

	this.request = function(data, callback){
		var t = this;
		data["api-key"]=this.APIKey;
		var req = $.ajax({
			type: "POST",
			url: this.ServerURL,
			data: data
		})
		.done(function(data){callback(data)})
		.fail(function(){callback(t.ConnectionFailureData)});
	};

	this.getTagManifest = function(callback){
		var obj = {"action":"getTagManifest"};
		this.request(obj,callback);
	};

	this.addProject = function(data,callback){
		var obj = {"action":"addProject","ProjectJSON":data};
		this.request(obj,callback);
	};

	this.init = function(){

	};
};