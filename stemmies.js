$(document).ready(function() {
	var MAX_ITEMS = 3;
	var itemDirectory = {}; // dictionary of items/locations
	var BANK_ID = '#imageBank';
	var STAGE_ID = '#playAreaSandbox';
	var TARGET_ID = '#laboratorySandbox';
	var numSelectedItems = 0;

	/*
	 * Returns true iff the number of items in the target drop zone is the maximum allowed.
	 */
	function atMaxCapacity() {
		return (numSelectedItems === MAX_ITEMS);
	}

	function loadItemsAtInit() {
		console.log(imageIdList);
		for(var i = 0; i < imageIdList.length; i++) {
			var imageId = imageIdList[i];
			setImageLocation(imageId, BANK_ID);
			//itemDirectory['#' + imageId] = BANK_ID;
		}
		console.log(itemDirectory);
	}
	loadItemsAtInit();

	function getImageLocation(imageId) {
		return itemDirectory['#' + imageId];
	}

	function setImageLocation(imageId, loc) {
		itemDirectory['#' + imageId] = loc;
	}



	$(".image").click(function(event) {
		console.log(event);
		var imageId = event.currentTarget.id;
		var currentLoc = getImageLocation(imageId);
		var isSingleClick = true;
	    var dest = determineDestination(currentLoc, isSingleClick);
	    console.log('current',currentLoc);
	    console.log('dest',dest)
	    if(currentLoc === dest) {
	    	console.log('invalid/same destination:',dest);
	    	// do nothing
	    } else if(dest === TARGET_ID && atMaxCapacity()) {
	    	alert('Only 3 items max in the laboratory!');
	    } else {
	    	moveItem(imageId, currentLoc, dest);
	    }
	    handleTargetZone();
	    console.log('number of selected items:',numSelectedItems);
	});

		$(".image").dblclick(function(event) {
		console.log(event);
		var imageId = event.currentTarget.id;
		var currentLoc = getImageLocation(imageId);
		var isSingleClick = false;
	    var dest = determineDestination(currentLoc, isSingleClick);
	    console.log('current',currentLoc);
	    console.log('dest',dest)
	    if(currentLoc === dest) {
	    	console.log('invalid/same destination:',dest);
	    	// do nothing
	    } else {
	    	moveItem(imageId, currentLoc, dest);
	    }
	    handleTargetZone();
	    console.log('number of selected items:',numSelectedItems);
	});

	function determineDestination(currentLoc, isSingleClick) {
		switch(currentLoc) {
			case BANK_ID:
				return (isSingleClick ? STAGE_ID : BANK_ID);
				break;
			case STAGE_ID:
				return (isSingleClick ? TARGET_ID : BANK_ID);
				break;
			case TARGET_ID:
				return (isSingleClick ? STAGE_ID : TARGET_ID);
				break;
			default:
				console.log("invalid source location");
				break;
		}
	}

	function moveItem(id, src, dest) {
		console.log(id,src,dest);
		var item = $("#" + id);
		//$(src).detach(item);
		item.detach();
		$(dest).append(item);
		setImageLocation(id, dest);

		if(dest === TARGET_ID) {
			numSelectedItems++;
		}
		if(src === TARGET_ID) {
			numSelectedItems--;
		}
	}

	/*
	 * Handles the logic of whether the target drop zone ought to accept/reject new images.
	 * Also changes the color of the target zone to reflect this.
	 */
	function handleTargetZone() {
		console.log('handleTargetZone');
		if(atMaxCapacity()) {
			$('#laboratory').css('background-color','#C0C0C0');
			//dropZoneDisabledAtDragStart = false;
		} else {
			$('#laboratory').css('background-color','#B6F9B6');
			//dropZoneDisabledAtDragStart = true;
		}
	}

	

	/*
	 * The target drop zone is more discerning than the sandbox.
	 * Until MAX_ITEMS items are inside, it will take any image.
	 * At MAX_ITEMS items, it will reject any images until one is taken out.
	 * Therefore we want to track how many items are inside the drop zone and which items they are.
	 */

	// when the button is clicked, log which items are in the target drop zone
	$('#check').click(function() {
		console.log('selectedItems selected:', numSelectedItems);
	});

});