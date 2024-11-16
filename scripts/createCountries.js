const connectDB = require('../db');
const { Country } = require('../models');

async function createCountries() {
    await connectDB();
    await Country.deleteMany({}); 

    const countries = await Country.create([{ name: 'Colombia' }, { name: 'México' }, { name: 'Corea del Sur' }]);
    console.log('Countries created:', countries);

    process.exit();
}

createCountries().catch(console.error);
