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

    // Pruebas con hooks: Se usa renderHook
    // Para crear un componente virtual, y ahí va a colocar el custom Hook
    // Los valores se pasan a la desestructuración result
    // NOTA: Realmente para esta prueba no hace falta extraer la función waitForNextUpdate,
    // pero afecta a la prueba siguiente
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGifs('One Punch')
    );

    // El valor actual (current) del custom hook se pasa a los valores del objeto
    const { data, loading } = result.current;

    // Ahora pueden verse los datos y por tanto podremos hacer aserciones
    //console.log(data, loading);

    // Realmente para esta prueba no hace falta, pero afecta a la prueba siguiente.
    // Esperamos a que se haga el update antes de que limpie cualquier cosa en el
    // customHook
    await waitForNextUpdate();

    // Aserciones
    expect(data).toEqual([]);
    expect(loading).toBe(true);

    // Esto funciona pero hay un inconveniente que se ha resuelto añadiendo el
    // waitForNextUpdate.
    // El problema es que se va a renderizar el hook useFetchGifs, pero eventualmente,
    // cuando ya se resuelva la información, se llama al setState.
    // Puede ser que el customHook ya no esté montado o que el componente ya no exista,
    // por lo cual, si se intenta hacer el setState de un componente que no está montado,
    // dará un error en consola.
  });

  test('debe de retornar un arreglo de imgs y el loading en false', async () => {
    // ¿Cómo espero a que se ejecute nuevamente el setState para obtener la información?
    // Se usa una de las funciones (waitForNextUpdate) que devuelve renderHook, pero cuidado
    // porque se ve afectado por otras pruebas.
    // Esta función regresa una promesa que no resuelve nada, pero que indica cuando sucedió
    // un cambio en el estado de nuestro customHook
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGifs('One Punch')
    );

    // Clave: antes de extraer la información se usa un await de esa función.
    await waitForNextUpdate();

    const { data, loading } = result.current;

    expect(data.length).toBe(10);
    expect(loading).toBe(false);

    // Notar que esta prueba no es tan sencilla porque en el customHook:
    // 1) Estamos inicializándolo
    // 2) Estamos disparando un efecto
    // 3) Estamos esperando a que se dispare alguna tarea síncrona
    // 4) Y se vuelve a cambiar nuevamente el estado
    // 5) Y cambiado el estado hacemos nuestras evaluaciones
  });
});
