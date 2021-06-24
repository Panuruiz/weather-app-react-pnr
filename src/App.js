import React, { Fragment, useState, useEffect } from "react";
import Header from './components/Header';
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  //  state del formulario
  const [ busqueda, guardarBusqueda ] = useState({
        city: '',
        country: ''
    });

    const [ consultar, guardarConsultar ] = useState(false);
    const [ resultado, guardarResultado ] = useState({});
    const [error, guardarError] = useState(false);

    // Extraer la información de la búsqueda
    const { city, country } = busqueda;

    useEffect(() => {
      const consultarAPI = async () => {

        if(consultar) {

          const appId = 'fe1afb77e8a5761425bbe9090e47a169';
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

          const respuesta = await fetch(url);
          const resultado = await respuesta.json();

          guardarResultado(resultado);
          guardarConsultar(false);

          // Detecta si hubo resultados correctos en la consulta
          if(resultado.cod === "404") {
              guardarError(true);
            } else {
              guardarError(false);
            }
          

        }
      }
      consultarAPI();
      // eslint-disable-next-line
    }, [consultar]);

    let componente;
    if(error) {
      componente = <Error mensaje="There's no results" />
    } else {
      componente = <Clima 
                      resultado={resultado}
                    />
    }
    
  return (
    <Fragment>
      <Header
        titulo={'Weather React App'}
      />
      <div className="contenedor-form">
        <div className="row">
          <div className="col m6 s12">
            <Formulario
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}

            />
          </div>
          <div className="col m6 s12">
              {componente}
          </div>
        </div>
      </div>
    </Fragment>
    );
  
}

export default App;
