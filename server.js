const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = {};

app.post('/register-options', (req, res) => {
    const username = req.body.username;
    const userId = randomBytes(16).toString('hex');

    users[username] = {
        id: userId,
        credentials: []
    };

    const options = {
        challenge: randomBytes(32),
        rp: {
            name: "Exata Construções"
        },
        user: {
            id: Buffer.from(userId),
            name: username,
            displayName: username
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        timeout: 60000,
        attestation: "direct"
    };

    res.json(options);
});

app.post('/register-credential', (req, res) => {
    const username = req.body.username;
    const credential = req.body;

    if (!users[username]) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    users[username].credentials.push(credential);
    res.json({ status: 'ok' });
});

app.post('/verify-assertion', (req, res) => {
    const assertion = req.body;

    // Aqui você deve verificar a resposta da credencial
    // Isso geralmente envolve descriptografar e validar a resposta usando a chave pública armazenada

    res.json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
