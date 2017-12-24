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

function getCookie(cname){
	//from W3Schools
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};

function setCookie(cname, cvalue, exdays) {
	//from W3Schools
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

function toggleSearch(on){
	if (on){
		document.getElementById("searchcontainer").style.display = "block";
	} else {
		document.getElementById("searchcontainer").style.display = "none";
	}
};
function toggleText(id, a, b){
	var t = document.getElementById(id).innerHTML;
	console.log(t);
	if (t.indexOf(a)!==-1){
		document.getElementById(id).innerHTML = t.replace(a, b);
	} else {
		document.getElementById(id).innerHTML = t.replace(b, a);
	}
};
function toggleExpandable(id, c){
	var d = document.getElementById(id).className;
	if (d==c+" open"){
		document.getElementById(id).className = c;
	} else {
		document.getElementById(id).className = c+" open";
	}
};
function clearSearchBar(){
	document.getElementById("global-search").value = "";
};

function hideOnClickOutside(id, other) {
	const outsideClickListener = (event) => {
		if (event.path.indexOf(id)!=-1) {
		} else {
			document.getElementById(other).style.display = "none";
			removeClickListener();
		}
	};

	const removeClickListener = () => {
		document.removeEventListener('click', outsideClickListener);
	};
	document.addEventListener('click', outsideClickListener);
};

function updateCheckboxes(id){
    var elements = document.getElementById(id).querySelectorAll('input:checked');
    var urlel = document.getElementById(id).querySelectorAll('input[type=text]')[0];
    var url = urlel.getAttribute("data-originalurl");
    for (var i = 0; i<elements.length; i++){
        url+="&"+elements[i].name+"=True";
    }
    urlel.value = url;
};

$(document).ready(function() {
	$('#publisher').modal();
	$('#deleter').modal();
	$('#projectviewer').modal();
	$('#sort-select').material_select();
	document.getElementById("global-search").addEventListener('input', function (evt) {
			if(this.value!=""){
				document.getElementById("search-close").style.display = "initial";
			} else {
				document.getElementById("search-close").style.display = "none";
			}
	});
});