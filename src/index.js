import "babel-polyfill";
import app from './app';
let port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log("Server is running now on port " + port + '.......')
})