import Image, { type ImageProps } from "next/image";
import { art, type ArtKey } from "@/data/art";

type Props = Omit<ImageProps, "src" | "width" | "height" | "alt"> & {
  art: ArtKey;
  alt: string;
};

/** next/image bound to the art registry so intrinsic sizes and aspect ratios are always correct. */
export function ArtImage({ art: key, alt, fill, sizes, quality = 75, ...rest }: Props) {
  const a = art[key];
  if (fill) {
    return <Image src={a.src} alt={alt} fill sizes={sizes ?? "100vw"} quality={quality} {...rest} />;
  }
  return (
    <Image src={a.src} alt={alt} width={a.width} height={a.height} sizes={sizes ?? "100vw"} quality={quality} {...rest} />
  );
}

export function aspectOf(key: ArtKey) {
  const a = art[key];
  return a.width / a.height;
}
