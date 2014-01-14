$(function() {
    if (user) {
        window.location = '#loginPage';
    }

    initLocalStorage();
    connect();
    init_events();
    renderPopupMenu();
    initPosition();
});



function initLocalStorage() {
    ls = new LocalStorageObject();
    //$('#saveLoginCheckBox input').attr("checked",ls.checked);
    $('#loginI').val(ls.name);
    $('#passwordI').val(ls.pass);

}
function init_events() {
    /*
     * after scroll update DateInfoBar in chatPage
     */


    $(window).scroll(function() {
        if (window.location.hash == "#chatPageTemplate") {
            updateDateBar();
        }
    })

    /*
     *  chat send input
     */
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
    
    /*
     *  group chat send input
     */
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
    
    $("body").on("FilterInputCreated", function(event) {

        $('#contactListElement form a').click(function() {
            onHideMoreContacts();
        });


        $('#contactListElement form input').keyup(function(e) {
            onShowMoreContacts();
            //if($('#contactListElement form input').val()==="")
            //    onHideMoreContacts();
        });

    });

    document.addEventListener("backbutton", function(e) {
        if ($.mobile.activePage.is('#mainPage') || $.mobile.activePage.is('#loginPage')) {
            e.preventDefault();
            ls.setAutoLogin(true);
            navigator.app.exitApp();
        }
        else {
            //navigator.app.backHistory()
        }
    }, false);

    $(document).on('pageshow', '#chatPageTemplate', function() {
        resizeSendBar('#chatPageTemplate');
    });
    $(document).on('pageshow', '#groupChatPageTemplate', function() {
        resizeSendBar('#groupChatPageTemplate');
    });
    document.addEventListener("deviceready", deviceTypeInitEvent, false);

}

/*function hideLetterDividers(){
 $('#contactListT #letterDivider').css({display:'none'});
 }
 function showLetterDividers(){
 $('#contactListT #letterDivider').css({display:'block'});
 }*/


function isGroupUserInSelectFriend(user) {
    for (var i = 0; i < selectedFriend.length; i++) {
        if (user.id === selectedFriend[i])
            return true;
    }
    return false;
}

function write(msg) {
    if (DEBUG_MODE)
        console.log(msg);
}
function writeInfo(msg) {
    if (DEBUG_MODE)
        console.info(msg);
}
function initPosition() {
    $('.header-menu li').width("24%");
}
function resizeSendBar(page) {
    console.log($(page + ' .messageSendBox').width(), $(page + ' .block-button-send').width());
    $(page + " .block-input-send").width($(page + ' .messageSendBox').width() - $(page + ' .block-button-send').width() - 20);
}










