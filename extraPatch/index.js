const express = require('express');
var cors = require('cors')
var morgan = require('morgan')
const path = require("path");
var fs = require('fs')
const bodyParser = require('body-parser')
var http = require('http');
var https = require('https');

var privateKey  = fs.readFileSync('./sslcert/privkey.pem');
var certificate = fs.readFileSync('sslcert/cert.pem');

var sslKey = fs.readFileSync('sslcert/aaitheantiquebake_com_key.txt');
var sslCert = fs.readFileSync('sslcert/aaitheantiquebake.com.ca-bundle');
var sslCa = fs.readFileSync('sslcert/aaitheantiquebake.com.crt');

const PartyAPI = require('./extraApi/party')
const PaytmAPI = require('./paytm/checksum')

const multer = require('multer')
// const bodyParser = require('body-parser')

const pool = require('./database/dbfile')

const PORT = process.env.PORT || 5000

const app = express();


app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(cors())

const directory = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(directory));

app.use(morgan('combined'))

app.use('/party', PartyAPI)
app.use('/paytm', PaytmAPI)

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome !'
    });
});

app.get("/cut_address/:cut_id",(req,res)=>{
    const id=req.params.cut_id;
    // console.log(id)
    pool.query('select * from address_public where cut_id=$1',[id],
    (error, results) => {
        if (error) {
            res.status(400).send({
                error: error.message
            });
        }
        res.status(200).json({
            success: "Working Fine",
            results: results.rows
        })
    }
)
})
app.get("/cut_addressbyid/:a_id",(req,res)=>{
    const id=req.params.a_id;
    // console.log(id)
    pool.query('select * from address_public where id=$1',[id],
    (error, results) => {
        if (error) {
            res.status(400).send({
                error: error.message
            });
        }
        res.status(200).json({
            success: "Working Fine",
            results: results.rows
        })
    }
)
})
app.post("/cut_address",(req,res)=>{
     const address=req.body;    
    pool.query('INSERT INTO address_public (city,country,latitude,longitude,line1,line2,states,cut_id,pincode) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[address.city, address.country,address.latitude,address.longitude,address.line1,address.line2,address.states,address.cut_id,address.pincode],
    (error, results) => {
        if (error) {
            res.status(400).send({
                error: error.message
            });
        }
        res.status(200).json({
            success: "Working Fine"            
        })
    }
)
})
app.post("/cut_address_up",(req,res)=>{
    const address=req.body;    
   pool.query('UPDATE address_public SET latitude=($1),longitude=($2) WHERE id = ($3)',[address.lat,address.long,address.add_id],
   (error, results) => {
       if (error) {
           res.status(400).send({
               error: error.message
           });
       }
       res.status(200).json({
           success: "Working Fine"            
       })
   }
)
})

app.get('/check', (req, res) => {
    pool.query('select * from document;',
        (error, results) => {
            if (error) {
                res.status(400).send({
                    error: error.message
                });
            }
            res.status(200).json({
                success: "Working Fine",
                results: results.rows
            })
        }
    )
});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('doc')


// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}



app.post('/upload', (req, res) => {
    console.log("Start Fine:")
    upload(req, res, function (err) {
        console.log("Inside Working Fine:")
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log("multerError:")
            console.log(err)
            res
                .status(500)
                .contentType("text/plain")
                .end("Oops! Unable to upload file!");
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log("gendrall Error:")
            console.log(err)
            res
                .status(500)
                .contentType("text/plain")
                .end(err);
        }

        // Everything went fine.
        if (req.file) {
            const { name } = req.body
            let docname = req.file.originalname
            let docpath = req.file.path
            let oldpath = __dirname + "/" + docpath
            let newPath = "/opt/tomcat/webapps/ROOT/moleculedocs/" + name + "/" + req.file.originalname
            let isExist = "/opt/tomcat/webapps/ROOT/moleculedocs/" + name 

            if (!fs.existsSync(isExist)){
                fs.mkdirSync(isExist, { recursive: true });
            }

            fs.rename(oldpath, newPath, function (err) {
                if (err) throw err
                console.log('Successfully renamed - AKA moved!')
            })


            res.status(200).json({
                success: "Image Uploaded.",
                docname,
                docpath,
                newPath,
                oldpath
            })
        }


    })

});


var credentials = {key: privateKey, cert: certificate};

var sslOptions = {
    key: sslKey,
    cert: sslCert,
    ca: sslCa
}

var nodeSSl = {
    pfx: fs.readFileSync('sslcert/aaitheantique_com.pfx'),
    passphrase: 'softwidersapps'
}

var httpServer = http.createServer(app);
var httpsServer = https.createServer(nodeSSl, app);

httpServer.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)});
httpsServer.listen(8443);

