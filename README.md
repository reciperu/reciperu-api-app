# 環境構築

## Installation

```bash
$ pnpm install
```

## Migration

.env ファイルに DATABASE_URL を載せる

```bash
$ npx prisma migrate dev
```

## Run Supabase

```bash
# supabaseをインストールしていない場合
$ brew install supabase/tap/supabase

$ cd supabase

$ supabase start


```

`http://localhost:54323/projects`にアクセスすると、ローカルの管理画面にアクセスできる

## Running the app

```bash
# watch mode
$ pnpm run start:dev

```
