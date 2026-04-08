export default function ArrowIcon({ rotated = false }: { rotated?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "transform 0.2s ease",
        transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="#1D1E21"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
