const mongoose = require('mongoose');

// Modelo de Country
const countrySchema = new mongoose.Schema({
    name: { type: String, required: true }
});

// Modelo de TaekwondoSchool
const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true }
});

// Modelo de Master
const masterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rank: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'TaekwondoSchool', required: true }
});

// Modelo de Taekwondoin
const taekwondoinSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    belt: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'TaekwondoSchool', required: true }
});

// Modelo de Tournament
const tournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    schools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaekwondoSchool' }]
});

// Modelo de Participant
const participantSchema = new mongoose.Schema({
    taekwondoin: { type: mongoose.Schema.Types.ObjectId, ref: 'Taekwondoin', required: true },
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'TaekwondoSchool', required: true },
    category: { type: String, required: true }
});

// Modelo de Contienda
const contestSchema = new mongoose.Schema({
    tournament: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tournament', 
        required: true 
    },
    winner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Participant', 
        required: true 
    },
    loser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Participant', 
        required: true 
    },
    date: { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});

// Exportar modelos
const Country = mongoose.model('Country', countrySchema);
const TaekwondoSchool = mongoose.model('TaekwondoSchool', schoolSchema);
const Master = mongoose.model('Master', masterSchema);
const Taekwondoin = mongoose.model('Taekwondoin', taekwondoinSchema);
const Tournament = mongoose.model('Tournament', tournamentSchema);
const Participant = mongoose.model('Participant', participantSchema);
const Contest = mongoose.model('Contest', contestSchema);

module.exports = { Country, TaekwondoSchool, Master, Taekwondoin, Tournament, Participant, Contest };
