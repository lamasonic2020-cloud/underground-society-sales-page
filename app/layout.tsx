import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "凡氏可行 | 地下會社",
  description: "一整年，陪妳看懂男人、拆掉爛局，把被他捏在手上的主導權拿回來。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
