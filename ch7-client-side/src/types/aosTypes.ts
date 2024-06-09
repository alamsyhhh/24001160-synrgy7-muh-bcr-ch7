declare module 'aos' {
  interface AosOptions {
    duration?: number;
    once?: boolean;
    offset?: number;
    delay?: number;
    easing?: string;
    mirror?: boolean;
    anchorPlacement?: string;
  }

  export function init(options?: AosOptions): void;
  export function refresh(): void;
  export function refreshHard(): void;
}
