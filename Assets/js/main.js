var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

// Ref : https://stackoverflow.com/a/6491621
Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

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
                var push_title = Object.byString(notification, 'event_data.task.title') || "Kanboard";
                var project_id = Object.byString(notification, 'event_data.task.project_id') || 0;
                var task_id = Object.byString(notification, 'event_data.task.id') || 0;
                var task_link = (project_id && task_id) ? baseUrl+"?controller=TaskViewController&action=show&project_id="+project_id+"&task_id="+task_id : baseUrl;

                Push.create(push_title, {
                    body: notification.title,
                    link: task_link,
                    icon: '/assets/img/favicon.png',
                    timeout: 5000,
                    // onClick: function () {
                    //     window.focus();
                    //     this.close();
                    // }
                });
            });
        }
   });
}

soundalert(); 

setInterval(soundalert, 10000);

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
