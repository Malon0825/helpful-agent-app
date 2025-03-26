// Animation timing functions
export const timingFunctions = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

// Animation durations
export const durations = {
  fast: 150,
  normal: 250,
  slow: 350,
};

// Generate CSS transition string
export const createTransition = (
  properties: string[] = ['all'], 
  duration: number = durations.normal, 
  timingFunction: string = timingFunctions.easeInOut,
  delay: number = 0
): string => {
  return properties
    .map((prop) => `${prop} ${duration}ms ${timingFunction} ${delay}ms`)
    .join(', ');
};

// Keyframe animation names
export const keyframes = {
  fadeIn: 'fadeIn',
  fadeOut: 'fadeOut',
  slideInUp: 'slideInUp',
  slideOutDown: 'slideOutDown',
  pulse: 'pulse',
  bounce: 'bounce',
};

// CSS classes for message animations
export const messageAnimations = {
  enter: 'animate-fade-in-slide-up',
  exit: 'animate-fade-out-slide-down',
};

// Custom spring animation for message list scroll
export const smoothScrollToBottom = (element: HTMLElement, duration: number = 300): void => {
  const start = element.scrollTop;
  const end = element.scrollHeight - element.clientHeight;
  const change = end - start;
  const startTime = performance.now();

  function easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animate(currentTime: number): void {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = easeOutExpo(progress);
    
    element.scrollTop = start + change * easedProgress;
    
    if (progress < 1) {
      window.requestAnimationFrame(animate);
    }
  }

  window.requestAnimationFrame(animate);
}; 