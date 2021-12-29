import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => (
  <>
    <p>You have {order.length} items in your order!</p>
    {order.map((singleOrder, index) => {
      const pizza = pizzas.find((item) => item.id === singleOrder.id);
      return (
        <MenuItemStyles key={`${pizza.id}-${index}`}>
          <Img fluid={pizza.image.asset.fluid} />
          <h2>{pizza.name}</h2>
          <p>
            {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
          </p>
          <button
            type="button"
            className="remove"
            title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
            onClick={() => removeFromOrder(index)}
          >
            &times;
          </button>
        </MenuItemStyles>
      );
    })}
  </>
);

export default PizzaOrder;
