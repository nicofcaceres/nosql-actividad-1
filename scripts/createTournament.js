const connectDB = require('../db');
const { Tournament, TaekwondoSchool } = require('../models');

// Función para seleccionar índices aleatorios únicos
function getRandomIndexes(total, count) {
    const indexes = new Set();
    while (indexes.size < count) {
        const randomIndex = Math.floor(Math.random() * total);
        indexes.add(randomIndex);
    }
    return Array.from(indexes);
}

async function createTournament() {
    await connectDB();
    await Tournament.deleteMany({});

    // Obtener todas las escuelas existentes
    const schools = await TaekwondoSchool.find();

    if (schools.length < 5) {
        console.error('Se necesitan al menos 5 escuelas para este script. Por favor, crea más escuelas.');
        process.exit(1);
    }

    // Crear tres torneos con combinaciones aleatorias de 4 escuelas
    const tournaments = [];
    for (let i = 0; i < 3; i++) {
        const randomIndexes = getRandomIndexes(schools.length, 4);
        const selectedSchools = randomIndexes.map(index => schools[index]._id);

        const tournament = await Tournament.create({
            name: `Torneo ${i + 1}`,
            date: new Date(`2024-12-${(i + 1) * 10}`),
            schools: selectedSchools
        });

        tournaments.push(tournament);
    }

    console.log('Tournaments created:', tournaments);

    process.exit();
}

createTournament().catch(console.error);
