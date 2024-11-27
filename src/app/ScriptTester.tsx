'use client';
import Script from "next/script";

export default function ScriptTester() {
  return (
      <Script src="/statics/telemetry.js" strategy="beforeInteractive" />
  )
}