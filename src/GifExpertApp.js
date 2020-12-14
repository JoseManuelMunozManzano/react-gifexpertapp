import React, { useState } from 'react';

import AddCategory from './components/AddCategory';
import GifGrid from './components/GifGrid';

const GifExpertApp = () => {
  const [categories, setCategories] = useState(['Dragon Ball']);

  // const handleAdd = () => {
  //   // Forma más usual
  //   //setCategories([...categories, 'Spiderman']);

  //   // Otra forma muy útil
  //   // Un callback en el que el primer argumento es el valor del estado anterior
  //   // y en el que se regresa el nuevo estado
  //   setCategories(cats => [...cats, 'Spiderman']);
  // };

  return (
    <>
      <h2>GifExpertApp</h2>
      <AddCategory setCategories={setCategories} />
      <hr />

      <ol>
        {categories.map(category => (
          // El key no puede ser el índice y tiene que ser único
          <GifGrid key={category} category={category} />
        ))}
      </ol>
    </>
  );
};

export default GifExpertApp;
