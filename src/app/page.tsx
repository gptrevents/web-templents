import Link from 'next/link';
import { Mail, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col items-center">
      <header className="w-full py-8 text-center border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          GPTR Templates
        </h1>
        <p className="mt-2 text-slate-400">Premium Wedding Invitation Designs</p>
      </header>

      <main className="w-full max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Link href="/invitation/traditional-invitation" className="group">
            <div className="bg-slate-800 rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:bg-slate-700/80 flex flex-col h-full">
              <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b border-white/5 group-hover:from-blue-900/40 group-hover:to-purple-900/40 transition-colors">
                <Mail className="w-16 h-16 text-blue-400 mb-2" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  Traditional Invitation
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  A beautiful traditional wedding invitation template with physics-based animations and an elegant design.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/invitation/vijay-rashmika-wedding-invitation" className="group">
            <div className="bg-slate-800 rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:bg-slate-700/80 flex flex-col h-full">
              <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b border-white/5 group-hover:from-purple-900/40 group-hover:to-pink-900/40 transition-colors">
                <Star className="w-16 h-16 text-purple-400 mb-2" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  Vijay & Rashmika Wedding
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  A modern and elegant wedding invitation template perfect for contemporary weddings with a grand veil entry.
                </p>
              </div>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}
