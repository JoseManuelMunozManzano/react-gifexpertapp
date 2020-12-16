import getFetchGifs from '../../helpers/getFetchGifs';

describe('Pruebas con getFetchGifs', () => {
  test('debe de traer 10 elementos', async () => {
    const gifs = await getFetchGifs('One Punch');

    expect(gifs.length).toBe(10);
  });

  test('debe de traer 0 elementos si se manda sin categoría', async () => {
    const gifs = await getFetchGifs('');

    //console.log(gifs);

    expect(gifs.length).toBe(0);
  });
});
