import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import Switch from 'react-router-transition-switch'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import Layout from 'layouts'
import Loader from 'components/layout/Loader'
import NotFoundPage from 'pages/system/404'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

const routes = [
  // Schedules
  {
    path: '/schedules/create',
    Component: loadable(() => import('pages/schedules/create-schedule')),
    exact: true,
  },
  {
    path: '/schedules/list',
    Component: loadable(() => import('pages/schedules/schedules-list')),
    exact: true,
  },
  {
    path: '/schedules/messaging',
    Component: loadable(() => import('pages/schedules/messaging')),
    exact: true,
  },
  // Dashboards
  {
    path: '/dashboard/analytics',
    Component: loadable(() => import('pages/dashboard/analytics')),
    exact: true,
  },
  {
    path: '/dashboard/statistics',
    Component: loadable(() => import('pages/dashboard/statistics')),
    exact: true,
  },
  {
    path: '/dashboard/ecommerce',
    Component: loadable(() => import('pages/dashboard/ecommerce')),
    exact: true,
  },
  {
    path: '/dashboard/crypto',
    Component: loadable(() => import('pages/dashboard/crypto')),
    exact: true,
  },
  {
    path: '/dashboard/jira',
    Component: loadable(() => import('pages/dashboard/jira')),
    exact: true,
  },
  {
    path: '/dashboard/helpdesk',
    Component: loadable(() => import('pages/dashboard/helpdesk')),
    exact: true,
  },
  {
    path: '/system/500',
    Component: loadable(() => import('pages/system/500')),
    exact: true,
  },
  // Ecommerce
  {
    path: '/ecommerce/dashboard',
    Component: loadable(() => import('pages/ecommerce/dashboard')),
    exact: true,
  },
  {
    path: '/ecommerce/orders',
    Component: loadable(() => import('pages/ecommerce/orders')),
    exact: true,
  },
  {
    path: '/ecommerce/product-catalog',
    Component: loadable(() => import('pages/ecommerce/product-catalog')),
    exact: true,
  },
  {
    path: '/ecommerce/product-details',
    Component: loadable(() => import('pages/ecommerce/product-details')),
    exact: true,
  },
  {
    path: '/ecommerce/cart',
    Component: loadable(() => import('pages/ecommerce/cart')),
    exact: true,
  },
  // Apps
  {
    path: '/apps/messaging',
    Component: loadable(() => import('pages/apps/messaging')),
    exact: true,
  },
  {
    path: '/apps/calendar',
    Component: loadable(() => import('pages/apps/calendar')),
    exact: true,
  },
  {
    path: '/apps/mail',
    Component: loadable(() => import('pages/apps/mail')),
    exact: true,
  },
  {
    path: '/apps/profile',
    Component: loadable(() => import('pages/apps/profile')),
    exact: true,
  },
  {
    path: '/apps/gallery',
    Component: loadable(() => import('pages/apps/gallery')),
    exact: true,
  },
  // Extra Apps
  {
    path: '/extra-apps/github-explore',
    Component: loadable(() => import('pages/extra-apps/github-explore')),
    exact: true,
  },
  {
    path: '/extra-apps/github-discuss',
    Component: loadable(() => import('pages/extra-apps/github-discuss')),
    exact: true,
  },
  {
    path: '/extra-apps/digitalocean-droplets',
    Component: loadable(() => import('pages/extra-apps/digitalocean-droplets')),
    exact: true,
  },
  {
    path: '/extra-apps/digitalocean-create',
    Component: loadable(() => import('pages/extra-apps/digitalocean-create')),
    exact: true,
  },
  {
    path: '/extra-apps/google-analytics',
    Component: loadable(() => import('pages/extra-apps/google-analytics')),
    exact: true,
  },
  {
    path: '/extra-apps/wordpress-post',
    Component: loadable(() => import('pages/extra-apps/wordpress-post')),
    exact: true,
  },
  {
    path: '/extra-apps/wordpress-posts',
    Component: loadable(() => import('pages/extra-apps/wordpress-posts')),
    exact: true,
  },
  {
    path: '/extra-apps/wordpress-add',
    Component: loadable(() => import('pages/extra-apps/wordpress-add')),
    exact: true,
  },
  {
    path: '/extra-apps/todoist-list',
    Component: loadable(() => import('pages/extra-apps/todoist-list')),
    exact: true,
  },
  {
    path: '/extra-apps/jira-dashboard',
    Component: loadable(() => import('pages/extra-apps/jira-dashboard')),
    exact: true,
  },
  {
    path: '/extra-apps/jira-agile-board',
    Component: loadable(() => import('pages/extra-apps/jira-agile-board')),
    exact: true,
  },
  {
    path: '/extra-apps/helpdesk-dashboard',
    Component: loadable(() => import('pages/extra-apps/helpdesk-dashboard')),
    exact: true,
  },
  // Widgets
  {
    path: '/widgets/general',
    Component: loadable(() => import('pages/widgets/general')),
    exact: true,
  },
  {
    path: '/widgets/lists',
    Component: loadable(() => import('pages/widgets/lists')),
    exact: true,
  },
  {
    path: '/widgets/tables',
    Component: loadable(() => import('pages/widgets/tables')),
    exact: true,
  },
  {
    path: '/widgets/charts',
    Component: loadable(() => import('pages/widgets/charts')),
    exact: true,
  },
  // Cards
  {
    path: '/cards/basic-cards',
    Component: loadable(() => import('pages/cards/basic-cards')),
    exact: true,
  },
  {
    path: '/cards/tabbed-cards',
    Component: loadable(() => import('pages/cards/tabbed-cards')),
    exact: true,
  },
  // UI Kits
  {
    path: '/ui-kits/bootstrap',
    Component: loadable(() => import('pages/ui-kits/bootstrap')),
    exact: true,
  },
  {
    path: '/ui-kits/antd',
    Component: loadable(() => import('pages/ui-kits/antd')),
    exact: true,
  },
  // Tables
  {
    path: '/tables/bootstrap',
    Component: loadable(() => import('pages/tables/bootstrap')),
    exact: true,
  },
  {
    path: '/tables/antd',
    Component: loadable(() => import('pages/tables/antd')),
    exact: true,
  },
  {
    path: '/contacts',
    Component: loadable(() => import('pages/contacts')),
    exact: true,
  },
  {
    path: '/contacts/import',
    Component: loadable(() => import('pages/contacts/import')),
    exact: true,
  },
  // Charts
  {
    path: '/charts/chartistjs',
    Component: loadable(() => import('pages/charts/chartistjs')),
    exact: true,
  },
  {
    path: '/charts/chartjs',
    Component: loadable(() => import('pages/charts/chartjs')),
    exact: true,
  },
  {
    path: '/charts/c3',
    Component: loadable(() => import('pages/charts/c3')),
    exact: true,
  },
  // Icons
  {
    path: '/icons/feather-icons',
    Component: loadable(() => import('pages/icons/feather-icons')),
    exact: true,
  },
  {
    path: '/icons/fontawesome',
    Component: loadable(() => import('pages/icons/fontawesome')),
    exact: true,
  },
  {
    path: '/icons/linearicons-free',
    Component: loadable(() => import('pages/icons/linearicons-free')),
    exact: true,
  },
  {
    path: '/icons/icomoon-free',
    Component: loadable(() => import('pages/icons/icomoon-free')),
    exact: true,
  },
  // Advanced
  {
    path: '/advanced/form-examples',
    Component: loadable(() => import('pages/advanced/form-examples')),
    exact: true,
  },
  {
    path: '/advanced/email-templates',
    Component: loadable(() => import('pages/advanced/email-templates')),
    exact: true,
  },
  {
    path: '/advanced/utilities',
    Component: loadable(() => import('pages/advanced/utilities')),
    exact: true,
  },
  {
    path: '/advanced/grid',
    Component: loadable(() => import('pages/advanced/grid')),
    exact: true,
  },
  {
    path: '/advanced/typography',
    Component: loadable(() => import('pages/advanced/typography')),
    exact: true,
  },
  {
    path: '/advanced/pricing-tables',
    Component: loadable(() => import('pages/advanced/pricing-tables')),
    exact: true,
  },
  {
    path: '/advanced/invoice',
    Component: loadable(() => import('pages/advanced/invoice')),
    exact: true,
  },
  // System Pages
  {
    path: '/system/login',
    Component: loadable(() => import('pages/system/login')),
    exact: true,
  },
  {
    path: '/system/forgot-password',
    Component: loadable(() => import('pages/system/forgot-password')),
    exact: true,
  },
  {
    path: '/system/register',
    Component: loadable(() => import('pages/system/register')),
    exact: true,
  },
  {
    path: '/system/lockscreen',
    Component: loadable(() => import('pages/system/lockscreen')),
    exact: true,
  },
  {
    path: '/system/404',
    Component: loadable(() => import('pages/system/404')),
    exact: true,
  },
  {
    path: '/phone_numbers',
    Component: loadable(() => import('pages/phone')),
    exact: true,
  },
  {
    path: '/phone_numbers/add',
    Component: loadable(() => import('pages/phone/add')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({ settings })

@connect(mapStateToProps)
class Router extends React.Component {
  render() {
    const {
      history,
      settings: { routerAnimation },
    } = this.props
    return (
      <ConnectedRouter history={history}>
        <Layout>
          <Switch
            render={props => {
              const {
                children,
                location: { pathname },
              } = props
              return (
                <SwitchTransition>
                  <CSSTransition
                    key={pathname}
                    classNames={routerAnimation}
                    timeout={routerAnimation === 'none' ? 0 : 300}
                  >
                    {children}
                  </CSSTransition>
                </SwitchTransition>
              )
            }}
          >
            <Route exact path="/" render={() => <Redirect to="/dashboard/analytics" />} />
            {routes.map(({ path, Component, exact }) => (
              <Route path={path} key={path} exact={exact}>
                <Component />
              </Route>
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </ConnectedRouter>
    )
  }
}

export default Router
