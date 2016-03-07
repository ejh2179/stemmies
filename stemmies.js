$(document).ready(function() {
	var MAX_ITEMS = 3;
	var items = [];
	var imgBeganInDropZone;
	var dropZoneDisabledAtDragStart = false;

	function atMaxCapacity() {
		return (items.length === MAX_ITEMS);
	}

	function removeItem(id) {;
		var index = items.indexOf(id);
		if(index >= 0) {
			items.splice(index,1); // insurance - only remove items if the item is there to begin with
		}
	}

	$('#laboratory').droppable({
		accept: '.image', // specify as drop zone for immages
		deactivate: function(event,ui) {
			console.log("deactivate",ui.draggable.context.id);
		},
		drop: function(event,ui) {
			/*
			if(dropZoneDisabledAtDragStart) {
				$("#laboratory").droppable("disable");
			}
			*/
			//console.log("drop event",event);
			//console.log("drop ui",ui);
			console.log("drop dragged:", ui.draggable.context.id);
			var itemID = ui.draggable.context.id;
			/*
			if(atMaxCapacity() && (!(isInDropZone(itemID)))) {
				$("#" + itemID).draggable( "option", "revert", true );
			} else {
				items.push(ui.draggable.context.id); // add new item to list
				$("#" + itemID).draggable( "option", "revert", false );
				$.unique(items); // get rid of duplicates
			}
			*/
				items.push(ui.draggable.context.id); // add new item to list
				$("#" + itemID).draggable( "option", "revert", false );
				$.unique(items); // get rid of duplicates
			console.log("end of drop",items);
			handleDroppable(); // color background accordingly
		},
		out: function(event,ui) {
			//console.log("out event",event);
			//console.log("out ui",ui);
			console.log("out dragged:", ui.draggable.context.id);
			var itemID = ui.draggable.context.id;
			removeItem(itemID);
			imgBeganInDropZone = true;
			$("#" + itemID).draggable( "option", "revert", false );
			console.log("end of out",items);
			handleDroppable(); // color background accordingly
		},
	});

	/*

	function revertOption(id) {
		if(isInDropZone(id)) {
			console.log("revertOption","false");
			return false; // drag items in the drop zone wherever you want
		} else if(items.length === MAX_ITEMS) {
			console.log("revertOption",true);
			return true; // if not from drop zone and at capacity, revert to original position
		} else {
			console.log("revertOption","valid");
			return "invalid"; // if not from drop zone, revert if not dragged into the drop zone
		}
	}

	*/

	$('.image').draggable({
		//stack: event.target.id,
		cursor: 'hand',
		revert: 'invalid',
		start: function(event,ui) {
			imgBeganInDropZone = isInDropZone($(this).attr('id'));
			if(imgBeganInDropZone) {
				
			}
			//$("#laboratory").droppable("enable");
			console.log("start",items);
		},
		drag: function(event,ui) {
			//$(this).draggable( "option", "revert", revertOption($(this).attr('id')) );
			if(imgBeganInDropZone) {
				$(this).draggable( "option", "revert", false ); // drag this wherever you want
			} else {
				// if drop zone is at capacity, revert; else, based on validity
				$(this).draggable( "option", "revert", atMaxCapacity ? true : "invalid" );
			}
		},
		stop: function(event,ui) {
			//console.log("event",event);
			//console.log("ui",ui);
			console.log("start ofstop",items);
			/*
			 * CASE 1: image started in drop zone
			 *** Case 1a: image dragged out of drop zone
			 *** Case 1b: image dragged to somewhere else within drag zone (no major change)
			 * CASE 2: image started outside of drag zone
			 *** Case 2a: image dragged to somewhere outside of drag zone
			 *** Case 2b: image dragged inside of drop zone
			 */
			if(imgBeganInDropZone) {
				$(this).draggable( "option", "revert", false ); // drag this wherever you want
			} else {
				// if drop zone is at capacity, revert; else, based on validity
				$(this).draggable( "option", "revert", atMaxCapacity ? true : "invalid" );
			}
			/*
			if(dropZoneDisabledAtDragStart) {
				$("#laboratory").droppable("disable");
			}
			*/
			//console.log("stop",items);
		}
	});
/*
	$('#test').draggable({
		//stack: event.target.id,
		revert: 'valid'
	});
*/
	$("#check").click(function() {
		console.log($("#laboratory .image").length);
	});

	function handleDroppable() {
		console.log("handleDroppable");
		if(items.length < MAX_ITEMS) {
			$("#laboratory").droppable("enable");
			$("#laboratory").css('background-color','#B6F9B6');
			dropZoneDisabledAtDragStart = false;
		} else {
			$("#laboratory").droppable("disable");
			$("#laboratory").css('background-color','#C0C0C0');
			dropZoneDisabledAtDragStart = true;
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
	 * STEPH-ONLY NOTES: this is O(n*k), where k = max number of items allowable in drop zone.
	 * How can this be improved?
	 */
			/*
	function handleImageReverts() {
		var imageList = $('.image');
		for(var i = 0; i < imageList.length; i++) {
			if(isInDropZone($(imageList[i]).attr('id'))) {
				console.log($(imageList[i]).attr('id'));
				$(imageList[i]).draggable( "option", "revert", false );
			} 
			else {
				$(imageList[i]).draggable( "option", "revert", "invalid" );
			}
		}		
	}

			*/
	/*
	 * TODO:
	 *** How to allow images to be moved out? -> class manipulation?
	 *** How to keep track of how many images are in drop zone when images can be moved in/out?
	 *** How to tell which images are in drop zone?
	 */

});