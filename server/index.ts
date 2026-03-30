import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { fetchOverlayData } from "./lib/overlayData";

import html from "../client/index.html" with { type: "text" };

// ----------------------------------------------------------------
// 設定
// ----------------------------------------------------------------

const API_KEY = process.env.HENRIK_API_KEY ?? "";
const PORT = Number(process.env.PORT) ?? 8888;

if (!API_KEY) {
  throw new Error(
    "HENRIK_API_KEY が設定されていません（.env を確認してください）",
  );
}

// ----------------------------------------------------------------
// アプリ
// ----------------------------------------------------------------

const app = new Hono();

// ローカル運用でも CORS を通す（OBS の BrowserSource 対策）
app.use("*", cors());

// ログ出力
const DateLogger = (message: string) =>
  console.log(`[${new Date().toLocaleString()}] ${message}`);
app.use(logger(DateLogger));

/**
 *  メインデータ API
 *  GET /api/overlay/:region/:name/:tag
 *
 *  レスポンス：OverlayData (JSON)
 * */

app.get(
  "/api/overlay/:platform{pc|console}/:region/:name/:tag",
  async (context) => {
    const platform = context.req.param("platform");
    const region = context.req.param("region");
    const name = decodeURIComponent(context.req.param("name"));
    const tag = decodeURIComponent(context.req.param("tag"));

    // "null" や空文字などの不正なパラメータを弾く
    if (
      !region ||
      !name ||
      !tag ||
      region === "null" ||
      name === "null" ||
      tag === "null"
    ) {
      return context.json(
        { error: "region, name, tag は必須パラメータです" },
        400,
      );
    }

    try {
      const overlayData = await fetchOverlayData(
        region,
        name,
        tag,
        API_KEY,
        platform,
      );
      return context.json(overlayData);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[Overlay] ${region}/${name}#${tag} の取得中にエラー`);
      console.error(`[Overlay] 原因：${message}`);
      return context.json({ error: message }, 500);
    }
  },
);

// ビルド済み dist/ 配下の静的アセットを配信
app.use("/*", serveStatic({ root: "./client" }));

// client 配下の静的ソースのデプロイ
app.get("/", (c) => {
  return c.html(html as unknown as string);
});

// ----------------------------------------------------------------
// 起動
// ----------------------------------------------------------------

console.log(`
  ╔═══════════════════════════════════════╗
  ║  VALORANT Overlay Server              ║
  ║  http://localhost:${PORT}                ║
  ╚═══════════════════════════════════════╝

  OBS ブラウザソースに貼るURL:
  http://localhost:${PORT}?region=<region>&name=<YourName>&tag=<YourTag>

  <region> : eu, na, latam, br, ap, kr
  <YourName> : RIOT ID
  <YourTag> : タグ (例: 1234)
`);

console.log(`==== log ====`);

export default {
  port: PORT,
  fetch: app.fetch,
};
