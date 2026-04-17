# Get a shareable WakaTribe link in under 60 seconds

This is a static HTML project — every file can be served directly. Three ways to share it, from fastest to most permanent.

---

## ⚡ Fastest: Netlify Drop (no account, no terminal)

1. Open **<https://app.netlify.com/drop>** in your browser.
2. Drag the entire `wakanow-visa` folder from Finder onto the page.
3. You get a link like `https://gentle-frog-a1b2c3.netlify.app` instantly.
4. Copy it, share it. Done.

> Uploads without an account give you a 24-hour preview. Sign in (free Google login) to claim the site permanently.

Start URL after deploy: `https://your-site.netlify.app/wakatribe-login.html`
(`netlify.toml` is included — `/` will auto-redirect there.)

---

## 🔁 Persistent: Vercel (free, keeps updating from Git)

If you want the link to stay current as you edit:

```bash
# One-time install
npm i -g vercel

# From inside the wakanow-visa folder
vercel
```

Follow the prompts (sign in with GitHub/Google). You'll get:
- `https://wakatribe.vercel.app` (or similar)
- Auto-redeploys on every git push

`vercel.json` is already configured.

---

## 🧑‍💻 Developer-friendly: GitHub Pages

If your project is on GitHub:

1. Push the folder to a repo (e.g. `cynthia/wakatribe`)
2. Settings → Pages → Source: `main` branch, root
3. Your link: `https://cynthia.github.io/wakatribe/wakatribe-login.html`

---

## What to include in the share message

Paste this when sharing with reviewers:

> **WakaTribe preview** → `[your-link]/wakatribe-login.html`
>
> Try these entry points:
> - **Staff flow** — sign in with `cynthiaok@wakanow.com` (any password)
> - **Admin flow** — use the "Admin" tab with any admin@ email
> - **Super admin** — use the "Super admin" tab with `super@wakanow.com`
> - **French preview** — click the `FR` toggle bottom-right
> - **Sister businesses** — try `tolu@kalabash54.com`, `ops@pointview.com`
>
> Still a prototype — emails, scanning and backend calls are mocked.

---

## Notes & gotchas

- The app uses **localStorage** for session/role state. Reviewers on the same browser won't collide with your state only if they use incognito — warn them.
- The Google Translate cookie (`googtrans`) is set per-domain, so language persists on the deployed URL.
- QR payloads are hard-coded. Real deployment will need an HMAC-signing backend.
- Email flows are UI-only — wire to Resend/Supabase/SendGrid for real sends.
- `.claude/` and any local dev files are fine to leave in the folder — Netlify/Vercel will just serve them as static files.

---

## Entry points cheat sheet

| Path | What it is |
|---|---|
| `/` | → redirects to login |
| `/wakatribe-login.html` | Entry point, 3 tabs |
| `/wakatribe-hub.html` | App picker (after login) |
| `/wakatribe-super-admin.html` | Manage businesses |
| `/wakaeats-dashboard.html` | Admin dashboard |
| `/wakaeats-staff-home.html` | Staff landing |
| `/wakaeats-my-qr.html` | Staff QR code page |
| `/wakaeats-staff-feedback.html` | Meal feedback form |
| `/wakaeats-scanner.html` | Cafeteria tablet view |
| `/wakatribe-accept.html?id=WKN-00421` | Staff invite acceptance |
