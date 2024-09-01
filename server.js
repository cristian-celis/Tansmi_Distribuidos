const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar datos del formulario


class BusManager {
    constructor() {
        this.buses = {};
    }

    // Método para formatear la fecha y hora
    getFormattedDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    
    registerOrUpdateBus(plate) {
        const normalizedPlate = plate.toUpperCase();
        const arrivalTime = this.getFormattedDate();

        if (this.buses[normalizedPlate]) {
            this.buses[normalizedPlate].arrivalTime = arrivalTime;
            this.buses[normalizedPlate].edits += 1;
            return `Bus con placa ${normalizedPlate} actualizado a las ${arrivalTime}.`;
        } else {
            this.buses[normalizedPlate] = { arrivalTime, edits: 0 };
            return `Bus con placa ${normalizedPlate} registrado a las ${arrivalTime}.`;
        }
    }

    
    deleteBus(plate) {
        const normalizedPlate = plate.toUpperCase();

        if (this.buses[normalizedPlate]) {
            delete this.buses[normalizedPlate];
            return `Bus con placa ${normalizedPlate} eliminado.`;
        } else {
            return 'Bus no encontrado.';
        }
    }

    
    searchBus(plate) {
        const normalizedPlate = plate.toUpperCase();

        if (this.buses[normalizedPlate]) {
            return `El bus con placa ${normalizedPlate} ha sido editado ${this.buses[normalizedPlate].edits} veces.`;
        } else {
            return 'Bus no encontrado.';
        }
    }
}


const busManager = new BusManager();

// Servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para registrar o actualizar un bus
app.post('/buses', (req, res) => {
    const { plate } = req.body;

    if (!plate) {
        return res.status(400).send('La placa es requerida.');
    }

    const result = busManager.registerOrUpdateBus(plate);
    res.send(result);
});

// Ruta para eliminar un bus
app.delete('/buses/:plate', (req, res) => {
    const result = busManager.deleteBus(req.params.plate);
    res.send(result);
});

// Ruta para buscar un bus
app.get('/buses/:plate', (req, res) => {
    const result = busManager.searchBus(req.params.plate);
    res.send(result);
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
