/*
 * set init event according device type
 */
function deviceTypeInitEvent(){
    userDevice = {
        type: device.platform,
        state:device_state.run,
        addNotification: function(){},
        removeNotification : function(){}
    };
    
    switch(userDevice.type){
        case 'BlackBerry': initBlackBerryEvent();break;
        default: initDefaultEvent();break;
    }
}

function initBlackBerryEvent(){
    userDevice.addNotification = blackBerryNotification;
    userDevice.removeNotification = blackBerryRemoveNotidication;
    document.addEventListener("pause", onDevicePause, false);
    document.addEventListener("resume", onDeviceResume, false);
}
function initDefaultEvent(){
    userDevice.addNotification = defaultNotification;
    document.addEventListener("pause", onDevicePause, false);
    document.addEventListener("resume", onDeviceResume, false);
}

function onDevicePause(){
    userDevice.state = device_state.pause;
}

function onDeviceResume(){
    userDevice.state = device_state.run;
    userDevice.removeNotification();
}

function blackBerryNotification(){
    navigator.notification.beep(1);
    blackberry.app.showBannerIndicator("icon-80.png",1);
    
}
function blackBerryRemoveNotidication(){
    blackberry.app.removeBannerIndicator();
}

function defaultNotification(){
    navigator.notification.beep(1);
}