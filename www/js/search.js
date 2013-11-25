function searchInPrivateChat(text){
	var _result = $('#chatHistory p:contains('+text+')');
	
	this.result = _result;
	this.next = _next;
	this.prev = _prev;
	this.actual = 0;
	
	function _next(){
		if(this.actual<this.result.length)
			this.actual++;
		$("html, body").animate({scrollTop: $(this.result[this.actual]).offset().top-110}, 100);
	}
	function _prev(){
		if(this.actual>1)
			this.actual--;
		$("html, body").animate({scrollTop: $(this.result[this.actual]).offset().top-110}, 100);
	}
}