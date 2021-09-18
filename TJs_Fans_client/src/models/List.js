import Product from './Product';

export default class List {
  /**
   *
   * @param {string} _id
   * @param {string} user
   * @param {number} timestamp
   * @param {Array} products
   * @param {Object} listName
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
  getListName = () => String(this._listName.title);

  /**
   * @return {string}
   */
  getListNotes = () => String(this._listName.notes);

  getData = () => ({
    _id: this._id,
    user: this._user,
    timestamp: this._timestamp,
    products: this._products.map((_) => _.getDate()),
    listName: this._listName,
  });
}
