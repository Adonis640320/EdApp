/* ------------------------------------------------------------------------------
*
*  # Invoice archive
*
*  Specific JS code additions for invoice_archive.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */

$(function() {


    // Table setup
    // ------------------------------

    // Initialize
    $('.invoice-archive').DataTable({
        autoWidth: false,
        columnDefs: [
            {
                targets: 0,
				orderable: false,
				width: '10px',
            },
			{
                width: '15px',
                targets: 1
            },
            {
                visible: false,
                targets: 2
            },
            { 
                orderable: false,
                width: '150px',
                targets: 3
            },
            {
                width: '20%',
                targets: 5
            },
            {
                width: '10%',
                targets: 6
            },
            {
                width: '15%',
                targets: 4
            },
			{
                className: 'control',
                orderable: false,
                targets: 9
            },
			
        ],
		responsive: {
			details: {
				type: 'column',
				target: 9
			}
		},
        order: [[ 1, 'desc' ]],
        dom: '<"datatable-header"fl><"datatable-scroll-lg"t><"datatable-footer"ip>',
        language: {
            search: '<span>Filter:</span> _INPUT_',
            lengthMenu: '<span>Show:</span> _MENU_',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
        },
        lengthMenu: [ 25, 50, 75, 100 ],
        displayLength: 25,
        drawCallback: function ( settings ) {
            var api = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last=null;
 
            api.column(2, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr class="active border-double"><td colspan="8" class="text-semibold">'+group+'</td></tr>'
                    );
 
                    last = group;
                }
            });

            $('.select').select2({
                width: '150px',
                minimumResultsForSearch: Infinity
            });

            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        },
        preDrawCallback: function(settings) {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
            $('.select').select2().select2('destroy');
        }
    });



    // External table additions
    // ------------------------------

    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder','Type to filter...');


    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });
	
	
	
		
	// Primary
    $(".control-primary").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-purple-600 text-purple-800'
    });
	
	// Default initialization
    $(".styled, .multiselect-container input").uniform({ radioClass: 'choice' });
	

});
