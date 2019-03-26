<?php

namespace Kanboard\Plugin\WebNotification\Controller;

/**
 * Sound notification controller
 *
 * @package  Kanboard\Plugin\WebNotification\Controller
 * @author   KhanhIcetea
 */
class WebNotificationController extends \Kanboard\Controller\WebNotificationController
{

    public function webNotifications()
    {
        $user = $this->getUser();

        if ($this->userUnreadNotificationModel->hasNotifications($user['id'])) {
            $notifications = $this->userUnreadNotificationModel->getAll($user['id']);

            foreach ($notifications as $value) {
                $timestamp = $value['date_creation'];
            }

            if($timestamp > strtotime("-10000 seconds")) {
                $this->response->html(
                    '<script>console.log("'.$timestamp.'")</script>'
                );
            }

            $this->response->html(count($notifications));
        }
    }
}
