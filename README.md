# PDF Manager

マーダーミステリー用の PDF 管理アプリ。シナリオ PDF が増えるとブラウザのタブが乱立する問題を、
1画面（1タブ）に PDF 一覧と PDF 閲覧をまとめることで解決する。

## 特徴

- **タブが増えない**: 一覧と PDF ビューアを同一 DOM 内のレイヤーとして持ち、`display` の切り替えだけで往復する
- **スクロール位置を保持**: 一度開いた PDF の `<iframe>` は破棄せず再利用するため、別の PDF を挟んでも読んでいた位置に戻る
- **サムネイル一覧**: pdf.js で1ページ目を canvas にレンダリングしてサムネイルを生成する
- **インストール不要**: サーバーサイド処理はなく、PDF は IndexedDB でブラウザ内にのみ保存される（他のユーザーとは共有されない）

## 技術スタック

### フロントエンド

- [React](https://react.dev/) 19 - UI ライブラリ
- [Tailwind CSS](https://tailwindcss.com/) v4 - ユーティリティファースト CSS
- [pdf.js](https://mozilla.github.io/pdf.js/) (`pdfjs-dist`) - サムネイル生成
- [lucide-react](https://lucide.dev/) - アイコン
- [class-variance-authority](https://cva.style/) - バリアント管理

### ホスティング

- [Cloudflare Workers](https://developers.cloudflare.com/workers/) - Static Assets

### 開発ツール

- [Bun](https://bun.sh/) - パッケージマネージャー / スクリプトランナー
- [Vite](https://vite.dev/) 8 - ビルドツール
- [TypeScript](https://www.typescriptlang.org/) + [tsgo](https://github.com/microsoft/typescript-go) - 型チェック
- [Vitest](https://vitest.dev/) - テストフレームワーク（Unit + Browser Mode）
- [Playwright](https://playwright.dev/) - Browser Mode の実行環境
- [oxlint](https://oxc.rs/docs/guide/usage/linter) - リンター
- [oxfmt](https://oxc.rs/docs/guide/usage/formatter) - フォーマッター
- [Lefthook](https://github.com/evilmartians/lefthook) - Git hooks

## プロジェクト構成

[Feature-Sliced Design](https://feature-sliced.design/) に従う。

```
src/
├── app/                  # エントリーポイント・プロバイダー・グローバル CSS
├── pages/pdf-manager/    # 一覧レイヤーとビューアレイヤーの構成・状態管理
├── features/upload-pdf/  # アップロードボタン / ドラッグ&ドロップ
├── entities/pdf-document/# PDF のモデル・IndexedDB 永続化・サムネイル生成・カード UI
└── shared/               # UI キット・ユーティリティ
```

## セットアップ

```bash
bun install
bunx playwright install chromium  # Browser Mode のテスト実行に必要
```

環境変数は不要。

## 開発

```bash
bun run dev
```

http://localhost:5173 でアクセスできます。

## スクリプト一覧

| コマンド            | 説明                          |
| ------------------- | ----------------------------- |
| `bun run dev`       | 開発サーバーの起動            |
| `bun run build`     | プロダクションビルド          |
| `bun run preview`   | ビルド結果のプレビュー        |
| `bun run typecheck` | 型チェック（tsgo）            |
| `bun run test`      | テスト実行（Unit + Browser）  |
| `bun run lint`      | リント + 自動修正             |
| `bun run format`    | コードフォーマット            |
| `bun run deploy`    | Cloudflare Workers へデプロイ |

## テスト

Vitest の [Project](https://vitest.dev/guide/workspace) 機能を使い、2種類のテストを実行します。

- **Unit テスト** (`*.unit.test.{ts,tsx}`) - Node.js 環境で実行
- **Browser テスト** (`*.browser.test.{ts,tsx}`) - Playwright (Chromium) で実行。IndexedDB や
  `display` による表示切り替えの検証に使う

```bash
bun run test
```

## デプロイ

```bash
bun run build && bun run deploy
```
