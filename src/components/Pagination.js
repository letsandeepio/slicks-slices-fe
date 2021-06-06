import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: space-between;
  align-items: center;
  justify-items: center;
  justify-content: space-around;
  padding: 5px;
  border: solid 1px var(--grey);
  border-radius: 4px;
  & > * {
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

const Pagination = ({ pageSize, totalCount, currentPage, skip, base }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  console.log(currentPage);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`/${base}/${prevPage}`}>
        ⟵ Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link key={`link-${i}`} to={`/${base}/${i > 0 ? i + 1 : ''}`}>
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`/${base}/${nextPage}`}>
        Next ⟶
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
