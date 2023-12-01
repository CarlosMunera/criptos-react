import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Formulario from './components/Formulario'
import Resultado from "./components/Resultado";
import ImagenCripto from "./img/imagen-criptos.png";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;

  @media (min-width: 992px){
    margin-top: 80px;
  }
`;

const Acerca = styled.p`
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  color: #FFF;

  span{
    display: block;
    color:#66A2FE;  
    font-weight: 900;
  }

  @media (max-width: 992px){
    display: none;
  }
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {

  const [ monedas, setMonedas ] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(()=>{
    if (Object.keys(monedas).length > 0){
      const {moneda, criptomoneda} = monedas
      
      
      const cotizarCripto = async () => {

        setCargando(true)
        setResultado({})

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])

        setCargando(false)

      }
      cotizarCripto()

    }
  }, [monedas])

  return (
    <Contenedor>
      <div>
        <Imagen src={ImagenCripto} alt="imagenes criptomonedas" />
        <Acerca>Proyecto práctica desarrollado por: <span>Carlos Múnera</span></Acerca>
        
      </div>
      

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          setMonedas = {setMonedas}
        />
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado}/>}
        
      </div>
    </Contenedor>
  );
}

export default App;
