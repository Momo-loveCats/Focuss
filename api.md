# 📡 RESTful API Documentation

Toutes les actions nécessitent d'être **connecté** avec un **token valide**.

- Si le token est invalide → **401 Unauthorized**  
- Si l'utilisateur n'a pas les bons droits → **403 Forbidden**

---

## 👤 Utilisateurs

### Authentification

- **GET /auth**
  - 🔹 Se connecter à l’application  
  - 🔸 Query params : `email`, `password`  
  - ✅ 200 OK : Token + ID utilisateur  
  - ❌ 404 Not Found : Utilisateur inexistant

- **POST /auth**
  - 🔹 Créer un compte unique  
  - ✅ 201 Created : Utilisateur enregistré  
  - ❌ 409 Conflict : Utilisateur déjà existant

---

### Gestion des utilisateurs

- **GET /users/:userId**
  - 🔹 Obtenir les informations d’un utilisateur  
  - ✅ 200 OK  
    - Si `userId` == utilisateur connecté → renvoie tout (y compris mot de passe hashé)  
    - Sinon → nom et email uniquement  
  - ❌ 404 Not Found  

- **PUT /users**
  - 🔹 Modifier les informations de l’utilisateur connecté  
  - 🔸 Body : `{ name, email, password }`  
  - ✅ 200 OK : Renvoie l’objet utilisateur mis à jour  
  - ❌ 403 Forbidden : Tentative de modification d’un autre utilisateur  
  - ❌ 400 Bad Request : Email non unique ou champs invalides  

- **DELETE /users**
  - 🔹 Supprimer le compte utilisateur connecté et ses dépendances  
  - ✅ 200 OK  
  - ❌ 403 Forbidden : Pas autorisé  

---

## 📁 Projets

### Récupération et création

- **GET /projects**
  - 🔹 Lister tous les projets où l’utilisateur participe  
  - 🔸 Query params :  
    - `sortDate=true`  
    - `sortName=true`  
    - `role=admin`  
    - `q=nom_du_projet` (recherche insensible à la casse)  
    - `author=true` (projets créés par l’utilisateur)
  - ✅ 200 OK  
  - ❌ 404 Not Found : Aucun projet trouvé  

- **POST /projects**
  - 🔹 Créer un nouveau projet  
  - 🔸 Body : `{ name, description }`  
  - ✅ 201 Created  

---

### Gestion d’un projet spécifique

*(Middleware : vérifie que l’utilisateur est membre du projet)*

- **GET /projects/:projectId**
  - 🔹 Obtenir les infos d’un projet  
  - ✅ 200 OK  

- **PUT /projects/:projectId**
  - 🔹 Modifier un projet (nom, description)  
  - 🔸 Rôle requis : `admin`  
  - ✅ 200 OK  
  - ❌ 409 Conflict : Modification non autorisée  

- **DELETE /projects/:projectId**
  - 🔹 Supprimer un projet (admin uniquement)  
  - ✅ 200 OK  
  - ❌ 403 Forbidden : Non autorisé  

---

### Membres d’un projet

- **GET /projects/:projectId/users**
  - 🔹 Lister tous les membres du projet (id, nom, email, rôle)

- **POST /projects/:projectId/users**
  - 🔹 Ajouter un membre (admin ou responsable)  
  - 🔸 Body : `{ email, role }`  
  - ✅ 200 OK  
  - ❌ 404 Not Found : Utilisateur introuvable  
  - ❌ 409 Conflict : Déjà membre  

- **PUT /projects/:projectId/users/:userId**
  - 🔹 Modifier le rôle d’un membre (`responsable` ou `membre`)  
  - 🔸 Rôle requis : `admin`  
  - ✅ 200 OK  
  - ❌ 409 Conflict : Action impossible  

- **DELETE /projects/:projectId/users/:userId**
  - 🔹 Supprimer un membre du projet  
  - 🔸 Rôle requis : `admin`  
  - ✅ 200 OK  
  - ❌ 404 Not Found  

---

## 🏷️ Tags

*(L’utilisateur doit être membre du projet.)*

- **POST /tags**
  - 🔹 Créer un tag (admin ou responsable)  
  - ✅ 200 OK  
  - ❌ 409 Conflict : Tag existant  

- **DELETE /tags/:tagId**
  - 🔹 Supprimer un tag (admin uniquement)  
  - ✅ 200 OK  

- **GET /tags**
  - 🔹 Lister les tags du projet  
  - 🔸 Query param : `q` (recherche non sensible à la casse)  
  - ✅ 200 OK  

---

## ✅ Tâches

- **POST /tasks**
  - 🔹 Ajouter une tâche (admin ou responsable)  
  - 🔸 Body : `{ title, description, priority, status, projectId }`  
  - ✅ 201 Created  

- **GET /tasks**
  - 🔹 Obtenir les tâches visibles selon le rôle utilisateur  
  - 🔸 Query params :
    - `group=status` *(par défaut, peut être `priority` ou `tags`)*
    - `me=true` *(affiche uniquement mes tâches)*  
  - ✅ 200 OK  

- **DELETE /tasks/:taskId**
  - 🔹 Supprimer une tâche et ses dépendances  
  - ✅ 200 OK  

- **GET /tasks/:taskId**
  - 🔹 Obtenir les détails d’une tâche  
  - ✅ 200 OK  

- **PUT /tasks/:taskId**
  - 🔹 Modifier une tâche (admin ou responsable)  
  - ✅ 200 OK  

---

### Tags d’une tâche

- **GET /tasks/:taskId/tags**
  - 🔹 Lister les tags d’une tâche  

- **POST /tasks/:taskId/tags**
  - 🔹 Ajouter un tag à une tâche  

- **DELETE /tasks/:taskId/tags/:tagId**
  - 🔹 Supprimer un tag d’une tâche  

---

### Assignations d’une tâche

- **GET /tasks/:taskId/assignees**
  - 🔹 Lister les assignés d’une tâche  

- **POST /tasks/:taskId/assignees**
  - 🔹 Ajouter un membre à une tâche (doit être membre du projet)  
  - 🔸 Rôle requis : `admin` ou `responsable`  

- **DELETE /tasks/:taskId/assignees/:userId**
  - 🔹 Supprimer un utilisateur assigné  
  - 🔸 Rôle requis : `admin` ou `responsable`  

---

## 📋 Checklist

*(Vérifier que l’utilisateur est bien assigné à la tâche)*

- **GET /checklist_items**
  - 🔹 Récupérer tous les items de la checklist  

- **POST /checklist_items**
  - 🔹 Créer un item  
  - 🔸 Body : `{ title, isDone, position }`  

- **PUT /checklist_items/:checklistId**
  - 🔹 Modifier un item (nom, état, position)  

- **DELETE /checklist_items/:checklistId**
  - 🔹 Supprimer un item de la checklist  

---
