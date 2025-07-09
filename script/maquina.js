document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('maquina-form').addEventListener('submit', async function(e) {
        e.preventDefault();

        const placa_mae = document.getElementById('placa-mae').value.trim();
        const marca_processador = document.getElementById('marca-processador').value;
        const processador = document.getElementById('processador').value.trim();
        const modelo_memoria = document.getElementById('modelo-memoria').value;
        const frequencia_memoria = document.getElementById('frequencia-memoria').value.split(' ')[0];
        const quantidade_memoria = document.getElementById('quantidade-memoria').value.trim();
        const tipo_armazenamento = document.getElementById('tipo-armazenamento').value;
        const quantidade_armazenamento = document.getElementById('quantidade-armazenamento').value.trim();

        // Validações (mantenha as existentes e adicione para os novos campos)
        if (!placa_mae || !marca_processador || !processador || !modelo_memoria || 
            !frequencia_memoria || !quantidade_memoria || !tipo_armazenamento || !quantidade_armazenamento) {
            showToast('POR FAVOR, PREENCHA TODOS OS CAMPOS', 'error');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/maquina', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    placaMae: placa_mae,
                    marcaProcessador: marca_processador,
                    processador: processador,
                    modeloMemoria: modelo_memoria,
                    frequenciaMemoria: frequencia_memoria,
                    quantidadeMemoria: quantidade_memoria,
                    tipoArmazenamento: tipo_armazenamento,
                    quantidadeArmazenamento: quantidade_armazenamento
                })
            });

            if (response.ok) {
                const data = await response.json();
                showToast('MÁQUINA SALVA COM SUCESSO!', 'success');
                document.getElementById('maquina-form').reset();
            } else {
                const errorData = await response.json();
                showToast(`ERRO AO CADASTRAR: ${errorData.message || 'ERRO DESCONHECIDO'}`, 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            showToast('ERRO NA CONEXÃO COM O SERVIDOR', 'error');
        }
    });
});