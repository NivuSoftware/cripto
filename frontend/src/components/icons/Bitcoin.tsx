export function Bitcoin({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        fill="currentColor"
      />
      <path
        d="M13.25 7.5V6h-1.5v1.5h-1V6h-1.5v1.5H7.5v1.5h.75c.28 0 .5.22.5.5v6c0 .28-.22.5-.5.5H7.5V18h1.75v1.5h1.5V18h1v1.5h1.5V18h1.75c1.52 0 2.75-1.23 2.75-2.75 0-1.02-.56-1.91-1.39-2.39.47-.48.76-1.14.76-1.86 0-1.52-1.23-2.75-2.75-2.75H13.25zM14 10.5c.55 0 1 .45 1 1s-.45 1-1 1h-2.5v-2H14zm.5 5c.55 0 1 .45 1 1s-.45 1-1 1H11v-2h3.5z"
        fill="currentColor"
      />
    </svg>
  );
}
