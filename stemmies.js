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
			items.push(ui.draggable.context.id);
			$.unique(items);
			console.log(items);
            handleDroppable(); // color background accordingly
        }
	});

	$('.image').draggable({
		//stack: event.target.id,
		cursor: 'hand',
		revert: 'invalid'
	});

	$('#test').draggable({
		//stack: event.target.id,
		revert: 'valid'
	});

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
	}

	/*
	 * TODO:
	 *** How to allow images to be moved out? -> class manipulation?
	 *** How to keep track of how many images are in drop zone when images can be moved in/out?
	 *** How to tell which images are in drop zone?
	 */

});