// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Services',
    caption: 'Tools',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Properties',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
        // {
        //     id: 'documentation',
        //     title: 'Documentation',
        //     type: 'item',
        //     url: 'https://codedthemes.gitbook.io/berry/',
        //     icon: icons.IconHelp,
        //     external: true,
        //     target: true
        // }
    ]
};

export default pages;
