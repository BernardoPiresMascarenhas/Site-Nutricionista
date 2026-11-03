import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: {
    // WebP: codificação rápida e estável sob carga (AVIF travava conversões
    // simultâneas no otimizador local com o cache vazio).
    formats: ["image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
  },
  // Permite builds de verificação em outra pasta sem conflitar com o `next dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
