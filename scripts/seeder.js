const { exec } = require('child_process');
const path = require('path');

async function runSeeder() {
    const scripts = [
        'createCountries.js',
        'createSchools.js',
        'createMasters.js',
        'createTaekwondoin.js',
        'createTournament.js',
        'createParticipant.js',
        'createContest.js'
    ];

    for (const script of scripts) {
        await new Promise((resolve, reject) => {
            const scriptPath = path.join(__dirname, script);
            console.log(`Running ${script}...`);

            exec(`node ${scriptPath}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error running ${script}:`, stderr);
                    return reject(error);
                }

                console.log(stdout);
                resolve();
            });
        });
    }

    console.log('All scripts executed successfully.');
}

runSeeder().catch(console.error);
