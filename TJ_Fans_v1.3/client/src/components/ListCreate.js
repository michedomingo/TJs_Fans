import React from 'react';
import Product from '../models/Product';
import ProductCard from './product/ProductCard';
import { PrimaryButton } from './Button';

class ListCreate extends React.Component {
  render() {
    if (this.props.items.length > 0) {
      return (
        <div>
          {this.props.items
            .map((item) => new Product(item))
            .map((item, index) => (
              <ProductCard
                key={`${item.getId()}_${index}`}
                name={item.getProductName()}
                images={item.getImages()}
                price={item.getFormattedPrice()}
                withRemoveButton
                onRemove={() => this.props.removeFromList(index)}
              />
            ))}
          <PrimaryButton onClick={this.props.startList}>
            Save List
          </PrimaryButton>
        </div>
      );
    } else {
      return (
        <p>
          Your list is empty. Plan and budget your TJ's shopping by adding items
          to your list! ✨
        </p>
      );
    }
  }
}

export default ListCreate;
