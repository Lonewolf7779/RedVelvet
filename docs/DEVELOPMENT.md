# Local Development & Contributor Guide

## 1. Prerequisites

- **Node.js**: v20.x or higher
- **pnpm**: v12.x or higher
- **Python**: v3.11 or higher
- **Docker & Docker Compose**: (Recommended for datastores)

---

## 2. Quickstart Instructions

### 2.1 Clone & Branching

```bash
git clone https://github.com/Lonewolf7779/RedVelvet.git
cd RedVelvet
git checkout feature/rv-001-foundation
```

### 2.2 Frontend Setup

```bash
# Install workspace dependencies
pnpm install

# Run web in development mode
pnpm --filter @red-velvet/web dev
```

### 2.3 Backend Setup

```bash
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install requirements
pip install -r apps/api/requirements.txt
pip install -r apps/api/requirements-dev.txt

# Run API server
uvicorn app.main:app --app-dir apps/api --reload --port 8000
```

---

## 3. Engineering Rules & Code Quality

1. **Never commit secrets**: Do not commit `.env`, private keys, or passwords.
2. **Branching**: Do not commit directly to `main`. Create `feature/<ticket-id>-<short-description>`.
3. **Linting & Formatting**: Ensure `pnpm run lint` and `ruff check` pass before submitting pull requests.
4. **Clean Git History**: Write concise, atomic conventional commits (`feat:`, `fix:`, `chore:`, `docs:`).
