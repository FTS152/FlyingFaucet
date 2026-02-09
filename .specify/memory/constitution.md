<!--
SYNC IMPACT REPORT
==================
Version Change: [TEMPLATE] → 1.0.0
Constitution Type: Minimized HTML Frontend Application

Modified Principles:
- NEW: I. Single-File Architecture
- NEW: II. Vanilla Standards (No Build Tools)
- NEW: III. Code Organization & Clarity

Added Sections:
- Browser Compatibility Requirements
- Development Workflow

Templates Status:
- ✅ plan-template.md: Reviewed - compatible with frontend principles
- ✅ spec-template.md: Reviewed - user story format applies to features
- ✅ tasks-template.md: Reviewed - task organization applies to HTML updates

Follow-up TODOs: None - all placeholders resolved
-->

# 飛行水龍頭 (Flying Faucet) Constitution

**專案類型**: Pure Frontend HTML Application (純前端 HTML 應用)

## Core Principles

### I. Single-File Architecture
**MUST** maintain application as a single self-contained HTML file.

- All styling MUST be contained in `<style>` block within the HTML file
- All JavaScript MUST be contained in `<script>` block within the HTML file
- No external dependencies, libraries, or frameworks
- File MUST be directly openable in any modern browser without a web server
- Maximum portability: one file = complete application

**Rationale**: Ensures zero-dependency deployment, maximum portability, and ease of sharing. Users can download one file and run it immediately without setup.

### II. Vanilla Standards (No Build Tools)
**MUST** use only vanilla HTML5, CSS3, and modern JavaScript (ES6+).

- No transpilation, bundling, or build steps required
- No npm, webpack, vite, or similar tools
- Use native browser APIs only (no jQuery, React, Vue, etc.)
- Code MUST run directly in browser without preprocessing
- Use modern JavaScript features supported by current browsers (2024+)

**Rationale**: Eliminates build complexity, reduces maintenance burden, and ensures direct browser compatibility. Anyone can edit the file in a text editor without specialized tooling.

### III. Code Organization & Clarity
**MUST** maintain clear separation of concerns within the single file.

Structure MUST follow this order:
1. HTML structure (`<body>` content)
2. CSS styling (`<style>` block in `<head>`)
3. JavaScript logic (`<script>` block before `</body>`)

Within JavaScript section:
- Use clear variable names in Chinese or English
- Group related functions together with comments
- Separate game state, UI logic, and event handlers
- Add section comments (e.g., `// === 遊戲狀態 ===`, `// === UI 更新 ===`)

**Rationale**: Maintains readability and navigability even as the single file grows. Clear organization enables quick understanding and modification.

## Browser Compatibility Requirements

Target: Modern evergreen browsers (Chrome, Firefox, Edge, Safari - last 2 versions)

- MUST test in at least Chrome and Firefox before finalizing changes
- Avoid experimental CSS/JS features without fallbacks
- Use standard CSS Grid, Flexbox for layouts (widely supported)
- Prefer `const`/`let` over `var`, arrow functions, template literals
- LocalStorage API for persistence (widely supported)

## Development Workflow

**Iterative Enhancement**:
- Make small, testable changes
- Open in browser after each significant change
- Use browser DevTools console for debugging
- Save working versions before major refactoring

**Version Tracking**:
- Update version number in HTML title when releasing new features
- Use Git commits for change history
- Keep meaningful commit messages in Chinese or English

**Feature Development**:
1. Define user story with acceptance criteria
2. Implement in small increments
3. Test in browser after each increment
4. Commit when feature is complete and tested

## Governance

This constitution defines the non-negotiable constraints for this project:

- All changes MUST comply with the three core principles
- Proposals to add external dependencies MUST be rejected unless critical
- Complexity MUST be justified - prefer simple solutions
- When in doubt, favor simplicity and vanilla approaches over sophisticated patterns

**Amendment Process**:
- Constitution changes require clear rationale
- Version bumps: MAJOR (principle changes), MINOR (new principles), PATCH (clarifications)
- Document all amendments with date and reasoning

**Version**: 1.0.0 | **Ratified**: 2026-02-09 | **Last Amended**: 2026-02-09
