import { Menu } from "./menu.model";

export class Order extends Menu {
  cardNo?: string;
  address?: string;
  buyerName?: string;
  quantity?: string;

  setModel(_model: unknown) {
    const model = _model as Order;
    this.category = model.category;
    this.address = model.address || '';
    this.buyerName = model.buyerName || '';
    this.cardNo = model.cardNo || '';
    this.quantity = model.quantity || '';
    this.itemName = model.itemName || '';
    this.price = model.price || '';
  }
}
