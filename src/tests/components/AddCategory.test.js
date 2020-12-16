import { shallow } from 'enzyme';
import AddCategory from '../../components/AddCategory';

describe('Pruebas en <AddCategory />', () => {
  // Usando jest ahora puedo saber si la función fue
  // llamada, cuantas veces se llamó...
  const setCategories = jest.fn();
  // Aquí se inicializa para tener acceso a la ayuda de vSCode
  let wrapper = shallow(<AddCategory setCategories={setCategories} />);

  beforeEach(() => {
    // Limpiar todos los mocks (simulaciones) al inicio de cada prueba
    jest.clearAllMocks();
    wrapper = shallow(<AddCategory setCategories={setCategories} />);
  });

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de cambiar la caja de texto', () => {
    const input = wrapper.find('input');
    const value = 'Hola Mundo';

    input.simulate('change', { target: { value } });

    expect(wrapper.find('p').text().trim()).toBe(value);
  });

  test('NO debe de postear la información con submit', () => {
    // simulamos el submit y mandamos la función vacía preventDefault()
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(setCategories).not.toHaveBeenCalled();
  });

  test('debe de llamar a setCategories y limpiar la caja de texto', () => {
    // 1. simular el inputChange
    const value = 'Hola Mundo';
    wrapper.find('input').simulate('change', { target: { value } });

    // 2. simular el submit
    // inputValue ya se ha informado al simular el inputChange
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    // 3. setCategories se debe haber llamado 1 vez y que se le haya llamado
    //    con cualquier tipo de función
    expect(setCategories).toHaveBeenCalledTimes(1);
    expect(setCategories).toHaveBeenCalledWith(expect.any(Function));

    // 4. el valor del input debe ser ''
    const inputValue = wrapper.find('input').prop('value');
    expect(inputValue).toBe('');
  });
});
