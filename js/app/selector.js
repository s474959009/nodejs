define(function() {
	function query(selector) {
		var s = selector;
		document.getElementById(s).style.background = "#f00";
	}
	
	return query;
});
