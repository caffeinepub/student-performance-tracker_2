interface AdPlaceholderProps {
  size?: "banner" | "square" | "leaderboard";
  className?: string;
}

export function AdPlaceholder({
  size = "banner",
  className = "",
}: AdPlaceholderProps) {
  const dimensions: Record<string, string> = {
    banner: "h-16 w-full",
    square: "h-48 w-full",
    leaderboard: "h-24 w-full",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40 ${dimensions[size]} ${className}`}
    >
      <div className="text-center">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          Advertisement
        </p>
        <p className="text-xs text-muted-foreground/60 mt-0.5">
          Google AdSense Placeholder
        </p>
      </div>
    </div>
  );
}
