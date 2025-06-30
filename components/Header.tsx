
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { WorkflowCategory } from '../types';

interface HeaderProps {
  categories: { id: WorkflowCategory; title: string }[];
  activeCategory: WorkflowCategory;
  onCategoryChange: (id: WorkflowCategory) => void;
}

export const Header: React.FC<HeaderProps> = ({ categories, activeCategory, onCategoryChange }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [showScrollLeftButton, setShowScrollLeftButton] = useState(false);
  const [showScrollRightButton, setShowScrollRightButton] = useState(false);

  const checkArrows = useCallback(() => {
    const el = navRef.current;
    if (el) {
      const isOverflowing = el.scrollWidth > el.clientWidth;
      if (!isOverflowing) {
        setShowScrollLeftButton(false);
        setShowScrollRightButton(false);
        return;
      }

      // Logic for RTL scroll detection. scrollLeft starts at 0 (right) and becomes negative.
      const scrollEndPosition = el.clientWidth - el.scrollWidth;

      // Show the button to scroll RIGHT (<) if we are not at the far-right edge.
      setShowScrollLeftButton(el.scrollLeft < -5);

      // Show the button to scroll LEFT (>) if we are not at the far-left edge.
      setShowScrollRightButton(el.scrollLeft > scrollEndPosition + 5);

    } else {
      setShowScrollLeftButton(false);
      setShowScrollRightButton(false);
    }
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    // A slight delay helps ensure correct calculations after render.
    const timer = setTimeout(() => checkArrows(), 100);
    
    const observer = new ResizeObserver(checkArrows);
    observer.observe(el);
    
    el.addEventListener('scroll', checkArrows);
    window.addEventListener('resize', checkArrows);

    return () => {
      clearTimeout(timer);
      if (el) {
        observer.unobserve(el);
        el.removeEventListener('scroll', checkArrows);
      }
      window.removeEventListener('resize', checkArrows);
    };
  }, [categories, checkArrows]);

  const scroll = (direction: 'left' | 'right') => {
    const el = navRef.current;
    if (el) {
      const scrollAmount = direction === 'left' ? -el.offsetWidth * 0.75 : el.offsetWidth * 0.75;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between z-10">
      <div className="flex items-center flex-grow min-w-0">
        <div className="relative flex-grow flex items-center min-w-0">
          {showScrollLeftButton && (
            <button
              onClick={() => scroll('right')} // The left button scrolls content to the right
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-md hover:bg-white dark:hover:bg-gray-700"
              aria-label="اسکرول به راست"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
          )}

          <nav
            ref={navRef}
            className="flex-grow flex items-center gap-2 overflow-x-auto scrollbar-hide py-1"
          >
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat.id 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' 
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </nav>

          {showScrollRightButton && (
            <button
              onClick={() => scroll('left')} // The right button scrolls content to the left
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-md hover:bg-white dark:hover:bg-gray-700"
              aria-label="اسکرول به چپ"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
