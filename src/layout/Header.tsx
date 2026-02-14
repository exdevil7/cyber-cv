import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Education', href: '#education' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-[60] bg-retro-black/80 backdrop-blur-xl border-b border-retro-purple/30">
            <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                <a href="#top" className="group/logo">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-black font-orbitron tracking-tighter italic gradient-text px-2 group-hover/logo:neon-text-cyan transition-all"
                    >
                        CYBER CV
                    </motion.div>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-widest font-orbitron">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-slate-100 hover:text-retro-pink hover:neon-text-pink transition-all"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-retro-cyan hover:text-retro-pink transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-retro-black/95 backdrop-blur-2xl border-b border-retro-purple/30 overflow-hidden"
                    >
                        <nav className="flex flex-col items-center py-8 gap-6 text-sm font-black uppercase tracking-[0.2em] font-orbitron">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-100 hover:text-retro-pink transition-all w-full text-center py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
