/*
 * render list of recent conversations
 */
function renderRecentConversations() {
    var element = $('#chatListElement');

    var elementUl = document.createElement('ul');
    elementUl.setAttribute('data-role', 'listview');
    elementUl.setAttribute('id', 'chatListT');
    elementUl.setAttribute('class', 'ui-listview');
    var array = user.recentConversationElementInit();
    for (var i = 0; i < array.length; i++)
        elementUl.appendChild(array[i]);
    element.append(elementUl);
    user.recentConversationElement = elementUl;
}

/*
 *  render contact list friends + group
 */
function renderContactList() {
    var element = $('#contactListElement');
    
    var elementUl = document.createElement('ul');
    elementUl.setAttribute('data-role', 'listview');
    elementUl.setAttribute('id', 'contactListT');
    //elementUl.setAttribute('class', 'ui-listview');
    elementUl.setAttribute('data-filter-placeholder', 'search for connections');
    elementUl.setAttribute('data-filter', 'true');
    
    var array = user.allContactElementInit(true);
    for (var i = 0; i < array.length; i++)
        elementUl.appendChild(array[i].contactListElement);
    
    
    element.append(elementUl);

    var myUL = $('#contactListT')
    myUL.listview();
    user.allContactElement = elementUl;

/*
    var contactList = [];
    for (var i = 0; i < user.friendList.length; i++) {
        contactList.push({id: user.friendList[i].id, name: user.friendList[i].name, group: 0, status: user.friendList[i].status, fun: user.friendList[i].selectFriend, avatar:user.friendList[i].avatar});
    }
    for (var i = 0; i < user.groupList.length; i++) {
        contactList.push({id: user.groupList[i].groupId, name: user.groupList[i].displayGroupName, group: 1, fun: user.groupList[i].startGroupChat,avatar:null});
    }
    contactList.sort(function(a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0;
    });
    var letterDivider = "";
    for (var i = 0; i < contactList.length; i++) {
        /*
         * add letter devider to contact list
         */
        /*if (contactList[i].name[0].toUpperCase() !== letterDivider)
            element.append('<li data-icon="false" id="letterDivider">' + contactList[i].name[0].toUpperCase() + '</li>');
        */
       /*
        if (!contactList[i].group)
            element.append(itemTemplate('friend_list_', contactList[i].id, contactList[i].fun, contactList[i].name, null, contactList[i].status, null, null, contactList[i].avatar));
        else             
            element.append(itemTemplate('group_list_', contactList[i].id, contactList[i].fun, contactList[i].name, null, null, null, null,null));
        letterDivider = contactList[i].name[0].toUpperCase();

    }
    /*if ((element).hasClass('ui-listview')) {
        element.listview();
        element.listview('refresh');
    }*/
    
    $('body').trigger('FilterInputCreated');
}
function renderGroupManageContactList(){
    var element = $('#manageGroupContactPage #contactListT');
    
    
    
    var array = user.allContactElementInit(false);
    for (var i = 0; i < array.length; i++)
        element.append(array[i].manageGroupListElement);

    var myUL = $('#manageGroupContactPage #contactListT')
    myUL.listview();
    
}

function renderSelectFriendUl(){
    var html = '<ul id="contactList-selectedFriendT" data-role="listview" class="ui-listview">\n\
                </ul>\n\
                <ul data-role="listview" id="contactPageSmallMenu">\n\
                    <li data-icon="false" class="btn_openPrivateGroupChat"><a class="ok_button button" onclick="onOpenPrivateGroupChat();" href="">Start text chat</a></li>\n\
                </ul>\n\ ';
    html
    $("#contactListElement form").after(html);
}
/*
 * render popups menu for main, contact and chat page
 */

function renderPopupMenu() {
    var html = '<ul data-role="listview" data-inset="true" style="" >';
    for(var index in user_status){
        html +='<li data-icon="false"><a onclick="setStatus(\''+user_status[index]+'\');" href="#" data-rel="back" class="li-'+user_status[index]+' li-popup-mnu-link">'+index+'</a></li>';
    }
    html +='</ul>';
    $('#popupMenu').html(html);
    $('#popupMenu2').html(html);
    $('#popupMenu3').html(html);
}




function renderGroupMenu(group) {
    var element = $('#groupMenuConnections');
    var html = '';
    for (var i = 0; i < group.users.length; i++) {
        html += '\
                <li data-icon="false" id="friend_list_' + group.users[i].id + '">\n\
                    <a href="">\n\
                        <img  src="./img/profil_img.png" alt="status" class="ui-li-icon">' + group.users[i].name + '\
                    </a>\n\
                </li>\n\
               ';
    }
    element.html(html);
    if ((element).hasClass('ui-listview')) {
        element.listview('refresh');
        element.listview();
    }
    $('#groupMenuPageTemplate').on('pageshow', function() {
        $('#groupChatMenuBtn_manage').css({width: ($(document).width() - 30) + 'px'});
        $('#groupChatMenuBtn_rename').css({width: ($(document).width() - 30) + 'px'});
        $('#groupChatMenuBtn_leave').css({width: ($(document).width() - 30) + 'px'});
        $('#groupChatMenuBtn_close').css({width: ($(document).width() - 30) + 'px'});
        if (group.isgroupLeader) {
            $('#groupChatMenuBtn_leave').hide();
            $('#groupChatMenuBtn_close').show();
        }
        else {
            $('#groupChatMenuBtn_leave').show();
            $('#groupChatMenuBtn_close').hide();
        }


    });
}

