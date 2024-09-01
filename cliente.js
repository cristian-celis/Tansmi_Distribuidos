const SERVER_URL = 'http://localhost:3000'; 
const PORT = 3000; 

// Función para registrar o actualizar un bus
async function registerOrUpdateBus(plate) {
    try {
        const response = await fetch(`${SERVER_URL}/buses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ plate })
        });
        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error('Error al registrar/actualizar el bus:', error.message);
    }
}

// Función para eliminar un bus
async function deleteBus(plate) {
    try {
        const response = await fetch(`${SERVER_URL}/buses/${plate}`, {
            method: 'DELETE'
        });
        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error('Error al eliminar el bus:', error.message);
    }
}

// Función para buscar un bus
async function searchBus(plate) {
    try {
        const response = await fetch(`${SERVER_URL}/buses/${plate}`);
        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error('Error al buscar el bus:', error.message);
    }
}


