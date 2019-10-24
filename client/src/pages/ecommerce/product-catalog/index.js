import React from 'react'
import { Helmet } from 'react-helmet'
import General16 from 'components/widgets/General/16'
import productsData from './data.json'

class EcommerceProductCatalog extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Ecommerce: Product Catalog" />
        <div className="air__utils__heading">
          <h5>Ecommerce: Product Catalog</h5>
        </div>
        <div className="row">
          {productsData.map(product => {
            const { isNew, isFavorite, image, name, price, oldPrice } = product
            return (
              <div className="col-xl-4 col-lg-6" key={Math.random()}>
                <General16
                  isNew={isNew}
                  isFavorite={isFavorite}
                  image={image}
                  name={name}
                  price={price}
                  oldPrice={oldPrice}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default EcommerceProductCatalog
