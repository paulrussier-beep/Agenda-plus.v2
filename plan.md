# Agenda Plus — plan V1

## Objectif
Assistant personnel d’organisation scolaire pour lycéens et étudiants, utilisable sur ordinateur via navigateur, sans abonnement, carte bancaire, API payante ni IA obligatoire.

## Design
- **Mouvement :** dashboard éditorial calme, inspiré des carnets d’étude numériques.
- **Principes :** priorité à la lisibilité, encouragements discrets, hiérarchie visuelle nette, actions rapides.
- **Palette :** fond lavande très pâle et surfaces blanches pour apaiser ; violet `#6c63ff` comme couleur propriétaire, associé à l’attention et à la progression.
- **Layout :** barre latérale persistante et zones de contenu en panneaux, avec respiration généreuse plutôt qu’un tableau dense.
- **Signatures :** logo étoile, anneau de progression, cartes de tâches à priorité colorée.
- **Interaction :** chaque action importante est directe (cocher, ajouter, supprimer, changer de vue) ; feedback visuel immédiat.
- **Animation :** volontairement minimale en V1 pour préserver la concentration.
- **Typographie :** DM Sans pour l’interface et Fraunces pour les grands titres chaleureux.
- **Voix :** encourageante, concrète, jamais culpabilisante. Exemples : « Avance sereinement, un jour à la fois. » et « Petit pas, grand progrès. »
- **Essence :** l’organisation scolaire qui transforme la charge mentale en prochaines étapes simples. Calme, motivante, pragmatique.

## Architecture
- `src/main.tsx` : interface React et état local des tâches/matières.
- `src/styles.css` : système visuel desktop-first.
- `public/manus-routes.json` : route déclarée pour la page tableau de bord.
- `package.json` : React + Vite + TypeScript + Lucide, toutes dépendances gratuites/open source.

## V1 livrée
- Tableau de bord avec date, tâches du jour, prochain contrôle, temps prévu, progression.
- Vue planning par jour.
- Vue matières avec moyennes et ajout rapide.
- Ajout, suppression et validation de tâches.
- Fonctionnement local sans compte, serveur, base de données ou fournisseur IA.

## Suite recommandée
Ajouter la persistance `localStorage`, puis un backend Supabase Free optionnel pour synchroniser les données et les comptes. Ajouter ensuite l’algorithme local de génération de planning à partir des disponibilités, difficultés et échéances.
