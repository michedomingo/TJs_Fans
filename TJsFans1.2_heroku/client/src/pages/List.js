import React, { Component } from 'react';
import './List.css';
import Product from '../models/Product';
import ProductCard from '../components/product/ProductCard';
import { PrimaryButton } from '../components/Button';

export default class List extends Component {
  render() {
    return (
      <div className='List'>
        <h2>My List</h2>
        {this.props.items.length > 0 ? (
          <div>
            {this.props.items
              .map((item) => new Product(item))
              .map((item) => (
                <ProductCard
                  key={item.getId()}
                  name={item.getName()}
                  images={item.getImages()}
                  price={item.getFormattedPrice()}
                />
              ))}
            <PrimaryButton>View All Lists</PrimaryButton>
          </div>
        ) : (
          <p>
            Plan and budget your TJ's shopping by adding items to your list! ✨
          </p>
        )}
      </div>
    );
  }
}
