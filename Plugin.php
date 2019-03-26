<?php

namespace Kanboard\Plugin\WebNotification;

use Kanboard\Core\Plugin\Base;

/**
 * WebNotification Plugin
 *
 * @package  WebNotification
 * @author   KhanhIceTea
 */
class Plugin extends Base
{
    public function initialize()
    {
        $this->hook->on("template:layout:css", array("template" => "plugins/WebNotification/Assets/css/style.css"));
        $this->hook->on('template:layout:js', array('template' => 'plugins/WebNotification/Assets/js/push.min.js'));
        $this->hook->on('template:layout:js', array('template' => 'plugins/WebNotification/Assets/js/main.js'));
        $this->template->setTemplateOverride('header/user_notifications', 'WebNotification:header/user_notifications');
    }

    public function getPluginName()
    {
        return 'WebNotification';
    }

    public function getPluginDescription()
    {
        return 'Each new notification will trigger a browser notification.';
    }

    public function getPluginAuthor()
    {
        return 'KhanhIceTea';
    }

    public function getPluginVersion()
    {
        return '1.0.0';
    }

    public function getPluginHomepage()
    {
        return 'https://github.com/khanhicetea/kanboard-web-notification';
    }

    public function getCompatibleVersion()
    {
        return '>=1.0.48';
    }
}
