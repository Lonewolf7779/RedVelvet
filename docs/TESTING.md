# Testing Strategy & Verification Pipeline

## 1. Testing Pyramid

Project Red Velvet enforces testing across multiple verification layers:

```
          / \
         / E2E \       Playwright / Browser Canvas
        /-------\
       / Security\     OWASP ASVS Baseline & Bandit
      /-----------\
     / Integration \   Cross-Service API Probes
    /---------------\
   /    Unit Tests   \  Pytest & Node Native Test Runner
  /-------------------\
```

---

## 2. Test Execution Commands

### 2.1 Backend Tests

```bash
# Execute Pytest with coverage
pytest apps/api/tests tests/security --cov=apps/api/app --cov-report=term-missing
```

### 2.2 Frontend Tests

```bash
# Execute Node native test runner in apps/web
pnpm --filter @red-velvet/web test
```

### 2.3 Security Baseline Tests

```bash
# Execute OWASP ASVS automated header and size checks
pytest tests/security/test_security_baseline.py
```

### 2.4 Load Tests (k6)

```bash
# Execute performance load profile against liveness endpoint
k6 run tests/load/k6-health-load.js
```

---

## 3. Strict Rules

- No placeholder tests that always pass unconditionally.
- No suppressing failing tests to achieve green builds.
- Coverage threshold: minimum 80% coverage on core business logic.
