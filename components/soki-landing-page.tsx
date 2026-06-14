'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Camera,
  MapPin,
  MessageCircle,
  Moon,
  QrCode,
  Sparkles,
  Store,
  Sun,
  UtensilsCrossed,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.soki.app';
const APP_STORE =
  'https://apps.apple.com/app/soki-a-social-experience/id6741012665';
const OWNER_SITE = 'https://soki.co.ke/';

type Platform = 'ios' | 'android' | 'unknown';

// What guests actually do in the app. Venue-neutral on purpose: Soki spaces
// include universities, daytime spots, and institutions, not only nightlife.
const FEATURES = [
  {
    icon: MapPin,
    title: 'Discover venues near you',
    body: 'Find venues, campuses, and spaces around you and see what is happening right now.',
  },
  {
    icon: MessageCircle,
    title: 'Join the conversation',
    body: 'Chat with the community at every venue you visit, in real time.',
  },
  {
    icon: Camera,
    title: 'Share Real Moments',
    body: 'Post spontaneous moments and see each venue through everyone’s eyes.',
  },
  {
    icon: BarChart3,
    title: 'Have your say',
    body: 'Vote in polls and help shape the standout days at your favorite spots.',
  },
  {
    icon: CalendarCheck,
    title: 'Reserve your spot',
    body: 'Book a table or a spot in a few taps, with no phone calls needed.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Menus, events, and reviews',
    body: 'Browse menus, see upcoming event days, and read reviews before you go.',
  },
];

const STEPS = [
  {
    icon: QrCode,
    title: 'Scan or search',
    body: 'Scan a venue’s Soki QR code or search for a place inside the app.',
  },
  {
    icon: Sparkles,
    title: 'Join in',
    body: 'Chat, vote, share moments, and reserve your spot in seconds.',
  },
  {
    icon: MapPin,
    title: 'Keep coming back',
    body: 'Your favorite venues and the people in them, all in one place.',
  },
];

