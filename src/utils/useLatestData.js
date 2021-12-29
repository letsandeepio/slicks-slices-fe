import { useEffect, useState } from 'react';

const details = `
  
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
  
`;

const useLatestData = () => {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${details}
              }
              hotslices {
                ${details}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setHotSlices(res.data.StoreSettings.hotslices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((error) => console.log(error));
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
};

export default useLatestData;
