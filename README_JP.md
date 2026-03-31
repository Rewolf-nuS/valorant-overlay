# VALORANT Overlay

これは、OBSにブラウザソース経由でランクや勝敗数を表示できるカスタマイズ可能なオーバーレイです。

## 要件

- Windows 10 以降
- [Bun](https://bun.com/)（パッケージ管理およびビルド・実行環境）
- [HenrikDev VALORANT API](https://docs.henrikdev.xyz/)（データの取得に使用）

## セットアップ手順

### 1. APIキーの取得

このツールを使用するには、HenrikDevのAPIキーが必要です。

1. [HenrikDev API Dashboard](https://dash.henrikdev.xyz/) にアクセスし、アカウントを作成してAPIキーを取得します。

### 2. 環境変数の設定

プロジェクトのルートディレクトリにある `.env.example` を `.env` にコピーし、取得したAPIキーを設定します。

```powershell
cp .env.example .env
```

`.env` ファイルの内容:

```env
HENRIK_API_KEY=your_api_key_here
PORT=8888
```

### 3. インストールとビルド

```powershell
# 依存関係のインストール
bun install

# クライアントとサーバーのビルド（distディレクトリに生成されます）
bun run build
```

## 実行方法

ビルドで生成された `dist/valorant_overlay.exe` を実行するか、開発時のプレビューには以下のコマンドを使用してサーバーを起動させます。

```powershell
bun run dev
```

## OBSでの設定

1. OBSの「ソース」から「ブラウザ」を追加します。
2. URLに以下を指定します（各パラメータを自分の情報に書き換えてください）：\
   `http://localhost:8888/?region=ap&name=YourName&tag=YourTag&platform=pc`
3. **推奨サイズ**: 幅 1500px、高さ 400px（デザインに合わせて調整してください）。

### URLパラメータ

| パラメータ | 説明                     | 指定可能な値/例                       |
| :--------- | :----------------------- | :------------------------------------ |
| `region`   | プレイリージョン（必須） | `ap`, `na`, `eu`, `kr`, `latam`, `br` |
| `name`     | Riot ID（必須）          | 例: `Username`                        |
| `tag`      | タグ（必須、#は不要）    | 例: `JP1`                             |
| `platform` | プラットフォーム（任意） | `pc`, `console` (デフォルト: `pc`)    |

## カスタマイズ方法

見た目を変更したい場合は、`dist/client/` 内のファイルを編集します。

- **背景画像**: `dist/client/bg.jpg` を好きな画像（JPEG形式）に置き換えてください。
- **スタイル (CSS)**: `dist/client/style.css` を編集して、文字色やフィルターの透明度を変更できます。
  - `--text-color`: テキストの色
  - `--bg-url`: 背景画像のパス（またはURL）
  - `--bg-filter`: 背景にかける黒フィルターの不透明度（0〜1）

## トラブルシューティング

- **「Failed to start server. Is port 8888 in use?」というエラーが出る**
  - 他のアプリがポート 8888 を使用しています。`.env` ファイルの `PORT` の値を `8889` などに変更してください。
- **データが表示されない（401 Unauthorized）**
  - APIキーが正しく設定されているか、`.env` ファイルを確認してください。
- **データが表示されない（404 Not Found）**
  - Riot ID、タグ、またはリージョンが間違っていないか確認してください。

## 開発者向け情報

### ディレクトリ構造

- `client/`: フロントエンドの TypeScript コード、HTML、CSS
- `server/`: Hono を使用した API サーバーと静的ファイル配信
- `dist/`: ビルド済みファイルと実行用 `.exe`
- `build.bat`: Windows 用のビルドスクリプト

## ライセンス

このプロジェクトは[MIT license](https://en.wikipedia.org/wiki/MIT_License)です。
