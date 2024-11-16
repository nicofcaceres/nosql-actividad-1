const connectDB = require('./db');
const { TaekwondoSchool, Taekwondoin, Tournament, Participant, Contest } = require('./models');

async function displayData() {
    await connectDB();

    console.log('--- Escuelas y sus integrantes ---');
    const schools = await TaekwondoSchool.find().populate('country');
    for (const school of schools) {
        const members = await Taekwondoin.find({ school: school._id });
        console.log(`Escuela: ${school.name} (${school.country.name})`);
        members.forEach(member => {
            console.log(` - ${member.name}, ${member.belt}, Edad: ${member.age}`);
        });
        console.log();
    }

    console.log('--- Torneos y sus participantes ---');
    const tournaments = await Tournament.find();
    for (const tournament of tournaments) {
        console.log(`Torneo: ${tournament.name}, Fecha: ${tournament.date.toISOString().split('T')[0]}`);
        const participants = await Participant.find({ tournament: tournament._id }).populate('taekwondoin school');
        participants.forEach(participant => {
            console.log(` - ${participant.taekwondoin.name} (${participant.school.name}), Categoría: ${participant.category}`);
        });
        console.log();
    }

    console.log('--- Contiendas ---');
    const contests = await Contest.find()
        .populate('tournament')
        .populate({
            path: 'winner',
            populate: {
                path: 'taekwondoin', // Esto asegura que se traiga el documento taekwondoin asociado
                select: 'name' // Solo traerá el campo name
            }
        })
        .populate({
            path: 'loser',
            populate: {
                path: 'taekwondoin',
                select: 'name'
            }
        });
    for (const contest of contests) {
        console.log('contiendas');
        const winnerName = contest.winner.taekwondoin.name; // Accedemos al nombre del taekwondoin del ganador
        const loserName = contest.loser.taekwondoin.name; // Accedemos al nombre del taekwondoin del perdedor
        
        console.log(`Torneo: ${contest.tournament.name}`);
        console.log(` - Ganador: ${winnerName}`);
        console.log(` - Perdedor: ${loserName}`);
        console.log(`Fecha: ${contest.date.toISOString().split('T')[0]}`);
        console.log();
    }

    process.exit();
}

displayData().catch(console.error);
