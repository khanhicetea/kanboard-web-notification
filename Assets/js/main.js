var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

function soundalert()
{
    $.ajax({
       type: "GET",
       url: baseUrl+"?controller=WebNotificationController&action=webNotifications&plugin=WebNotification",
       cache: false,
       success: function(response)
        {
            if (response != "") {
                $("#soundalert").html(response);
            }
        }
   });
}

soundalert(); 

setInterval(soundalert, 5000);
