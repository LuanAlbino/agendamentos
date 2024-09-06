const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const app = express();
const PORT = 3000;

// Horários disponíveis (inicialmente)
let horariosDisponiveis = [
    "08:00", "08:30", "09:00", "09:30", "10:00",
    "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
];

app.use(cors());
app.use(express.json());

// Rota para pegar horários disponíveis
app.get('/horarios', (req, res) => {
    res.json(horariosDisponiveis);
});

// Rota para marcar um horário
app.post('/marcar', (req, res) => {
    const { nome, telefone, horario } = req.body;

    // Verifica se o horário ainda está disponível
    const index = horariosDisponiveis.indexOf(horario);
    if (index !== -1) {
        // Remove o horário do array de horários disponíveis
        horariosDisponiveis.splice(index, 1);
        res.json({ sucesso: true });
    } else {
        res.json({ sucesso: false, mensagem: 'Horário já foi escolhido.' });
    }
});

// Função para reiniciar os horários às 8h todos os dias
function reiniciarHorarios() {
    horariosDisponiveis = [
        "08:00", "08:30", "09:00", "09:30", "10:00",
        "10:30", "11:00", "11:30", "12:00", "12:30",
        "13:00", "13:30", "14:00", "14:30", "15:00",
        "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
    ];
    console.log('Horários reiniciados.');
}

// Agendando a reinicialização dos horários para 8h todos os dias
cron.schedule('0 8 * * *', reiniciarHorarios);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

