# あんちょびOS - Portfolio

モダンで見やすい黒ベースのポートフォリオサイトです。

## 特徴

- シンプルで洗練されたデザイン
- 黒ベースのモダンなUI
- レスポンシブ対応
- スムーズなアニメーション
- Docker対応で開発環境を簡単に構築

## Docker での起動方法

### 前提条件

- Dockerがインストールされていること
- Docker Composeがインストールされていること

### 起動手順

1. プロジェクトディレクトリに移動

\`\`\`bash
cd retro-github-pages
\`\`\`

2. Dockerコンテナを起動

\`\`\`bash
docker-compose up -d
\`\`\`

3. ブラウザで http://localhost:8080 にアクセス

### ファイル変更の反映

docker-compose.ymlでボリュームマウントを設定しているため、以下のファイルを編集すると自動的に反映されます：

- index.html
- styles.css
- script.js
- images/

ブラウザをリロードするだけで変更が確認できます。

### コンテナの停止

\`\`\`bash
docker-compose down
\`\`\`

## GitHub Pages へのデプロイ

1. このリポジトリをGitHubにプッシュ
2. リポジトリの Settings > Pages に移動
3. Source を "main" ブランチに設定
4. 数分待つとサイトが公開されます

## カスタマイズ

### 個人情報の更新

`index.html` を編集して以下を更新してください：

- ヒーローセクションの名前と説明
- 自己紹介セクションの内容
- スキルセクションのスキル一覧
- プロジェクトセクションのプロジェクト情報
- 連絡先セクションのリンク（GitHub、LinkedIn、Email、Twitter）

### プロフィール画像の追加

`images/anchovy.jpg` にあなたの写真を配置してください。

### スタイルの変更

`styles.css` を編集してカラーやフォントをカスタマイズできます。

## 使用技術

- HTML5
- CSS3
- Vanilla JavaScript
- Docker & Docker Compose
- Nginx (Webサーバー)

## ディレクトリ構造

\`\`\`
.
├── index.html          # メインHTMLファイル
├── styles.css          # スタイルシート
├── script.js           # JavaScript
├── images/             # 画像ファイル
│   └── anchovy.jpg     # プロフィール画像
├── Dockerfile          # Dockerイメージ定義
├── docker-compose.yml  # Docker Compose設定
└── README.md           # このファイル
\`\`\`

## ライセンス

MIT License
