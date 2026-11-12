# GitHub Collaboration & Engineering Workflow

This guide establishes the Git collaboration protocols, branch lifecycle, component ownership, and Pull Request (PR) workflow for the two-developer team building **SETU**.

---

## 👥 Team Roles & Code Ownership

| Developer | Primary Ownership Areas | Core Responsibilities |
| :--- | :--- | :--- |
| **Yeswanth Kumar Kaluva** | `server/`<br>`database/` | Backend REST APIs, Express routes, controllers, services, Supabase database schemas, migrations, seed data, and Sarvam AI integration. |
| **Akash Sharabu** | `client/` | React Single-Page Application, Tailwind CSS styling, responsive layout, Recharts data visualizers, merchant UI components, and conversational advisor view. |
| **Both Developers** | `docs/`<br>Root files | System architecture documentation, API contract validation, end-to-end integration testing, final hackathon presentation. |

---

## 🌿 Git Branching Strategy

The repository follows a strict **Feature Branch Workflow**:

```
main (Protected, Production-Ready)
  │
  ├── feature/backend-setup      (Yeswanth)
  ├── feature/frontend-setup     (Akash)
  ├── feature/sales-api          (Yeswanth)
  ├── feature/dashboard-ui       (Akash)
  ├── feature/inventory-logic    (Yeswanth)
  ├── feature/inventory-ui       (Akash)
  ├── feature/ai-advisor         (Yeswanth & Akash)
  └── feature/finance-dashboard  (Yeswanth & Akash)
```

### Core Collaboration Rules:
1. **Never commit directly to `main`**: All features and fixes must merge into `main` via reviewed Pull Requests.
2. **Pull `main` before starting new work**: Always branch off the freshest upstream commit.
3. **Respect file ownership boundaries**: Do not alter files in the co-developer's owned directory without prior coordination.
4. **Never commit environment secrets**: Keep `.env` out of commits; verify with `git status` before committing.
5. **Verify builds before pushing**: Run `npm run build` locally before opening a PR.

---

## 💻 Exact Command-Line Guide (Step-by-Step)

### 1. Initial Setup (Clone & Install)

```bash
# Clone the repository
git clone https://github.com/Yesh-219/SETU-Merchant-Growth-AI.git
cd SETU-Merchant-Growth-AI

# Install all workspace dependencies across client and server
npm install
```

---

### 2. Starting a New Feature Branch

```bash
# Always ensure your local main is up to date
git checkout main
git pull origin main

# Create and switch to your feature branch
# For Yeswanth (Backend):
git checkout -b feature/sales-api

# For Akash (Frontend):
git checkout -b feature/dashboard-ui
```

---

### 3. Making Commits with Semantic Messages

```bash
# Check modified files
git status

# Stage specific changes (never stage .env or node_modules)
git add server/src/routes/sales.routes.ts server/src/services/sales.service.ts
# OR stage client changes
git add client/src/pages/Dashboard/DashboardPage.tsx

# Commit with a clear, imperative message
git commit -m "feat(sales): implement sales summary calculations and aggregation service"
```

#### Commit Message Conventions:
- `feat(scope): ...` for new features or endpoints.
- `fix(scope): ...` for bug fixes.
- `docs(scope): ...` for documentation updates.
- `refactor(scope): ...` for code reorganization without behavior change.
- `chore(scope): ...` for dependencies or workspace configuration.

---

### 4. Pushing Changes to GitHub

```bash
# Push your feature branch to the remote repository
git push -u origin feature/sales-api
```

---

### 5. Creating & Reviewing a Pull Request (PR)

1. Navigate to [SETU GitHub Repository](https://github.com/Yesh-219/SETU-Merchant-Growth-AI).
2. Click **Compare & pull request**.
3. Select `base: main` <── `compare: feature/your-branch`.
4. Fill in the automated [Pull Request Template](../.github/pull_request_template.md).
5. Assign your co-developer as Reviewer:
   - Yeswanth assigns Akash to review backend PRs.
   - Akash assigns Yeswanth to review frontend PRs.
6. Co-developer reviews code, checks CI verification, and clicks **Approve**.
7. Merge into `main` using **Squash and Merge** or **Rebase and Merge**.

---

### 6. Keeping Your Branch Up-to-Date (Syncing with `main`)

If your co-developer merged changes while you are working on your branch:

```bash
# Fetch latest commits from remote
git fetch origin

# Option A: Rebase your branch onto updated main (cleanest history)
git checkout feature/your-branch
git rebase origin/main

# Option B: Standard Merge
git merge origin/main
```

---

### 7. Resolving Merge Conflicts

If a conflict occurs:

```bash
# 1. Identify conflicting files
git status

# 2. Open conflicting files in your editor (look for <<<<<<< HEAD markers)
# 3. Choose the correct code resolution
# 4. Stage resolved files
git add <path-to-resolved-file>

# 5. Continue rebase or complete merge
git rebase --continue
# OR if merging:
git commit -m "chore: resolve merge conflicts with main"

# 6. Push resolved branch
git push origin feature/your-branch --force-with-lease
```

---

## 🛡️ Pre-Flight Verification Checklist

Before pushing any PR, run:
```bash
# 1. Verify backend compiles
npm run build:server

# 2. Verify frontend compiles
npm run build:client

# 3. Confirm clean git status
git status
```