function StoreBadges({
  platform,
  className = '',
}: {
  platform: Platform;
  className?: string;
}) {
  // Both stores are always available. The badge matching the visitor's device
  // gets a subtle highlight so the right one is obvious without hiding the other.
  const highlight =
    'ring-2 ring-[#800000] dark:ring-[#ff8080] rounded-xl scale-[1.03]';
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <Link
        href={APP_STORE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Soki on the App Store"
        className={`transition-transform hover:scale-[1.04] ${
          platform === 'ios' ? highlight : ''
        }`}
      >
        <Image
          src="/Images/Apple.png"
          alt="Download on the App Store"
          width={150}
          height={45}
        />
      </Link>
      <Link
        href={PLAY_STORE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Soki on Google Play"
        className={`transition-transform hover:scale-[1.04] ${
          platform === 'android' ? highlight : ''
        }`}
      >
        <Image
          src="/Images/Google.png"
          alt="Get it on Google Play"
          width={150}
          height={45}
        />
      </Link>
    </div>
  );
}

export function SokiLandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [platform, setPlatform] = useState<Platform>('unknown');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  // Detect the visitor's platform and initial color scheme on the client only,
  // so the static export never produces a hydration mismatch.
  useEffect(() => {
    const ua =
      typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
    if (/iPhone|iPad|iPod/i.test(ua)) {
      setPlatform('ios');
    } else if (/Android/i.test(ua)) {
      setPlatform('android');
    }

    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDarkMode(true);
    }
  }, []);

  // Ambient brand blobs. Stored in refs and cancelled on cleanup so toggling
  // dark mode does not stack a second animation loop (the old code leaked one).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const blobs = Array.from({ length: 9 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 120 + 60,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = darkMode
        ? 'rgba(128, 0, 0, 0.12)'
        : 'rgba(128, 0, 0, 0.18)';
      blobs.forEach((blob) => {
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
        blob.x += blob.dx;
        blob.y += blob.dy;
        if (blob.x < 0 || blob.x > canvas.width) blob.dx *= -1;
        if (blob.y < 0 || blob.y > canvas.height) blob.dy *= -1;
      });
      frameId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [darkMode]);

  const smartStoreUrl =
    platform === 'ios' ? APP_STORE : platform === 'android' ? PLAY_STORE : null;

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 blur-2xl"
      />
      <div className="flex-1 flex flex-col bg-white/85 dark:bg-gray-900/85 transition-colors duration-200 backdrop-blur-sm relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
          <Image
            src="/Images/SokiBanner.png"
            alt="Soki"
            width={90}
            height={28}
            className="rounded"
            priority
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="h-6 w-6 text-white" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </Button>
        </header>

        {/* Hero */}
        <main className="flex-1">
          <section className="container mx-auto px-6 md:px-8 pt-8 pb-16 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 max-w-xl">
              <span className="inline-block text-sm font-medium text-[#800000] dark:text-[#ff8080] bg-[#800000]/10 dark:bg-[#ff8080]/10 px-3 py-1 rounded-full mb-5">
                Free on iOS and Android
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl dark:text-white">
                Amplify your{' '}
                <span className="text-[#800000] dark:text-[#ff8080]">
                  social experience
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-6">
                Soki is your companion for the venues, campuses, and spaces you
                visit. Discover what is happening near you, join the community,
                and keep the best moments.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                {smartStoreUrl && (
                  <Link
                    href={smartStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:self-start"
                  >
                    <Button
                      size="lg"
                      className="bg-[#800000] hover:bg-[#600000] text-white w-full sm:w-auto h-12 px-7 text-base"
                    >
                      Download the app
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <StoreBadges platform={platform} />
              </div>
            </div>

            <div className="shrink-0">
              <Image
                src={darkMode ? '/Images/dark.png' : '/Images/light.png'}
                alt="The Soki app showing venues to discover"
                width={300}
                height={560}
                className="rounded-[32px] shadow-2xl"
                priority
              />
            </div>
          </section>

          {/* Value story */}
          <section className="container mx-auto px-6 md:px-8 py-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold tracking-tight dark:text-white">
                Everything a venue has to offer, in one app
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-3">
                Soki turns every place you visit into something you can be part
                of, not just somewhere you pass through.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="h-11 w-11 rounded-xl bg-[#800000]/10 dark:bg-[#ff8080]/10 flex items-center justify-center mb-4">
                    <f.icon className="h-6 w-6 text-[#800000] dark:text-[#ff8080]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {f.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="container mx-auto px-6 md:px-8 py-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold tracking-tight dark:text-white">
                Getting started takes seconds
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
              {STEPS.map((s, i) => (
                <div key={s.title} className="text-center">
                  <div className="h-14 w-14 mx-auto rounded-2xl bg-[#800000] text-white flex items-center justify-center mb-4">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {i + 1}. {s.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Download band */}
          <section className="container mx-auto px-6 md:px-8 py-12">
            <div className="rounded-3xl bg-[#800000] text-white px-8 py-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Ready when you are
              </h2>
              <p className="text-white/85 mt-3 max-w-xl mx-auto">
                Download Soki and make the most of every venue you visit.
              </p>
              <div className="mt-8 flex justify-center">
                <StoreBadges platform={platform} />
              </div>
            </div>
          </section>

          {/* Owner bridge */}
          <section className="container mx-auto px-6 md:px-8 pb-16">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                  <Store className="h-6 w-6 text-[#800000] dark:text-[#ff8080]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Run a venue?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-md">
                    Put your space in the spotlight on Soki and turn first-time
                    guests into regulars.
                  </p>
                </div>
              </div>
              <Link
                href={OWNER_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button
                  variant="outline"
                  className="border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white dark:border-[#ff8080] dark:text-[#ff8080]"
                >
                  List your venue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span>
              © {new Date().getFullYear()} Soki. All rights reserved.
            </span>
            <Link
              href={OWNER_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#800000] dark:hover:text-[#ff8080] transition-colors"
            >
              soki.co.ke
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
