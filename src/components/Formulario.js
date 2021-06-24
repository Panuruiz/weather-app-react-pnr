import React, { useState } from 'react'
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    

    // State de error
    const [ error, guardarError ] = useState(false);

    // extraer ciudad y país
    const {city, country} = busqueda;

    // funcion que coloca los elementos en el state
    const handleChange = e => {
        // actualizar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }

    // Cuando el usuario da submit al form
    const handleSubmit = e => {
        e.preventDefault();

        // Validar
        if(city.trim() === '' || country.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        guardarConsultar(true);
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="All fields are required" /> : null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={handleChange}
                />
                <label htmlFor="city">City: </label>
            </div>
            <div className="input-field col s12">
                <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={handleChange}
                >
                    <option value="">-- Pick a Country--</option>
                    <option value="US">United States</option>
                    <option value="ES">Spain</option>
                    <option value="PT">Portugal</option>
                    <option value="DE">Germany</option>
                    <option value="AT">Austria</option>
                    <option value="CH">Switzerland</option>
                    <option value="FR">France</option>
                    <option value="MX">Mexico</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="PE">Peru</option>

                </select>
                <label htmlFor="country">Country: </label>
            </div>
            <div className="input-field col s12">
                <input 
                    type="submit"
                    value="Get Weather"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                    />
            </div>
        </form>
     );
}
 
Formulario.propTypes = {
    busqueda : PropTypes.object.isRequired,
    guardarBusqueda : PropTypes.func.isRequired,
    guardarConsultar : PropTypes.func.isRequired,
}

export default Formulario;