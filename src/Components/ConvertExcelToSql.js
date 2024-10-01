const XLSX = require('xlsx');
const mysql = require('mysql2/promise');

// Configurer la connexion à MySQL
const client = await mysql.createConnection({
    host: 'localhost',
    user: 'root', // Remplacez par votre utilisateur MySQL
    database: 'secours',
    password: 'Antonio0108Andria',
    port: 3306, // Par défaut pour MySQL
});

// Chemin du fichier Excel
const filePath = './liste VATOVAVY en activité.xls'; // Remplacez par le chemin de votre fichier Excel

function convertExcelDate(serial) {
    const date = new Date((serial - 25569) * 86400 * 1000);
    return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
}

async function importExcelToMySQL() {
    try {
        // Lire le fichier Excel
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);

        // Préparer les requêtes d'insertion
        const query = `
            INSERT INTO active (matricule, nom, prenoms, sexe, datenais, cin, cp, codegrade, codecategorie, codesection, codecorps, indice)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
            ON DUPLICATE KEY UPDATE matricule=VALUES(matricule);`;

        // Insérer les données dans MySQL
        for (const row of jsonData) {
            const values = [
                row.AGENTMATRICULE,
                row.AGENTNOM,
                row.AGENTPRENOMS,
                row.AGENTSEXE,
                row.AGENTDATENAIS,
                row.AGENTCIN,
                row.FIVCODE,
                row.GRADECODE,
                row.CATEGORIECODE,
                row.SECTIONCODE,
                row.CORPSCODE,
                row.INDICE,
            ];

            await client.execute(query, values);
        }

        console.log('Importation réussie !');
    } catch (err) {
        console.error('Erreur lors de l\'importation :', err);
    } finally {
        // Fermer la connexion
        await client.end();
    }
}

importExcelToMySQL();
