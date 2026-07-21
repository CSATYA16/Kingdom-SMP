# Kingdom SMP Website

The official frontend for the Kingdom SMP Minecraft Server.

## Technology Stack

- **React 18** (Vite)
- **TypeScript**
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **React Router** (Routing)
- **Lucide React** (Icons)

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` to `.env` and fill in your variables.
4. Run the development server:
   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
npm run preview
```

## Configuration

The website content is fully data-driven. Modify the following files in `src/config/` and `src/data/` to update content without touching the UI code:

- `src/config/server.ts`: Server IP, Version, Name.
- `src/config/socials.ts`: Discord, YouTube, Instagram links.
- `src/config/creator.ts`: Founder information.
- `src/data/media.ts`: Images, Memories, and Video links.
- `src/data/handbook.ts`: Rules, FAQs, Commands.

## Project Structure

- `/public/media/`: All static images and videos.
- `/src/components/`: Reusable UI components and page sections.
- `/src/pages/`: Main route pages.
- `/src/config/`: Core static configuration.
- `/src/data/`: Dynamic data structures for content.
