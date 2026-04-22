# Design Brief

## Tone & Direction
Retro-futuristic deep tech platform with cinematic energy. Premium, ambitious, cutting-edge. Dark space as default with luminous neon accents. Strict avoidance of gold/yellow. Admin portal extends the hero aesthetic into productivity UI — glass morphism, data-density refinement, role-based visual hierarchy.

## Palette (OKLCH — Dark Mode)
| Token | OKLCH | Purpose |
|-------|-------|---------|
| background | 0.12 0.05 260° | Deep navy space base |
| foreground | 0.92 0.02 260° | Soft off-white text |
| card | 0.18 0.08 260° | Elevated card surfaces |
| primary | 0.68 0.24 200° | Neon cyan — CTAs, highlights |
| secondary | 0.55 0.20 270° | Vivid violet — secondary accents |
| accent | 0.60 0.25 290° | Neon magenta — calls-to-action |
| success | 0.65 0.22 140° | Enrollment/payment success (teal) |
| warning | 0.75 0.19 65° | Pending payments, draft states |
| destructive | 0.62 0.21 25° | Warning/error states |
| border | 0.25 0.10 260° | Subtle card/input borders |
| muted | 0.28 0.08 260° | Disabled/secondary text |

## Typography
| Role | Font | Usage |
|------|------|-------|
| Display (headings, hero) | Space Grotesk | Bold, geometric, futuristic |
| Body (content, labels) | Plus Jakarta Sans | Clean, modern, highly readable |
| Mono (code, data) | JetBrains Mono | Technical, minimal |

## Structural Zones
| Zone | Styling | Purpose |
|------|---------|---------|
| Header/Nav | `bg-card` border-b; cyan active nav indicator | Brand + user menu |
| Hero (landing) | Full-width gradient (navy→purple); gradient-text headlines | Landing showcase |
| Admin Sidebar | `bg-sidebar` nav-item hover states; cyan active highlight | Navigation + role badge |
| Admin Content | `bg-background` + cards `glass-morphism`; table rows with hover | Data tables, forms, dashboards |
| Modals/Drawers | `admin-modal-content` glass-morphism; centered or right-aligned | CRUD operations |
| Footer | `bg-card` border-t; muted text | Landing footer |

## Shape Language
- Border radius: `0` (sharp), `8px` (buttons/modals), `12px` (inputs), `16px` (glass cards)
- Table row density: 12px vertical padding, 16px horizontal gaps
- Modal padding: 32px; form field gap: 16px
- Shadows: Glow effects on glass cards only; hover state: scale 1.02 + opacity shift

## Component Patterns
- **Buttons**: Cyan primary (`bg-primary glow-cyan`), violet secondary (`bg-secondary`), magenta accent (`bg-accent glow-magenta`)
- **Badges**: Role badges (admin=cyan, teacher=warning, student=success); status badges (pending=warning, success=success, failed=destructive)
- **Cards**: Glass morphism + 1-2px neon borders; admin cards use subtle inner glow
- **Tables**: Header `bg-admin-bg-hover`; rows hover-state; inline edit/delete action buttons
- **Modals**: Centered glass overlay; form fields with focus ring cyan; CTA buttons use primary accent
- **File Uploads**: Dashed border drop-zone; hover state transitions to primary border + glow
- **Inputs**: `bg-input` border-border; focus ring cyan; 8px border-radius

## Motion & Animation
- **Entrance**: Fade + slide (0.4s ease-out) on page load; slide-in-left for sidebars
- **Hover**: Subtle scale (1.02), glow intensifies on interactive elements
- **Continuous**: Float animation (3s) on hero elements; pulse-glow on active badges
- **Transitions**: All 0.3s cubic-bezier(0.4, 0, 0.2, 1) smooth

## Admin Portal Specifics
- **Sidebar**: Collapsible nav with role-aware items; active state: cyan background + primary text
- **Data Tables**: Stripe rows on hover; inline edit/delete (secondary/destructive buttons); pagination or virtualization for scale
- **Status Badges**: Role badges + payment status (success/warning/destructive); enrollment state visual cues
- **Role Differentiation**: Admin (cyan accent), Teacher (warning/yellow-adjacent accent), Student (success/teal accent)
- **File Upload**: Drag-drop zone with dashed border; visual feedback on drop; progress indicator on upload

## Differentiation
Deep space + neon aesthetic creates premium tech-startup feel. Extends hero cinematic language into admin productivity UI — glass morphism maintains futuristic depth, glow effects on all interactive elements, no corporate blues or gold/yellow. Data density balanced with breathing room; role-based visual hierarchy prevents UI overload.

## Constraints
- Never use gold (#FFD700), yellow, or warm tones
- All text meets WCAG AA contrast on dark backgrounds (L diff ≥ 0.7)
- Glow effects on `.dark` only; light mode uses flat colors
- No arbitrary hex colors — use CSS custom properties exclusively
- Animations use Framer Motion, not GSAP
- Admin tables maintain focus visibility for keyboard navigation
