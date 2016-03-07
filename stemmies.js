$(document).ready(function() {
	var MAX_ITEMS = 3;
	var itemCount = 0;
	var items = [];

	$('#laboratory').droppable({
		accept: '.image', // specify as drop zone for immages
		drop: function(event,ui) {
			console.log("event",event);
			console.log("ui",ui);
			console.log(ui.draggable.context.id);
			items.push(ui.draggable.context.id); // add new item to list
			$.unique(items); // get rid of duplicates
			console.log(items);
			handleDroppable(); // color background accordingly
		}
	});

	$('.image').draggable({
		//stack: event.target.id,
		cursor: 'hand',
		revert: 'invalid',
		stop: function(event,ui) {
			console.log("event",event);
			console.log("ui",ui);
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
		if(items.length < MAX_ITEMS) {
			$("#laboratory").droppable("enable");
			$("#laboratory").css('background-color','#B6F9B6');
		} else {
			$("#laboratory").droppable("disable");
			$("#laboratory").css('background-color','#C0C0C0');
		}
		handleImageReverts();
	}

	function isInDropZone(idName) {
		for(var i = 0; i < items.length; i++) {
			if(items[i] === idName) {
				return true;
			}
		}
		return false;
	}

	/*
	 * STEPH-ONLY NOTES: this is O(n*k), where k = max number of items allowable in drop zone.
	 * How can this be improved?
	 */
	function handleImageReverts() {
		var imageList = $('.image');
		for(var i = 0; i < imageList.length; i++) {
			if(isInDropZone($(imageList[i]).attr('id'))) {
				console.log($(imageList[i]).attr('id'));
				$(imageList[i]).draggable( "option", "revert", false );
			} 
			/*
			else {
				$(imageList[i]).draggable( "option", "revert", "invalid" );
			}
			*/
		}		
	}

	/*
	 * TODO:
	 *** How to allow images to be moved out? -> class manipulation?
	 *** How to keep track of how many images are in drop zone when images can be moved in/out?
	 *** How to tell which images are in drop zone?
	 */

});