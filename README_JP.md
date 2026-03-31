# VALORANT Overlay

これは、OBSにブラウザソース経由でランクや勝敗数を表示できるカスタマイズ可能なオーバーレイです。

## 要件

- Windows 10 以降
- [bun](https://bun.com/)（パッケージ管理およびビルド・実行環境）
- [HENRIKDEV](https://docs.henrikdev.xyz/)（VALORANT API）

### ライブラリ

- [hono](https://hono.dev/)（Webサーバー・APIエンドポイント作成）

## インストール

```powershell
# カレントディレクトリは ~/valorant_overlay_exe
bun install     # 依存関係のインストール
bun run build   # 生成物はdistディレクトリへ
```

## 実行方法

ビルドで生成された `valorant_overlay.exe` を実行するか、\
開発時のプレビューには以下を使用し、サーバーを起動させる。

```powershell
# カレントディレクトリは ~/valorant_overlay_exe
bun run dev
```

起動後、OBSのブラウザソースに以下のURLを指定する。\
`http://localhost:8888/?region=<REGION>&name=<NAME>&tag=<TAG>&platform=<PLATFORM>`

### パラメータ

・REGION（プレイリージョン）※必須\
指定可能な値: eu, na, latam, br, ap, kr

・NAME（Riot ID）※必須

・TAG（#から始まるタグ）※必須

・PLATFORM ※任意\
指定可能な値: pc, console

## ライセンス

このプロジェクトは[MIT license](https://en.wikipedia.org/wiki/MIT_License)です。
