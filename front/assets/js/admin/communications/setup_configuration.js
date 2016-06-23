/* ------------------------------------------------------------------------------
*
*  # Form layouts
*
*  Specific JS code additions for form layouts pages
*
*  Version: 1.0
*  Latest update: Mar 10, 2016
*
* ---------------------------------------------------------------------------- */

$(function() {

    // Floating labels
    // ------------------------------

    // Variables
    var onClass = "on";
    var showClass = "is-visible";


    // Setup
    $("input:not(.token-input):not(.bootstrap-tagsinput > input), textarea, select").on("checkval change", function () {

        // Define label
        var label = $(this).parents('.form-group-material').children(".control-label");

        // Toggle label
        if (this.value !== "") {
            label.addClass(showClass);
        }
        else {
            label.removeClass(showClass).addClass('animate');
        }

    }).on("keyup", function () {
        $(this).trigger("checkval");
    }).trigger("checkval").trigger('change');


    // Remove animation on page load
    $(window).on('load', function() {
        $(".form-group-material").children('.control-label.is-visible').removeClass('animate');
    });
	
	$('.daterange-single').daterangepicker({ 
        singleDatePicker: true
    });
	
	

	


    
    
});