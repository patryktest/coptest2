$(function() {  
    if (user){
        window.location = '#loginPage';}  
    connect();
    initLocalStorage(); 
   /*
    * after scroll update DateInfoBar in chatPage
    */
   
   
   $(window).scroll(function(){
       if(window.location.hash=="#chatPageTemplate"){
           updateDateBar();
       }
    })
    
    $('#inputPrivateMessage').keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();
            if (!msg) {
                return;
            }
           
            commandSendPrivateMessage(msg);
        }
        ;
    });

    $('#inputGroupMessage').keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();
            if (!msg) {
                return;
            }
            
            sendGroupMessage(getActiveGroupChat(), msg);
        }
        ;
    });
    
    monitor_events();  
    renderPopupMenu();
    initPosition();
});

function initLocalStorage(){
    ls = new LocalStorage();
    $('#saveLoginCheckBox input').attr("checked",ls.checked);
    $('#loginI').val(ls.name);
    $('#passwordI').val(ls.pass);
    
}
function monitor_events() {
    $("body").on("FilterInputCreated", function(event){
        
        $('#contactListElement form a').click(function () {
            onHideMoreContacts();
        });
    
    
        $('#contactListElement form input').keyup(function(e){
            onShowMoreContacts();
            //if($('#contactListElement form input').val()==="")
            //    onHideMoreContacts();
        });
        
    });
}

/*function hideLetterDividers(){
    $('#contactListT #letterDivider').css({display:'none'});
}
function showLetterDividers(){
    $('#contactListT #letterDivider').css({display:'block'});
}*/


function isGroupUserInSelectFriend(user){
    for (var i = 0; i < selectedFriend.length; i++){
        if(user.id === selectedFriend[i])
            return true;
    }
    return false;
}

function write(msg){
    if(DEBUG_MODE)
        console.log(msg);
}
function writeInfo(msg){
    if(DEBUG_MODE)
        console.info(msg);
}
function initPosition(){
    $('.header-menu li').width(($(window).width()/4)-1.1);
}










