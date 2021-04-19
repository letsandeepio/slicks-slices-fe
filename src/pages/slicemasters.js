import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SliceMasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SliceMasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
`;

const SliceMastersPage = ({ data }) => {
  const slicemasters = data.slicemasters.nodes;

  return (
    <>
      <SliceMasterGrid>
        {slicemasters.map((slicemaster) => (
          <SliceMasterStyles key={slicemaster.id}>
            <Link to={`/slicemasters/${slicemaster.slug.current}`}>
              <h2>
                <span className="mark">{slicemaster.name}</span>
              </h2>
            </Link>
            <Img fluid={slicemaster.image.asset.fluid} />
            <p className="description">{slicemaster.description}</p>
          </SliceMasterStyles>
        ))}
      </SliceMasterGrid>
    </>
  );
};

export default SliceMastersPage;

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        description
        id
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
