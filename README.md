# Northern City Football Club (NCFC) — Official Community Website

A fast, responsive, zero-dependency website built for **Northern City Football Club** (`northerncityfc.com.au`), based at **Dryandra Reserve** in **Mirrabooka, Perth, Western Australia (6061)**.

## Club Highlights Included
- **Official Volt Yellow & Pitch Black Branding**: Styled directly from Northern City FC's woven crest and 2026 championship tiger-stripe kits.
- **Junior Trials Hub**:
  - **Age Groups**: Under 13, Under 13 Girls, Under 14, Under 15, Under 16, Under 18, Under 18 Girls.
  - **Dates & Times**: Wednesday Nov 18 & Friday Nov 20 (Arrive 5:00 PM | Trials Start 5:30 PM).
  - **Venues**:
    - **U13 – U15**: Fragrant Gardens, Mirrabooka
    - **U16 – U18**: Dryandra Reserve (Dryandra Drive & Pendula Gardens, Mirrabooka)
  - **Express Player Trial Registration Form**: Pre-fills a structured check-in email directly to `fcnortherncity@gmail.com`.
- **2026 Champions Gallery**: Showcases both 2026 Football West **Junior Divisional Top 4 Cup Winners** squads.
- **Community & Business Sponsorship Section**: Built-in sponsorship call-to-action to connect local community businesses with the club.
- **Direct Club Contact & Social Links**:
  - **Phone**: `+61 456 447 068`
  - **Email**: `fcnortherncity@gmail.com`
  - **Instagram**: [@northerncityfc](https://www.instagram.com/northerncityfc/)
  - **Facebook**: [Northern City FC](https://www.facebook.com/p/Northern-City-FC-100069073464415/)

## Project Structure

```text
northern-city-fc/
├── index.html                  # Main single-page club website
├── assets/
│   ├── css/
│   │   └── styles.css          # Custom Volt Yellow & Black responsive theme
│   ├── js/
│   │   └── main.js             # Squad filter tabs, FAQ accordion, & trial registration handler
│   └── images/
│       ├── logo-patch.jpg      # Official woven crest on Volt Yellow jersey
│       ├── junior-trials-flyer.jpg # Official Junior Trials flyer
│       ├── winners-cup-1.jpg   # 2026 Football West Junior Divisional Top 4 Cup Winners
│       └── winners-cup-2.jpg   # 2026 Football West Junior Divisional Top 4 Cup Winners
└── README.md
```

## Running Locally or Deploying

Because this site uses pure HTML5, CSS3, and vanilla JavaScript with zero build step required:
1. **Local Preview**: Open `index.html` directly in any browser, or serve with Python/Node:
   ```bash
   python -m http.server 8080
   ```
2. **Free Hosting (GitHub Pages / Netlify / Cloudflare Pages)**:
   Push this repository to GitHub and enable **GitHub Pages** on the `main` branch, then point `northerncityfc.com.au` to it for 100% free hosting.
