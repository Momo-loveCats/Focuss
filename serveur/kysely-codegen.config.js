const path = require('path');

module.exports = {
  // Ton dialecte
  dialect: 'sqlite',

  db: {
    // Ici, le chemin correct vers la base
    connectionString: `file:${path.join(__dirname, 'src', 'database', 'focus.db')}`,
  },

  // Ton fichier SQL (facultatif selon ton usage)
  schemaFile: path.join(__dirname, 'src', 'database', 'query.sql'),

  // Dossier de sortie pour les fichiers générés
  outDir: path.join(__dirname, 'src', 'database', 'schema'),

  // Options de génération
  camelCase: true,
  booleanAsNumber: true,
  enumAsUnion: true,
};