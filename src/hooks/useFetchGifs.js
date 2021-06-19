import { useState, useEffect } from 'react';

import getFetchGifs from '../helpers/getFetchGifs';

export const useFetchGifs = category => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  // Los efectos no pueden ser async porque esperan algo síncrono
  // pero dentro si puede usarse la promesa con .then()
  useEffect(() => {
    getFetchGifs(category).then(imgs => {
      setState({
        data: imgs,
        loading: false,
      });
    });
  }, [category]); // Si no hay dependencias sólo se ejecutará una vez

  return state; // {data:[], loading: true}
};
