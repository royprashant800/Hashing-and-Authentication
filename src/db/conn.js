const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authn', {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true

}).then(() => {
    console.log("connection successful");
}).catch(() => {
    console.log(error);
})