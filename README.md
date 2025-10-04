# 🎯 Focuss

**Focuss** est une application de gestion de tâches collaborative en ligne.  
C’est une version légère et simplifiée de Trello, pensée pour organiser le travail en équipe et suivre l’avancement des projets.

---

## ✨ Fonctionnalités principales

### 🔹 Projets

- Un projet est créé par un utilisateur → il en devient **admin**.
- Chaque projet possède un **nom** et une **liste de membres** (utilisateurs invités via leur email, qui sert d’ID unique).
- L’admin peut :
  - Ajouter / retirer des membres.
  - Promouvoir un autre utilisateur en **admin**.
- Tout utilisateur du projet peut **créer une tâche**.

---

### 🔹 Tâches

- Une tâche est une action à réaliser par un ou plusieurs utilisateurs.
- Cycle de vie (status) :
  - **À faire** → **En cours** → **Terminé**
- Attributs d’une tâche :
  - **Description**
  - **Priorité** : None | Low | Medium | High (modifiable uniquement par un admin)
  - **Tags** (ex: `ux`, `backend`, `design`)
  - **Assignés** : un ou plusieurs utilisateurs responsables
  - **Date de création**
  - **Date de fin** (modifiable uniquement par un admin)
- Tout utilisateur peut changer le **status** de ses tâches assignées.

---

### 🔹 Utilisateurs

- Authentification obligatoire : **inscription + connexion**
- Données requises :
  - Email (unique, sert d’ID)
  - Nom complet
  - Pseudo
  - Mot de passe (fort, hashé côté serveur)
- Dashboard utilisateur :
  - Ses projets créés (**admin**)
  - Ses projets où il participe (**membre**)
  - Possibilité de créer un **nouveau projet**
- Vue dans un projet :
  - **Admin** : accès à toutes les tâches (vue globale).
  - **Membre** : accès uniquement aux tâches qui lui sont assignées.

---

## 🛠 Stack technique (prévu)

### Frontend

- React
- React Router
- Bootstrap (ou Tailwind pour UI moderne)
- Axios (requêtes API)

### Backend

- Node.js + Express
- SQLLite3 et Syqeli
- JWT (authentification)
- bcrypt (hash mot de passe)

### Déploiement

- GitHub (repo + gestion version)
- Render (hébergement serveur et client)

---

## 📂 Structure projet (prévue)

focuss/
├── client/ # React frontend
├── server/ # Express backend
└── README.md

## Licence

MIT