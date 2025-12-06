import { motion } from "framer-motion";
import { Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpotifyWidgetProps {
  className?: string;
}

// todo: remove mock functionality - integrate with real Spotify API
export function SpotifyWidget({ className }: SpotifyWidgetProps) {
  const isPlaying = true;
  const track = {
    name: "Midnight City",
    artist: "M83",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-full",
        "bg-card/50 border border-border/30",
        "text-sm",
        className
      )}
      data-testid="spotify-widget"
    >
      <div className="relative">
        <Music2 className="w-4 h-4 text-green-500" />
        {isPlaying && (
          <motion.span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="text-foreground font-medium">{track.name}</span>
        <span className="text-muted-foreground/60">-</span>
        <span>{track.artist}</span>
      </div>
    </div>
  );
}
