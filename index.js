var phonegap = require('connect-phonegap'),
    connect = require('connect'),
    app = connect();

app.use(phonegap());
app.listen(3000);