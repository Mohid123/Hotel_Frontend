import { Menu } from "./menu.model";

export class Order extends Menu {
  cardNo?: string;
  address?: string;
  buyerName?: string;
  quantity?: string;
}
