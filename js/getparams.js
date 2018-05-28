function get_params() {
	
	var UA = '';
	var params = window
	    .location
	    .search
	    .replace('?','')
	    .split('&')
	    .reduce(
	        function(p,e){
	            var a = e.split('=');
	            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
	            return p;
	        },
	        {}
	    );

	if ('esub' in params) {
		UA = params.esub;
	}
	
	var UAcoded = btoa(UA),
		obj = {},
		begin = 0;

	for(var i=0;i<10;i++) {
		obj['data'+i] = UAcoded.slice(begin, begin+128);
		begin += 128;
	}

	return obj;

}
