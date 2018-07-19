var phonegap = require('connect-phonegap'),
    express = require('express'),
    app = express();

app.use(phonegap());
app.listen(3000);