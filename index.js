const {Storage} = require('@google-cloud/storage');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const db = require('./db');
const express = require('express');
require('dotenv').config();
var cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.listen(port, () => {
    console.log(`App listening  ${port}`)
})

app.get('/a', cors(corsOptions), async (req, res) => {
    // console.log(req);
    console.log('GET');
    res.send(await mn());
    console.log('END');
})

async function mn(){
    console.log('new dir');
    await new_dir();// crear carpeta
    console.log('reset');
    await reset ();// borrar db
    console.log('download');
    await listFiles('2024-1-tarea-3').catch(console.error);//descargar y guardar en base de datos
    console.log('chars');
    return await chars();
}

async function listFiles(bucketName) {
    const credsPath = path.join(__dirname, 'taller-integracion-310700-41f361102b8b.json');
    const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
    const storage = new Storage({credentials: creds});
    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles();
    await downloadFile(files);
}

async function downloadFile(csvFiles) {
    let orderList = [];
    for (const file of csvFiles) {
        const file_name = fileName(file.name);
        const end = file_name.slice(-3);
        let destination;
        if(end == 'csv'){
            destination = `./orders/${file_name}`;
        } else{
            destination = `./products/${file_name}`;
        }
        let csvData;
        await file.download({ destination }).then(()=>{
            if(end == 'csv'){
                fs.createReadStream(destination)
                .pipe(csv())
                .on('data', (row) => {
                csvData+= JSON.stringify(row);
                csvData+= "\n";
                })
                .on('end', () => {
                    // orderList = orderList.concat(verify(csvData.slice(9))); 
                    verify(csvData.slice(9));
                });
            } else{
                const product =  JSON.parse(fs.readFileSync(destination, 'utf8'));
                verifyP(product);
                // es una lista, no un objeti solo
            }
        });
    };
    return orderList;
}

function fileName(fn){
    if(!fn){
        return 0;
    }
    const regex = '/';
    const indexOfCharacter = fn.indexOf(regex);
    let new_name;
    if (indexOfCharacter !== -1) {
        let slicedString = fn.slice(indexOfCharacter);
        new_name = slicedString.replaceAll(regex, '_');
    } else {
        new_name = fn;
    }
    return new_name;
}

function verify(str){
    const ll = str.split("\n");
    for (let index = 0; index < ll.length; index++) {
        const lll = ll[index];
        if(lll== []){
            continue;
        }
        const l = lll.slice(2,(lll.length -2)); //quitar chars {," 
        const s = l.split('payment_installments');
        s[0]+= "payment_installments";
        if(s.length != 2){
            // console.log("ERROR largo s");
            // console.log(s);
            continue;
        }
        const rows = s[0].split(";");
        const data0 = s[1].split(";");
        let data = [];

        for (let index = 0; index < data0.length; index++) {
            let element;
            if(index == 0){
                element = data0[index].slice(3);//quitamos chars ":"
            }else{
                element = data0[index];
            }
            if(element != ''){
                data.push(element);
            }            
        }
        
        // DESCARTAR DATOS INCOMPLETOS
        if(rows.length !=21 || data.length !=21 || !data || !rows){
            // console.log("\tDATA CON FALTANTE");
            // console.log(data);
            continue;
        };
        data[0] = data[0].toString();
        data[1] = data[1].toString();
        data[2] = data[2].indexOf(":") != -1?  parseInt((data[2].split(":"))[0]):parseInt(data[2]);
        data[3] = data[3].indexOf(":") != -1? parseInt((data[3].split(":"))[0]):parseInt(data[3]);
        data[4] = parseInt(data[4]);
        data[5] = (data[5]).toString().slice(3,10);
        data[6] = parseInt(data[6]);
        data[7] = data[7].toString();
        data[8] = data[8].toString();
        data[9] = data[9].toString();
        data[10] = data[10].toString();
        data[11] = parseInt(data[11]);
        data[12] = parseInt(data[12]);
        data[13] = parseInt(data[13]);
        data[14] = parseInt(data[14]);
        data[15] = data[15].toString();
        data[16] = data[16].toString();
        data[17] = data[17].toString();
        data[18] = data[18].toString();
        data[19] = data[19].toString();
        data[20] = parseInt(data[20]);

        // db post order
        postOrder(data);
    }
    return 1;
}

function verifyP(obj){
    if (!obj){
        // console.log('no obj');
        // console.log(obj);
        return 0;
    }
    
    for (let index = 0; index < obj.length; index++) {
        const element = obj[index];    
        if(!(element['name']) || !(element['objectID'])){
            // console.log('no keys');
            // console.log(element);
            return 0;
        }

        obj[index]['name'] = element['name'].toString();
        obj[index]['objectID'] = element['objectID'].toString();

        postProduct(obj[index]);
    }
}


async function new_dir(){
    const dir_name = "orders";
    if(!fs.existsSync(dir_name)) {
        try{
            fs.mkdirSync(dir_name);
        }catch(error) {
            console.error(`[ERROR] new_dir create dir: ${error}`);
        }
    }else{
        try{
            fs.readdirSync(dir_name).forEach(async (file_name) => {
                const route = path.join(__dirname, `orders/${file_name}`);
                fs.unlinkSync(route);
            });
        }catch(error){
            console.error(`[ERROR] new_dir delete file: ${error}`);
        }
    }

    const dir_naame = "products";
    if(!fs.existsSync(dir_naame)) {
        try{
            fs.mkdirSync(dir_naame);
        }catch(error) {
            console.error(`[ERROR] new_dir create dir: ${error}`);
        }
    }else{
        try{
            fs.readdirSync(dir_naame).forEach(async (file_name) => {
                const route = path.join(__dirname, `products/${file_name}`);
                fs.unlinkSync(route);
            });
        }catch(error){
            console.error(`[ERROR] new_dir delete file: ${error}`);
        }
    }
}

