document.addEventListener('DOMContentLoaded', async () => {
    const select = document.getElementById('horarios');
    
    // Função para carregar horários disponíveis
    async function carregarHorarios() {
        const response = await fetch('http://localhost:3000/horarios');
        const horarios = await response.json();
        
        select.innerHTML = '<option value="">Selecione um horário</option>';
        horarios.forEach(horario => {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            select.appendChild(option);
        });
    }

    // Carregar horários disponíveis ao carregar a página
    await carregarHorarios();

    document.getElementById('agendamento-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const horario = select.value;

        const response = await fetch('http://localhost:3000/marcar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, telefone, horario })
        });

        const resultado = await response.json();
        
        if (resultado.sucesso) {
            alert('Horário marcado com sucesso!');
            await carregarHorarios(); // Atualizar a lista de horários disponíveis
        } else {
            alert(resultado.mensagem);
        }
    });
});