import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.brand.name} | ${site.brand.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const photo = await readFile(join(process.cwd(), "public/images/hero-field.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f7f4ee", fontFamily: "serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 64px", width: 720 }}>
          <div style={{ fontSize: 26, color: "#65755b", letterSpacing: 6 }}>{site.brand.descriptor.toUpperCase()}</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 0.95, color: "#233429" }}>
            <span>Sua melhor versão</span>
            <span>começa com</span>
            <span style={{ fontStyle: "italic", color: "#65755b" }}>equilíbrio.</span>
          </div>
          <div style={{ fontSize: 34, color: "#233429" }}>{site.brand.name}</div>
        </div>
        <div style={{ display: "flex", padding: "50px 56px 0 0", flex: 1 }}>
          <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "240px 240px 0 0" }} />
        </div>
      </div>
    ),
    size,
  );
}
