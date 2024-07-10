<template>
    <div>
        <h1>Conversor a dólares</h1>

        <p>Ingrese monto $ <input type="number" id="pesos" v-model.number="pesos" placeholder="Ingrese monto en pesos">
        </p>

        <p>Valor del dolar en $ <input type="number" id="dolares" v-model.number="dolares" placeholder="Ingrese monto en dolares"> 
            - Actualización 
            <input type="checkbox" id="checkbox" v-model="checked"> 
            <b>{{ this.tiempoActualizacion }}</b>
        </p>

        <p> Valor convertido USD {{ conversor.valorConvertido }}</p>
    </div>
</template>

<script>
import ConversorService from '@/services/ConversorService';

export default {
    name: 'src-componentes-conversor',
    props: [],
    mounted() {
    },
    data() {
        return {
            pesos: '',
            dolares: '',
            valorConvertido: '',
            checked: false,
            tiempoActualizacion: '',
            intervalId: null,
        }
    },
    watch: {
        checked(val) {
            if (val) {
                this.empezarCotiInterval();
            } else {
                this.detenerCotiInterval();
                this.limpiarPantalla();
            }
        }
    },
    methods: {
        async obtenerCotizacion() {
            const valor_blue = await ConversorService.obtenerCotizacionDolarBlue();
            this.dolares = valor_blue.value_sell;
            this.tiempoActualizacion = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
        },       
        limpiarPantalla() {
            this.tiempoActualizacion = '';
        },
        empezarCotiInterval() {
            this.obtenerCotizacion();
            this.intervalId = setInterval(this.obtenerCotizacion, 2000);
        },
        detenerCotiInterval() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
    },
    computed: {
        conversor() {
            let valorConvertido = this.pesos && this.dolares ? (this.pesos / this.dolares).toFixed(2) : ''
            return {
                valorConvertido
            }
        }
    }
}


</script>

<style scoped lang="css"></style>