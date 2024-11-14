'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function SokiLandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const canvas = document.getElementById('blob-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const blobs = Array.from({ length: 10 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 100 + 50,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    }));

    function drawBlobs() {
      if (ctx) {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        blobs.forEach((blob) => {
          ctx?.beginPath();
          ctx?.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
          ctx.fillStyle = darkMode
            ? 'rgba(128, 0, 0, 0.1)'
            : 'rgba(128, 0, 0, 0.3)';
          ctx?.fill();

          blob.x += blob.dx;
          blob.y += blob.dy;

          if (blob.x < 0 || blob.x > canvas.width) blob.dx *= -1;
          if (blob.y < 0 || blob.y > canvas.height) blob.dy *= -1;
        });
        requestAnimationFrame(drawBlobs);
      }
    }

    drawBlobs();

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cancelAnimationFrame(drawBlobs as any);
    };
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <canvas id="blob-canvas" className="fixed inset-0 z-0" />
      <div className="flex-1 flex flex-col bg-white/80 dark:bg-gray-900/80 transition-colors duration-200 backdrop-blur-sm relative z-10">
        <header className="container mx-auto px-8 py-6 flex justify-between items-center">
          <Image
            src="/Images/SokiBanner.png"
            alt="SOKI Logo Image"
            width={80}
            height={25}
            className="rounded"
          />
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun className="h-6 w-6 text-white" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </Button>
        </header>

        <main className="flex-1 container mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-around">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-5xl font-bold tracking-tight lg:text-5xl xl:text-6xl dark:text-[#ffff]">
              Amplify your{' '}
              <span className="text-[#800000] dark:text-[#ff8080]">
                Social Experience
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 my-8">
              Your Companion for every Venue you visit
            </p>
            <div className="flex gap-4 mb-8">
              <Link
                href="https://play.google.com/store/apps/details?id=com.soki.app&hl=en"
                className="w-32"
              >
                <Image
                  src="/Images/Google.png"
                  alt="Download on Android"
                  width={150}
                  height={40}
                />
              </Link>
              <Link href="#" className="w-32">
                <Image
                  src="/Images/Apple.png"
                  alt="Download on iOS"
                  width={150}
                  height={40}
                />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center ">
                  (Coming Soon)
                </p>
              </Link>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Ready to showcase your venue on Soki?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Join the Soki community and put your venue in the spotlight.
                Reach more customers and boost your business!
              </p>
              <Link
                href="https://soki.co.ke/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#800000] hover:bg-[#600000] text-white">
                  List Your Venue
                </Button>
              </Link>
            </div>
          </div>

          <div className="">
            <Image
              src={darkMode ? '/Images/dark.png' : '/Images/light.png'}
              alt="Soki App Screenshot"
              width={280}
              height={520}
              className="rounded-[28px]"
            />
          </div>
        </main>

        <footer className="container mx-auto px-8 py-6 text-center text-gray-600 dark:text-gray-400">
          © 2024 Soki. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
