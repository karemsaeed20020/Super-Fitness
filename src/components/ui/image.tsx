// src/components/ui/Image.tsx

import { useState, useRef } from "react";
import type { CSSProperties } from "react";

type ObjectFit = "fill" | "contain" | "cover" | "none" | "scale-down";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number; // reserved for future CDN use
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fallbackSrc?: string;
  sizes?: string;
  style?: CSSProperties;
  className?: string;
  objectFit?: ObjectFit;
  onLoad?: () => void;
  onError?: () => void;
}

export default function Image({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  placeholder = "empty",
  blurDataURL,
  fallbackSrc,
  sizes,
  style,
  className,
  objectFit = "cover",
  onLoad,
  onError,
}: ImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Support priority (eager) vs lazy loading
  const loading = priority ? "eager" : "lazy";

  // Resolve src — fallback on error
  const resolvedSrc = hasError && fallbackSrc ? fallbackSrc : src;

  // Show blur placeholder while loading
  const showBlur = placeholder === "blur" && blurDataURL && !isLoaded;

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const blurStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit,
    filter: "blur(20px)",
    transform: "scale(1.1)", // prevent blur edge bleed
    transition: "opacity 0.3s ease",
    opacity: isLoaded ? 0 : 1,
  };

  // --- Fill mode ---
  if (fill) {
    return (
      <span
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          display: "block",
        }}
      >
        {showBlur && (
          <img aria-hidden alt="" src={blurDataURL} style={blurStyle} />
        )}
        <img
          ref={imgRef}
          src={resolvedSrc}
          alt={alt}
          sizes={sizes}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={className}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit,
            transition: "opacity 0.3s ease",
            opacity: isLoaded ? 1 : 0,
            ...style,
          }}
        />
      </span>
    );
  }

  // --- Fixed / responsive mode ---
  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        width: width ?? "100%",
        height: height ?? "auto",
        overflow: "hidden",
      }}
    >
      {showBlur && (
        <img aria-hidden alt="" src={blurDataURL} style={blurStyle} />
      )}
      <img
        ref={imgRef}
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={className}
        style={{
          display: "block",
          width: width ?? "100%",
          height: height ?? "auto",
          objectFit,
          transition: "opacity 0.3s ease",
          opacity: isLoaded ? 1 : 0,
          ...style,
        }}
      />
    </span>
  );
}
