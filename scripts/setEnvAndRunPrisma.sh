#!/bin/bash

# 環境変数ファイルのパスを設定
ENV_FILE_PATH="./prisma/.env.$NODE_ENV"

# 環境変数ファイルが存在するか確認
if [ -f $ENV_FILE_PATH ]; then
  echo "Using env file: $ENV_FILE_PATH"
  cp $ENV_FILE_PATH ./prisma/.env
  export $(cat $ENV_FILE_PATH | xargs)
else
  echo "Env file $ENV_FILE_PATH does not exist"
  exit 1
fi

# Prisma CLIコマンドを実行
npx prisma $@