'use client';

import { Link } from '@/i18n/navigation';
import PageBackground from '@/components/PageBackground';

export default function NotFound() {
  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground flex flex-col items-center justify-center overflow-x-clip">
      <PageBackground />

      <div className="text-center space-y-6">
        <h1
          className="font-display font-extrabold tracking-[-0.05em] text-foreground text-grain"
          style={{ fontSize: 'clamp(64px, 20vw, 200px)' }}
        >
          404
        </h1>
        <p className="text-sm font-mono text-white/40 tracking-wider">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-block text-xs font-mono tracking-wider text-white/50 hover:text-white/80 transition-colors duration-200 border border-white/[0.08] px-4 py-2 mt-4"
        >
          BACK TO HOME
        </Link>
      </div>
    </main>
  );
}
