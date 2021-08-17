import mongoose from 'mongoose';

const url = "mongodb+srv://Kamal:12345@mernstack.wcunr.mongodb.net/CodeViewServer?retryWrites=true&w=majority"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connected To MongoDB Successfully.....!')
})
.catch((err) => console.log("No Connection", err));