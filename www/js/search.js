function searchInPrivateChat(text){
    s = new searchText(text);
}
function searchActiv(){
    if(s!=null)
        return true;
    else return false;

}
function searchText(text) {
    
    this.next = _next;
    this.prev = _prev;
    this.addhoverToActual = _addhoverToActual;
    this.actual = 0;
    this.clearResult = _clearResult;
    this.highlightActual = _highlightActual;
    
    className = "findText";


    var regex = new RegExp(text, "gi");
    $('#chatHistory p').each(function() {
        $(this).contents().filter(function() {
            return this.nodeType == 3 && regex.test(this.nodeValue);
        }).replaceWith(function() {
            return (this.nodeValue || "").replace(regex, function(match) {
                return "<span class=\"" + className + "\">" + match + "</span>";
            });
        });
    });
    
    var _result = $('.'+className);

    this.result = _result;
    
    this.highlightActual();

    function _next() {
        this.actual++;
        if (this.actual >= this.result.length)
            this.actual=0;
            
        this.highlightActual();
    }
    function _prev() {
        this.actual--;
        if (this.actual < 0)
            this.actual = this.result.length-1;
        
        this.highlightActual();
    }
    
    function _highlightActual(){
        $("html, body").animate({scrollTop: $(this.result[this.actual]).offset().top - 110}, 100);
        this.addhoverToActual();
    }
    
    function _addhoverToActual(){
        for(var i=0;i<this.result.length;i++)
            $(this.result[i]).removeClass('findText-hover');
        $(this.result[this.actual]).addClass('findText-hover');
    }
    
    function _clearResult(){
        s.result.replaceWith( s.result.html())
        this.result = [];
        this.actual =0;
    }
}