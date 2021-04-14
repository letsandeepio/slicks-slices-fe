import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';

const PizzasPage = ({ data }) => (
  <>
    <p>There are {data.pizzas.nodes.length} pizzas</p>
    <PizzaList pizzas={data.pizzas.nodes} />
  </>
);

export default PizzasPage;

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
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
