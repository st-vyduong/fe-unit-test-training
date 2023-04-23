import { LineItem, Order } from './Order';

const lineItem1: LineItem = {
  product: {
    id: 1,
    name: 'apple',
    price: 10,
    discount: [
      {
        percent: 5,
        conditionQuantity: 1,
      },
      {
        percent: 10,
        conditionQuantity: 2,
      }
    ]
  },
  quantity: 2
};

const lineItem2: LineItem = {
  product: {
    id: 2,
    name: 'mango',
    price: 5,
    discount: [
      {
        percent: 5,
        conditionQuantity: 1,
      },
      {
        percent: 10,
        conditionQuantity: 2,
      }
    ]
  },
  quantity: 3
};

describe('test order', () => {
  describe('get order', () => {
    const order = new Order([lineItem1]);
    const ord = order.getOrder();
    test('get product success', () => {
      expect(ord).toHaveLength(1);
      expect(ord).toContain(lineItem1);
    });
  });

  describe('get product in order', () => {
    const order = new Order([lineItem1]);
    const product = order.getLineItem(1);
    test('get product in order success', () => {
      expect(product).toEqual(lineItem1);
    });
  });

  describe('add product', () => {
    const order = new Order([lineItem1]);
    order.addLineItem(lineItem2);
    test('add product success', () => {
      expect(order.getOrder()).toHaveLength(2);
      expect(order.getOrder()).toContain(lineItem1);
      expect(order.getOrder()).toContain(lineItem2);
    });
  });

  describe('remove product in order', () => {
    const order = new Order([lineItem1]);
    order.removeLineItem(1);
    test('remove product in order success', () => {
      expect(order.getOrder()).toHaveLength(0);
      expect(order.getOrder()).toEqual([]);
    });
  });

  describe('remove order', () => {
    const order = new Order([lineItem1]);
    order.removeOrder();
    test('remove order success', () => {
      expect(order.getOrder()).toHaveLength(0);
      expect(order.getOrder()).toEqual([]);
    });
  });

  describe('getTotalPayment', () => {
    const order = new Order([lineItem1]);
    test('getTotalPayment success', () => {
      expect(order.getTotalPayment()).toBe(18);
    });
    test('getTotalPayment after add new product', () => {
      order.addLineItem(lineItem2);
      expect(order.getTotalPayment()).toBe(31.5);
    });
  });
});
