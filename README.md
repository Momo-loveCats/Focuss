# 🎯 Focuss

**Focuss** est une application de gestion de tâches collaborative en ligne.  
C’est une version légère et simplifiée de **Trello**, pensée pour organiser le travail en équipe et suivre l’avancement des projets.

---

## ✨ Fonctionnalités principales

### 🔹 Projets

- Un projet est créé par un utilisateur → il en devient **admin**.
- Chaque projet possède :
  - Un **nom**
  - Une **liste de membres** (utilisateurs invités via leur email, qui sert d’ID unique)
  - Une **liste de tags** (modifiable uniquement par l’admin)
- L’admin peut :
  - Ajouter / retirer des membres
  - Promouvoir un autre utilisateur en **admin** ou en **responsable**
- Les **admins** et **responsables** du projet peuvent **créer des tâches**

---

### 🔹 Tâches

- Une tâche est une action à réaliser par un ou plusieurs utilisateurs.
- **Cycle de vie** (statut) :
  - `À faire` → `En cours` → `Terminé` → `Expiré`
- **Attributs d’une tâche** :
  - `Description`
  - `Priorité` : `None` | `Low` | `Medium` | `High` (modifiable uniquement par un admin)
  - `Tags` : un ou plusieurs parmi ceux définis dans le projet (ex : `ux`, `backend`, `design`)
  - `Assignés` : un ou plusieurs utilisateurs responsables
  - `Date de création`
  - `Date de fin` (modifiable uniquement par un admin)
  - `Checklist` : représente les étapes de la tâche (modifiable par tout le monde)
- **Comportement** :
  - Une tâche peut être **supprimée** uniquement par un admin.
  - Lorsqu’une tâche est créée par un responsable, elle lui est automatiquement assignée.  
    Il peut ensuite ajouter d’autres membres et/ou responsables.
  - Seuls les **admins** et **responsables** peuvent **changer le statut** d’une tâche.
  - Si la **date de fin** est dépassée, le statut passe automatiquement à `Expiré` et ne peut plus être modifié.

---

### 🔹 Utilisateurs

- Authentification obligatoire : **inscription + connexion**
- **Données requises** :
  - Email (unique, sert d’identifiant)
  - Nom complet
  - Pseudo
  - Mot de passe (fort, hashé côté serveur)
- **Dashboard utilisateur** :
  - Ses projets créés (**admin**)
  - Ses projets où il participe (**membre**)
  - Possibilité de **créer un nouveau projet**
- **Vue dans un projet** :
  - **Admin** :
    - Accès à toutes les tâches (vue globale)
    - Peut modifier ou supprimer des tâches
  - **Responsable** :
    - Peut créer des tâches et changer leur statut
    - Ne peut pas supprimer de tâche
  - **Membre** :
    - Accès uniquement aux tâches qui lui sont assignées

---

## 🛠 Stack technique (prévue)

### Frontend

- React  
- React Router  
- Bootstrap  
- Axios *(requêtes API)*  
- TypeScript  

### Backend

- Node.js + Express  
- SQLite3 + [Syqeli](https://syqeli.io) *(ORM SQL léger et typé TypeScript)*  
- JWT *(authentification)*  
- bcrypt *(hash des mots de passe)*  
- TypeScript  

### Déploiement

- GitHub *(hébergement du code et versioning)*  
- Render *(hébergement du serveur et du client)*  

---

## 📂 Structure projet (prévue)

focuss/
├── client/ # React frontend
├── server/ # Express backend
└── README.md

## Licence

MIT