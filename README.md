# Agenda Plus

Assistant personnel d’organisation scolaire — V1 desktop-first.

## Principes
- **0 €** pour développer, tester et utiliser la V1.
- Aucune carte bancaire, API payante ou IA obligatoire.
- React + Vite + TypeScript, dépendances open source.
- Fonctionnement local et immédiat, sans compte requis.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir l’URL indiquée par Vite.

## Compiler

```bash
npm run build
```

## Fonctionnalités V1

- Tableau de bord : date, tâches, contrôle à venir, temps prévu et progression.
- Planning organisé par jour.
- Gestion des matières et des moyennes.
- Ajout, suppression et validation des tâches.
- Interface pensée pour ordinateur Windows/macOS via navigateur.
- Interface responsive utilisable sur ordinateur, tablette et téléphone, avec navigation tactile et cartes adaptées aux petits écrans.

## Phases 3 à 5

La version actuelle permet aussi d’enregistrer des contrôles détaillés (chapitres, type, difficulté, importance, maîtrise et objectif de note), des devoirs avec statut, ainsi que des périodes de cours, repas, sommeil, activités, trajets et disponibilités. Le générateur local classe les tâches par urgence, difficulté, importance et maîtrise, puis les place exclusivement dans les créneaux marqués disponibles.

Les phases suivantes sont également disponibles : réorganisation en cas de retard, d’avance ou de manque de temps ; déplacement et suppression manuels des séances ; minuteur personnalisable avec modes Pomodoro, pause/reprise et validation du temps réel ; objectifs de moyenne générale, de matière et de contrôle. L’optimisation vise la cible définie avec le temps raisonnablement nécessaire.

Voir [`plan.md`](./plan.md) pour les choix d’architecture et la suite prévue.
