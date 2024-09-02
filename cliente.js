const SERVER_URL = 'http://localhost:3000'; 
const PORT = 3000; 

      
        function registerBus(event) {
            event.preventDefault();
            const plate = document.getElementById('plate').value.toUpperCase();
            fetch(`${SERVER_URL}/buses/${plate}` , {method:'POST'})
                .then(response => response.text())
                .then(data => document.getElementById('result').innerText = data)
                .catch(error => console.error('Error:', error));
        }


        function deleteBus(event) {
            event.preventDefault();
            const plate = document.getElementById('plate_delete').value.toUpperCase();
            fetch(`${SERVER_URL}/buses/${plate}`, { method: 'DELETE' })
                .then(response => response.text())
                .then(data => document.getElementById('result').innerText = data)
                .catch(error => console.error('Error:', error));
        }

        function searchBus(event) {
            event.preventDefault();
            const plate = document.getElementById('plate_search').value.toUpperCase();
            fetch(`${SERVER_URL}/buses/${plate}`)
                .then(response => response.text())
                .then(data => document.getElementById('result').innerText = data)
                .catch(error => console.error('Error:', error));
        }


