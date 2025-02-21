/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    name: 'welcome',
    icon: 'SunFilled',
    path: '/welcome',
    component: 'Welcome',
  },
  
  // 项目管理
  {
    path: '/project-manage',
    name: '项目管理',
    icon: 'project',
    routes: [
      {
        path: '/project-manage/create',
        name: 'create',
        component: './project-manage/create',
        hideInMenu: true,
      },
      {
        path: '/project-manage/projectinfo',
        name: '项目设置',
        routes: [
          {
            path: '/project-manage/projectinfo/members',
            name: '项目配置修改',
            component: './project-manage/projectinfo/members',
          },
          {
            path: '/project-manage/projectinfo/federated-queues',
            name: '联邦队列管理',
            component: './project-manage/projectinfo/federated-queues',
          },
          {
            path: '/project-manage/projectinfo/app-queues',
            name: '应用队列管理',
            component: './project-manage/projectinfo/app-queues',
          },
        ],
      },
      {
        path: '/project-manage/queues-apply',
        name: '联邦队列申请',
        component: './project-manage/queues-apply',
      },
    ],
  },

  // 联邦日志解析
  {
    path: '/federated-log',
    name: 'federated-log',
    icon: 'ContainerOutlined',
    routes: [
      {
        path: '/federated-log/tasks',
        name: 'tasks',
        component: './federated-log/tasks',
      },
      {
        path: '/federated-log/task-create',
        name: 'task-create',
        hideInMenu: true,
        layout: false,
        component: './federated-log/task-create',
      },
      {
        path: '/federated-log/task/:id',
        name: 'task-detail',
        component: './federated-log/tasks/detail',
        hideInMenu: true,
      },
      {
        path: '/federated-log/templates',
        name: 'templates',
        component: './federated-log/templates',
      },
    ],
  },

  // 模型训练
  {
    path: '/model-training',
    name: 'model-training',
    icon: 'experiment',
    routes: [
      {
        path: '/model-training/code-repo',
        name: 'code-repo',
        component: './model-training/code-repo',
      },
      {
        path: '/model-training/training-tasks',
        name: 'training-tasks',
        component: './model-training/training-tasks',
      },
      {
        path: '/model-training/task-create',
        name: 'task-create',
        hideInMenu: true,
        component: './model-training/task-create',
      },
      {
        path: '/model-training/models',
        name: 'models',
        component: './model-training/models',
      },
    ],
  },

  // 异常检测服务
  {
    path: '/detection-service',
    name: 'detection-service',
    icon: 'DeploymentUnitOutlined',
    routes: [
      {
        path: '/detection-service/encoding-tasks',
        name: 'encoding-tasks',
        component: './detection-service/encoding-tasks',
      },
      {
        path: '/detection-service/detection-deploy',
        name: 'detection-deploy',
        component: './detection-service/detection-deploy',
      },
      {
        path: '/detection-service/gray-release',
        name: 'gray-release',
        component: './detection-service/gray-release',
      },
    ],
  },

  // 监控中心
  {
    path: '/monitoring',
    name: 'monitoring',
    icon: 'dashboard',
    routes: [
      {
        path: '/monitoring/dashboard',
        name: 'dashboard',
        component: './monitoring/dashboard',
      },
      {
        path: '/monitoring/alarm-config',
        name: 'alarm-config',
        component: './monitoring/alarm-config',
      },
      {
        path: '/monitoring/log-investigation',
        name: 'log-investigation',
        component: './monitoring/log-investigation',
        hideInMenu: true,
      },
    ],
  },

  // 个人中心
  {
    path: '/user',
    name: 'user',
    icon: 'user',
    routes: [
      {
        path: '/user/notifications',
        name: 'notifications',
        component: './user/notifications',
      },
      {
        path: '/user/access-requests',
        name: 'access-requests',
        component: './user/access-requests',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/user/login',
    layout: false,
    name: 'login',
    component: './account/login',
    hideInMenu: true,
    hideInBreadcrumb: true,
    hideInTab: true,
    routes: [
      {
        path: '/user/login',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: '404',
    path: '/*',
  },
];