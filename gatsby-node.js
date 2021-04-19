import path from 'path';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  // 1. Get the template
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  console.log('=======creating pages====');

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current
      }
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  const toppingTemplate = path.resolve('./pages/pizzas.js');
  const { data } = graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
};

export const createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params)
  ]);
};
