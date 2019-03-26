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
            $alert_notifications = [];
            $ten_seconds_ago = strtotime("-10 seconds");

            foreach ($notifications as $value) {
                if($value['date_creation'] > $ten_seconds_ago) {
                    $alert_notifications[] = $value;
                }
            }

            $this->response->json(
                [
                    'count' => count($notifications),
                    'notifications' => $alert_notifications,
                ]
            );
        }
    }
}
