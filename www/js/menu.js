function showMenu(_menu){
   var menu = _menu;
   var color = "default";
   var liClass = "";
   var spanClass = "";
   var menuType = 'normal';
		
   var menuElement = $('#UDPopup .popup-screen ul');
    var htmltext = "";
    menuElement.html("");
    for(var i=0;i<menu.length;i++){
        if(menu[i].textColor != null)
            color = menu[i].textColor;
		if(menu[i].liClass != null)
	   		liClass = menu[i].liClass;
   		if(menu[i].spanClass != null)
			spanClass = menu[i].spanClass;
                if(menu[i].menuType != null)
                        menuType = menu[i].menuType;
                    
        htmltext = '<li class="menu-enable '+liClass+'" onclick=\'hideMenu();'+menu[i].onclick+';\'>\n\
                    <span class="icon-img icon-'+menu[i].icon+' icon-menu popup-icon-'+menu[i].float+' '+spanClass+'"></span>\n\
                    <span class="menu-text-'+menu[i].float+' menu-text-color-'+color+'">'+menu[i].text+'</span>\n\
                    </li>';
        if(menuType=="input")
            htmltext = '<li class="menu-enable '+liClass+'">\n\
                    <span class="icon-img icon-'+menu[i].icon+' icon-menu popup-icon-'+menu[i].float+' '+spanClass+'"></span>\n\
                    <span class="menu-text-'+menu[i].float+' menu-text-color-'+color+'"><input onkeydown="if(event.keyCode ==13){hideMenu();'+menu[i].onclick+';}" type="text" id="" class="input-search-in-chat" value="" placeholder="'+menu[i].text+'"/></span>\n\
                    </li>';
        menuElement.append(htmltext);
    }
   $('#UDPopup').show();
}

function hideMenu(){
    $('#UDPopup').hide();
    if($('#chatPageTemplate .ui-li-dateinfo').css('display')=== "none")
        $('#chatPageTemplate .ui-li-dateinfo').show();
}

function showPopup(_popup){
    var popup = _popup;
    var popupElement = $('#UDPopup .popup-screen ul');
    var htmltext = "";
    popupElement.html("");
    htmltext = '<li class="popup-text popup-li">\n\
                    <span>'+popup.text+'</span>\n\
                </li>\n\
                <li class="popup-li"><a class="ok_button button" onclick="hideMenu();'+popup.ok_btn_onclick+'">'+popup.ok_btn_text+'</a></li>\n\
                <li class="popup-li"><a class="cancel_button button" onclick="hideMenu();'+popup.cancel_btn_onclick+'">'+popup.cancel_btn_text+'</a></li>';
    
    popupElement.append(htmltext);
    $('#UDPopup').show();
}