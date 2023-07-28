import React, { useState } from 'react'

export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '9a15ba5d1a2a095f93ad616b12732332'
    const difKelvin = 273.15;
    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) =>{
        setCiudad(e.target.value)

    }

    const heandleonSubmit = (e) => {
        e.preventDefault();
        if(ciudad.length > 0) fectClima(); 
    }

    const fectClima = async (e) => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
            const data = await response.json();
            setDataClima(data);
        } catch (error) {
            console.error('Ocurrio el siguiente Problema,' + error)
        } 
    }

  return (
    <div className='container'>
        <h1>Aplicacion de clima</h1>
        <form onSubmit={heandleonSubmit}>
            <input type="text" value={ciudad} onChange={handleCambioCiudad}/>
            <button type='submit'>Buscar</button>
        </form>

        {
            dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                <p> Temperatura: {parseInt(dataClima?.main.temp - difKelvin)} C</p>
                <p>Condicion Metereologica: {dataClima.weather[0].description}</p>
                <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                </div>
            )
        }
    </div>
  )
}
