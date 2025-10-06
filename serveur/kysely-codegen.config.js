// kysely-codegen.config.js
path = require('path');
//import { promises as fs } from 'fs';

// La configuration principale
const config = {
  // Le dialecte de ta base de données (sqlite, postgresql, mysql)
  dialect: 'sqlite',

  db: {
    // Est-ce que ce chemin est correct ?
    // Est-ce que le fichier 'cat-voter.db' est bien à la racine de ton projet ?
    // Si tu l'as mis dans un dossier 'src/database', le chemin doit être 'src/database/cat-voter.db'
    connectionString: 'file:/database/focus.db', 
  },
  // Le dossier où se trouve ton fichier de schéma SQL
  // On utilise `path.join` pour être compatible avec tous les OS
  schemaFile: path.join(__dirname, '/database/query.sql'),

  // Le fichier de sortie qui sera généré
  outDir: path.join(__dirname, '/database/schema'),

  // Les options pour le générateur
  // camelCase : Convertit les noms de colonnes comme 'created_at' en 'createdAt'
  // booleanAsNumber : Convertit les colonnes BOOLEAN en type `number` (0 ou 1)
  // enumAsUnion : Génère des types union pour les colonnes CHECK
  camelCase: true,
  booleanAsNumber: true,
  enumAsUnion: true,
};

// Exporte la configuration
module.exports = config;