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
	
	
	 // Full featured editor
    CKEDITOR.replace( 'editor', {
        height: '150px',
		customConfig: 'config-basic.js',
		removePlugins: 'elementspath'
	});
	


Dropzone.autoDiscover = false;

// Removable thumbnails
    $("#dropzone_remove").dropzone({
        paramName: "file", // The name that will be used to transfer the file
        dictDefaultMessage: 'Drop files to upload or click here',
        maxFilesize: 8, // MB
        addRemoveLinks: true
    });
	
	
	
	// Primary
    $(".control-primary").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-purple-600 text-purple-800'
    });
	
	// Default initialization
    $(".styled, .multiselect-container input").uniform({ radioClass: 'choice' });
	

    
    
});