'use client';

import Image from 'next/image';

interface ProductRotatorProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * CSS 3D Product Rotator — slowly rotates product image on Y-axis.
 * Pauses on hover for examination. Gives 360° view feel.
 */
export function ProductRotator({
  src,
  alt,
  width = 400,
  height = 400,
  className = '',
}: ProductRotatorProps) {
  return (
    <div
      className={`perspective-[1000px] ${className}`}
    >
      <div className="product-rotator-inner relative">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-contain drop-shadow-xl"
          style={{
            animation: 'productRotateY 8s ease-in-out infinite',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.animationPlayState = 'running';
          }}
        />
      </div>
    </div>
  );
}
