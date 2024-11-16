const connectDB = require('../db');
const { Taekwondoin, TaekwondoSchool } = require('../models');

async function createTaekwondoin() {
    await connectDB();
    await Taekwondoin.deleteMany({});
    // Obtiene todas las escuelas de taekwondo
    const schools = await TaekwondoSchool.find();

    if (!schools.length) {
        console.error('No se encontraron escuelas. Por favor, crea las escuelas primero.');
        process.exit(1);
    }

    // Crear 5 taekwondines por cada escuela
    const taekwondoinList = [];
    for (const school of schools) {
        const taekwondoin = await Taekwondoin.create([
            { name: `Taekwondoin 1 - ${school.name}`, age: 20, belt: 'Cinta Amarilla', school: school._id },
            { name: `Taekwondoin 2 - ${school.name}`, age: 22, belt: 'Cinta Verde', school: school._id },
            { name: `Taekwondoin 3 - ${school.name}`, age: 18, belt: 'Cinta Azul', school: school._id },
            { name: `Taekwondoin 4 - ${school.name}`, age: 25, belt: 'Cinta Roja', school: school._id },
            { name: `Taekwondoin 5 - ${school.name}`, age: 23, belt: 'Cinta Negra', school: school._id }
        ]);
        taekwondoinList.push(...taekwondoin);
    }

    console.log('Taekwondoin created:', taekwondoinList);

    process.exit();
}

createTaekwondoin().catch(console.error);
