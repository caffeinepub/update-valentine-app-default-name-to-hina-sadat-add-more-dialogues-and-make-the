# Specification

## Summary
**Goal:** Revert the app’s default displayed name to the previous default, “Ghazal”.

**Planned changes:**
- Update the initial/default name value so that on first load both the large name header and the editable name input are prefilled with “Ghazal” (instead of “Hina Sadat”).
- Keep the existing live-update behavior so editing the name continues to update the header as the user types.

**User-visible outcome:** On a fresh page load, the header and name input show “Ghazal” by default, and the user can still edit the name with the header updating immediately.
