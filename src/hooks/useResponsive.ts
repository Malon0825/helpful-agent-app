import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

// Tailwind default breakpoints
const breakpoints: Breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isXs = windowWidth < breakpoints.sm;
  const isSm = windowWidth >= breakpoints.sm && windowWidth < breakpoints.md;
  const isMd = windowWidth >= breakpoints.md && windowWidth < breakpoints.lg;
  const isLg = windowWidth >= breakpoints.lg && windowWidth < breakpoints.xl;
  const isXl = windowWidth >= breakpoints.xl && windowWidth < breakpoints['2xl'];
  const is2Xl = windowWidth >= breakpoints['2xl'];

  const isMobile = isXs;
  const isTablet = isSm || isMd;
  const isDesktop = isLg || isXl || is2Xl;

  const breakpoint: Breakpoint = 
    is2Xl ? '2xl' :
    isXl ? 'xl' :
    isLg ? 'lg' :
    isMd ? 'md' :
    isSm ? 'sm' : 'xs';

  return {
    windowWidth,
    breakpoint,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useResponsive; 