export default class Product {
  /**
   *
   * @param {string} id
   * @param {string} productName
   * @param {number} priceAvg
   * @param {Array<string>} images
   */
  constructor({ _id, productName, priceAvg, images }) {
    this._id = _id;
    this._name = productName;
    this._price = priceAvg;
    this._images = images;
  }

  /**
   * @return {string}
   */
  getId = () => this._id;

  /**
   * @return {string}
   */
  getName = () => this._name;

  /**
   * @return {number}
   */
  getPrice = () => this._price;

  /**
   * @return {string}
   */
  getFormattedPrice = () => `$${String(this._price / 100)}`;

  /**
   * @return {Array<string>}
   */
  getImages = () => this._images;

  /**
   * @return {{_id: string, productName: string, priceAvg: number, formattedPrice: string, images: Array<string>}}
   */
  getData = () => ({
    _id: this._id,
    productName: this._name,
    priceAvg: this._price,
    formattedPrice: this.getFormattedPrice(),
    images: this._images,
  });
}
