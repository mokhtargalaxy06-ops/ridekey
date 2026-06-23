// GlassMapButton.jsx
import React from "react";
import { MapPin } from "lucide-react";
import { useI18n } from "../i18nContext";

/**
 * Glassmorphism Google Maps Button
 */
const GlassMapButton = ({
  label,
  className = "",
  size = "md", // sm | md | lg
  variant = "glass", // glass (future-proofing for more styles)
  address = "N 20, Lotissement Awatif, Marrakech 40000, Morocco",
}) => {
  const { t } = useI18n();
  const baseUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(address);
  const resolvedLabel = label || t.common.openMap;

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const handleClick = () => {
    window.open(baseUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      role="link"
      aria-label={`${t.ui.openLocationInGoogleMaps}: ${address}`}
      className={`
        group relative inline-flex items-center gap-2
        rounded-xl
        text-white/90
        backdrop-blur-md
        border border-white/20
        bg-white/10
        hover:bg-white/20
        active:scale-[0.98]
        hover:scale-[1.02]
        transition-all duration-300 ease-out
        shadow-lg hover:shadow-white/10
        focus:outline-none focus:ring-2 focus:ring-white/30
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {/* Icon */}
      <MapPin
        size={18}
        className="text-white/80 group-hover:text-white transition-colors"
      />

      {/* Label */}
      <span className="font-medium tracking-wide">{resolvedLabel}</span>

      {/* subtle glow effect */}
      <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-xl" />
    </button>
  );
};

export default GlassMapButton;
