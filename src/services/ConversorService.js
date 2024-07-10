import axios from 'axios'

const API_BASE_URL = 'https://api.bluelytics.com.ar/v2/latest';

const ConversorService = {

    async obtenerCotizacionDolarBlue(){
        try{
            const response = await axios.get(API_BASE_URL);
            return response.data.blue
        }catch (error){
            console.error('Error obteniendo valor del dolar:', error);
            throw error;
        }
    }
}

export default ConversorService;