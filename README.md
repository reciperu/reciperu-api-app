# 環境構築

## Installation

```bash
$ pnpm install
```

## Generate Schema

.env ファイルに DATABASE_URL を載せる

```bash
$ pnpm prisma db push
```

## Run Supabase

```bash
# supabaseをインストールしていない場合
$ brew install supabase/tap/supabase

$ cd supabase

$ supabase start


```

[http://localhost:54323]にアクセスすると、ローカルの管理画面にアクセスできる

## Running the app

```bash
# watch mode
$ pnpm run start:dev

```
