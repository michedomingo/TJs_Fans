import React, { Component } from 'react';
import './ListHistory.css';
import ProductCard from './product/ProductCard';

class ListHistory extends Component {
  render() {
    return (
      <div className='ListHistory'>
        <p className='ListHistoryId'>
          {this.props.list.getListName()}
          <br />
          <br />
          notes: {this.props.list.getListNotes()}
        </p>
        <div className='ListHistoryProducts'>
          {this.props.list.getProducts().map((product, index) => (
            <ProductCard
              key={`${product.getId()}_${index}`}
              name={product.getProductName()}
              images={product.getImages()}
              price={product.getFormattedPrice()}
            />
          ))}
          <p className='ListHistoryTotalPrice'>
            Average Price: {this.props.list.getFormattedTotalPrice()}
          </p>
        </div>
      </div>
    );
  }
}

export default ListHistory;
