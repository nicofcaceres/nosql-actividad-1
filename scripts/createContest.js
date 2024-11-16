const connectDB = require('../db');
const { Contest, Tournament, Participant } = require('../models');

// Función para seleccionar oponentes aleatorios sin repetir al participante principal
function getOpponents(participants, currentParticipantId) {
    return participants.filter(p => p._id.toString() !== currentParticipantId.toString())
                       .sort(() => 0.5 - Math.random())
                       .slice(0, 2);
}

async function createContests() {
    await connectDB();

    // Obtener todos los torneos
    const tournaments = await Tournament.find();

    if (!tournaments.length) {
        console.error('No se encontraron torneos. Por favor, crea torneos primero.');
        process.exit(1);
    }
    await Contest.deleteMany({}); 
    // Crear contiendas para cada participante en cada torneo
    const contests = [];
    for (const tournament of tournaments) {
        const participants = await Participant.find({ tournament: tournament._id });

        if (participants.length < 3) {
            console.error(`El torneo ${tournament.name} no tiene suficientes participantes para crear contiendas.`);
            continue;
        }

        for (const participant of participants) {
            // Obtener 2 oponentes únicos
            const opponents = getOpponents(participants, participant._id);

            for (const opponent of opponents) {

                // Decidir ganador y perdedor
                const winner = Math.random() < 0.5 ? participant : opponent;
                const loser = winner === participant ? opponent : participant;
                // Crear la contienda
                const contest = await Contest.create({
                    tournament: tournament._id,
                    winner: winner._id,
                    loser: loser._id,
                    date: new Date()
                });
                contests.push(contest);
            }
        }
    }

    console.log('Contests created:', contests);

    process.exit();
}

createContests().catch(console.error);
