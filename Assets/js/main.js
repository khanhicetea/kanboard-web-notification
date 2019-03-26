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

            $.each(data.notifications, function(idx, notification) {
                Push.create("Kanboard", {
                    body: notification.title,
                    icon: '/assets/img/favicon.png',
                    timeout: 3000,
                    onClick: function () {
                        window.focus();
                        this.close();
                    }
                });
            });
        }
   });
}

soundalert(); 

setInterval(soundalert, 5000);

$(document).ready(function() {
    function checkWebNotification() {
        var enabled = Push.Permission.has();
        
        console.log('Notification Permission', enabled);
        $('#webNotificationToggle').text(enabled ? 'Web Notification : Enabled' : 'Enable Web Notification');
        if (enabled) {
            $('#webNotificationToggle').attr('disabled', 'disabled');
        } else {
            $('#webNotificationToggle').removeAttr('disabled');
        }

        return enabled;
    }

    if ($('#webNotificationToggle').length) {
        $('#webNotificationToggle').click(function(e) {
            e.preventDefault();

            Push.Permission.request(checkWebNotification, checkWebNotification);
        })
    }

    checkWebNotification();
})
