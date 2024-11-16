const connectDB = require('../db');
const { Master, TaekwondoSchool } = require('../models');

async function createMasters() {
    await connectDB();
    await Master.deleteMany({});
    // Obtiene todas las escuelas de taekwondo
    const schools = await TaekwondoSchool.find();

    if (!schools.length) {
        console.error('No se encontraron escuelas. Por favor, crea las escuelas primero.');
        process.exit(1);
    }

    // Crea dos maestros para cada escuela
    const masters = [];
    for (const school of schools) {
        const createdMasters = await Master.create([
            { name: `Master 1 - ${school.name}`, rank: 'Cinta Negra 5º Dan', school: school._id },
            { name: `Master 2 - ${school.name}`, rank: 'Cinta Negra 4º Dan', school: school._id }
        ]);
        masters.push(...createdMasters);
    }

    console.log('Masters created:', masters);

    process.exit();
}

createMasters().catch(console.error);
