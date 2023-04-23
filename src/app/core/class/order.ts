export type Discount = {
  percent: number;
  conditionQuantity: number;
}

export type Product = {
  id: number;
  name: string;
  price: number;
  discount: Discount[];
}

export type LineItem = {
  product: Product;
  quantity: number
}

interface IOrder {
  lineItemList: LineItem[];
}

export class Order implements IOrder {
  lineItemList: LineItem[] = [];

  constructor(data: LineItem[]) {
    this.lineItemList = [...data];
  }

  getOrder() {
    return this.lineItemList;
  }

  getLineItem(id: number) {
    return this.lineItemList.find((item: LineItem) => item.product.id === id);
  }

  addLineItem(lineItem: LineItem) {
    this.lineItemList.push(lineItem);
  }

  removeLineItem(id: number) {
    this.lineItemList = this.lineItemList.filter((item: LineItem) => item.product.id !== id );
  }

  removeOrder() {
    this.lineItemList = [];
  }

  getLineItemDiscount(lineItem: LineItem) {
    let discountMax = 0;
    lineItem.product.discount.forEach((discount: Discount) => {
      if (lineItem.quantity >= discount.conditionQuantity && discount.percent > discountMax) {
        discountMax = discount.percent;
      }
    });
    return discountMax;
  }

  getTotalPayment() {
    return this.lineItemList.reduce((sum, lineItem: LineItem) => {
      const discount = this.getLineItemDiscount(lineItem);
      return sum + lineItem.product.price * lineItem.quantity * (100 - discount) / 100;
    }, 0);
  }
}
