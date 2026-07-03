# Sattwik Jana — 3D Portfolio

[![Live on Vercel](https://img.shields.io/badge/Live-portfolio--tau--rouge--79.vercel.app-000000?style=flat&logo=vercel&logoColor=white)](https://portfolio-tau-rouge-79.vercel.app)

An immersive 3D animated portfolio: a glowing particle planet with animated trade routes floats behind every section, choreographed by your scroll — a nod to the cross-border commerce products I build.

## Live Demo

**🌐 [portfolio-tau-rouge-79.vercel.app](https://portfolio-tau-rouge-79.vercel.app)** — deployed on Vercel, auto-deploys on every push to `main`.

> Or run locally with `npm run dev` — opens at `http://localhost:5173`

## About the Project

The whole site sits on top of a persistent WebGL scene — a "commerce planet" made of ~4,200 particles, wrapped in a fresnel atmosphere, orbit rings with floating tech satellites, and bezier trade arcs carrying glowing packets between points on the globe. As you scroll, keyframed choreography moves the planet from side to side, retints its particles, and speeds up its spin with your scroll velocity, while the camera drifts with your mouse.

The content layer is a fully animated single page built from my CV and GitHub profile — hero with per-letter reveal and role typewriter, 3D-tilt glass cards with cursor-tracked glare, magnetic buttons, count-up stats, a scroll-linked timeline, and a mock-browser showcase for Global Shopper.

### Key Features

- **Particle planet** — fibonacci-sphere point cloud with violet→cyan pole-to-equator coloring
- **Trade arcs** — cubic-bezier routes across the globe with traveling glowing packets
- **Scroll choreography** — keyframed planet position / scale / tint per section, frame-rate-independent damping
- **Post-processing** — bloom + vignette via `@react-three/postprocessing`
- **Butter scroll** — Lenis smooth scrolling wired into the 3D scene (velocity drives spin)
- **UI/UX details** — preloader with wipe exit, custom cursor (dot + trailing ring), magnetic buttons, 3D tilt cards with glare, marquee, count-up counters, staggered word/letter reveals
- **Performance** — Three.js chunk is code-split and lazy-loaded behind the preloader (main bundle ~123 KB gzip); reduced particle counts on mobile; respects `prefers-reduced-motion`

### Sections

Hero · Tech marquee · About (photo + stats + education) · Skills arsenal · Experience @ Befach 4X · Flagship (Global Shopper) · Ventures launched · AI/ML/Data projects · Leadership & achievements · Contact

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Three.js + React Three Fiber | 3D rendering |
| @react-three/drei | 3D helpers (Stars, Line) |
| @react-three/postprocessing | Bloom & vignette |
| Framer Motion | Scroll reveals, stagger, tilt springs |
| Lenis | Smooth scrolling |
| Lucide React | Icons |
| Vite | Build tool |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── scene/
│   └── Scene.jsx        # WebGL world — particle planet, arcs, rings, bloom, scroll rig
├── components/
│   ├── ui.jsx           # Reveal, TiltCard, Magnetic, Counter, SectionHeading
│   ├── Preloader.jsx    # Count-up loader with wipe exit
│   ├── Cursor.jsx       # Custom cursor (dot + trailing ring)
│   ├── Navbar.jsx       # Glass nav, scroll progress, mobile menu
│   ├── Hero.jsx         # Letter-reveal name, role typewriter
│   ├── Marquee.jsx      # Infinite tech ticker
│   ├── About.jsx        # Photo card, stats, education, interests
│   ├── Skills.jsx       # Skill group cards
│   ├── Experience.jsx   # Timeline @ Befach 4X
│   ├── Flagship.jsx     # Global Shopper showcase (mock browser + features)
│   ├── Ventures.jsx     # Befach B2B, 91GI, D'Cal, Befach Foods
│   ├── Projects.jsx     # CNN, multi-agent AI, SQL/Power BI, bots
│   ├── Leadership.jsx   # Positions, achievements, certifications
│   └── Contact.jsx      # Big CTA + footer
├── data/
│   └── portfolio.js     # Single source of truth (CV + GitHub README content)
├── utils/
│   └── scrollState.js   # Shared scroll progress bridge (Lenis → Three.js)
├── App.jsx              # Composition + Lenis setup + lazy 3D scene
└── index.css            # Design system (Syne / Space Grotesk / JetBrains Mono)
```

## Author

**Sattwik Jana**
- GitHub: [@Sattwikjana](https://github.com/Sattwikjana)
- Email: sattwikjana77@gmail.com
- LinkedIn: [sattwik-jana](https://www.linkedin.com/in/sattwik-jana/)
- Live work: [globalshopper.in](https://www.globalshopper.in)
