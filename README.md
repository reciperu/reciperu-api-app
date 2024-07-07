# ローカル環境構築

## 事前準備

### Node.js と npm のインストール

Node.js と npm がインストールされていることを確認します。未インストールの場合は、以下のリンクからインストールしてください。

- [Node.js](https://nodejs.org/)

### プロジェクトの依存関係のインストール

```bash
npm install
```

### 環境変数の設定

#### アプリ用環境変数ファイルの作成

以下のコマンドを実行して、必要な環境変数ファイルを作成します。

```bash
cp envs/.env.sample envs/.env.development
cp envs/.env.sample envs/.env.production
cp envs/.env.sample envs/.env.local
```

#### Prisma 用環境変数ファイルの作成

同様に、以下のコマンドを実行して Prisma 用の環境変数ファイルを作成します。

```
cp prisma/.env.sample prisma/.env.development
cp prisma/.env.sample prisma/.env.production
cp prisma/.env.sample prisma/.env.local
```

## Supabase の実行

ローカルで Supabase を実行するための手順です。

### Supabase CLI のインストール

Supabase CLI が未インストールの場合、以下のコマンドでインストールします。

```bash
# supabaseをインストールしていない場合
brew install supabase/tap/supabase
```

#### Supabase の起動

プロジェクトの supabase ディレクトリに移動し、Supabase を起動します。

```bash
cd supabase
supabase start
```

ローカルの管理画面にアクセスするには、ブラウザで以下の URL にアクセスします。

```
http://localhost:54323
```

## Schema の反映

Prisma を使用してデータベーススキーマを反映させます。

```bash
npm prisma db push
```

## アプリケーションの実行

開発環境でアプリケーションを実行します。

```bash
npm run start:dev
```

# デプロイ

## 事前準備

### Firebase CLI のインストール

Firebase CLI が未インストールの場合、以下のリンクからインストールしてください。

- [Firebase CLI](https://firebase.google.com/docs/cli?hl=ja)

### Firebase にログイン

```bash
firebase login
```

### デプロイターゲットの設定

#### 開発用プロジェクトをターゲットに設定

```bash
firebase use reciperu-dev-app
```

#### 本番用プロジェクトをターゲットに設定

```bash
firebase use <your-production-project-id>
```

## デプロイ手順

### 開発環境へのデプロイ

```bash
npm run deploy:dev
```

### 本番環境へのデプロイ

```bash
npm run deploy:prod
```

これで、README が Markdown 形式で書かれ、手順が明確になりました。追加のセクションや説明が必要な場合は、適宜追加してください。
