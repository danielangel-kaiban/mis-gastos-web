import Image from 'next/image';

interface DocImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function DocImage({
  src,
  alt,
  caption,
  width = 300,
  height = 540,
}: DocImageProps) {
  return (
    <figure className="my-6 flex flex-col items-center gap-3">
      <div className="overflow-hidden rounded-2xl border border-border shadow-md bg-muted/30">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-contain"
        />
      </div>
      {caption && (
        <figcaption className="text-xs text-muted-foreground text-center max-w-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
