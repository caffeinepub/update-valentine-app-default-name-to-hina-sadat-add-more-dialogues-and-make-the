# Specification

## Summary
**Goal:** Update the Valentine app’s default name, improve the “No” interaction with more rotating dialogues and click-only movement, and ensure the main layout fits well on phone screens.

**Planned changes:**
- Change the default displayed name and prefilled editable name field to “Hina Sadat” on first load, removing any remaining “Ghazal” defaulting.
- Expand the in-code rotating “No” button dialogue list significantly and cycle through the full set on each tap/click.
- Update “No” button behavior so it moves only when tapped/clicked (not on hover or proximity), and prevent double-triggering on mobile.
- Adjust the main interaction layout for small viewports to avoid horizontal overflow and keep Yes/No buttons fully visible and tappable, with “No” movement constrained within the visible container area.

**User-visible outcome:** On first load the app shows “Hina Sadat” by default, the “No” button cycles through many more messages and only moves when tapped/clicked, and the main interaction fits comfortably on phone-sized screens without horizontal scrolling.
