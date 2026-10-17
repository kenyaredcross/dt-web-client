// Shared arrow icon used in buttons, links and card hovers.
// `dir` flips direction; inherits color via currentColor and sizes with font-size (1em).
export default function Arrow({ dir = "right" }: { dir?: "right" | "left" }) {
  return (
    <svg
      className={`icon-arrow${dir === "left" ? " icon-arrow-l" : ""}`}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
