import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';

const PizzasPage = ({ data }) => (
  <>
    <p>There are {data.pizzas.nodes.length} pizzas in the lenght</p>
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
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
