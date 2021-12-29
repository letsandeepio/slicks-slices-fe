const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
export default {
  siteMetadata: {
    title: 'Slicks Slices - Pizza',
    siteUrl: 'http://gatsby.pizza',
    description: 'best pizza in toronto',
    twitter: '@letsandeepio',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'uok2o1jx',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
