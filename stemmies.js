$(document).ready(function() {
	var MAX_ITEMS = 3;
	var selectedItems = [];
	//var imgBeganInDropZone;
	//var dropZoneDisabledAtDragStart = false;

	/*
	 * Returns true iff the number of items in the target drop zone is the maximum allowed.
	 */
	function atMaxCapacity() {
		return (selectedItems.length === MAX_ITEMS);
	}

	/*
	 * Removes an ID from the list of selected items, if it's there.
	 */
	function removeItem(id) {
		var index = selectedItems.indexOf(id);
		if(index >= 0) {
			selectedItems.splice(index,1); 
		}
	}

	/*
	 * Returns true iff the item with given ID is tracked as inside the drop zone.
	 */
	function isInDropZone(idName) {
		for(var i = 0; i < selectedItems.length; i++) {
			if(selectedItems[i] === idName) {
				return true;
			}
		}
		return false;
	}

	/*
	 * Handles the logic of whether the target drop zone ought to accept/reject new images.
	 * Also changes the color of the target zone to reflect this.
	 */
	function handleDroppable() {
		console.log('handleDroppable');
		if(selectedItems.length < MAX_ITEMS) {
			// if under capacity, accept any image
			console.log('accepting: .image');
			$('#laboratory').droppable( 'option', 'accept', '.image' );
			$('#laboratory').css('background-color','#B6F9B6');
			//dropZoneDisabledAtDragStart = false;
		} else {
			// if at capacity, don't accept anything more (here: accepting only what's already in the drop zone)
			console.log('accepting: :not(.selected)');
			$('#laboratory').droppable( 'option', 'accept', '.selected' );
			//$('#laboratory').droppable('disable');
			$('#laboratory').css('background-color','#C0C0C0');
			//dropZoneDisabledAtDragStart = true;
		}
	}

	/*
	 * It's really difficult to say 'don't let more than three into a single drop zone
	 * and bounce back additional images only when they're dragged into the drop zone.'
	 * As compromise, adding a sandbox for images the player is interested in but hasn't
	 * quite decided while bouncing back anything additional put into the target drop zone
	 * might serve our purposes well enough.
	 * (It also might serve to let the user narrow down their interests, e.g., if there are
	 * 20 images and they're interested in 5, while having to choose 3.)
	 */
	$('#playArea').droppable({
		accept: '.image' // specify as drop zone for images
	});

	/*
	 * The target drop zone is more discerning than the sandbox.
	 * Until MAX_ITEMS items are inside, it will take any image.
	 * At MAX_ITEMS items, it will reject any images until one is taken out.
	 * Therefore we want to track how many items are inside the drop zone and which items they are.
	 */
	$('#laboratory').droppable({
		accept: '.image', // specify as drop zone for images
		drop: function(event,ui) {
			console.log('drop dragged:', ui.draggable.context.id);
			// get the div ID of the image being dragged
			var itemID = ui.draggable.context.id;
			// add new item to list
			selectedItems.push(ui.draggable.context.id);
			// allow the image to be dragged anywhere (inside/outside of drop zones) and mark it as inside 
			$('#' + itemID).draggable('option', 'revert', false);
			$('#' + itemID).addClass('selected');
			// get rid of duplicates
			$.unique(selectedItems);
			console.log('end of drop',selectedItems);
			handleDroppable(); // color background accordingly
		},
		out: function(event,ui) {
			console.log('out dragged:', ui.draggable.context.id);
			var itemID = ui.draggable.context.id;
			// remove the item's ID from the list of "dropped" items and remove the selection marker
			removeItem(itemID);
			$('#' + itemID).removeClass('selected');
			// it's possible to move the image out and then drop it in again, so don't restrict where it can go
			$('#' + itemID).draggable( 'option', 'revert', false );
			console.log('end of out',selectedItems);
			// no matter our starting capacity we're at full now, so we can accept new images again
			// so configure (and color) the drop zone accordingly
			handleDroppable();
		},
	});

	$('.image').draggable({
		cursor: 'hand',
		revert: 'invalid', // at the start, revert if dropped on a non-droppable
		start: function(event,ui) {
			// if the image started in the drop zone, it can go anywhere
			// otherwise, allow it only to go where it's allowed (sandbox + target zone, if there's room)
			var imgBeganInDropZone = isInDropZone($(this).attr('id'));
			console.log('start',selectedItems);
			$(this).draggable('option', 'revert', imgBeganInDropZone ? false : 'invalid');
		},
		/*
		drag: function(event,ui) {
			// if the image was originally in the drop zone, let it go anywhere
			// otherwise, bounce it back if it's dropped somewhere it shouldn't be
			//$(this).draggable('option', 'revert', imgBeganInDropZone ? false : 'invalid');
		},
		stop: function(event,ui) {
			//$(this).draggable('option', 'revert', imgBeganInDropZone ? false : 'invalid');
			//console.log('event',event);
			//console.log('ui',ui);
			console.log('start of stop',selectedItems);
		}
		*/
	});

	// when the button is clicked, log which items are in the target drop zone
	$('#check').click(function() {
		console.log('selectedItems selected:',selectedItems);
	});

});