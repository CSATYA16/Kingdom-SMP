import { useState } from 'react';
import { cn } from '../../utils/cn';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  containerClassName,
  fallbackSrc,
  ...props 
}: OptimizedImageProps) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    if (fallbackSrc) {
      return (
        <img 
          src={fallbackSrc} 
          alt={alt || "Fallback Image"} 
          className={className} 
          loading="lazy" 
          {...props} 
        />
      );
    }
    
    return (
      <div className={cn("flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-lg text-gray-500", containerClassName || className)}>
        <ImageOff className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-xs font-medium uppercase tracking-wider">Image Unavailable</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-[inherit]"></div>
      )}
      <img
        src={src}
        alt={alt || "Image"}
        loading="lazy"
        className={cn(className, !loaded && "opacity-0")}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
};
