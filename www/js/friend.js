var selectedFriend = [];

/*
 * Create new friend createFriend(id,name,newMessage,status)
 * return object friend
 */

function Friend(id, name, newMessages, status, history, recent,avatarBase64,device) {
    var historyA = new Array();
    for (var i = 0; i < history.length; i++)
        historyA.push(new Message(id, history[i].date, history[i].groupId, history[i].message, history[i].receiverId, history[i].senderId, history[i].status, history[i].time, history[i].timeId, history[i].timestamp));
    var message = '';
    var message_status = '';
    if (historyA.length){
        message = historyA[historyA.length - 1].message;
        message_status = historyA[historyA.length - 1].status;
    }
    if (newMessages>0)
        message = 'new message';
    
    var avatar = null;
    
    if(typeof avatarBase64 !=='undefined' && avatarBase64!=='' ){
        var avatar = avatarBase64;
    };
       
       
    this.id = id;
    this.name = name;
    this.avatar =avatar;
    this.device = device;
    this.newMessages = newMessages;
    this.status = status;
    this.history = historyA;
    this.incognito = false;
    this.recent = recent;
    this.historyElement = '';
    this.createHistoryElement = createHistoryElementF;
    this.createHistoryElement();
    this.updateHistoryElement = updateHistoryElementF;
    this.updateHistory = updateHistoryF;
    this.addToHistory = addToHistoryF;
    this.updateStatus = updateStatusF;
    this.startChat = 'commandOpenPrivateChat(' + this.id + ')';
    this.selectFriend = 'selectFriend(' + this.id + ')';
    this.selectFriendGroup = 'selectFriendGroup(' + this.id + ')';
    this.updateMessageStatus = updateMessageStatusF;
    this.itemElement = itemTemplate('friend_list_',this.id,this.startChat,this.name,this.newMessages,this.status,message,message_status,this.avatar,this.device);
    this.contactListElement = itemTemplate('friend_list_', this.id, this.selectFriend, this.name, null, this.status, null, null, this.avatar,this.device);
    this.manageGroupListElement = itemTemplate('friend_list_', this.id, this.selectFriendGroup, this.name, null, this.status, null, null, this.avatar,this.device);
    this.updateFriendElement = updateFriendElementF;
    this.setNewMessages = setNewMessagesF;

    function updateHistoryF(history) {
        var historyA = new Array();
        for (var i = 0; i < history.length; i++)
            historyA.push(new Message(user.id, history[i].date, history[i].groupId, history[i].message, history[i].receiverId, history[i].senderId, history[i].status, history[i].time, history[i].timeId, history[i].timestamp));
        this.history = historyA;
        this.createHistoryElement();
    }

    function addToHistoryF(history) {
        this.history.push(new Message(user.id, history.date, history.groupId, history.message, history.receiverId, history.senderId, history.status, history.time, history.timeId, history.timestamp));
        this.updateHistoryElement();
        updateRecentContactMessage(this.id,'friend',history.message,history.status);
    }

    function updateStatusF(status,device) {
        this.status = status;
        this.device = device;
        this.updateFriendElement(status,device);
    }

    function openPrivateChatF() {
        openPrivateChat(this.id);
    }

    function updateMessageStatusF(userId, timeId, status) {
        for (var i = 0; i < this.history.length; i++) {
            if (this.history[i].timeId === timeId) {
                this.history[i].updateStatus(userId, status);
            }

        }
    }
    function setNewMessagesF(num){
        if(num==='+'){
            this.newMessages++;
            addRecentNotification('friend',this);
        }
        else if(num===0){
            this.newMessages = 0;
            clearRecentNotification('friend',this);
        }
        else{
            this.newMessages = num;
            addRecentNotification('friend',this);
        }
        
        
        
    }


function updateFriendElementF(status,device){
    var elements = this.itemElement.getElementsByTagName("span");
    
    for(var i=0;i<elements.length;i++){
        var classs = elements[i].className.split(' ');
        for(var j=0;j<classs.length;j++){
            if(classs[j]==='user-status-icon')
                elements[i].setAttribute('class','user-status-icon ui-icon-' + status + ' device-'+device);
        }
        
    }
    
    var elements = this.contactListElement.getElementsByTagName("span");
    
    for(var i=0;i<elements.length;i++){
        var classs = elements[i].className.split(' ');
        for(var j=0;j<classs.length;j++){
            if(classs[j]==='user-status-icon')
                elements[i].setAttribute('class','user-status-icon ui-icon-' + status + ' device-'+device);
        }
        
    }
}

    function createHistoryElementF() {
        var time = '', date = '', mess = '', name = '', status = '', statusElement = '';
        var lastSender = '';
        var lastDate = '';
        var lastSendTime = '';
        var htmlString;


        $('#chatPageTitle').html(this.name);

        var mainElement = document.createElement('ul');
        mainElement.setAttribute('data-role', 'listview');
        mainElement.setAttribute('id', 'chatHistory');
        this.historyElement = mainElement;
        var element_chatHistory = this.historyElement;

        var historyLength = this.history.length;
        var i = 0;
        var userIsSender = false;
        var avatar = null;
        numberMessageItemGroup = 0;

        /*if (historyLength > 40)
            i = historyLength - 40;
		*/
        for (i; i < historyLength; i++) {

            if (this.history[i].senderId === user.id) {
                name = user.name;
                userIsSender = true;
                avatar = null
            }
            else {
                name = this.name;
                userIsSender = false;
                avatar = this.avatar
            }

            mess = this.history[i].message;
            status = this.history[i].status;
            statusElement = this.history[i].statusElement;

            var newDate = new Date(this.history[i].timeId);
            time = newDate.getUTCFullYear() + ':' + newDate.getUTCDate() + ':' + newDate.getUTCMonth() + ':' + newDate.getUTCHours() + ':' + newDate.getUTCMinutes();
            date = newDate.toString('dddd,d');//getUTCDate() + '.' + newDate.getUTCMonth() + '.' + newDate.getUTCFullYear();
            date+=newDate.getOrdinal();
            date+=newDate.toString(' MMMM yyyy');
            if (lastDate === date) {
                date = "";
            }
            else {
                lastDate = date;
            }

            if(date!==""){
                var element = document.createElement('li');
                element.setAttribute('class', 'ui-li ui-li-static ui-btn-up-d ui-li-chat-date');
                element.innerHTML = date;
                element_chatHistory.appendChild(element);
                //dateTagList.push(element);
                //console.log("add to dataTagList");
                
                //console.log('elements',dateTagList);
                
            }
            if (lastSender !== name || date!=="") {
                if(date=="")numberMessageItemGroup++;
                var element = messageTemplate(userIsSender, mess, statusElement, (newDate.getHours() < 10 ? '0' : '') + newDate.getHours() + ':' + (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes(), numberMessageItemGroup,avatar);
                element_chatHistory.appendChild(element);

            }
            else {
                var element = element_chatHistory.lastChild;
                var elementP = document.createElement('p');
                if (userIsSender) {
                    //htmlString = '<p class="ui-li-message-left ui-li-desc">' + mess + '</p>';
                    elementP.setAttribute('class', 'ui-li-message-left ui-li-desc');
                }
                else {
                    //htmlString = '<p class="ui-li-message-right ui-li-desc">' + mess + '</p>';
                    elementP.setAttribute('class', 'ui-li-message-right ui-li-desc');
                }
                elementP.innerHTML = mess;
                element.appendChild(elementP);
                if (lastSendTime === time) {
                    var lastElement = element.getElementsByClassName('ui-li-message-time');
                    element.removeChild(lastElement[lastElement.length - 1]);
                }
                //htmlString += '<p class="ui-li-message-time ui-li-desc">' + (newDate.getHours()<10?'0':'')+newDate.getHours()+':'+(newDate.getMinutes()<10?'0':'')+newDate.getMinutes() + ' '+date +' '+status+'</p>';
                var elementTime = document.createElement('p');
                elementTime.setAttribute('class', 'ui-li-message-time ui-li-desc');
                elementTime.innerHTML = (newDate.getHours() < 10 ? '0' : '') + newDate.getHours() + ':' + (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();
                elementTime.appendChild(statusElement);
                element.appendChild(elementTime);
            }
            lastSender = name;
            lastSendTime = time;
        }

        /*if (element_chatHistory.hasClass('ui-listview')) {
         element_chatHistory.listview();
         element_chatHistory.listview('refresh');
         }
         ;
         $('#chatPageTemplate').on('pageshow', function() {
         $.mobile.silentScroll($('#chatHistory').height());
         $('.block-input-send').css({width: ($(document).width() - $('.block-button-send .ui-btn').width() - 50) + 'px'});
         });*/

    }

    function updateHistoryElementF() {
        var time = '', mess = '', name = '', status = '';
        var userIsSender = false;
        var avatar = null;
        var htmlString;
        var element_chatHistory = this.historyElement;
        
        var lastMessage = this.history[this.history.length - 1];
        var lastestMessage = '';
        if (this.history.length > 2)
            lastestMessage = this.history[this.history.length - 2];

        if (lastMessage.senderId === user.id) {
            name = user.name;
            userIsSender = true;
            avatar = null;
        }
        else {
            name = this.name;
            userIsSender = false;
            avatar = this.avatar;
        }
        mess = lastMessage.message;
        var statusElement = lastMessage.statusElement;

        var newDate = new Date(lastMessage.timeId);
        var lastDate = new Date(lastestMessage.timeId);
        time = newDate.getUTCFullYear() + ':' + newDate.getUTCDate() + ':' + newDate.getUTCMonth() + ':' + newDate.getUTCHours() + ':' + newDate.getUTCMinutes();
        var date = newDate.toString('dddd,d');//getUTCDate() + '.' + newDate.getUTCMonth() + '.' + newDate.getUTCFullYear();
        date+=newDate.getOrdinal();
        date+=newDate.toString(' MMMM yyyy');
        var oldTime = lastDate.getUTCFullYear() + ':' + lastDate.getUTCDate() + ':' + lastDate.getUTCMonth() + ':' + lastDate.getUTCHours() + ':' + lastDate.getUTCMinutes();
        var oldDate = lastDate.toString('dddd,d');//getUTCDate() + '.' + lastDate.getUTCMonth() + '.' + lastDate.getUTCFullYear();
        oldDate+=lastDate.getOrdinal();
        oldDate+=lastDate.toString(' MMMM yyyy');
        
        if (oldDate === date)
            date = "";

        if(date!==""){
                        var element = document.createElement('li');
                        element.setAttribute('class', 'ui-li ui-li-static ui-btn-up-d ui-li-chat-date');
                        element.innerHTML = date;
                        element_chatHistory.appendChild(element);
        }
        if (lastestMessage.senderId !== lastMessage.senderId || date!=="") {
            if(date=="")numberMessageItemGroup++;
            
            var element = messageTemplate(userIsSender, mess, statusElement, (newDate.getHours() < 10 ? '0' : '') + newDate.getHours() + ':' + (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes(), numberMessageItemGroup,avatar);
            element_chatHistory.appendChild(element);
        }
        else {
            var element = element_chatHistory.lastChild;
            var elementP = document.createElement('p');
            if (userIsSender) {
               // htmlString = '<p class="ui-li-message-left ui-li-desc">' + mess + '</p>';
                elementP.setAttribute('class', 'ui-li-message-left ui-li-desc');
            }
            else {
                //htmlString = '<p class="ui-li-message-right ui-li-desc">' + mess + '</p>';
                elementP.setAttribute('class', 'ui-li-message-right ui-li-desc');
            }
            elementP.innerHTML = mess;
            element.appendChild(elementP);
            if (oldTime === time){
                var lastElement = element.getElementsByClassName('ui-li-message-time');
                element.removeChild(lastElement[lastElement.length - 1]);
            }
            var elementTime = document.createElement('p');
            elementTime.setAttribute('class', 'ui-li-message-time ui-li-desc');
            elementTime.innerHTML = (newDate.getHours() < 10 ? '0' : '') + newDate.getHours() + ':' + (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();
            elementTime.appendChild(statusElement);
            element.appendChild(elementTime);
        }
                
        $("html, body").animate({scrollTop: $(document).height()}, 100);

    }
}


function getFriendById(id) {
    for (var i = 0; i < user.friendList.length; i++) {
        if (user.friendList[i].id === id)
            return user.friendList[i];
    }
    return null;
}
function getFriendName(id) {
    for (var i = 0; i < user.friendList.length; i++) {
        if (user.friendList[i].id === id)
            return user.friendList[i].name;
    }
    return null;
}
/*function getFriendAvatarById(id){
    for (var i = 0; i < user.friendList.length; i++) {
        if (user.friendList[i].id === id)
            return user.friendList[i].avatar;
    }
    return null;
}*/

function addToSelectedFriend(id) {
    selectedFriend.push(id);
}
function removeFromSelectedFriend(id) {
    for (var i = 0; i < selectedFriend.length; i++) {
        if (selectedFriend[i] === id)
            selectedFriend.splice(i, 1);
    }
}
function isSelectedFriend(id) {
    for (var i = 0; i < selectedFriend.length; i++) {
        if (selectedFriend[i] === id)
            return true;
    }
    return false;
}
function getSelectedFriend() {
    return selectedFriend;
}
function clearSelectedFriend() {
    selectedFriend = [];
}

function selectFriend(id) {
    if (isSelectedFriend(id)) {
        removeFromSelectedFriend(id);
        updateContactListSelectFriend(id, 'remove');
    }
    else {
        addToSelectedFriend(id);
        updateContactListSelectFriend(id, 'add');
    }
    updateSelectedFriendView();

}

function selectFriendGroup(id){
    if (isSelectedFriend(id)) {
        removeFromSelectedFriend(id);
        updateGroupManageListSelectFriend(id, 'remove');
    }
    else {
        addToSelectedFriend(id);
        updateGroupManageListSelectFriend(id, 'add');
    }
    updateSelectedFriendInGroupView();
}



