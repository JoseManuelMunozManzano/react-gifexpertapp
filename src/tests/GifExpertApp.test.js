import { shallow } from 'enzyme';
import GifExpertApp from '../GifExpertApp';

describe('Pruebas en <GifExpertApp />', () => {
  test('debe de mostrar el componente correctamente', () => {
    const wrapper = shallow(<GifExpertApp />);

    expect(wrapper).toMatchSnapshot();
  });

  // No hay manera específica de establecer un valor al useState.
  // El problema es que se pueden tener varios estados y no tienen un nombre por el que
  // poder referenciarlos.
  // Para hacer una evaluación y, por ejemplo saber si hay dos elementos y por tanto
  // deberían existir 2 GifGrid, se hace lo siguiente:
  // Se cambia el fuente GifExpertApp.js para que el props recibido sea un
  // defaultCategories = [] con una propiedad por defecto, y se cambia el useState
  // para que reciba ese defaultCategories. Este props no estará con propTypes
  // Ahora podemos establecer valores desde aquí
  test('debe de mostrar una lista de categorías', () => {
    const categories = ['One Punch', 'Dragon Ball'];
    const wrapper = shallow(<GifExpertApp defaultCategories={categories} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('GifGrid').length).toBe(categories.length);
  });
});
