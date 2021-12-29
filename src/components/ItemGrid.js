import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

const ItemGrid = ({ items }) => (
  <ItemsGrid>
    {items.map((item, i) => (
      <ItemStyles key={item.name + i}>
        <p>
          <span className="mark">{item.name}</span>
        </p>
        <img
          width="500"
          height="400"
          src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
          alt={item.name}
          style={{
            backround: `url(${item.image.asset.metadata.lqip})`,
            backgroundSize: 'cover',
          }}
        />
      </ItemStyles>
    ))}
  </ItemsGrid>
);

export default ItemGrid;
