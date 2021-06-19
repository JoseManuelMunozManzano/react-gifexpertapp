import { shallow } from 'enzyme';
import GifGridItem from '../../components/GifGridItem';

describe('Pruebas en <GifGridItem />', () => {
  const title = 'Un título';
  const url = 'https://localhost/algo.jpg';
  const wrapper = shallow(<GifGridItem title={title} url={url} />);

  test('debe de mostrar el componente correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de tener un párrafo con el title', () => {
    const p = wrapper.find('p');
    expect(p.text().trim()).toBe(title);
  });

  test('debe de tener la imagen igual al url y alt de los props', () => {
    const img = wrapper.find('img');
    // Para ver los atributos como string
    //console.log(img.html());

    // Para ver los atributos como properties
    // Devuelve un objeto con esas propiedades.
    //console.log(img.props());

    // Y si quiero la imagen
    //console.log(img.props().src);

    // Si solo se quiere evaluar una propiedad se puede hacer
    //console.log(img.prop('src'));

    expect(img.prop('src')).toBe(url);
    expect(img.prop('alt')).toBe(title);
  });

  test('debe de tener la clase animate__fadeIn', () => {
    const div = wrapper.find('div');
    const className = div.props().className;

    // Ejemplo de negación
    expect(className.includes('animate__fadeIn')).not.toBe(false);
  });
});
