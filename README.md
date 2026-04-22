# Nexora Onboarding

Application web progressive (PWA) d'onboarding B2B pour **Nexora**, une ESN spécialisée dans l'intégration logicielle pour startups et scale-ups.

---

## Présentation

Nexora Onboarding est un formulaire multi-étapes installable par les équipes commerciales, conçu pour centraliser les demandes de prestation clients en un point unique. L'application fonctionne en réseau dégradé et ne perd aucune donnée prospect.

### Les 4 étapes

| Étape | Contenu | Envoi |
|-------|---------|-------|
| 1 — Contact | Prénom, nom, email, téléphone, poste | Immédiat dès validation |
| 2 — Entreprise | Raison sociale, secteur, taille, SIRET | Différé si offline |
| 3 — Projet | Besoins, description, budget, délai, stack | Différé si offline |
| 4 — Confirmation | Récapitulatif + sync différée | Flush au retour réseau |

---

## Stack technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| Next.js | 16 | Framework React (App Router, API Routes) |
| TypeScript | 5 | Typage statique |
| Tailwind CSS | 3 | Styles utilitaires |
| React Hook Form | 7 | Gestion de formulaire |
| Zod | 3 | Validation client et serveur |
| Zustand | 4 | State global avec persistance |
| Prisma | 5 | ORM — modélisation et requêtes |
| SQLite | — | Base de données locale (dev) |
| @ducanh2912/next-pwa | — | Service Worker / PWA |
| Cypress | 15 | Tests E2E |

---

## Architecture — Atomic Design
src/
├── components/
│   ├── atoms/          # Button, Input, Label, ErrorMessage, Textarea, Select, Checkbox
│   ├── molecules/      # FormField, StepIndicator, OfflineBanner, NeedsSelector
│   ├── organisms/      # ContactForm, CompanyForm, ProjectForm
│   └── templates/      # OnboardingTemplate
├── app/
│   ├── page.tsx              # Étape 1 — Contact
│   ├── company/page.tsx      # Étape 2 — Entreprise
│   ├── metier/page.tsx       # Étape 3 — Projet
│   ├── merci/page.tsx        # Étape 4 — Confirmation + sync
│   └── api/leads/
│       ├── contact/route.ts  # POST — envoi prioritaire
│       ├── company/route.ts  # PATCH — données entreprise
│       └── project/route.ts  # PATCH — projet + planification
├── store/
│   └── onboardingStore.ts    # Zustand avec persist middleware
└── lib/
├── schemas.ts            # Schemas Zod partagés client/serveur
├── prisma.ts             # Client Prisma singleton
└── utils.ts              # cn() helper

---

## Prérequis

- Node.js >= 18
- npm >= 9

---

## Installation

```bash
# Cloner le projet
git clone https://github.com/[ton-username]/nexora-onboarding.git
cd nexora-onboarding

# Installer les dépendances
npm install --legacy-peer-deps

# Configurer l'environnement
cp .env.example .env

# Initialiser la base de données
npx prisma migrate dev

# Lancer en développement
npm run dev
```

---

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npx prisma studio` | Interface de visualisation BDD |
| `npx cypress run` | Tests E2E en mode headless |
| `npx cypress open` | Tests E2E en mode interactif |

---

## Fonctionnement offline

1. L'utilisateur remplit l'étape 1 — les données sont sauvegardées dans Zustand (localStorage)
2. Si le réseau est indisponible, une bannière s'affiche et `pendingSync` passe à `true`
3. La navigation entre les étapes continue normalement
4. À l'arrivée sur `/merci`, un `useEffect` détecte le retour réseau et envoie toutes les données en séquence
5. Le flag `pendingSync` repasse à `false` une fois la sync terminée

---

## Tests E2E

```bash
# Lancer le serveur de production
npm run build && npm run start -- -p 3001

# Dans un second terminal
npx cypress run
```

**Résultats : 11/11 tests passent**

| Suite | Tests |
|-------|-------|
| Étape 1 — Contact | 3/3 ✅ |
| Étape 2 — Entreprise | 3/3 ✅ |
| Étape 3 — Projet | 2/2 ✅ |
| Étape 4 — Confirmation | 3/3 ✅ |

---

## Déploiement Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

> Pour la production, remplacer SQLite par PostgreSQL (Neon ou Supabase) en modifiant
> le `provider` dans `prisma/schema.prisma` et en ajoutant `DATABASE_URL` dans les
> variables d'environnement Vercel.

---

## Variables d'environnement

```env
DATABASE_URL="file:./dev.db"
```

---

## Auteur

Projet réalisé dans le cadre d'un Master 1 Développement Front-End.