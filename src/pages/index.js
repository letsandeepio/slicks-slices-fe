import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid, ItemsGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

const CurrentlySlicing = ({ slicemasters }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Sicemasters on</span>
    </h2>
    <p>On standby to take your orders!</p>
    {!slicemasters && <LoadingGrid count={4} />}
    {slicemasters && !slicemasters?.length && (
      <p>No one is working right now!</p>
    )}
    {slicemasters?.length && <ItemGrid items={slicemasters} />}
  </div>
);

const HotSlices = ({ hotSlices }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Hot Pizzas Rigth now</span>
    </h2>
    <p>Getting served right out of the oven!</p>
    {!hotSlices && <LoadingGrid count={4} />}{' '}
    {hotSlices && !hotSlices?.length && <p>No pizza</p>}
    {hotSlices?.length && <ItemGrid items={hotSlices} />}
  </div>
);

const HomePage = () => {
  const { slicemasters, hotSlices } = useLatestData();

  return (
    <>
      <div className="center">
        <h1>The Best Pizza in Downtown!</h1>
        <p>Open 11 AM to 11 PM Every Single Day</p>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
};

export default HomePage;
