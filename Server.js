const http = require('http')
const fs = require('fs');

const Server = http.createServer(
    (req, res) => {
        console.log(req.url, req.method);

        res.setHeader('Content-Type', 'text/html');

        let path =  './views/';

        switch (req.url){
            case '/':
                path += 'index.html';
                res.statusCode = 200;
                break;
            
            case '/about':
                path += 'about.html';
                res.statusCode = 200;
                break;

            default:
                path += '/error.html';
                res.statusCode = 404;
                break;

        }
        
        fs.readFile(path, (err, data) => {
            if(err){
                console.log(err);
                res.end()
            }else{
                //res.write(data)
                res.end(data);
                 }
        })
    

    });


Server.listen(3000, 'LocalHost', ()=>{
    console.log('Listening for Request on port 3000')
})