export default async function getMenuData() {
  return [
    {
      title: 'Dashboard',
      key: 'dashboardAnalytics',
      icon: 'fe fe-home',
      url: '/dashboard/analytics',
    },
    {
      category: true,
      title: 'Marketing',
    },
    {
      title: 'SMS',
      key: 'Schedules',
      icon: 'fe fe-message-square',
      children: [
        {
          title: 'Conversations',
          key: 'messaging',
          url: '/schedules/messaging',
        },
        {
          title: 'Campaigns',
          key: 'schedule',
        },
        {
          title: 'Schedule',
          key: 'createSchedule',
          url: '/schedules/create',
        },
        {
          title: 'Schedules List',
          key: 'schedulesList',
          url: '/schedules/list',
        },
        {
          title: 'Messages',
          key: 'messages',
        },
        {
          title: 'Phone Numbers',
          key: 'phone-numbers',
          url: '/phone_numbers',
        },
      ],
    },
    {
      title: 'xenCall',
      key: 'xen',
      icon: 'fe fe-phone-call',
      children: [
        {
          title: 'TBA',
        },
        {
          title: 'TBA',
        },
        {
          title: 'TBA',
        },
        {
          title: 'TBA',
        },
      ],
    },
    {
      title: 'RVM',
      key: 'rvm',
      icon: 'fe fe-cast',
      children: [
        {
          title: 'TBA',
        },
        {
          title: 'TBA',
        },
        {
          title: 'TBA',
        },
        {
          title: 'TBA',
        },
      ],
    },
    {
      title: 'Direct Mail',
      key: 'mail',
      icon: 'fe fe-mail',
      children: [
        {
          title: 'TBA',
        },
        {
          title: 'TBA',
        },
        {
          title: 'TBA',
        },
        {
          title: 'TBA',
        },
      ],
    },
    {
      title: 'Social',
      key: 'social',
      icon: 'fe fe-share-2',
      children: [
        {
          title: 'Facebook',
        },
        {
          title: 'Instagram',
        },
      ],
    },
    {
      category: true,
      title: 'CRM',
    },
    {
      title: 'Contacts',
      key: 'list_contacts',
      icon: 'fe fe-list',
      url: '/contacts',
    },
    {
      title: 'Leads',
      key: 'leads',
      icon: 'fe fe-users',
    },
    {
      category: true,
      title: 'Sales',
    },
    {
      title: "MAO's",
      key: 'mao',
      icon: 'fe fe-file-text',
    },
    {
      title: 'Dispositions',
      key: 'dispositions',
      icon: 'fe fe-navigation',
    },
    {
      category: true,
      title: 'Activity',
    },
    {
      title: 'Tasks',
      key: 'tasks',
      icon: 'fe fe-check-square',
    },
    {
      title: 'Notifications',
      key: 'notifications',
      icon: 'fe fe-bell',
    },
    {
      title: 'Settings',
      key: 'settings',
      icon: 'fe fe-settings',
    },
    // {
    //   title: 'System Pages',
    //   key: 'system',
    //   icon: 'fe fe-user',
    //   children: [
    //     {
    //       title: 'Login',
    //       key: 'systemLogin',
    //       url: '/system/login',
    //     },
    //     {
    //       title: 'Forgot Password',
    //       key: 'systemForgotPassword',
    //       url: '/system/forgot-password',
    //     },
    //     {
    //       title: 'Register',
    //       key: 'systemRegister',
    //       url: '/system/register',
    //     },
    //     {
    //       title: 'Lockscreen',
    //       key: 'systemLockscreen',
    //       url: '/system/lockscreen',
    //     },
    //     {
    //       title: 'Page 404',
    //       key: 'system404',
    //       url: '/system/404',
    //     },
    //     {
    //       title: 'Page 500',
    //       key: 'system500',
    //       url: '/system/500',
    //     },
    //   ],
    // },
    // {
    //   title: 'Ecommerce',
    //   key: 'ecommerce',
    //   icon: 'fe fe-shopping-cart',
    //   children: [
    //     {
    //       title: 'Dashboard',
    //       key: 'ecommerceDashboard',
    //       url: '/ecommerce/dashboard',
    //     },
    //     {
    //       title: 'Orders',
    //       key: 'ecommerceOrders',
    //       url: '/ecommerce/orders',
    //     },
    //     {
    //       title: 'Propduct Catalog',
    //       key: 'ecommerceProductCatalog',
    //       url: '/ecommerce/product-catalog',
    //     },
    //     {
    //       title: 'Product Details',
    //       key: 'ecommerceProductDetails',
    //       url: '/ecommerce/product-details',
    //     },
    //     {
    //       title: 'Cart',
    //       key: 'ecommerceCart',
    //       url: '/ecommerce/cart',
    //     },
    //   ],
    // },
    // {
    //   title: 'Apps',
    //   key: 'apps',
    //   icon: 'fe fe-database',
    //   children: [
    //     {
    //       title: 'Messaging',
    //       key: 'appsCart',
    //       url: '/apps/messaging',
    //     },
    //     {
    //       title: 'Calendar',
    //       key: 'appsCalendar',
    //       url: '/apps/calendar',
    //     },
    //     {
    //       title: 'Mail',
    //       key: 'appsMail',
    //       url: '/apps/mail',
    //     },
    //     {
    //       title: 'Profile',
    //       key: 'appsProfile',
    //       url: '/apps/profile',
    //     },
    //     {
    //       title: 'Gallery',
    //       key: 'appsGallery',
    //       url: '/apps/gallery',
    //     },
    //   ],
    // },
    // {
    //   title: 'Extra Apps',
    //   key: 'extraApps',
    //   icon: 'fe fe-hard-drive',
    //   children: [
    //     {
    //       title: 'Github Explore',
    //       key: 'extraAppsGithubExplore',
    //       url: '/extra-apps/github-explore',
    //     },
    //     {
    //       title: 'Github Discuss',
    //       key: 'extraAppsGithubDiscuss',
    //       url: '/extra-apps/github-discuss',
    //     },
    //     {
    //       title: 'Digitalocean Droplets',
    //       key: 'extraAppsDigitaloceanDroplets',
    //       url: '/extra-apps/digitalocean-droplets',
    //     },
    //     {
    //       title: 'Digitalocean Create',
    //       key: 'extraAppsDigitaloceanCreate',
    //       url: '/extra-apps/digitalocean-create',
    //     },
    //     {
    //       title: 'Google Analytics',
    //       key: 'extraAppsGoogleAnalytis',
    //       url: '/extra-apps/google-analytics',
    //     },
    //     {
    //       title: 'Wordpress Post',
    //       key: 'extraAppsWordpressPost',
    //       url: '/extra-apps/wordpress-post',
    //     },
    //     {
    //       title: 'Wordpress Posts',
    //       key: 'extraAppsWordpressPosts',
    //       url: '/extra-apps/wordpress-posts',
    //     },
    //     {
    //       title: 'Wordpress Add',
    //       key: 'extraAppsWordpressAdd',
    //       url: '/extra-apps/wordpress-add',
    //     },
    //     {
    //       title: 'Todoist List',
    //       key: 'extraAppsTodoistList',
    //       url: '/extra-apps/todoist-list',
    //     },
    //     {
    //       title: 'Jira Dashboard',
    //       key: 'extraAppsJiraDashboard',
    //       url: '/extra-apps/jira-dashboard',
    //     },
    //     {
    //       title: 'Jira Agile Board',
    //       key: 'extraAppsJiraAgileBoard',
    //       url: '/extra-apps/jira-agile-board',
    //     },
    //     {
    //       title: 'Helpdesk Dashboard',
    //       key: 'extraAppsHelpdeskDashboard',
    //       url: '/extra-apps/helpdesk-dashboard',
    //     },
    //   ],
    // },
    // {
    //   category: true,
    //   title: 'Components',
    // },
    // {
    //   title: 'Bootstrap',
    //   key: 'bootstrap',
    //   icon: 'fe fe-bookmark',
    //   url: '/ui-kits/bootstrap',
    // },
    // {
    //   title: 'Ant Design',
    //   key: 'antDesign',
    //   icon: 'fe fe-bookmark',
    //   url: '/ui-kits/antd',
    // },
    // {
    //   title: 'Widgets',
    //   key: 'widgets',
    //   icon: 'fe fe-image',
    //   count: 47,
    //   children: [
    //     {
    //       title: 'General',
    //       key: 'widgetsGeneral',
    //       url: '/widgets/general',
    //     },
    //     {
    //       title: 'Lists',
    //       key: 'widgetsLists',
    //       url: '/widgets/lists',
    //     },
    //     {
    //       title: 'Tables',
    //       key: 'widgetsTables',
    //       url: '/widgets/tables',
    //     },
    //     {
    //       title: 'Charts',
    //       key: 'widgetsCharts',
    //       url: '/widgets/charts',
    //     },
    //   ],
    // },
    // {
    //   title: 'Cards',
    //   key: 'cards',
    //   icon: 'fe fe-credit-card',
    //   children: [
    //     {
    //       title: 'Basic Cards',
    //       key: 'cardsBasicCards',
    //       url: '/cards/basic-cards',
    //     },
    //     {
    //       title: 'Tabbed Cards',
    //       key: 'cardsTabbedCards',
    //       url: '/cards/tabbed-cards',
    //     },
    //   ],
    // },
    // {
    //   title: 'Tables',
    //   key: 'tables',
    //   icon: 'fe fe-pie-chart',
    //   children: [
    //     {
    //       title: 'Bootstrap',
    //       key: 'tablesBootstrap',
    //       url: '/tables/bootstrap',
    //     },
    //     {
    //       title: 'Ant Design',
    //       key: 'tablesAntd',
    //       url: '/tables/antd',
    //     },
    //   ],
    // },
    //
    // {
    //   title: 'Charts',
    //   key: 'charts',
    //   icon: 'fe fe-home',
    //   children: [
    //     {
    //       title: 'Chartist.js',
    //       key: 'chartsChartistjs',
    //       url: '/charts/chartistjs',
    //     },
    //     {
    //       title: 'Chart.js',
    //       key: 'chartsChartjs',
    //       url: '/charts/chartjs',
    //     },
    //     {
    //       title: 'C3',
    //       key: 'chartsC3',
    //       url: '/charts/c3',
    //     },
    //   ],
    // },
    // {
    //   title: 'Icons',
    //   key: 'icons',
    //   icon: 'fe fe-star',
    //   children: [
    //     {
    //       title: 'Feather Icons',
    //       key: 'iconsFeatherIcons',
    //       url: '/icons/feather-icons',
    //     },
    //     {
    //       title: 'Fontawesome',
    //       key: 'iconsFontawesome',
    //       url: '/icons/fontawesome',
    //     },
    //     {
    //       title: 'Linearicons Free',
    //       key: 'iconsLineariconsFree',
    //       url: '/icons/linearicons-free',
    //     },
    //     {
    //       title: 'Icomoon Free',
    //       key: 'iconsIcomoonFree',
    //       url: '/icons/icomoon-free',
    //     },
    //   ],
    // },
    // {
    //   category: true,
    //   title: 'Advanced',
    // },
    // {
    //   title: 'Form Examples',
    //   key: 'formExamples',
    //   icon: 'fe fe-menu',
    //   url: '/advanced/form-examples',
    // },
    // {
    //   title: 'Email Templates',
    //   key: 'emailTemplates',
    //   icon: 'fe fe-mail',
    //   url: '/advanced/email-templates',
    // },
    // {
    //   title: 'Pricing Tables',
    //   key: 'pricingTables',
    //   icon: 'fe fe-command',
    //   url: '/advanced/pricing-tables',
    // },
    // {
    //   title: 'Invoice',
    //   key: 'invoice',
    //   icon: 'fe fe-file-text',
    //   url: '/advanced/invoice',
    // },
    // {
    //   title: 'Utilities',
    //   key: 'utilities',
    //   icon: 'fe fe-inbox',
    //   url: '/advanced/utilities',
    // },
    // {
    //   title: 'Grid',
    //   key: 'grid',
    //   icon: 'fe fe-grid',
    //   url: '/advanced/grid',
    // },
    // {
    //   title: 'Typography',
    //   key: 'typography',
    //   icon: 'fe fe-type',
    //   url: '/advanced/typography',
    // },
  ]
}
