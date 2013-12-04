var jsFiles = [
    "js/jquery-1.9.1.min.js",
    "cordova.js",
    "js/jquery.min.js",
    "js/jquery.mobile-1.3.1.min.js",
    "js/function.js",
    "js/user.js",
    "js/friend.js",
    "js/message.js",
    "js/privateChat.js",
    "js/groupChat.js",
    "js/group.js",
    "js/connectionManager.js",
    "js/responseManager.js",
    "js/uiManager.js",
    "js/sendComandManager.js",
    "js/renderElements.js",
    "js/updateElements.js",
    "js/localStorage.js",
    "js/date.js",
    "js/config_menu.js",
    "js/menu.js",
    "js/search.js",
    "js/secureStorage.js"
];
var scriptTags = new Array(jsFiles.length);
for (var i = 0, len = jsFiles.length; i < len; i++) {
    scriptTags[i] = '<script type="text/javascript" src="' + jsFiles[i] + '"></script>';
}
document.write(scriptTags.join(""));


USER_ID = '';
USER_SESSION = '';
DEBUG_MODE = true;

if(DEBUG_MODE)
    WEBSOCKETLINK =  'wss://dev.uniquedoc.com:8180/UniquedocChat';//'wss://192.168.2.40:8180/UniquedocChat';
else
    WEBSOCKETLINK =  'wss://dev.uniquedoc.com:8180/UniquedocChat';

LOCALSTORAGEURL = 'https://dev.uniquedoc.com/api';
user_device = {
    blackberry: 'blackberry',
    mobile: 'mobile',
    tablet: 'tablet',
    desktop: 'desktop',
    none: 'USER_DEVICE_NONE'
};

var private_message_status = {
    sent: 'SERVER_PRIVATE_MESSAGE_SENT',
    delivered: 'SERVER_PRIVATE_MESSAGE_DELIVERED',
    read: 'SERVER_PRIVATE_MESSAGE_READ'
};

user_status = {
    online : 'CHAT_STATUS_ONLINE',
    away : 'CHAT_STATUS_AWAY',
    emergency : 'CHAT_STATUS_EMERGENCY',
    invisible : 'CHAT_STATUS_INVISIBLE',
    offline : 'CHAT_STATUS_OFFLINE'
    
};

device_state ={
    pause: 'pause',
    run: 'run'
};
var online = 'CHAT_STATUS_ONLINE';
var available = 'CHAT_STATUS_AVAILABLE';
var away = 'CHAT_STATUS_AWAY';
var emergency = 'CHAT_STATUS_EMERGENCY';
var invisible = 'CHAT_STATUS_INVISIBLE';
var offline = 'CHAT_STATUS_OFFLINE';

var global_status = available;

var back = false;
var connection;

var user = {};
var friendList = {};
var groupList = {};
var userDevice={
    type:'',
    state:'',
    addNotification: function(){},
    removeNotification : function(){}
    };

mannage_group_conntact = false;
mannage_group_name = false;