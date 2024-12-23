import { Link } from "react-router-dom";

export function BrandLogo() {
  return (
    <Link to="/" className="flex items-center">
      <svg
        className="w-8 h-8 mr-2"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
      <span className="text-xl font-bold">map.coffee</span>
    </Link>
  );
}
