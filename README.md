# Hidden Gems — Offbeat Himalayan Travel Platform

A luxury, production-ready travel platform focused on **17 curated offbeat destinations** in North Bengal and Sikkim, India.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Primitives:** Radix UI + Custom Components
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Font:** Inter (Google Fonts)

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── globals.css         # Global styles + Tailwind theme
│   ├── loading.tsx         # Global loading state
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # SEO sitemap
│   ├── about/
│   ├── attractions/
│   ├── blog/[slug]/
│   ├── contact/
│   ├── destinations/[slug]/
│   ├── faq/
│   ├── food-guide/
│   ├── homestays/
│   ├── hotels/
│   ├── itineraries/
│   ├── packages/
│   ├── privacy/
│   ├── terms/
│   ├── travel-planner/
│   └── wishlist/
├── components/
│   ├── ui/                 # Reusable UI primitives
│   ├── sections/           # Homepage sections
│   └── destination/        # Destination detail components
├── lib/
│   ├── data.ts             # All 17 destinations + packages + hotels + homestays + blogs + events
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # cn() utility
public/
├── robots.txt
├── manifest.json
```

## 🗺️ 17 Destinations Covered

| # | Destination | State | Tagline |
|---|-------------|-------|---------|
| 1 | Kalimpong | West Bengal | The Hill Station of Golden Pastures |
| 2 | Pabong | Sikkim | The Untouched Himalayan Hamlet |
| 3 | Lebong | West Bengal | Valley of the Rising Sun |
| 4 | Ramdhura | West Bengal | Where the Clouds Embrace the Mountains |
| 5 | Mirik | West Bengal | The Valley of the Lake |
| 6 | Lamahatta | West Bengal | The Eco-Tourism Paradise |
| 7 | Lepchajagat | West Bengal | The Lepcha Heritage Village |
| 8 | Chatakpur | West Bengal | The Eco-Village in the Clouds |
| 9 | Samsing | West Bengal | The Valley of Oranges and Rivers |
| 10 | Sittong | West Bengal | The Orange Village of Bengal |
| 11 | Bijanbari | West Bengal | The Riverside Retreat |
| 12 | Ahaldhara | West Bengal | The Viewpoint Above the Clouds |
| 13 | Kolbong | West Bengal | The Silent Valley of Pines |
| 14 | Kolakham | West Bengal | Where Kanchenjunga Smiles at You |
| 15 | Peshok | West Bengal | The Tea Garden Wonderland |
| 16 | Rishikhola | West Bengal | The Riverside Camping Paradise |
| 17 | Pelling | Sikkim | The Crown Jewel of Sikkim |

## ✨ Features Implemented (Phase 1)

### Pages
- **Homepage** — Hero parallax, featured destinations, packages, homestays, activities, events, blog, testimonials, newsletter, FAQ
- **Destinations Listing** — Search, filters by state/tag/rating, 17 destination cards
- **Destination Detail** — Hero, overview, gallery, attractions, food, activities, itinerary, transport, reviews, FAQ, sidebar
- **Packages** — Filter by type, price, duration
- **Homestays** — Filter by location, price, amenities
- **Hotels** — Filter by stars, location, price
- **Food Guide** — Restaurants, cafes, street food, dishes, tips
- **Blog** — Category filters, article pages
- **Itineraries** — Duration filters, day-by-day plans
- **Attractions** — Category filters across all destinations
- **Travel Planner (AI)** — Visual mockup for Phase 3
- **Contact, About, FAQ, Privacy, Terms** — Full content pages
- **Wishlist** — Tabbed saved items interface
- **404 Not Found** — Animated mountain-themed page

### Design & UX
- ✅ Dark Mode toggle
- ✅ Responsive mobile-first design
- ✅ Smooth scroll with CSS
- ✅ Glassmorphism cards
- ✅ Framer Motion animations (scroll reveals, parallax, hover effects)
- ✅ Premium color palette (Forest Green #0B5D3B, Accent Orange #FF8A00)
- ✅ SEO optimized (sitemap.xml, meta tags, Open Graph, structured data ready)
- ✅ PWA manifest
- ✅ Static HTML export ready

## 🛠️ Scripts

```bash
# Development
npm run dev

# Build for production (static export)
npm run build

# Serve production build
npx serve dist
```

## 🔮 Roadmap

### Phase 2 — Booking Platform
- Package booking flow
- Hotel/Homestay reservations
- Car/taxi booking
- Local guide booking
- Trek & camping bookings
- Adventure activity bookings

### Phase 3 — AI Features
- AI Trip Planner (budget + dates → itinerary)
- AI Chatbot for recommendations
- Trip Budget Calculator
- AI Weather Suggestions
- AI Hotel Recommendations
- AI Food Recommendations
- Packing List Generator
- Festival Alerts

### Phase 4 — Marketplace
- Homestay owner registration
- Guide registration
- Taxi owner registration
- Travel agency portal
- Local photographer marketplace
- Bike rental marketplace

## 📄 License

MIT — Built for learning and growth.
