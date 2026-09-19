/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Check, Copy } from 'lucide-react';

const MESSAGE = 'Hello, World!';

export default function App() {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  const startTyping = useCallback(() => {
    setDisplayedText('');
    setIsTyping(true);

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(MESSAGE.slice(0, index));

      if (index >= MESSAGE.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 110);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = startTyping();
    return cleanup;
  }, [startTyping]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(MESSAGE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main
      id="hello-world-container"
      className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-between p-6 sm:p-12 selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden font-sans"
    >
      {/* Subtle background ambient radial gradient */}
      <div
        id="bg-ambient-glow"
        className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10"
        aria-hidden="true"
      >
        <div className="w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Top minimal status bar */}
      <header id="app-header" className="w-full max-w-2xl flex items-center justify-between text-xs sm:text-sm text-zinc-400">
        <div id="status-indicator" className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-zinc-400 font-medium">live & ready</span>
        </div>
        <div id="file-badge" className="font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
          index.html
        </div>
      </header>

      {/* Central hero typewriter display */}
      <div
        id="typewriter-hero-section"
        className="my-auto flex flex-col items-center text-center px-4 max-w-4xl"
      >
        <motion.div
          id="typewriter-text-wrapper"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center justify-center flex-wrap"
        >
          <h1
            id="typewriter-heading"
            className="font-mono text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-50 drop-shadow-sm min-h-[1.25em] flex items-center"
          >
            <span>{displayedText}</span>
            <span
              id="typewriter-cursor"
              aria-hidden="true"
              className="inline-block w-[3px] sm:w-[5px] h-[0.9em] ml-1 bg-emerald-400 rounded-xs cursor-blink align-middle"
            />
          </h1>
        </motion.div>

        {/* Subtitle that gracefully fades in after typing */}
        <AnimatePresence>
          {!isTyping && (
            <motion.p
              id="typewriter-caption"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-sm sm:text-base text-zinc-400 max-w-md font-normal leading-relaxed"
            >
              Your website foundation is live. Built with clean HTML, CSS, and JavaScript.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Action button bar */}
        <motion.div
          id="action-controls-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <button
            id="replay-button"
            type="button"
            onClick={startTyping}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 text-zinc-200 text-xs sm:text-sm font-mono font-medium transition-all active:scale-95 cursor-pointer shadow-sm"
            title="Replay typing animation"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isTyping ? 'animate-spin' : ''}`} />
            <span>Replay</span>
          </button>

          <button
            id="copy-text-button"
            type="button"
            onClick={copyToClipboard}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 text-zinc-200 text-xs sm:text-sm font-mono font-medium transition-all active:scale-95 cursor-pointer shadow-sm"
            title="Copy message"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Minimal clean footer */}
      <footer id="app-footer" className="w-full max-w-2xl text-center">
        <p id="footer-text" className="text-xs text-zinc-600 font-mono">
          Ready to customize or expand anytime
        </p>
      </footer>
    </main>
  );
}
