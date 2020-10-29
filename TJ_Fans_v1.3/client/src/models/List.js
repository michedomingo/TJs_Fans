import Product from './Product';

export default class List {
  /**
   *
   * @param {string} _id
   * @param {string} user
   * @param {number} timestamp
   * @param {Array} products
   * @param {string} listName
   */
  constructor({ _id, user, timestamp, products, listName }) {
    this._id = _id;
    this._user = user;
    this._timestamp = timestamp;
    this._products = products.map((product) => new Product(product));
    this._listName = listName;
  }

  /**
   * @return {string}
   */
  getId = () => this._id;

  /**
   * @return {string}
   */
  getUser = () => this._user;

  /**
   * @return {number}
   */
  getTimestamp = () => this._timestamp;

  /**
   * @return {Product[]}
   */
  getProducts = () => this._products;

  /**
   * @return {number}
   */
  getTotalPrice = () =>
    this._products.reduce((sum, product) => sum + product.getPrice(), 0);

  /**
   * @return {string}
   */
  getFormattedTotalPrice = () => `$${String(this.getTotalPrice() / 100)}`;

  /**
   * @return {string}
   */
  getList = () => this._listName;
}
