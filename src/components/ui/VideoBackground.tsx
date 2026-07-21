
import { cn } from '../../utils/cn';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlayOpacity?: number;
}

export const VideoBackground = ({ src, className, overlayOpacity = 0.6 }: VideoBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden -z-10", className)}>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};
