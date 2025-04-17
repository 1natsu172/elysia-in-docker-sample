# Docker Attach Debugger

Docker環境でNode.jsアプリケーションを実行し、デバッグするためのテンプレートプロジェクトです。

## 機能

- Docker内でNode.jsアプリケーションを実行
- 開発/本番環境の切り替えが容易
- デバッガーをアタッチするための設定を含む
- ボリュームマウントによるホットリロード対応
- ElysiaJSフレームワークを使用したサーバーアプリケーション
- Docker Compose Watchによるホットリロード環境

## 使用方法

### 開発環境

開発環境でアプリケーションを起動するには：

```bash
# 通常の起動
docker compose --env-file .env.development up

# Docker Compose Watchを使用したホットリロード環境（推奨）
docker compose --env-file .env.development watch

# または単にコンテナを起動する場合
docker compose up
```

### API エンドポイント

アプリケーションが起動すると、以下のエンドポイントが利用可能になります：

- `GET /` - ウェルカムページ
- `GET /health` - ヘルスチェックエンドポイント
- `GET /v1/user/:id` - IDを指定してユーザー情報を取得

### 本番環境

本番環境用にビルドして実行するには：

```bash
# 本番環境変数を使用
docker compose --env-file .env.production up

# または本番用イメージのビルドのみ
docker compose --env-file .env.production build
```

### 環境変数

`.env.development`または`.env.production`ファイルで環境設定を管理できます：

- `NODE_ENV`: 実行環境（development/production）
- `DOCKERFILE`: 使用するDockerfileの指定
- `APP_COMMAND`: 実行するコマンド（dev/start）

### クラウドへのデプロイ

イメージをビルドしてクラウドにデプロイするには：

```bash
# イメージをビルド
docker build -t myapp -f Dockerfile.prod .

# 異なるプラットフォーム向けにビルドする場合（例：M1 Mac → AMD64）
docker build --platform=linux/amd64 -t myapp -f Dockerfile.prod .

# レジストリにプッシュ
docker push myregistry.com/myapp
```

## 詳細情報

- [ElysiaJS 公式サイト](https://elysiajs.com/)
- [Docker Compose Watch ドキュメント](https://docs.docker.com/compose/how-tos/file-watch/)
- [Docker Node.js ガイド](https://docs.docker.com/language/nodejs/)
- [Docker 公式ドキュメント](https://docs.docker.com/)
