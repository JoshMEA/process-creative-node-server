const { createServer } = require('http');
const fs = require('fs');
const path = require('path');

const textList = fs.readFileSync(`${__dirname}/text.txt`, 'utf-8').split('\n')

const contentTypeDict = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.ico': 'image/x-icon'
}

const getContentType = filepath => contentTypeDict[path.extname(filepath)]

const routes = {
    '/': (res) => {

        const filePath = `${__dirname}/site/index.html`;

        const markup = fs.readFileSync(filePath);
        const contentType = getContentType(filePath);

        res.setHeader('Content-Type', contentType);

        res.write(markup);
        res.end();
    },

    '/api/get-text': (res) => {

        const getRand = Math.floor(Math.random() * textList.length);

        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: textList[getRand] }));
        res.end()
    },

    '/static': (res, url) => {
        fs.readFile(`${__dirname}/site/${url}`, 'utf8', (err, data) => {

            const contentType = getContentType(url);

            res.setHeader('Content-Type', contentType);

            if (err) res.statusCode = 404;
            else res.write(data)
            res.end();

        });
    }
}


const handleReqs = (req, res) => {

    const handler = routes[req.url] ? routes[req.url] : routes['/static'];
    handler(res, req.url);

}





createServer(handleReqs)
    .listen(3000, () => console.log('Server started'));

