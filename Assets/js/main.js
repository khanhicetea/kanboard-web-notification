var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

function soundalert()
{
    $.ajax({
       type: "GET",
       url: baseUrl+"?controller=WebNotificationController&action=webNotifications&plugin=WebNotification",
       cache: false,
       dataType: 'json',
       success: function(data)
        {
            
            $("#soundalert").html(data.count);
        }
   });
}

soundalert(); 

setInterval(soundalert, 5000);
