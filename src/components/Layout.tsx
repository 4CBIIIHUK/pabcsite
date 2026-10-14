import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./HeroArt";

export const navItems = [
  { id: "osnova", label: "Основа" },
  { id: "cikly", label: "Циклы" },
  { id: "massivy", label: "Массивы" },
  { id: "zadachi", label: "Примеры задач" },
  { id: "testy", label: "Тесты" },
];

export function Header({
  onHome,
  onNav,
  onStart,
}: {
  onHome: () => void;
  onNav: (id: string) => void;
  onStart: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  function goTo(id: string) {
    setMenuOpen(false);
    onNav(id);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand
          onClick={() => {
            setMenuOpen(false);
            onHome();
          }}
        />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <button type="button" key={item.id} onClick={() => goTo(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
        <button
          className="header-cta"
          type="button"
          onClick={() => {
            setMenuOpen(false);
            onStart();
          }}
        >
          Начать учиться <ArrowUpRight size={17} strokeWidth={2} />
        </button>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className="header-credit" aria-label="Автор">
        <span className="header-credit-line" />
        <span className="header-credit-text">by чсв</span>
        <span className="header-credit-line" />
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Мобильная навигация"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            {navItems.map((item) => (
              <button type="button" key={item.id} onClick={() => goTo(item.id)}>
                {item.label}
                <ArrowUpRight size={18} />
              </button>
            ))}
            <button
              type="button"
              className="mobile-nav-start"
              onClick={() => {
                setMenuOpen(false);
                onStart();
              }}
            >
              Начать учиться
              <ArrowRight size={18} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer({
  onHome,
  onStart,
  onNav,
  hasProgress,
}: {
  onHome: () => void;
  onStart: () => void;
  onNav: (id: string) => void;
  hasProgress: boolean;
}) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <span className="section-eyebrow">Всё получится</span>
          <h2>
            Начни с одной строки.
            <br />
            <em>Дальше будет легче.</em>
          </h2>
        </div>
        <button className="button button-cream" type="button" onClick={onStart}>
          {hasProgress ? "Продолжить обучение" : "Открыть первую тему"} <ArrowUpRight size={19} />
        </button>
      </div>
      <div className="container footer-bottom">
        <Brand onClick={onHome} />
        <span>Простое начало для больших идей.</span>
        <button type="button" onClick={() => onNav("osnova")}>
          К основе <ArrowUpRight size={15} />
        </button>
      </div>
      <div className="footer-credit">
        <div className="container">
          <p className="footer-credit-heading">by чсв</p>
          <p>Курс собран, чтобы одноклассники наконец разобрали эту чухню без паники.</p>
        </div>
      </div>
    </footer>
  );
}
