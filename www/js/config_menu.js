main_menu = [{icon:'logout',text:'Logout',float:'left',onclick:'setStatus(\"'+user_status.offline+'\")'}];

status_menu = [
    {icon:'online',text:'online',float:'right',onclick:'setStatus(\"'+user_status.online+'\")',textColor:user_status.online},
    {icon:'away',text:'away',float:'right',onclick:'setStatus(\"'+user_status.away+'\")',textColor:user_status.away},
    {icon:'emergency',text:'emergency',float:'right',onclick:'setStatus(\"'+user_status.emergency+'\")',textColor:user_status.emergency},
    {icon:'invisible',text:'invisible',float:'right',onclick:'setStatus(\"'+user_status.invisible+'\")',textColor:user_status.invisible},
    {icon:'offline',text:'offline',float:'right',onclick:'setStatus(\"'+user_status.offline+'\")',textColor:user_status.offline},
];

