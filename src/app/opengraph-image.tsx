import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = "Top Deli Salgados: salgados, tortas, pães e sobremesas congelados e prontos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const dir = join(process.cwd(), "src/assets/og");
  const [anton, sourceSans, photo, logo] = await Promise.all([
    readFile(join(dir, "anton-latin-400-normal.woff")),
    readFile(join(dir, "source-sans-3-latin-700-normal.woff")),
    readFile(join(dir, "og-foto.jpg")),
    readFile(join(process.cwd(), "public/images/logo-top-deli.png")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#1C0A0B" }}>
        <img src={photoSrc} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, rgba(28,10,11,0.96) 0%, rgba(28,10,11,0.82) 48%, rgba(28,10,11,0.15) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", gap: 22, width: 760 }}>
          <img src={logoSrc} alt="" width={128} height={128} style={{ borderRadius: 999 }} />
          <div style={{ fontFamily: "Anton", fontSize: 92, lineHeight: 0.92, color: "#FFF6EE", textTransform: "uppercase" }}>
            Top Deli Salgados
          </div>
          <div style={{ fontFamily: "Source Sans", fontSize: 32, color: "#E9D9CE", lineHeight: 1.3 }}>
            Congelados e prontos. É só aquecer.
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["iFood", "Empresas", "Instagram"].map((t) => (
              <div
                key={t}
                style={{
                  fontFamily: "Source Sans",
                  fontSize: 22,
                  color: "#1C0A0B",
                  background: "#F68900",
                  padding: "8px 18px",
                  borderRadius: 999,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "Source Sans", fontSize: 22, color: "#CDB6AA" }}>{site.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton, style: "normal", weight: 400 },
        { name: "Source Sans", data: sourceSans, style: "normal", weight: 700 },
      ],
    },
  );
}
