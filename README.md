# Docker Attach Debugger

Docker環境でBunを使用したElysiaJSアプリケーションを実行し、デバッグするためのテンプレートプロジェクトです。

## 機能

- Docker内でBun + ElysiaJSアプリケーションを実行
- 開発/本番環境の切り替えが容易
- デバッガーをアタッチするための設定を含む
- ボリュームマウントによるホットリロード対応
- ElysiaJSフレームワークを使用したサーバーアプリケーション
- Docker Compose Watchによるホットリロード環境
- 高速なBunランタイムによる開発体験の向上

## 使用方法

### 開発環境

開発環境でアプリケーションを起動するには：

```bash
# 初回
docker compose --env-file .env.development up --build

# 2回目以降
docker compose --env-file .env.development watch

# または単にコンテナを起動する場合
docker compose up
# ホットリロードありで単にコンテナを起動する場合
docker compose up --watch
```

`--env-file` はなくてもデフォルト値設定があるので基本動きますが指定する方が間違いがないです。

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

### Bunの利点

このプロジェクトはNodeJSとYarnではなくBunを使用しています：

- 高速な起動と実行時間
- 組み込みのウォッチモードでのホットリロード
- 型チェックが内蔵されたランタイム
- 効率的な依存関係管理
- ElysiaJSとの最適な互換性

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

- [Bun 公式サイト](https://bun.sh/)
- [ElysiaJS 公式サイト](https://elysiajs.com/)
- [ElysiaJS 本番ビルドガイド](https://elysiajs.com/tutorial.html#build-for-production)
- [Docker Compose Watch ドキュメント](https://docs.docker.com/compose/how-tos/file-watch/)
- [Docker 公式ドキュメント](https://docs.docker.com/)
