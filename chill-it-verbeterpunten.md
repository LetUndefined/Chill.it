# Chill.it — Verbeterpunten

**Datum:** 19 maart 2026
**Project:** Chill.it (Vue 3 + Supabase + Leaflet)

---

## Bugs / Fouten

### 1. Verkeerd alert type bij verwijdering
**Bestand:** `src/stores/supaBase.ts` — lijn ~118
**Probleem:** `notify('Error', 'Location deleted successfully', 3000)` gebruikt het type `'Error'` terwijl het een succesmelding is.
**Oplossing:** Vervang `'Error'` door `'Success'`.

---

### 2. Spelfout in foutmelding
**Bestand:** `src/views/LoginView.vue` — lijn 18
**Probleem:** `"Email or Password inccorect"` bevat een dubbele `c`.
**Oplossing:** Vervang `inccorect` door `incorrect`.

---

### 3. Spelfout in bestandsnaam component
**Bestand:** `src/components/ExpansianPanel.vue`
**Probleem:** Bestandsnaam gespeld als `ExpansianPanel` in plaats van `ExpansionPanel`.
**Oplossing:** Hernoem het bestand en pas alle imports aan.

---

## Risico's

### 4. Alert ID collision
**Bestand:** `src/services/alert.ts` — lijn ~21
**Probleem:** IDs worden gegenereerd via `Math.floor(Math.random() * 100)`. Met maar 100 mogelijke waarden is er een reële kans op ID-botsingen bij meerdere gelijktijdige meldingen.
**Oplossing:** Gebruik `crypto.randomUUID()` of een grotere random range.

---

### 5. Map initialisatie via polling (race condition)
**Bestand:** `src/components/LocationCard.vue` — lijnen 38–55
**Probleem:** De kaart wordt tot 10 keer gepolled met 100ms vertraging om te wachten tot Leaflet klaar is. Dit is een fragiele workaround voor een race condition.
**Oplossing:** Vervang de polling door een `watch()` op de map state in de Pinia store.

---

## Verbeteringen

### 6. Formuliervalidatie feedback ontbreekt
**Betrokken bestanden:** `src/components/InputForm.vue`, `src/views/LoginView.vue`, `src/views/SignUpView.vue`
**Probleem:** Invoervelden tonen geen inline foutmeldingen bij ongeldige input (bv. leeg veld, wachtwoord te kort, ongeldige e-mail).
**Oplossing:** Gebruik de `rules` prop van Vuetify op `v-text-field` en `v-file-input` componenten.

---

### 7. Geen bestandsgrootte-validatie bij uploads
**Bestand:** `src/components/InputForm.vue`
**Probleem:** Foto-uploads filteren wel op bestandstype (afbeelding) maar niet op bestandsgrootte. Grote bestanden kunnen uploads laten mislukken of traag maken.
**Oplossing:** Voeg een validatieregel toe die bestanden boven bv. 5 MB weigert.

---

### 8. Geen tests aanwezig
**Probleem:** Er zijn geen testbestanden aanwezig in het project. Bij groeiende complexiteit verhoogt dit het risico op regressies.
**Oplossing:** Begin met unit tests voor de filterlogica (`src/services/filterLogic.ts`) en de Pinia stores. Vitest is al beschikbaar in het Vue/Vite ecosysteem.

---

### 9. Modal state buiten Pinia
**Bestand:** `src/services/ModalTrigger.ts`
**Probleem:** De globale modal state wordt bijgehouden via een file-level `ref` buiten een Pinia store. Dit maakt de state moeilijker te debuggen en te testen.
**Oplossing:** Verplaats de modal state naar een eigen Pinia store.

---

## Prioriteitsoverzicht

| Prioriteit | Taak |
|------------|------|
| Hoog       | Bug fix: alert type `'Error'` → `'Success'` (`supaBase.ts`) |
| Hoog       | Formuliervalidatie toevoegen (Vuetify `rules`) |
| Middel     | Alert ID collision oplossen (`crypto.randomUUID()`) |
| Middel     | Spelfout `inccorect` fixen (`LoginView.vue`) |
| Middel     | Bestandsgrootte-validatie bij uploads |
| Laag       | Map polling vervangen door watcher |
| Laag       | Bestandsnaam `ExpansianPanel` corrigeren |
| Laag       | Modal state naar Pinia store verplaatsen |
| Laag       | Unit tests toevoegen (Vitest) |