function workData(){
    const dir = 'orders';
    try{
        fs.readdirSync(dir).forEach(async (file_name) => {
            const route = path.join(__dirname, `orders/${file_name}`);
            fs.readFile(route, 'utf8', (e,d) =>{
                if(e){
                    console.error('[ERROR] Reding csv file on workData: ', e);
                    return;
                }
                // console.log(d.split('\r\n'));
                const new_d = d.split('\r\n').slice(1);
                char1(new_d);
            });
        });
    }catch(error){
        console.error(`[ERROR] new_dir delete file: ${error}`);
    }
}

// db 
function postOrder(order){
    const qry = `select * from orders where id = '${order[0]}';`
    db.oneOrNone(qry,1)
    .then(data => {
        if(!data){
            const query = `INSERT INTO orders (id, customer_id, quantity, price_MRP, payment, timestamp, rating, product_Category, product_id, payment_type, order_status, p_weight, p_lenght, p_height, p_width, c_city, c_state, seller_id, seller_city, seller_state, payment_installments) values ('${order[0]}','${order[1]}',${order[2]},${order[3]},${order[4]},'${order[5]}',${order[6]},'${order[7]}','${order[8]}','${order[9]}','${order[10]}',${order[11]},${order[12]},${order[13]},${order[14]},'${order[15]}','${order[16]}','${order[17]}','${order[18]}','${order[19]}',${order[20]});`;
            db.any(query)
            .catch(error => {
                // console.log('Error postOrder:', error);
                {};
            });
        }
    })
    .catch(error => {
        // console.log('Error postOrder:', error);
        {};
    });
}

function postProduct(product){
    const qry = `select * from products where id = '${product['objectID']}';`
    db.oneOrNone(qry,1)
    .then(data => {
        if(!data){
            const query = `INSERT INTO products (id, name) values ('${product['objectID']}','${product['name']}');`;
            db.any(query)
            .catch(error => {
                // console.log('Error postProduct:', error);
                {};
            });
        }
    })
    .catch(error => {
        console.log('Error postProduct:', error);
    });
    
}

async function reset (){
    const query = `delete from orders *;`;
    const q = `delete from products *;`;
    db.any(query)
    .then(() => {
        db.any(q)
        .catch(error => {
            // console.log('Error postProduct:', error);
            {};
        });
    })
    .catch(error => {
        // console.log('Error postProduct:', error);
        {};
    });
}

// chars
async function chars(){

    const q2 = `select products.name as nombre, count.total as pago_total from products inner join (select sum(quantity) as total, product_id from orders group by product_id order by total desc) as count on products.id = count.product_id limit 10;`;
    const char2 = await db.any(q2)
    .catch(error => {
        // console.log('Error postProduct:', error);
        {};
    });

    const q3 = `select sum(quantity) as total, product_Category from orders group by product_Category order by total desc limit 5;`;
    const char3 = await db.any(q3)
    .catch(error => {
        // console.log('Error postProduct:', error);
        {};
    });

    const q4 = `select count(*) as compras, customer_id as cliente from orders group by customer_id order by compras desc limit 5;`;
    const char4 = await db.any(q4)
    .catch(error => {
        // console.log('Error postProduct:', error);
        {};
    });

    const q5 = `select sum(payment) as gastado, customer_id as cliente from orders group by customer_id order by gastado desc limit 5;`;
    const char5 = await db.any(q5)
    .catch(error => {
        // console.log('Error postProduct:', error);
        {};
    });

    const q6 = `select products.name as nombre, count.promedio as promedio from products inner join (select avg(rating) as promedio, product_id from orders group by product_id order by promedio desc) as count on products.id = count.product_id limit 10;`;
    const char6 = await db.any(q6)
    .catch(error => {
        // console.log('Error postProduct:', error);
        {};
    });

    const q7 = ` select payment_type, count(*) as cant  from orders group by payment_type order by  cant desc limit 5;`;
    const char7 = await db.any(q7)
    .catch(error => {
        // console.log('Error postProduct:', error);
        {};
    });

    const q8 = `select seller_city, count(*) as cant  from orders group by seller_city order by  cant desc limit 5;`;
    const char8 = await db.any(q8)
    .catch(error => {
        // console.log('Error postProduct:', error);
        {};
    });

    const q9 = `select order_status, count(*) as cantidad  from orders group by order_status;`;
    const char9 = await db.any(q9)
    .catch(error => {
        // console.log('Error postProduct:', error);
        {};
    });

    const q10 = `select products.name as nombre, count.promedio as peso from products inner join (select avg(p_weight) as promedio, product_id from orders group by product_id order by promedio desc) as count on products.id = count.product_id limit 10;`;
    const char10 = await db.any(q10)
    .catch(error => {
        // console.log('Error postProduct:', error);
        {};
    });

    const q11 = `select timestamp, count(*) as cant from orders group by timestamp order by to_Date(timestamp, 'MM-YYYY');`;
    const char11 = await db.any(q11)
    .catch(error => {
        // console.log('Error postProduct:', error);
        {};
    });

    return [char2,char3,char4,char5,char6,char7,char8,char9,char10,char11];
} 
