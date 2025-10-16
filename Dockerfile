FROM nginx:alpine

# 作業ディレクトリを設定
WORKDIR /usr/share/nginx/html

# 既存のファイルを削除
RUN rm -rf ./*

# プロジェクトファイルをコピー
COPY index.html .
COPY styles.css .
COPY script.js .
COPY images/ ./images/

# Nginxの設定ファイルをコピー（オプション）
# COPY nginx.conf /etc/nginx/nginx.conf

# ポート80を公開
EXPOSE 80

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]
