# GitHub Support Ticket

**Subject:** GitHub Pages stuck on legacy build type - builds never complete

**Account:** tw-riviera
**Affected Repository:** tw-riviera/Hermes_VPS
**Date:** 2026-05-26

---

## Problem Description

My GitHub Pages builds are stuck in the `legacy` build type and never complete. The status cycles between `building` (indefinitely) and `errored`.

## Symptoms

1. **Build type locked to `legacy`:** API and UI both show `build_type: legacy`
2. **Builds never finish:** Status stays `building` for 10+ minutes, then flips to `errored`
3. **New repos affected:** Creating fresh repos and enabling Pages produces the same result
4. **All files return 404:** Even confirmed-existing files in the repo return 404 on Pages

## What I've Tried

| Step | Result |
|------|--------|
| Disable Pages → Re-enable with "Deploy from a branch" | Same issue |
| Switch to "GitHub Actions" → Switch back to branch | Same issue |
| Delete all Pages trigger files (.github/workflows, .nojekyll, _config.yml) | Same issue |
| Force new commits to trigger rebuild | Same issue |
| Use API to DELETE /pages then POST to re-enable | Returns `legacy` immediately |
| Wait 24+ hours | No change |

## API Response

```json
{
  "status": "building",
  "build_type": "legacy",
  "source": {
    "branch": "main",
    "path": "/"
  }
}
```

## Request

Please migrate my account from the deprecated `legacy` Pages build type to the current `workflow` (GitHub Actions) system, or fix the stuck build queue.

## Links

- Affected repo: https://github.com/tw-riviera/Hermes_VPS
- Expected URL: https://tw-riviera.github.io/Hermes_VPS/
- Specific file that should work: https://tw-riviera.github.io/Hermes_VPS/artwork/operation_cold_war_internal_report.html

---

Thank you.
