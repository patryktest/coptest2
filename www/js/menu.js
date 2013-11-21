function showMenu(_menu){
   var menu = _menu;
   var color = "default"
   var menuElement = $('#UDPopup .popup-screen ul');
    var htmltext = "";
    menuElement.html("");
    for(var i=0;i<menu.length;i++){
        if(menu[i].textColor != null)
            color = menu[i].textColor;
        htmltext = '<li class="menu-enable" onclick=\''+menu[i].onclick+';hideMenu();\'>\n\
                    <span class="icon-img icon-'+menu[i].icon+' icon-menu popup-icon-'+menu[i].float+'"></span>\n\
                    <span class="menu-text-'+menu[i].float+' menu-text-color-'+color+'">'+menu[i].text+'</span>\n\
                    </li>';
        menuElement.append(htmltext);
    }
   $('#UDPopup').show();
}

function hideMenu(){
    $('#UDPopup').hide();
}

function showPopup(_popup){
    var popup = _popup;
    var popupElement = $('#UDPopup .popup-screen ul');
    var htmltext = "";
    popupElement.html("");
    htmltext = '<li class="popup-text">\n\
                    <span></span>\n\
                    <span class="menu-text-'+menu[i].float+' menu-text-color-'+color+'">'+menu[i].text+'</span>\n\
                    </li>';
}