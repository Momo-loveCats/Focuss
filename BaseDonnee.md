# Discussion sur la base de donnée

## Ressources

Nous pouvons distinguer assez facilement certaine ressources :

- Utilisateurs : ce sont les visiteurs inscrit sur notre plateforme , ils ont un nom, email(id unique) et un mot de passe .On peut ajouter d'autres proprietes mais pour les besoin de notre aplication cela reste suffisant.Un utilisateurs a un role par projet ou il intervient qui le donnent un ensemble d'actions.

- Projet : Le but de notre apllication de gestionnaires. Un projet est essentielement un ensemble de taches effectue par differents utilisateurs. Il possede un id,  nom, la liste de menbres(1 forme normale),  listes de tags valide/disponible(1forme normale), description,  et une liste de taches.

- Tache : une tache doit etre effectuer par une ou plusieurs personnes. il on un id , nom unique par projet, un status ('A faire','En cours', 'Terminé', 'Expiré'), description, priorite('None', 'Low', 'Meduim', 'High'), une liste de tags(necessite de la table tags), date de creation, date de fin, checklist (Liste d'element d etapes pour la taches) et une liste d'user assignée. 

- Pour gerer la liste d'users dans un projet on cree une nouvelle ressourses on remarque un projet peut etre effectuer par plusieurs users et un user peut travailler sur plusieurs projets. On creer une nouvelle table avec le role 'Responsable', 'Admin', 'Menbre'. effectuer_par(idprojets, id user, role, date d'ajout);

- Pour gerer la liste de tags on remarque qu' un tags n'appartient qu ' a un projet mais un projet en contient plusieurs . Par projet les tags sont uniques donc on met la cle du projet en cle secondaire. En parlant de tags , remarquons un tag agit sur plieurs tache et une tache de meme.
on cree une table categories(idTache, idTag).

- la liste de taches: chaque tache est unique pour un projet et un projet possedes plusieurs taches. donc la taches gardent l'id du projet .

- la checklist , une checklist est unique par taches mais les noms entres taches et projet peuvent se repeter mais pas dans le meme tache; il a un nom et idtache(cle secondaire) en cle primaire  plus un boolean isDone(true, false si l'etape est good).

- un utilisateurs est dans plusieurs taches de meme qu'une taches a plusieurs user donc une tables assigner_a(idtache, iduser, date d'ajout)

## Usage de chat gpt ici pour plus de clarité

## 📦 Ressources principales

### 👤 Utilisateurs (`users`)

Les utilisateurs sont les membres inscrits de la plateforme.  
Ils disposent des informations suivantes :

- `id` — identifiant unique  
- `name` — nom complet  
- `email` — adresse e-mail unique  
- `password` — mot de passe chiffré  

Chaque utilisateur peut participer à plusieurs projets et avoir un rôle spécifique dans chacun d’eux.

---

### 📁 Projets (`projects`)

Les projets constituent le cœur de l’application.  
Ils regroupent des tâches, des membres et des tags associés.

Champs essentiels :

- `id` — identifiant unique  
- `name` — nom du projet  
- `description` — résumé ou objectif du projet  
- `created_at` — date de création  
- `updated_at` — dernière mise à jour  

Relations :

- Un **projet** possède plusieurs **tâches**  
- Un **projet** contient plusieurs **tags**  
- Plusieurs **utilisateurs** peuvent collaborer sur un même **projet**

---

### ✅ Tâches (`tasks`)

Chaque tâche représente une unité de travail dans un projet.  
Elle doit être réalisée par un ou plusieurs utilisateurs.

Attributs :

- `id` — identifiant unique  
- `project_id` — clé étrangère vers `projects`  
- `name` — nom unique par projet  
- `status` — (`To Do`, `In Progress`, `Done`, `Expired`)  
- `priority` — (`None`, `Low`, `Medium`, `High`)  
- `description` — texte libre  
- `created_at` — date de création  
- `due_date` — date d’échéance  

Relations :

- Plusieurs **utilisateurs** peuvent être assignés à une **tâche**
- Une **tâche** peut avoir plusieurs **tags**
- Chaque **tâche** peut avoir une **checklist**

---

### 🧩 Rôles et participation (`project_members`)

Comme un utilisateur peut participer à plusieurs projets, une table d’association est nécessaire.

Champs :

- `project_id` — clé étrangère vers `projects`
- `user_id` — clé étrangère vers `users`
- `role` — (`Admin`, `Responsable`, `Membre`)
- `joined_at` — date d’ajout au projet  

Rôle :

- Définir les permissions et la hiérarchie au sein d’un projet

---

### 🏷️ Tags (`tags`)

Les tags permettent de classer ou filtrer les tâches d’un projet.

Champs :

- `id` — identifiant unique  
- `project_id` — clé étrangère vers `projects`  
- `name` — nom unique dans le projet  

Relations :

- Un **tag** appartient à un seul **projet**
- Une **tâche** peut être associée à plusieurs **tags**  
  → via la table d’association `task_tags`

---

### 🔗 Association tâches ↔ tags (`task_tags`)

Relation **many-to-many** entre les tâches et les tags.

Champs :

- `task_id` — clé étrangère vers `tasks`  
- `tag_id` — clé étrangère vers `tags`

---

### ☑️ Checklists (`checklist_items`)

Chaque tâche peut contenir une série d’étapes à cocher.

Champs :*

- `id` — identifiant unique
- `task_id` — clé étrangère vers `tasks`  
- `name` — nom de l’étape  
- `is_done` — booléen (true si terminé)

---

### 👥 Assignations (`task_assignees`)

Une table pour gérer les utilisateurs assignés à une tâche.

Champs :

- `task_id` — clé étrangère vers `tasks`
- `user_id` — clé étrangère vers `users`
- `assigned_at` — date d’ajout  

Relation :

- Un **utilisateur** peut être assigné à plusieurs **tâches**
- Une **tâche** peut avoir plusieurs **utilisateurs**

---

## 🧠 Notes de conception

- La base respecte la **3ᵉ forme normale (3NF)**.  
- Chaque ressource est isolée pour éviter la redondance.  
- Les relations many-to-many sont explicites via des tables d’association.  
- Les noms de colonnes et tables sont en anglais pour des raisons de convention technique.
