/* eslint-disable arrow-body-style */
import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';

const SliceMasterPage = ({ data: { person } }) => {
  return (
    <div className="center">
      <Img fluid={person.image.asset.fluid} />
      <h2>
        <span className="mark">{person.name}</span>
      </h2>
      <p>{person.description}</p>
    </div>
  );
};

export default SliceMasterPage;

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;