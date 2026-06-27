import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (val: boolean) => void;
}

export const Header = ({ isDarkMode, setIsDarkMode }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Education', href: '#education' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-[60] bg-soft-surface/40 backdrop-blur-xl border-b border-slate-200/60">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="#top" className="group/logo">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
                        className="text-xs font-bold tracking-[0.25em] text-slate-800 uppercase transition-colors group-hover/logo:text-dusty-blue font-mono"
                    >
                        IVAN DEINEKA — CV
                    </motion.div>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-[9px] font-bold uppercase tracking-[0.25em] font-mono">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-slate-500 hover:text-dusty-blue transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="text-slate-500 hover:text-dusty-blue transition-colors ml-4"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                </nav>

                {/* Mobile Menu & Theme Buttons */}
                <div className="md:hidden flex items-center gap-4">
                    <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="text-slate-500 hover:text-dusty-blue transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        className="text-slate-500 hover:text-dusty-blue transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-soft-surface/90 backdrop-blur-xl border-b border-slate-200/60 overflow-hidden"
                    >
                        <nav className="flex flex-col items-center py-6 gap-4 text-[11px] font-bold uppercase tracking-[0.2em]">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-500 hover:text-dusty-blue transition-colors w-full text-center py-2"
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
