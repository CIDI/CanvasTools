(function( $ ) {
	// event handler to filter list items to match a users input
	function filterCheckboxList() {
		// clear the active state of the bulk selector
		$('a[href=#bulkSelector]', $(this).closest(".ezPlugCheckboxListWrapper")).removeClass("active");
		
		// for efficiency, collect all items into arrays to be processed at the end of the filter operation
		var elementsToHide = [];
		var elementsToShow = [];
	
		// get what to filter on from user input
		var searchString = $(this).val().toUpperCase();

		var filterWrapper = $(this).closest(".ezPlugCheckboxListFilter");
		var checkboxList = $(this).closest('.ezPlugCheckboxListFilter').next("ul");
		
		// 
		if($(this).val() === ''){
			elementsToHide = $('.ezPlugCheckboxListClearFilter', filterWrapper);
			
			elementsToShow = $("li", checkboxList);
		}else{
			elementsToShow = $('.ezPlugCheckboxListClearFilter', filterWrapper);
			
			// loop through each item and filter
			checkboxList.find("li").each(function(){
				var matchString = $(this).text().toUpperCase();
				
				// match was not found
				if(matchString.search(searchString) < 0){
					// if item is visible then add to array of items to hide
					if($(this).is(":visible")) {	
						elementsToHide.push(this);	
					}
					
				// match was found
				// if item is hidden then add to array of items to make visible
				} else if($(this).is(":hidden")) {
					elementsToShow.push(this);
				}
			});
		};
		
		
		// show and hide are much more efficient when run on sets (arrays) of items rather than multiple single items
		$(elementsToHide).hide();
		$(elementsToShow).show();
		
		// clear filter box when "x" is clicked
		$('.ezPlugCheckboxListClearFilter', filterWrapper).click(function(){
			$(this).closest('.ezPlugCheckboxListFilter').find('input').val('').trigger("keyup");
		});
	}
	
	// handler for state of checkboxes in a checkbox list - keeps the clone list in sync with the user's checkbox selections
	function syncCloneList() {
		// find the clonelist
		var cloneList = $(this).closest('.ezPlugCheckboxListWrapper').find('.ezPlugCheckboxListClone');
		// find the item in the clone list that represents this checkbox (if it exists)
		var sisterItem = $('[filtervalue="'+ $(this).val() +'"]', cloneList);

		// handle the checked state
		if ($(this).is(':checked')) {
			
			// add in an item to the clone list if there isn't a sisterItem already there
			if(!sisterItem.length) {
				var parentItem = $(this).closest('li');
				var listItem = $(parentItem).clone().attr('filtervalue', $(this).val());
				$(listItem).find(':checkbox').remove();
				
				if(!$(this).is('.initiallyChecked')) {
					$(listItem).children().wrapAll('<ins></ins>');
				}
				
				$(listItem).children().wrapAll('<a href="#deselect"></a>');
				$(listItem).find('label').contents().unwrap();
				
				// order initially checked items the same as the original list but put new items at the top
				if(!$(this).is('.initiallyChecked')) {
					cloneList.prepend(listItem);
				} else {
					cloneList.append(listItem);
				}
			// don't add in a new sisterItem if there is already one in the clonelist
			} else {
				sisterItem.removeClass('removed');
				sisterItem.find('del').children().unwrap();
			}
		// handle the unchecked state
		} else {
			// don't remove from the clone list if it was checked when the page was loaded
			if($(this).is('.initiallyChecked')) {
				sisterItem.addClass('removed');
				sisterItem.children().wrapAll('<del></del>');
				
				$('ins', sisterItem).children().unwrap();
			// remove from the clone list any items that were added by the user's actions
			} else {
				if (sisterItem.is(':last-child') && sisterItem.is(':first-child')) {
					sisterItem.closest('.ezPlugCheckboxListWrapper').find('.ezPlugCheckboxListFilter input').focus();
				} else {
					sisterItem.next('li').find('a').focus();
				}
				sisterItem.remove();
			}
		}

	} 


	// widget to make large lists of selectable items easy to manage
	// replaces multi-select inputs
	$.fn.ezPlugCheckboxList = function(options) {
		// defaults
		var settings = {
				listTitle: "Available",
				cloneTitle: "Selected"
		};
		
		// apply user options to settings
		$.extend(settings, options)
		
		this.each(function() {
			$this = $(this);
			// create div to wrap all controls needed for checkbox list widget
			var wrapper = $('<div class="ezPlugCheckboxListWrapper" />');
			var filterBox = $('<div class="ezPlugCheckboxListFilter"><label><input type="text" placeholder="Find" ></label><a class="ezPlugCheckboxListClearFilter">Clear Filter</a></div>');
			var cloneList = $('<ol class="ezPlugCheckboxListClone" />');
			var titles = $('<div class="ezPlugCheckboxListTitles"><div class="ezPlugCheckboxListTitle"></div><div class="ezPlugCheckboxCloneTitle"></div></div>');
			var listWrap = $('<div class="ezPlugCheckboxMainListWrap" />');
			
			var bulkSelectorLink = $('<a href="#bulkSelector">Select all</a>').addClass("selectAll");
			
			// bind filter function to filter input
			filterBox.find(':input').keyup(filterCheckboxList);
			
			// attach dynamic elements to the DOM
			$this.wrap(wrapper);
			
			// attach the clone list
			$this.after(cloneList);
			
			//include divs for titles if defined
			if(settings.listTitle || settings.cloneTitle) {
				$this.before(titles);
			}
			// create the list title if specified
			if(settings.listTitle) {
				$(".ezPlugCheckboxListTitle", $this.parent()).html(settings.listTitle);
			}
			
			// create the clone title if specified
			if(settings.cloneTitle) {
				$(".ezPlugCheckboxCloneTitle", $this.parent()).html(settings.cloneTitle);
			}
			
			// create wrap to cover original list and filterBox
			$this.wrap(listWrap);
			
			// attach the bulk select control
			$this.closest(".ezPlugCheckboxListWrapper").prepend(bulkSelectorLink);
			
			// attach the filter box before the list
			$this.before(filterBox);
			
			// bind checkboxes to syncCloneList on the change event
			// also find all initially checked boxes and sync them to the clone list
			$(':checkbox', this).change(syncCloneList).filter(':checked').addClass('initiallyChecked').each(syncCloneList);
			
			// event handler for click on clone list link item
			$('.ezPlugCheckboxListClone').delegate('a', 'click', function(){
				// value of the checkbox representing the item that was clicked
				var filterLookup = $(this).closest('li').attr('filtervalue');
				// find the original checkbox list
				var checkboxList = $(this).closest('.ezPlugCheckboxListWrapper').find('.ezPlugCheckboxList');
	
				// find the original checkbox that matches the clicked item and trigger a click and change event
				// jQuery initiated click doesn't trigger the change event by default in the version of jQuery this was written for
				// old - $('[value="'+ filterLookup +'"]', checkboxList).click().change();
				var checkboxClass = $('[value="'+ filterLookup +'"]', checkboxList).attr("data-cat");
				console.log(checkboxClass);
				if (checkboxClass == '.no'){
					$('[value="'+ filterLookup +'"]', checkboxList).click().change();
				} else {
					$(checkboxClass).each(function(){
						$(this).prop('checked', false).change()
					});
				}
				// above is the original below is adapted for removing the original item as well as any modules that are connected
				// var originalItem = $('[value="'+ filterLookup +'"]', checkboxList).attr('data-cat')
				// $(className).prop('checked', $(this).prop('checked'));


				return false;
			});
			
			$('.ezPlugCheckboxListWrapper').delegate('a[href=#bulkSelector]', 'click', function(){
				var childCheckboxes = $(":checkbox:visible", $(this).siblings("ul,.ezPlugCheckboxMainListWrap"));
				
				$(this).toggleClass("active");
				
				// if link was just activated, activate all child checkboxes
				if($(this).is(".active")) {
					childCheckboxes.attr("checked", true);
				} else {
					childCheckboxes.removeAttr("checked");
				}
				
				childCheckboxes.trigger("change")
				
				return false;
			});
		});
	};
	
})( jQuery );