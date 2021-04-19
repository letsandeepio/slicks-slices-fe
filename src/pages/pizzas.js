import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingFilter from '../components/ToppingFilter';

const PizzasPage = ({ data, pageContext }) => (
  <>
    <ToppingFilter activeTopping={pageContext.topping} />
    <p>There are {data.pizzas.nodes.length} pizzas</p>
    <PizzaList pizzas={data.pizzas.nodes} />
  </>
);

export default PizzasPage;

export const query = graphql`
  query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
