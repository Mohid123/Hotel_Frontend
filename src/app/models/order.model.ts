import { Menu } from "./menu.model";

export class Order {
  cardNo?: string;
  address?: string;
  buyerName?: string;
  quantity?: string;
  crust?: string;
  topping?: string;
  sauce?: string;
  meatToppings?: string;
  size?: string;
  cashPayment?: string;
  expiryDate?: string

  setModel(_model: unknown) {
    const model = _model as Order;
    this.address = model.address || '';
    this.buyerName = model.buyerName || '';
    this.cardNo = model.cardNo || '';
    this.quantity = model.quantity || '';
    this.crust = model.crust || '';
    this.topping = model.topping || '';
    this.sauce = model.sauce || '';
    this.meatToppings = model.meatToppings || '';
    this.size = model.size || '';
    this.cashPayment = model.cashPayment || '';
    this.expiryDate = model.expiryDate || '';
  }
}
