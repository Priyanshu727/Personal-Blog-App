const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../config/db.js');
const cors = require('cors');
const postRoutes = require('../routes/postRoutes.js')


dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Personal Blog API!');
});

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err, "server is not started");
    } else {
        console.log(`listening on port: http://localhost:${PORT}`);

    }
});
