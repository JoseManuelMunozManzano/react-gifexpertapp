import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import GifGrid from '../../components/GifGrid';
import { useFetchGifs } from '../../hooks/useFetchGifs';

// Mock es fingir algo, en este caso para que el componente crea que ya tenemos la
// información con la data devuelta del custom Hook
jest.mock('../../hooks/useFetchGifs');

describe('Pruebas en <GifGrid />', () => {
  const category = 'One Punch';

  test('debe de mostrarse correctamente', () => {
    // Cuando se llame a useFetchGifs dentro del componente, lo que va a hacer es regresar
    // este valor.
    useFetchGifs.mockReturnValue({
      data: [],
      loading: true,
    });

    const wrapper = shallow(<GifGrid category={category} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de mostrar items cuando se cargan imágenes useFetchGifs', () => {
    const gifs = [
      {
        id: 'ABC',
        url: 'https://localhost/cualquier/cosa.jpg',
        title: 'Cualquier cosa',
      },
      {
        id: '123',
        url: 'https://localhost/cualquier/cosa.jpg',
        title: 'Cualquier cosa',
      },
    ];

    useFetchGifs.mockReturnValue({
      data: gifs,
      loading: false,
    });

    const wrapper = shallow(<GifGrid category={category} />);

    //expect(wrapper).toMatchSnapshot();
    // Si loading es false no debe aparecer Loading... (no debe existir el párrafo)
    expect(wrapper.find('p').exists()).toBe(false);
    // Evaluando cuantos componentes GifGridItem existen
    expect(wrapper.find('GifGridItem').length).toBe(gifs.length);
  });
});
