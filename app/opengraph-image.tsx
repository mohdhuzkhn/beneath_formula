import { ImageResponse } from "next/og";
import { site } from "../lib/site";
export const alt = "Mathematics from first principles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f7f6f0",
        color: "#172e29",
        width: "100%",
        height: "100%",
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ fontSize: 22, color: "#984519", letterSpacing: 5 }}>
        MATHEMATICS, FROM FIRST PRINCIPLES
      </div>
      <div style={{ fontSize: 86, marginTop: 40 }}>{site.name}</div>
      <div style={{ fontSize: 34, marginTop: 30 }}>{site.tagline}</div>
    </div>,
    size,
  );
}
