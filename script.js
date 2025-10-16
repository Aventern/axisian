// スムーズスクロール（コンテンツエリア内）
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href").substring(1)
    const target = document.getElementById(targetId)
    const contentArea = document.querySelector(".content-area")

    if (target && contentArea) {
      const targetPosition = target.offsetTop - contentArea.offsetTop
      contentArea.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ページ読み込み時のフェードイン
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s"
    document.body.style.opacity = "1"
  }, 100)
})

const modal = document.getElementById("modal")
const modalBody = document.getElementById("modal-body")
const modalClose = document.querySelector(".modal-close")

// スキルの詳細データ
const skillDetails = {
  javascript: {
    title: "JavaScript",
    description: "モダンなWeb開発の基盤となる言語。ES6+の機能を活用し、非同期処理やDOM操作を得意としています。",
    experience: [
      "5年以上の実務経験",
      "React、Vue.jsなどのフレームワーク使用",
      "Node.jsでのサーバーサイド開発",
      "TypeScriptへの移行経験",
    ],
  },
  typescript: {
    title: "TypeScript",
    description: "型安全性を提供するJavaScriptのスーパーセット。大規模プロジェクトでの開発効率を大幅に向上させます。",
    experience: [
      "3年以上の実務経験",
      "厳格な型定義による品質向上",
      "ジェネリクスや高度な型の活用",
      "既存JSプロジェクトのTS移行",
    ],
  },
  python: {
    title: "Python",
    description: "データサイエンスやバックエンド開発で広く使用される汎用言語。シンプルで読みやすいコードが特徴です。",
    experience: [
      "4年以上の実務経験",
      "Django/Flaskでのバックエンド開発",
      "機械学習モデルの実装",
      "データ分析とスクリプト自動化",
    ],
  },
  java: {
    title: "Java",
    description: "エンタープライズアプリケーション開発の定番言語。堅牢性とスケーラビリティに優れています。",
    experience: [
      "3年以上の実務経験",
      "Spring Bootでのマイクロサービス開発",
      "大規模システムの設計と実装",
      "JUnitによるテスト駆動開発",
    ],
  },
  cpp: {
    title: "C/C++",
    description: "高性能が求められるシステムプログラミングに最適な言語。メモリ管理を直接制御できます。",
    experience: [
      "2年以上の実務経験",
      "組み込みシステム開発",
      "パフォーマンスクリティカルなアプリケーション",
      "低レベルシステムプログラミング",
    ],
  },
  react: {
    title: "React",
    description: "コンポーネントベースのUIライブラリ。宣言的なアプローチで複雑なUIを効率的に構築できます。",
    experience: [
      "4年以上の実務経験",
      "Hooks、Context APIの活用",
      "Next.jsでのSSR/SSG実装",
      "状態管理（Redux、Zustand）",
    ],
  },
  nodejs: {
    title: "Node.js",
    description: "JavaScriptでサーバーサイド開発を可能にするランタイム。非同期I/Oによる高いパフォーマンスが特徴です。",
    experience: [
      "4年以上の実務経験",
      "RESTful API、GraphQL開発",
      "Express、Fastifyの使用",
      "リアルタイム通信（WebSocket）",
    ],
  },
  docker: {
    title: "Docker",
    description: "コンテナ技術によるアプリケーションの移植性と一貫性を実現。開発環境の構築を簡素化します。",
    experience: ["3年以上の実務経験", "マルチステージビルドの活用", "Docker Composeでの環境構築", "Kubernetesとの連携"],
  },
  aws: {
    title: "AWS",
    description: "世界最大のクラウドプラットフォーム。スケーラブルで信頼性の高いインフラを提供します。",
    experience: [
      "3年以上の実務経験",
      "EC2、S3、RDS、Lambdaの活用",
      "CloudFormationによるIaC",
      "コスト最適化とセキュリティ対策",
    ],
  },
  postgresql: {
    title: "PostgreSQL",
    description: "高度な機能を持つオープンソースのリレーショナルデータベース。ACID特性を完全にサポートします。",
    experience: [
      "4年以上の実務経験",
      "複雑なクエリの最適化",
      "インデックス設計とパフォーマンスチューニング",
      "レプリケーションとバックアップ戦略",
    ],
  },
}

