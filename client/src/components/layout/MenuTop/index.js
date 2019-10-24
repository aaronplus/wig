import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash'
import classNames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import style from './style.module.scss'

const mapStateToProps = ({ menu, settings }) => ({
  menuData: menu.menuData,
  settings,
  flyoutActive: !settings.isMobileView,
})

@withRouter
@connect(mapStateToProps)
class MenuTop extends React.Component {
  state = {
    activeSubmenu: '',
    activeItem: '',
    renderedFlyoutItems: {},
  }

  flyoutTimers = {}

  currentLocation = ''

  componentDidMount() {
    this.setActiveItems(this.props)
  }

  componentWillReceiveProps(newProps) {
    const { pathname } = newProps.location
    if (this.currentLocation !== pathname) {
      this.setActiveItems(newProps)
      this.currentLocation = pathname
    }
  }

  toggleSettings = () => {
    const { dispatch, settings } = this.props
    const { isSidebarOpen } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isSidebarOpen',
        value: !isSidebarOpen,
      },
    })
  }

  toggleMenu = () => {
    const { dispatch, settings } = this.props
    const { isMenuCollapsed } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMenuCollapsed',
        value: !isMenuCollapsed,
      },
    })
  }

  toggleMobileMenu = () => {
    const { dispatch, settings } = this.props
    const { isMobileMenuOpen } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMobileMenuOpen',
        value: !isMobileMenuOpen,
      },
    })
  }

  handleSubmenuClick = key => {
    const { activeSubmenu } = this.state
    const { flyoutActive } = this.props
    if (flyoutActive) {
      return
    }
    this.setState({
      activeSubmenu: activeSubmenu === key ? '' : key,
    })
  }

  handleFlyoutOver = (event, key, items) => {
    const { flyoutActive } = this.props
    if (flyoutActive) {
      clearInterval(this.flyoutTimers[key])
      const item = event.currentTarget
      const itemDimensions = item.getBoundingClientRect()
      const element = this.renderFlyoutMenu(items, key, itemDimensions)
      this.setState(state => ({
        renderedFlyoutItems: {
          ...state.renderedFlyoutItems,
          [key]: element,
        },
      }))
    }
  }

  handleFlyoutOut = key => {
    const { flyoutActive } = this.props
    if (flyoutActive) {
      this.flyoutTimers[key] = setTimeout(() => {
        this.setState(state => {
          delete state.renderedFlyoutItems[key]
          return {
            renderedFlyoutItems: {
              ...state.renderedFlyoutItems,
            },
          }
        })
      }, 100)
    }
  }

  handleFlyoutConteinerOver = key => {
    clearInterval(this.flyoutTimers[key])
  }

  renderFlyoutMenu = (items, key, itemDimensions) => {
    const { settings } = this.props
    const { activeItem } = this.state
    const left = `${itemDimensions.left + itemDimensions.width / 2}px`
    const top = `${itemDimensions.top + itemDimensions.height}px`

    return (
      <div
        style={{ left, top }}
        className={classNames(style.air__menuFlyout, {
          [style.air__menuFlyoutTop]: settings.menuLayoutType === 'top',
          [style.air__menuFlyout__black]: settings.flyoutMenuColor === 'dark',
          [style.air__menuFlyout__white]: settings.flyoutMenuColor === 'white',
          [style.air__menuFlyout__gray]: settings.flyoutMenuColor === 'gray',
        })}
        key={key}
      >
        <ul
          className={style.air__menuTop__list}
          onMouseEnter={() => this.handleFlyoutConteinerOver(key)}
          onMouseLeave={() => this.handleFlyoutOut(key)}
        >
          {items.map(item => {
            return (
              <li
                className={classNames(style.air__menuTop__item, {
                  [style.air__menuTop__item__active]: activeItem === item.key,
                })}
                key={item.key}
              >
                <Link to={item.url} className={style.air__menuTop__link}>
                  {item.icon && <i className={`${item.icon} ${style.air__menuTop__icon}`} />}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  setActiveItems = props => {
    const { menuData = [] } = props
    if (!menuData.length) {
      return
    }
    const flattenItems = (items, key) =>
      items.reduce((flattenedItems, item) => {
        flattenedItems.push(item)
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key))
        }
        return flattenedItems
      }, [])
    const activeItem = _.find(flattenItems(menuData, 'children'), ['url', props.location.pathname])
    const activeSubmenu = menuData.reduce((key, parent) => {
      if (Array.isArray(parent.children)) {
        parent.children.map(child => {
          if (child.key === activeItem.key) {
            key = parent
          }
          return ''
        })
      }
      return key
    })
    this.setState({
      activeItem: activeItem.key,
      activeSubmenu: activeSubmenu.key,
    })
  }

  generateMenuItems = () => {
    const { menuData = [] } = this.props
    const { activeSubmenu, activeItem } = this.state

    const menuItem = item => {
      const { key, title, icon, url } = item
      if (item.category) {
        return null
      }
      return (
        <li
          className={classNames(style.air__menuTop__item, {
            [style.air__menuTop__item__active]: activeItem === key,
          })}
          key={key}
        >
          {item.url && (
            <Link to={url} className={style.air__menuTop__link}>
              {icon && <i className={`${icon} ${style.air__menuTop__icon}`} />}
              <span>{title}</span>
            </Link>
          )}
          {!item.url && (
            <a href="javascript: void(0);" className={style.air__menuTop__link}>
              {icon && <i className={`${icon} ${style.air__menuTop__icon}`} />}
              <span>{title}</span>
            </a>
          )}
        </li>
      )
    }

    const submenuItem = item => {
      return (
        <li
          className={classNames(style.air__menuTop__item, style.air__menuTop__submenu, {
            [style.air__menuTop__submenu__active]: activeSubmenu === item.key,
          })}
          key={item.key}
        >
          <a
            href="javascript: void(0);"
            className={style.air__menuTop__link}
            onClick={() => this.handleSubmenuClick(item.key)}
            onMouseEnter={event => this.handleFlyoutOver(event, item.key, item.children)}
            onFocus={event => this.handleFlyoutOver(event, item.key, item.children)}
            onMouseLeave={() => this.handleFlyoutOut(item.key)}
            onBlur={() => this.handleFlyoutOut(item.key)}
          >
            <i className={`${item.icon} ${style.air__menuTop__icon}`} />
            <span>{item.title}</span>
            {item.count && (
              <span className="badge text-white bg-blue-light float-right mt-1 px-2">
                {item.count}
              </span>
            )}
          </a>
          <ul className={style.air__menuTop__list}>
            {item.children.map(sub => {
              if (sub.children) {
                return submenuItem(sub)
              }
              return menuItem(sub)
            })}
          </ul>
        </li>
      )
    }

    return menuData.map(item => {
      if (item.children) {
        return submenuItem(item)
      }
      return menuItem(item)
    })
  }

  render() {
    const { settings } = this.props
    const { renderedFlyoutItems } = this.state
    const items = this.generateMenuItems()
    return (
      <div>
        <TransitionGroup>
          {Object.keys(renderedFlyoutItems).map(item => {
            return (
              <CSSTransition key={item} timeout={0} classNames="air__menuFlyout__animation">
                {renderedFlyoutItems[item]}
              </CSSTransition>
            )
          })}
        </TransitionGroup>
        <div
          className={classNames(style.air__menuTop, {
            [style.air__menuTop__mobileToggled]: settings.isMobileMenuOpen,
            [style.air__menuTop__shadow]: settings.isMenuShadow,
            [style.air__menuTop__flyout]: true,
            [style.air__menuTop__blue]: settings.menuColor === 'blue',
            [style.air__menuTop__white]: settings.menuColor === 'white',
            [style.air__menuTop__gray]: settings.menuColor === 'gray',
            [style.air__menuFlyout__black]: settings.flyoutMenuColor === 'dark',
            [style.air__menuFlyout__white]: settings.flyoutMenuColor === 'white',
            [style.air__menuFlyout__gray]: settings.flyoutMenuColor === 'gray',
          })}
        >
          <div className={style.air__menuTop__outer}>
            <a
              href="javascript: void(0);"
              className={style.air__menuTop__mobileToggleButton}
              onClick={this.toggleMobileMenu}
            >
              <span />
            </a>
            <a href="javascript: void(0);" className={style.air__menuTop__logo}>
              <img src="resources/images/air-logo.png" alt="Air UI" />
              <div className={style.air__menuTop__logo__name}>AIR UI</div>
              <div className={style.air__menuTop__logo__descr}>Admin Template</div>
            </a>
            <div id="menu-left-container" className={style.air__menuTop__container}>
              <ul className={style.air__menuTop__list}>
                <li className={style.air__menuTop__item}>
                  <a
                    href="javascript: void(0);"
                    className={style.air__menuTop__link}
                    onClick={this.toggleSettings}
                  >
                    <i className={`fe fe-settings ${style.air__menuTop__icon}`} />
                    <span>Settings</span>
                  </a>
                </li>
                <li className={style.air__menuTop__item}>
                  <a
                    href="https://docs.airuitemplate.com/"
                    className={style.air__menuTop__link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`fe fe-compass ${style.air__menuTop__icon}`} />
                    <span>Documentation</span>
                  </a>
                </li>
                {items}
              </ul>
            </div>
          </div>
        </div>
        <a
          href="javascript: void(0);"
          className={style.air__menuTop__backdrop}
          onClick={this.toggleMobileMenu}
        />
      </div>
    )
  }
}

export default MenuTop
