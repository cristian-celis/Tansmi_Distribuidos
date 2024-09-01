const express = require('express');
const app = express();
app.use(express.json());

let buses = {};

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

app.post('/buses', (req, res) => {
    const { plate } = req.body;

    if (!plate) {
        return res.status(400).send('La placa es requerida.');
    }

    const normalizedPlate = plate.toUpperCase(); // Convertir la placa a mayusculas
    const arrivalTime = new Date().toISOString(); // Obtener tiempo llegada

    if (buses[normalizedPlate]) {
        buses[normalizedPlate].arrivalTime = arrivalTime;
        buses[normalizedPlate].edits += 1;
        res.send(`Bus con placa ${normalizedPlate} actualizado a las ${arrivalTime}.`);
    } else {
        buses[normalizedPlate] = { arrivalTime, edits: 0 };
        res.send(`Bus con placa ${normalizedPlate} registrado a las ${arrivalTime}.`);
    }

});

app.delete('/buses/:plate', (req, res) => {
    const plate = req.params.plate.toUpperCase();

    if (buses[plate]) {
        delete buses[plate];
        res.send(`Bus con placa ${plate} eliminado.`);
    } else {
        res.status(404).send('Bus no encontrado.');
    }
});

app.get('/buses/:plate', (req, res) => {
    const plate = req.params.plate.toUpperCase()

    if (buses[plate]) {
        res.send(`El bus con placa ${plate} ha sido editado ${buses[plate].edits} veces.`);
    } else {
        res.status(404).send('Bus no encontrado.');
    }
});
