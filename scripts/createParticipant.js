const connectDB = require('../db');
const { Participant, Tournament, Taekwondoin, TaekwondoSchool } = require('../models');

// Función para seleccionar índices aleatorios únicos
function getRandomIndexes(total, count) {
    const indexes = new Set();
    while (indexes.size < count) {
        const randomIndex = Math.floor(Math.random() * total);
        indexes.add(randomIndex);
    }
    return Array.from(indexes);
}

async function createParticipant() {
    await connectDB();
    await Participant.deleteMany({});

    // Obtener todos los torneos
    const tournaments = await Tournament.find().populate('schools');

    if (!tournaments.length) {
        console.error('No se encontraron torneos. Por favor, crea torneos primero.');
        process.exit(1);
    }

    // Registrar 3 participantes aleatorios por cada escuela inscrita en cada torneo
    const participants = [];
    for (const tournament of tournaments) {
        for (const school of tournament.schools) {
            // Obtener los taekwondines de la escuela
            const taekwondoinList = await Taekwondoin.find({ school: school._id });

            if (taekwondoinList.length < 3) {
                console.warn(`La escuela ${school.name} tiene menos de 3 taekwondines. Se omitirán.`);
                continue;
            }

            // Seleccionar 3 taekwondines aleatorios
            const randomIndexes = getRandomIndexes(taekwondoinList.length, 3);
            const selectedTaekwondoin = randomIndexes.map(index => taekwondoinList[index]);

            // Crear participantes en el torneo
            for (const taekwondoin of selectedTaekwondoin) {
                const participant = await Participant.create({
                    taekwondoin: taekwondoin._id,
                    tournament: tournament._id,
                    school: school._id,
                    category: 'General' 
                });
                participants.push(participant);
            }
        }
    }

    console.log('Participants created:', participants);

    process.exit();
}

createParticipant().catch(console.error);
