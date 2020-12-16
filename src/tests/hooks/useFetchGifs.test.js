import { renderHook } from '@testing-library/react-hooks';
import { useFetchGifs } from '../../hooks/useFetchGifs';

// Aquí no se va a hacer un match con el snapshot porque no se renderiza nada
describe('Pruebas en el hook useFetchGifs', () => {
  test('debe de retornar el estado inicial', async () => {
    // Esto no funciona por el momento
    // El error que da es:
    // Invalid hook call. Hooks can only be called inside of the body of a
    // function component
    //const { data, loading } = useFetchGifs('One Punch');

    // Para crear un componente virtual, y ahí va a colocar el custom Hook
    // Los valores se pasan a la desestructuración result
    // NOTA: Realmente para esta prueba no hace falta el waitForNextUpdate, pero afecta a
    // la prueba siguiente
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGifs('One Punch')
    );

    // El valor actual (current) del custom hook se pasa a los valores del objeto
    const { data, loading } = result.current;

    // Ahora pueden verse los datos y por tanto podremos hacer aserciones
    //console.log(data, loading);

    // Realmente para esta prueba no hace falta, pero afecta a la prueba siguiente
    await waitForNextUpdate();

    // Aserciones
    expect(data).toEqual([]);
    expect(loading).toBe(true);
  });

  test('debe de retornar un arreglo de imgs y el loading en false', async () => {
    // ¿Cómo espero a que se ejecute nuevamente el setState para obtener la información?
    // Se usa waitForNextUpdate, pero cuidado porque se ve afectado por otras pruebas
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGifs('One Punch')
    );

    await waitForNextUpdate();

    const { data, loading } = result.current;

    expect(data.length).toBe(10);
    expect(loading).toBe(false);
  });
});
