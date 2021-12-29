import React from 'react';
import useLatestData from '../utils/useLatestData';

const CurrentlySlicing = () => (
  <div>
    <p>Currenly Slicing Pizza masters</p>
  </div>
);

const HotSlices = () => (
  <div>
    <p>Currenly Hot Pizza</p>
  </div>
);

const HomePage = () => {
  const { slicemasters, hotSlices } = useLatestData();

  return (
    <>
      <div className="center">
        <h1>The Best Pizza in Downtown!</h1>
        <p>Open 11 AM to 11 PM Every Single Day</p>
        <div>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotSlices={hotSlices} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