function renderPopupGroupMenu(content, left_btn, right_btn, add_function) {
    $('#popupGroupMenu p').html('<span class="ui-btn-inner"><span class="ui-btn-text">' + content + '</span></span>');
    $('#popupGroupMenu a.left_btn').html('<span class="ui-btn-inner"><span class="ui-btn-text">' + left_btn + '</span></span>');
    $('#popupGroupMenu a.right_btn').html('<span class="ui-btn-inner"><span class="ui-btn-text">' + right_btn + '</span></span>');
    $('#popupGroupMenu a.right_btn').attr('onclick', add_function);
    var button_left = $('a.left_btn');
    var button_right = $('a.right_btn');
    button_left.css('marginLeft',-button_left.width()-15+'px');
}




function itemTemplate(id_string, id, fun, name, countNewMessage, status, message,message_status,avatarBase64,_device) {
    var device = "";
    if(_device == null)
        device = user_device.desktop;
    else 
        device = _device;
    
    var hidden = '';
    var hidden_message_status= '';
    if (countNewMessage < 1)
        hidden = 'hidden';
    if (message_status==='' || countNewMessage >0)
        hidden_message_status = 'hidden';

    var image = './img/profil_img.png';  
    if(avatarBase64!==null)
        image = 'data:image/png;base64,'+avatarBase64;
    
    var namePart = name;
    if(id_string==='group_list_')
        namePart = '<strong>'+name+'</strong>';
    
    var element = document.createElement('li');
    element.setAttribute('data-icon', 'false');
    element.setAttribute('id', id_string + id);
    element.setAttribute('class','ui-btn ui-btn-icon-right ui-li ui-li-has-icon ui-first-child ui-last-child ui-btn-up-d');
    var div1 = document.createElement('div');
    div1.setAttribute('class','ui-btn-inner ui-li');
    var div2 = document.createElement('div');
    div2.setAttribute('class','ui-btn-text');
    var a = document.createElement('a');
    a.setAttribute('onclick',fun);
    a.setAttribute('class','ui-link-inherit');
    
    a.innerHTML =  '<img  src="'+image+'" alt="status" class="ui-li-icon"><span class="name">' + namePart + '</span>';
    
    var pfrienditemelement = document.createElement('p');
    pfrienditemelement.setAttribute('class','chat-list-friend-item');
    /*if(message_status !== '')
    pfrienditemelement.appendChild(message_status)   ; */
    pfrienditemelement.innerHTML = '<span class="ui-li-message-status ' + hidden_message_status + ' message_status_'+message_status+' "></span>\n\
                       <span class="ui-li-message-count ' + hidden + ' ">' + countNewMessage + '</span>\n\
                       <span class="ui-li-message-text">' + message + '</span>\n';
    if (countNewMessage !== null)
        a.appendChild(pfrienditemelement);
    
    if (status !== null)
        a.innerHTML = a.innerHTML+'<span class="user-status-icon ui-icon-' + status + ' device-'+device+'"></span></div></div>\n';
    div1.appendChild(div2);
    div2.appendChild(a);
    element.appendChild(div1);
    
    return element;
}

function messageTemplate(userIsSender, message, status, date, num,avatar) {
    var color = 'light';
    if (num % 2)
        color = 'dark';
    else
        color = 'light';
    
    var image = './img/profil_img.png';  
    if(avatar!==null)
        image = 'data:image/png;base64,'+avatar;
                
    var element = document.createElement('li');
    element.setAttribute('class', 'ui-li ui-li-static ui-btn-up-d ' + color); //('ui-li ui-li-static ui-btn-up-d '+color);
    //var temp = '<li class="ui-li ui-li-static ui-btn-up-d '+color+'">';
    if (userIsSender) {
        temp = '<p class="ui-li-right ui-li-desc"><img  src="'+image+'" alt="status" class="ui-li-profil-icon"></p>';
        temp += '<p class="ui-li-message-left ui-li-desc">' + message + '</p>';
    }
    else {
        temp = '<p class="ui-li-left ui-li-desc"><img  src="'+image+'" alt="status" class="ui-li-profil-icon"></p>';
        temp += '<p class="ui-li-message-right ui-li-desc">' + message + '</p>';
    }

    element.innerHTML = temp;
    var elementP = document.createElement('p');
    elementP.setAttribute('class', 'ui-li-message-time ui-li-desc');
    elementP.innerHTML = date;
    if (status !== '')
        elementP.appendChild(status)
    element.appendChild(elementP);
    //temp += '</li>';

    return element;
}

