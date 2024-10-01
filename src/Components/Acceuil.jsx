
// const Acceuil = () => {
//     return(
//         // 
//         <div class="d-flex justify-content-center align-items-center" style={{ height: '85vh' }}>
//             <h1>Hello Hermenio</h1>
//         </div>

//     )
// }

// export default Acceuil;

import React, { useState, useEffect } from 'react';
import Loading from './Loading'; // Assurez-vous d'importer le composant Loading

const Acceuil = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de données
    setTimeout(() => {
      setData(['Élément 1', 'Élément 2', 'Élément 3']);
      setLoading(false);
    }, 2000); // Temps de chargement simulé
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
        <div class="d-flex justify-content-center align-items-center" style={{ height: '85vh' }}>
            <h1>Hello Hermenio</h1>
        </div>
  );
};

export default Acceuil;
