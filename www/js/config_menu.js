main_menu = [{icon: 'logout', text: 'Logout', float: 'left', onclick: 'logout()'}];

status_menu = [
    {icon: 'online', text: 'online', float: 'right', onclick: 'setStatus(\"' + user_status.online + '\")', textColor: user_status.online},
    {icon: 'away', text: 'away', float: 'right', onclick: 'setStatus(\"' + user_status.away + '\")', textColor: user_status.away},
    {icon: 'emergency', text: 'emergency', float: 'right', onclick: 'setStatus(\"' + user_status.emergency + '\")', textColor: user_status.emergency},
    {icon: 'invisible', text: 'invisible', float: 'right', onclick: 'setStatus(\"' + user_status.invisible + '\")', textColor: user_status.invisible},
    {icon: 'offline', text: 'offline', float: 'right', onclick: 'setStatus(\"' + user_status.offline + '\")', textColor: user_status.offline},
];

friend_sub_menu = [
    {icon: 'delete', text: 'Delete this conversation', float: 'left', onclick: 'onDeletConversationConfirmPopup()'},
]

group_sub_menu = [
    {icon: 'groupMembers', text: 'Group members', float: 'left', onclick: 'onManageGroupMembers()'},
]


deleteConversation_popup = {text: 'Are you sure you want to delete the last 24 hours of this conversation?', ok_btn_text: 'Delete', ok_btn_onclick: 'commandPurgeHistory(getActiveConverastion())', cancel_btn_text: 'Cancel', cancel_btn_onclick: ''};

