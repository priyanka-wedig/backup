$(document).ready(function() {
	/***For Menu***/
	$(".mobile-inner-header-icon").click(function(){
		$(this).toggleClass("mobile-inner-header-icon-click mobile-inner-header-icon-out");
		$(".responsive-menu-bar").toggleClass("menu-active");
		$('body').toggleClass('overflow-active');
	});  

	/**End For Menu***/
	var options = [];
	    $( '.dropdown-menu a' ).on( 'click', function( event ) {
      
        var $target = $( event.currentTarget ),
            val = $target.attr( 'id' ),
            $inp = $target.find( 'input' ),
            idx;
      
        if ( ( idx = options.indexOf( val ) ) > -1 ) {
            options.splice( idx, 1 );
            setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
        } else {
            options.push( val );
            setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
        }
        $( event.target ).blur();
         return false;
    });
});
