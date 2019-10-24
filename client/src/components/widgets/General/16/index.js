import React from 'react'
import style from './style.module.scss'

class General16 extends React.Component {
  componentWillMount() {
    const { isFavorite } = this.props

    this.setState({
      isFavorite,
    })
  }

  setFavorite = e => {
    e.preventDefault()
    const { isFavorite } = this.state
    this.setState({
      isFavorite: !isFavorite,
    })
  }

  render() {
    const { isNew, image, name, price, oldPrice } = this.props

    const { isFavorite } = this.state

    return (
      <div className="card overflow-hidden">
        <div hidden={!isNew} className={style.new}>
          New
        </div>
        <div className="card-body">
          <a
            className={`${style.favorite} ${isFavorite ? 'text-dark' : 'text-gray-3'}`}
            href="#"
            onClick={this.setFavorite}
          >
            <i className="fe fe-heart font-size-21" />
          </a>
          <div className={`${style.image} border-bottom height-250 mb-3`}>
            <img className="img-fluid" src={image} alt={name} />
          </div>
          <div className="font-size-24 font-weight-bold text-dark mb-2">
            {price}{' '}
            <del hidden={!oldPrice} className="align-text-top font-size-14">
              {oldPrice}
            </del>
          </div>
          <div>
            <a href="javascript:void(0);" className="text-blue font-size-18">
              {name}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default General16
