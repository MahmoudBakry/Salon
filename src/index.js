import "babel-polyfill";
import app from './app';
import { server, serverHtps } from './app'
server.listen(3333, () => {
    console.log("Server is running now on port.. 3333 ")
})

serverHtps.listen(443, () => {
    console.log("server running on port 443......")
})