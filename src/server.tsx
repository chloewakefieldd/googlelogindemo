import path from 'path';
import fs from 'fs';
import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App';

const port = process.env.PORT || 8080;
const app = express();

// for IBM cloud
app.enable('trust proxy');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function handleRender(req, res): void {
  const html = renderToString(<App />);

  fs.readFile(`public/main.html`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const document = data.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${html}</div>`
    );
    res.send(document);
  });
}

function handle404(req, res): void {
  res.status(404).send('<h1>404 Not Found</h1>');
}

app.use((req, res, next) => {
  if (req.secure || process.env.BLUEMIX_REGION === undefined) {
    next();
  } else {
    console.log('redirecting to https');
    res.redirect('https://' + req.headers.host + req.url);
  }
});
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', handleRender);
app.get('*', handle404);

app.post('/', function (req: any, res) {
  console.log("START req", req.body);
});

app.listen(port, () => console.log(`listening on port ${port}`));
