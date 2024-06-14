const mainUrl = "https://tarea-3-nicolasbarriav.onrender.com";
const graph = ['Producto más comprado', 'Categoría de producto más popular', 'Cliente que ha realizado más compras', 'Cantidad total gastada por el cliente que más ha gastado', 'Calificación promedio de los productos comprados', 'Distribución de los métodos de pago utilizados', 'Ciudad con más compras realizadas', 'Tasa de devoluciones (cancelaciones) de productos', 'Peso promedio de los productos comprados', 'Ventas a lo largo del tiempo'];

window.onload = async function () {
    await fetchOrders()
    .then((data) =>{
        console.log(data);
        
        var char = data[0];
        
        var keys = Object.keys(char[0]);
        var xx = [];
        var yy = [];
        for (let i = 0; i < char.length; i++) {
            const element = char[i];
            xx.push(element[keys[0]]);
            yy.push(element[keys[1]]);
        }
        var d = {
            labels: xx,
            datasets: [{
                label: graph[0],
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Color de las barras
                borderColor: 'rgba(54, 162, 235, 1)', // Borde de las barras
                borderWidth: 1,
                data: yy // Cantidad de ventas por mes
        }]
        };
        var config = {
            type: 'bar', // Tipo de gráfico horizontal
            data: d,
            options: {
                indexAxis: 'y', // Eje X horizontal, Y vertical
                scales: {
                    y: {
                        beginAtZero: true // Empezar el eje X desde cero
                    }
                }
            }
        };
        gr(0, config);
    
        char = data[1];
        keys = Object.keys(char[0]);
        var x = [];
        var y = [];
        for (let i = 0; i < char.length; i++) {
            const element = char[i];
            x.push(element[keys[0]]);
            y.push(element[keys[1]]);
        }
        d = {
            labels: y,
            datasets: [{
                label: graph[1],
                backgroundColor: 'rgba(74, 142, 210, 0.5)', // Color de las barras
                borderColor: 'rgba(74, 142, 210, 1)', // Borde de las barras
                borderWidth: 1,
                data: x // Cantidad de ventas por mes
        }]
        };
        config = {
            type: 'bar', // Tipo de gráfico horizontal
            data: d,
            options: {
                indexAxis: 'x', // Eje X horizontal, Y vertical
                scales: {
                    y: {
                        beginAtZero: true // Empezar el eje X desde cero
                    }
                }
            }
        };
        gr(1, config);
    
        char = data[2];
        keys = Object.keys(char[0]);
        x = [];
        y = [];
        for (let i = 0; i < char.length; i++) {
            const element = char[i];
            x.push(element[keys[0]]);
            y.push(element[keys[1]]);
        }
        d = {
            labels: y,
            datasets: [{
                label: graph[2],
                backgroundColor: 'rgba(84, 162, 115, 0.5)', // Color de las barras
                borderColor: 'rgba(84, 162, 115, 1)', // Borde de las barras
                borderWidth: 1,
                data: x // Cantidad de ventas por mes
        }]
        };
        config = {
            type: 'bar', // Tipo de gráfico horizontal
            data: d,
            options: {
                indexAxis: 'y', // Eje X horizontal, Y vertical
                scales: {
                    y: {
                        beginAtZero: true // Empezar el eje X desde cero
                    }
                }
            }
        };
        gr(2, config);
    
        char = data[3];
        keys = Object.keys(char[0]);
        x = [];
        y = [];
        for (let i = 0; i < char.length; i++) {
            const element = char[i];
            x.push(element[keys[0]]);
            y.push(element[keys[1]]);
        }
        d = {
            labels: y,
            datasets: [{
                label: graph[3],
                backgroundColor: 'rgba(84, 162, 115, 0.5)', // Color de las barras
                borderColor: 'rgba(84, 162, 115, 1)', // Borde de las barras
                borderWidth: 1,
                data: x // Cantidad de ventas por mes
        }]
        };
        config = {
            type: 'bar', // Tipo de gráfico horizontal
            data: d,
            options: {
                indexAxis: 'x', // Eje X horizontal, Y vertical
                scales: {
                    y: {
                        beginAtZero: true // Empezar el eje X desde cero
                    }
                }
            }
        };
        gr(3, config);
    
        char = data[4];
        keys = Object.keys(char[0]);
        x = [];
        y = [];
        for (let i = 0; i < char.length; i++) {
            const element = char[i];
            x.push(element[keys[0]]);
            y.push(element[keys[1]]);
        }
        d = {
            labels: x,
            datasets: [{
                label: graph[4],
                backgroundColor: 'rgba(84, 162, 115, 0.5)', // Color de las barras
                borderColor: 'rgba(84, 162, 115, 1)', // Borde de las barras
                borderWidth: 1,
                data: y // Cantidad de ventas por mes
        }]
        };
        config = {
            type: 'bar', // Tipo de gráfico horizontal
            data: d,
            options: {
                indexAxis: 'x', // Eje X horizontal, Y vertical
                scales: {
                    y: {
                        beginAtZero: true // Empezar el eje X desde cero
                    }
                }
            }
        };
        gr(4, config);
    
        char = data[5];
        keys = Object.keys(char[0]);
        x = [];
        y = [];
        for (let i = 0; i < char.length; i++) {
            const element = char[i];
            x.push(element[keys[0]]);
            y.push(element[keys[1]]);
        }
        d = {
            labels: x,
            datasets: [{
                label: graph[5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ], // Color de las barras
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
                data: y // Cantidad de ventas por mes
        }]
        };
        config = {
            type: 'pie', // Tipo de gráfico horizontal
            data: d,
            options: {
                indexAxis: 'y', // Eje X horizontal, Y vertical
                scales: {
                    x: {
                        beginAtZero: true // Empezar el eje X desde cero
                    }
                }
            }
        };
        gr(5, config);

        char = data[6];
        keys = Object.keys(char[0]);
        x = [];
        y = [];
        for (let i = 0; i < char.length; i++) {
            const element = char[i];
            x.push(element[keys[0]]);
            y.push(element[keys[1]]);
        }
        d = {
            labels: x,
            datasets: [{
                label: graph[6],
                backgroundColor: [
                    'rgba(55, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(200, 106, 86, 1)',
                    'rgba(75, 192, 152, 1)',
                    'rgba(153, 202, 255, 1)'
                ], // Color de las barras
                borderColor: [
                    'rgba(55, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(200, 106, 86, 1)',
                    'rgba(75, 192, 152, 1)',
                    'rgba(153, 202, 255, 1)'
                ],
                borderWidth: 1,
                data: y // Cantidad de ventas por mes
        }]
        };
        config = {
            type: 'pie', // Tipo de gráfico horizontal
            data: d,
            options: {
                indexAxis: 'y', // Eje X horizontal, Y vertical
                scales: {
                    x: {
                        beginAtZero: true // Empezar el eje X desde cero
                    }
                }
            }
        };
        gr(6, config);

        char = data[7];
        keys = Object.keys(char[0]);
        x = [];
        y = [];
        for (let i = 0; i < char.length; i++) {
            const element = char[i];
            x.push(element[keys[0]]);
            y.push(element[keys[1]]);
        }
        d = {
            labels: x,
            datasets: [{
                label: graph[7],
                backgroundColor: 'rgba(255, 99, 132, 0.5)', // Color de las barras
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: y // Cantidad de ventas por mes
        }]
        };
        config = {
            type: 'bar', // Tipo de gráfico horizontal
            data: d,
            options: {
                indexAxis: 'x', // Eje X horizontal, Y vertical
                scales: {
                    y: {
                        beginAtZero: true // Empezar el eje X desde cero
                    }
                }
            }
        };
        gr(7, config);


        char = data[8];
        keys = Object.keys(char[0]);
        x = [];
        y = [];
        for (let i = 0; i < char.length; i++) {
            const element = char[i];
            x.push(element[keys[0]]);
            y.push(element[keys[1]]);
        }
        d = {
            labels: x,
            datasets: [{
                label: graph[8],
                backgroundColor: 'rgba(255, 99, 132, 0.5)', // Color de las barras
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: y // Cantidad de ventas por mes
        }]
        };
        config = {
            type: 'bar', // Tipo de gráfico horizontal
            data: d,
            options: {
                indexAxis: 'x', // Eje X horizontal, Y vertical
                scales: {
                    y: {
                        beginAtZero: true // Empezar el eje X desde cero
                    }
                }
            }
        };
        gr(8, config);
    
        char = data[9];
        keys = Object.keys(char[0]);
        x = [];
        y = [];
        for (let i = 0; i < char.length; i++) {
            const element = char[i];
            x.push(element[keys[0]]);
            y.push(element[keys[1]]);
        }
        d = {
            labels: x,
            datasets: [{
                label: graph[9],
                backgroundColor: 'rgba(255, 99, 132, 0.5)', // Color de las barras
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: y // Cantidad de ventas por mes
        }]
        };
        config = {
            type: 'line', // Tipo de gráfico horizontal
            data: d,
            options: {
                indexAxis: 'x', // Eje X horizontal, Y vertical
                scales: {
                    y: {
                        beginAtZero: true // Empezar el eje X desde cero
                    }
                }
            }
        };
        gr(9, config);
    }
    );
}

// Get data from Orders
async function fetchOrders(){
    const response = (await fetch(mainUrl+'/a')).json();
    return response;
}

function gr (id, config){
    var grafico = new Chart(
        document.getElementById(id),
        config
    );
}
