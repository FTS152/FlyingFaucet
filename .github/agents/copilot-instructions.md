# Flying Faucet (飛行水龍頭) Development Guidelines

Auto-generated from feature plans. Last updated: 2026-02-09

## Active Technologies

| Category | Technology |
|----------|------------|
| Language | HTML5, CSS3, ES6+ JavaScript (vanilla) |
| Framework | None (constitutional requirement) |
| Storage | Browser localStorage |
| Build | None required (single-file architecture) |
| Testing | Manual browser testing (Chrome, Firefox) |

## Project Structure

```text
flyingFaucet/
├── doujin-sim.html      # Main game file (single-file application)
├── test.html            # Test file
├── .specify/            # Speckit configuration
│   ├── memory/
│   │   └── constitution.md
│   ├── scripts/
│   └── templates/
└── specs/
    └── 1-doujin-sim/    # Current feature documentation
        ├── spec.md
        ├── plan.md
        ├── research.md
        ├── data-model.md
        ├── quickstart.md
        └── contracts/
            └── game-api.md
```

## Commands

No build commands required. Development workflow:

1. Edit `doujin-sim.html` in text editor
2. Open in browser (double-click or `file://` protocol)
3. Refresh browser after changes (F5)
4. Use DevTools console for debugging (F12)

## Code Style

### JavaScript (ES6+)

- Use `const` and `let`, avoid `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Use destructuring for object/array access
- Group functions by category with Chinese comments (e.g., `// === 遊戲狀態 ===`)
- Prefer descriptive names in Chinese or English

### CSS3

- Use CSS Grid and Flexbox for layouts
- Use CSS custom properties (variables) for theming
- Mobile-first responsive design with `@media` queries
- BEM-like naming for classes (optional)

### HTML5

- Semantic HTML elements where appropriate
- `lang="zh-TW"` attribute on `<html>`
- All content in single file (CSS in `<style>`, JS in `<script>`)

## Constitutional Constraints

Per `.specify/memory/constitution.md`:

1. **Single-File Architecture**: All code must be in one HTML file
2. **Vanilla Standards**: No build tools, no npm, no frameworks
3. **Code Organization**: HTML → CSS → JS order, clear section comments

## Recent Changes

### 1-doujin-sim (Current)
- P×D×B economic model with 8 archetypes
- Dynamic event system (4 categories)
- Three-phase convention simulation
- Template + dictionary content generation
- Browser localStorage persistence

<!-- MANUAL ADDITIONS START -->
<!-- Add any manual project-specific instructions below this line -->
<!-- MANUAL ADDITIONS END -->
