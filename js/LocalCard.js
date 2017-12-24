function LocalCard(Planet){
	this.placeholderImage = "images/planetgraphic.png";
	this.id = null;
	this.ProjectData = null;
	this.DownloadExtension = "tb";
	this.renderData = '\
<div class="col no-margin-left s12 m6 l4"> \
	<div class="card"> \
		<a class="published-cloud tooltipped" data-position="top" data-delay="50" data-tooltip="View published project" style="display:none;" id="local-project-cloud-{ID}"><i class="material-icons small">cloud_done</i></a>\
		<div class="card-image"> \
			<img class="project-image" id="local-project-image-{ID}"> \
			<a class="btn-floating halfway-fab waves-effect waves-light orange tooltipped" data-position="top" data-delay="50" data-tooltip="Publish project" id="local-project-publish-{ID}"><i class="material-icons">cloud_upload</i></a> \
		</div> \
		<div class="card-content"> \
			<input class="card-title grey-text text-darken-4" id="local-project-input-{ID}" /> \
		</div> \
		<div class="card-action"> \
			<div class="flexcontainer"> \
				<a class="project-icon tooltipped" data-position="bottom" data-delay="50" data-tooltip="Edit project" href="#"><i class="material-icons">edit</i></a> \
				<a class="project-icon tooltipped" data-position="bottom" data-delay="50" data-tooltip="Delete project" id="local-project-delete-{ID}"><i class="material-icons">delete</i></a> \
				<div id="share-{ID}"> \
					<a class="project-icon tooltipped" data-position="bottom" data-delay="50" data-tooltip="Share project" id="local-project-share-{ID}"><i class="material-icons">share</i></a> \
					<div class="card share-card" id="sharebox-{ID}" style="display:none;"> \
						<div class="card-content shareurltext"> \
							<div class="shareurltitle">Share</div> \
							<input type="text" name="shareurl" class="shareurlinput" data-originalurl="https://walterbender.github.io/musicblocks/index.html?id={ID}"> \
							<div class="shareurl-advanced" id="advanced-{ID}"> \
								<div class="shareurltitle">Flags</div> \
								<div><input type="checkbox" name="run" id="checkboxrun-{ID}" checked><label for="checkboxrun-{ID}">Run project on startup.</label></div> \
								<div><input type="checkbox" name="show" id="checkboxshow-{ID}"><label for="checkboxshow-{ID}">Show code blocks on startup.</label></div> \
								<div><input type="checkbox" name="collapse" id="checkboxcollapse-{ID}"><label for="checkboxcollapse-{ID}">Collapse code blocks on startup.</label></div> \
							</div> \
						</div> \
						<div class="card-action"> \
							<a onclick="toggleExpandable(\'advanced-{ID}\',\'shareurl-advanced\');">Advanced Options</a> \
						</div> \
					</div> \
				</div> \
				<a class="project-icon tooltipped" data-position="bottom" data-delay="50" data-tooltip="Download project" id="local-project-download-{ID}"><i class="material-icons">file_download</i></a> \
				<a class="project-icon tooltipped" data-position="bottom" data-delay="50" data-tooltip="Merge with current project" href="#"><i class="material-icons">merge_type</i></a> \
			</div> \
		</div> \
	</div>  \
</div>';

	this.download = function(){
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(this.ProjectData.ProjectData));
		element.setAttribute('download', this.ProjectData.ProjectName+"."+this.DownloadExtension);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	this.render = function(){
		//TODO: Have a TB placeholder image specific to TB projects
		var html = this.renderData.replace(new RegExp('\{ID\}', 'g'), this.id);
		var frag = document.createRange().createContextualFragment(html);
		
		//set image
		if (this.ProjectData.ProjectImage!=null){
			frag.getElementById("local-project-image-"+this.id).src = this.ProjectData.ProjectImage;
		} else {
			frag.getElementById("local-project-image-"+this.id).src = this.placeholderImage;
		}
		
		//set input text
		frag.getElementById("local-project-input-"+this.id).value = this.ProjectData.ProjectName;
		
		var t = this;

		//set input modify listener
		frag.getElementById("local-project-input-"+this.id).addEventListener('input', function (evt) {
			Planet.ProjectStorage.renameProject(t.id,this.value);
		});

		//set delete button listener
		frag.getElementById("local-project-delete-"+this.id).addEventListener('click', function (evt) {
			Planet.LocalPlanet.openDeleteModal(t.id);
		});
		
		//set publish button listener
		frag.getElementById("local-project-publish-"+this.id).addEventListener('click', function (evt) {
			Planet.LocalPlanet.Publisher.open(t.id);
		});

		//set publish button listener
		frag.getElementById("local-project-download-"+this.id).addEventListener('click', function (evt) {
			t.download();
		});

		//set share button listener
		frag.getElementById("local-project-share-"+this.id).addEventListener('click', function (evt) {
			var s = document.getElementById("sharebox-"+t.id);
			if (s.style.display=="none"){
				if (t.ProjectData.PublishedData!=null){
					s.style.display = "initial";
					hideOnClickOutside(document.getElementById("share-"+t.id), "sharebox-"+t.id);
				} else {
					Planet.LocalPlanet.Publisher.open(t.id,true);
				}
			} else {
				s.style.display = "none";
			}
		});

		//set share checkbox listener
		frag.getElementById("checkboxrun-"+this.id).addEventListener('click', function (evt) {
			updateCheckboxes("sharebox-"+t.id);
		});
		frag.getElementById("checkboxshow-"+this.id).addEventListener('click', function (evt) {
			updateCheckboxes("sharebox-"+t.id);
		});
		frag.getElementById("checkboxcollapse-"+this.id).addEventListener('click', function (evt) {
			updateCheckboxes("sharebox-"+t.id);
		});

		//set published cloud listener
		if (this.ProjectData.PublishedData!=null){
			frag.getElementById("local-project-cloud-"+this.id).style.display = "initial";
			frag.getElementById("local-project-cloud-"+this.id).addEventListener('click', function (evt) {
				//TODO: Implement view-published-project thing
				console.log("open id "+t.id+" in global planet");
			});
		}

		document.getElementById("local-projects").appendChild(frag);
		$('.tooltipped').tooltip({delay: 50});
		updateCheckboxes("sharebox-"+t.id);
	}

	this.init = function(id){
		this.id = id;
		this.ProjectData = Planet.LocalPlanet.ProjectTable[this.id];
	}
}