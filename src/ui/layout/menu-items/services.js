// assets
import {
    IconKey,
    IconDeviceLandlinePhone,
    IconRobot,
    IconBrandOnedrive,
    IconMoodSmile,
    IconDialpad,
    IconNotes,
    IconCloudLock,
    IconSettings,
    IconMail,
    IconDeviceMobileMessage
} from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconDeviceLandlinePhone,
    IconRobot,
    IconBrandOnedrive,
    IconMoodSmile,
    IconDialpad,
    IconNotes,
    IconCloudLock,
    IconSettings,
    IconMail,
    IconDeviceMobileMessage
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const services = {
    id: 'services',
    title: 'Services',
    caption: 'Tools',
    type: 'group',
    children: [
        {
            id: 'connect',
            title: 'Phone Support',
            type: 'collapse',
            icon: icons.IconDeviceLandlinePhone,
            breadcrumbs: true,
            children: [
                {
                    id: 'bots',
                    title: 'AI Agents',
                    type: 'item',
                    url: '/ai-agents',
                    icon: icons.IconRobot,
                    breadcrumbs: true
                },
                {
                    id: 'call-centers',
                    title: 'Contact Centers',
                    type: 'item',
                    url: '/call-centers',
                    icon: icons.IconBrandOnedrive,
                    breadcrumbs: true
                },
                {
                    id: 'agents',
                    title: 'Human Agents',
                    type: 'item',
                    url: '/human-agents',
                    icon: icons.IconMoodSmile,
                    breadcrumbs: true
                },
                {
                    id: 'phone-numbers',
                    title: 'Phone Numbers',
                    type: 'item',
                    url: '/phone-numbers',
                    icon: icons.IconDialpad,
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'email',
            title: 'Email Campaigns',
            type: 'item',
            url: '/notes',
            icon: icons.IconMail,
            breadcrumbs: false
        },
        {
            id: 'notes',
            title: 'Notes',
            type: 'item',
            url: '/notes',
            icon: icons.IconNotes,
            breadcrumbs: false
        },
        {
            id: 'sms',
            title: 'SMS Campaigns',
            type: 'item',
            url: '/notes',
            icon: icons.IconDeviceMobileMessage,
            breadcrumbs: false
        },
        { id: 'passwords', title: 'Passwords', type: 'item', url: '/passwords', icon: icons.IconCloudLock, breadcrumbs: false },
        { id: 'settings', title: 'Settings', type: 'item', url: '/settings', icon: icons.IconSettings, breadcrumbs: false }
    ]
};

export default services;
