const express = require('express');
const app = express();

// support parsing of application/json type post data
app.use(express.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded());

// Subscribe server to a particular port
app.listen(port, () => console.log(`Server running on port ${port}...`))

