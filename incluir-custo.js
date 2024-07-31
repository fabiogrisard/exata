document.getElementById('costForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const obra = document.getElementById('obra').value;
    const fornecedor = document.getElementById('fornecedor').value;
    const item = document.getElementById('item').value;
    const valor = document.getElementById('valor').value;
    const data = new Date().toISOString().split('T')[0]; // Data do dia no formato YYYY-MM-DD
    const pagador = 'Fabio';

    let planilha;
    let pasta;

    if (obra === 'jader') {
        planilha = '1EJJLa0woaPy_ToWZjw3VZW0dzcdh07C9VdnSYtjlXvM/edit?gid=2118632720';
        pasta = '1VZUKGZg8Yfv4bbCzgFxJ2p0VuL6EPCN0';
    }

    const dataToSend = {
        obra,
        fornecedor,
        item,
        valor,
        data,
        pagador,
        planilha,
        pasta
    };

    fetch('https://n8n.serranarealty.com.br/webhook/valores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (response.ok) {
            alert('Dados enviados com sucesso!');
        } else {
            alert('Falha ao enviar os dados.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar os dados.');
    });
});
