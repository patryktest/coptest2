function searchInPrivateChat(text){
    if(typeof searchResult != 'undefined' && searchResult!=null)
        searchResult.clearResult();
    searchResult = new searchText(text);
    showSearchToolBar(text);
    
}

function showSearchToolBar(text){
    $('.header-main-part').hide();
    $('.header-search-bar').show();
    $("#searchBarT span").text(searchResult.result.length);
    $("#searchBarT .search-bar-result").text(text);
    
    
}
function hideSearchToolBar(){
    $('.header-main-part').show();
    $('.header-search-bar').hide();
    
}
function searchPrev(){
    if(typeof searchResult != 'undefined'){
        searchResult.prev();
    }
}
function searchNext(){
    if(typeof searchResult != 'undefined'){
        searchResult.next();
    }
}
function searchClose(){
    hideSearchToolBar();
    if(typeof searchResult != 'undefined' && searchResult!=null){
        searchResult.clearResult();
        searchResult = null;
    }
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
        $("html, body").animate({scrollTop: $(this.result[this.actual]).offset().top - $("#chatPageTemplate .ui-header").height()}, 100);
        this.addhoverToActual();
    }
    
    function _addhoverToActual(){
        for(var i=0;i<this.result.length;i++)
            $(this.result[i]).removeClass('findText-hover');
        $(this.result[this.actual]).addClass('findText-hover');
    }
    
    function _clearResult(){
        this.result.replaceWith( this.result.html())
        this.result = [];
        this.actual =0;
    }
}