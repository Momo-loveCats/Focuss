# API

Nous allons focus ici à la création d'une RESTFUL API. Pour cela commencons par focus sur les ressources.

Toutes actions necessite d'etre connecter les utilisateurs non connecter on juste acces a la page de garde().

## Les utilisateurs

- get /auth/login : se connecter à l'application. Set up du token.
- post /auth/register : creer un compte unique.
- get /users/:user_id : obtenir des informations sur un utilisateurs
- get /users/me : obtenir toutes mes informations.
- put /users/:user_id : modifie des infos sur l'user nom, email, ou password
- delete /users/:user_id : supprime le compte user de la base et supprime toutes ces dependances de la base.

## Projet

- post /projects : creer un nouveau projet avec nom et description creer par un user, created_at now()
- get projects/:project_id : obtenir les informations sur un projet
- put projects/:project_id : modifier certaine informations (name, description) d'un projet
- delete projects/:project_id : supprimer un projet (uniquement possible par l'admin)

## Utilisateurs project (imbrique)

- get /users/:user_id/projects : obtenir les informations sur tous les projets ou user apparait possible query pour sort en fonction de la date d'ajout, role, nom ...
- delete /users/:user_id/projects/:project_id : supprime users dans le menbre du projet, user quitte le projet.
- get /projects/:project_id/users : les utilisateurs menbres d'un projet;
- post /projects/:project_id/users : ajout d'un utilisateurs en tant que menbre;
- put /projects/:project_id/users/:user_id : modifier un role(pas possible admin); 
- delete /projects/:project_id/users/:user_id : supprimer le menbre dans le projet;

## Tags

- post /tags : creer un nouveau tags.
- delete /tags/:tag_id : supprime un tag de la base
- get /projects/:project_id/tags : obtenir tous les tags d'un projet , q pour la recherche non case sensitive(options facultatif);

## task

- post /tasks : ajouter une tache (possible, par admin et responsable)
- get /users/:user_id/projects/:project_id/tasks : obtenir une view sur les taches en fonction du role de l'utilisateur. possibilite de recherche en fonction du status 
- put /tasks/:task_id : modifier une tache par un responsable ou admin
- post /task/:task_id/tags : ajouter un tag a une tache
- delete /task/:task_id/tags/:tag_id : supprimer un tag sur une tache.
- get task/:task_id/users : renvoie les assignée
- post task/:task_id/users/:user_id : ajouter un menbre a une tache doit etre menbre du projet.
- delete task/:task_id/users/:user_id : supprime un user d'une tache

## checlist

- get task/:task_id/checklist_items : renvoie tous les items de la checlist
- post task/:task_id/checklist_items : creer un element de la checklist
- delete /checklist_items/:checklist_id : supprimer l'item
- put /checklist_items/:check_list_id : modifier l'item en isdone ou pas ou son nom;