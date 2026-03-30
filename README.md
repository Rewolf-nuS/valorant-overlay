# VALORANT Overlay

## 概要

これは、OBSにブラウザソース経由でランクや勝敗数を表示できる\
カスタマイズ可能なオーバーレイです。

## 要件

- [bun](https://bun.com/)（パッケージ管理およびビルド・実行環境）
- [HENRIKDEV](https://docs.henrikdev.xyz/)（VALORANT API）

### ライブラリ

- [hono](https://hono.dev/)（Webサーバー・APIエンドポイント作成）

## インストール

```powershell
bun install     # 依存関係のインストール
bun run build   # 生成物はdistディレクトリへ
```

## 実行方法

ビルドで生成された `valorant_overlay.exe` を実行するか、\
開発時のプレビューには以下を使用し、サーバーを起動させる。

```powershell
bun run dev
```

起動後、OBSのブラウザソースのURLに\
`http://localhost:8888/?region=<REGION>&name=<NAME>&tag=<TAG>&platform=<PLATFORM>`\
を指定する。

### パラメータについて

・REGION（プレイリージョン）※必須\
　使用可能な値：eu, na, latam, br, ap, kr

・NAME（Riot ID）※必須

・TAG（#から始まるタグ）※必須

・PLATFORM ※任意\
　使用可能な値：pc, console
