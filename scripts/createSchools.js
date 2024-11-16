const connectDB = require('../db');
const { TaekwondoSchool, Country } = require('../models');

async function createSchools() {
    await connectDB();
    await TaekwondoSchool.deleteMany({});

    // Busca un país existente (puedes usar cualquier país creado anteriormente)
    const colombia = await Country.findOne({ name: 'Colombia' });

    if (!colombia) {
        console.error('No se encontró el país "Colombia". Por favor, crea el país primero.');
        process.exit(1);
    }

    // Crear cinco escuelas de taekwondo asociadas a Colombia
    const schools = await TaekwondoSchool.create([
        { name: 'Escuela Los Dragones', country: colombia._id },
        { name: 'Escuela Las Águilas', country: colombia._id },
        { name: 'Escuela Los Tigres', country: colombia._id },
        { name: 'Escuela Los Leones', country: colombia._id },
        { name: 'Escuela Las Serpientes', country: colombia._id }
    ]);

    console.log('Schools created:', schools);

    process.exit();
}

createSchools().catch(console.error);
