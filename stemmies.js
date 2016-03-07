$(document).ready(function() {
	var MAX_ITEMS = 3;
	var items = [];
	var imgBeganInDropZone;
	//var dropZoneDisabledAtDragStart = false;

	function atMaxCapacity() {
		return (items.length === MAX_ITEMS);
	}

	function removeItem(id) {;
		var index = items.indexOf(id);
		if(index >= 0) {
			items.splice(index,1); // insurance - only remove items if the item is there to begin with
		}
	}

	$("#playArea").droppable({
		accept: '.image'
	});

	$('#laboratory').droppable({
		accept: '.image', // specify as drop zone for immages
		deactivate: function(event,ui) {
			console.log("deactivate",ui.draggable.context.id);
		},
		drop: function(event,ui) {
			//console.log("drop event",event);
			//console.log("drop ui",ui);
			console.log("drop dragged:", ui.draggable.context.id);
			var itemID = ui.draggable.context.id;
			items.push(ui.draggable.context.id); // add new item to list
			$("#" + itemID).draggable( "option", "revert", false );
			$("#" + itemID).addClass('selected');
			$.unique(items); // get rid of duplicates
			console.log("end of drop",items);
			handleDroppable(); // color background accordingly
		},
		out: function(event,ui) {
			console.log("accepting: .image");
			$("#laboratory").droppable( "option", "accept", ".image" );
			//console.log("out event",event);
			//console.log("out ui",ui);
			console.log("out dragged:", ui.draggable.context.id);
			var itemID = ui.draggable.context.id;
			removeItem(itemID);
			imgBeganInDropZone = true;
			$("#" + itemID).draggable( "option", "revert", false );
			$("#" + itemID).removeClass('selected');
			console.log("end of out",items);
			handleDroppable(); // color background accordingly
		},
	});

	$('.image').draggable({
		//stack: event.target.id,
		cursor: 'hand',
		revert: 'invalid',
		start: function(event,ui) {
			imgBeganInDropZone = isInDropZone($(this).attr('id'));
			//$("#laboratory").droppable("enable");
			console.log("start",items);
			handleDroppable();
		},
		drag: function(event,ui) {
			handleDroppable();
			//$(this).draggable( "option", "revert", revertOption($(this).attr('id')) );
			if(imgBeganInDropZone) {
				$(this).draggable( "option", "revert", false ); // drag this wherever you want
			} else {
				// if drop zone is at capacity, revert; else, based on validity
				$(this).draggable( "option", "revert", "invalid" );
			}
		},
		stop: function(event,ui) {
			//console.log("event",event);
			//console.log("ui",ui);
			console.log("start of stop",items);
			if(imgBeganInDropZone) {
				$(this).draggable( "option", "revert", false ); // drag this wherever you want
			} else {
				// if drop zone is at capacity, revert; else, based on validity
				$(this).draggable( "option", "revert", "invalid" );
			}
			/*
			if(dropZoneDisabledAtDragStart) {
				$("#laboratory").droppable("disable");
			}
			*/
			//console.log("stop",items);
		}
	});

	$("#check").click(function() {
		console.log("items selected:",items);
	});

	function handleDroppable() {
		console.log("handleDroppable");
		if(items.length < MAX_ITEMS) {
			console.log("accepting: .image");
			$("#laboratory").droppable( "option", "accept", ".image" );
			$("#laboratory").droppable("enable");
			$("#laboratory").css('background-color','#B6F9B6');
			//dropZoneDisabledAtDragStart = false;
		} else {
			console.log("accepting: :not(.selected)");
			$("#laboratory").droppable( "option", "accept", ".selected" );
			//$("#aboratory").droppable("disable");
			$("#laboratory").css('background-color','#C0C0C0');
			//dropZoneDisabledAtDragStart = true;
		}
		//handleImageReverts();
	}

	function isInDropZone(idName) {
		for(var i = 0; i < items.length; i++) {
			if(items[i] === idName) {
				//console.log("isInDropZone",true);
				return true;
			}
		}
		//console.log("isInDropZone",false);
		return false;
	}

	/*
	 * TODO:
	 *** How to allow images to be moved out? -> class manipulation?
	 *** How to keep track of how many images are in drop zone when images can be moved in/out?
	 *** How to tell which images are in drop zone?
	 */

});