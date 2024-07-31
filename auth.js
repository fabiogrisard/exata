async function authenticateWithFingerprint() {
    if (!window.PublicKeyCredential) {
        alert('Seu navegador não suporta autenticação por impressão digital.');
        return false;
    }

    try {
        const options = {
            challenge: new Uint8Array(32), // Este valor deve ser gerado pelo servidor
            timeout: 60000,
            allowCredentials: [{
                id: new Uint8Array(16), // Este valor deve ser gerado pelo servidor
                type: 'public-key',
                transports: ['usb', 'nfc', 'ble', 'internal']
            }],
            userVerification: 'preferred'
        };

        const assertion = await navigator.credentials.get({ publicKey: options });

        // Envie a resposta para o servidor para verificação
        const response = await fetch('/verify-assertion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(assertion)
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Erro na autenticação por impressão digital:', error);
        return false;
    }
}
