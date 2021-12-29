/* eslint-disable jsx-a11y/label-has-associated-control */
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import PizzaOrder from '../components/PizzaOrder';
import SEO from '../components/SEO';
import MenuItemStyles from '../styles/MenuItemStyles';
import { OrderStyles } from '../styles/OrderStyles';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';

const OrderPage = ({ data }) => {
  const { values, updateValues } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  });

  const pizzas = data.pizzas.nodes;

  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });

  if (message) return <p>{message}</p>;

  return (
    <>
      <SEO title="Order a Pizza" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValues}
          />
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={values.email}
            onChange={updateValues}
          />

          <input
            type="text"
            name="mapleSyrup"
            id="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValues}
            className="mapleSyrup"
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => addToOrder({ id: pizza.id, size })}
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div>{error && <p>Error: {error}</p>}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
};

export default OrderPage;

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