// プロジェクトの詳細データ
const projectDetails = {
  distributed: {
    title: "分散システム",
    description:
      "Kubernetes上で動作するマイクロサービスアーキテクチャを採用した大規模分散システムです。各サービスは独立してデプロイ可能で、高い可用性とスケーラビリティを実現しています。",
    features: [
      "Kubernetesによるコンテナオーケストレーション",
      "gRPCを使用したサービス間通信",
      "Prometheusによる監視とメトリクス収集",
      "Istioによるサービスメッシュ実装",
      "CI/CDパイプラインの自動化",
    ],
    tech: "Go, Kubernetes, Docker, gRPC, Prometheus, Istio",
  },
  ml: {
    title: "ML パイプライン",
    description:
      "画像認識のためのエンドツーエンド機械学習パイプラインです。データ収集から前処理、モデル訓練、デプロイまでを自動化し、継続的な改善を可能にしています。",
    features: [
      "TensorFlowによる深層学習モデルの構築",
      "データ前処理とオーグメンテーション",
      "MLflowによる実験管理とモデルバージョニング",
      "Kubeflowでのパイプライン自動化",
      "REST APIによるモデルサービング",
    ],
    tech: "Python, TensorFlow, Keras, MLflow, Kubeflow, FastAPI",
  },
  chat: {
    title: "チャットアプリ",
    description:
      "WebSocketを使用したリアルタイムチャットシステムです。複数のチャットルーム、プライベートメッセージ、ファイル共有などの機能を備えています。",
    features: [
      "Socket.ioによるリアルタイム双方向通信",
      "Reactによるレスポンシブなフロントエンド",
      "JWTによる認証とセッション管理",
      "MongoDBでのメッセージ永続化",
      "画像・ファイルのアップロード機能",
    ],
    tech: "Node.js, React, Socket.io, MongoDB, Express, JWT",
  },
  crypto: {
    title: "暗号化ツール",
    description:
      "AES-256暗号化を使用したセキュアなファイル暗号化ツールです。コマンドラインインターフェースとGUIの両方を提供し、高速で安全なデータ保護を実現しています。",
    features: [
      "AES-256-GCMによる強力な暗号化",
      "PBKDF2によるキー導出",
      "ファイルの完全性検証（HMAC）",
      "マルチスレッド処理による高速化",
      "クロスプラットフォーム対応",
    ],
    tech: "C++, OpenSSL, Qt (GUI), CMake",
  },
}

// スキルクリック時の処理
document.querySelectorAll(".tag.clickable").forEach((tag) => {
  tag.addEventListener("click", function () {
    const skillKey = this.getAttribute("data-skill")
    const skill = skillDetails[skillKey]

    if (skill) {
      modalBody.innerHTML = `
        <h2>${skill.title}</h2>
        <p>${skill.description}</p>
        <h3 style="margin-top: 20px; margin-bottom: 10px; color: #fff;">経験・実績</h3>
        <ul>
          ${skill.experience.map((exp) => `<li>${exp}</li>`).join("")}
        </ul>
      `
      modal.classList.add("active")
    }
  })
})

// プロジェクトクリック時の処理
document.querySelectorAll(".project-item.clickable").forEach((item) => {
  item.addEventListener("click", function () {
    const projectKey = this.getAttribute("data-project")
    const project = projectDetails[projectKey]

    if (project) {
      modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <h3 style="margin-top: 20px; margin-bottom: 10px; color: #fff;">主な機能</h3>
        <ul>
          ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
        <p style="margin-top: 20px;"><strong>使用技術:</strong> ${project.tech}</p>
      `
      modal.classList.add("active")
    }
  })
})

// モーダルを閉じる処理
modalClose.addEventListener("click", () => {
  modal.classList.remove("active")
})

// モーダル外をクリックしたら閉じる
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active")
  }
})

// ESCキーでモーダルを閉じる
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active")
  }
})
