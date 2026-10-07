# next-theOne

Build a Full-Stack Real-Time Dating App with Next.js 14+ & TypeScript

## 🛠 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js%4014-000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=000)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=000)
![Auth.js](https://img.shields.io/badge/Auth.js-000?style=for-the-badge&logo=next.js&logoColor=white)

![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Pusher](https://img.shields.io/badge/Pusher-300D4F?style=for-the-badge&logo=pusher&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-000?style=for-the-badge&logo=resend&logoColor=white)

etc...

## Link

[💍 The One](https://next-the-one.vercel.app/)

## Demo

![Image](https://github.com/user-attachments/assets/4334e30d-9547-470d-a5ae-ddede7c9f200)

---

## What is this project?

**(JP)**

**The One** は、"気軽なスワイプ"ではなく、相手を深く知ることから始まる出会いをコンセプトにした、フルスタックのリアルタイム・Datingアプリです。

**Next.js 14 / TypeScript** をベースに、**Prisma + PostgreSQL (Neon)** によるデータ管理。
**Auth.js** による認証、**Cloudinary** による画像管理。
**Pusher** によるリアルタイム通信を組み合わせて構築しました。

ユーザーはプロフィールや写真をもとに相手を探し、気になる相手に Like を送信。お互いに Like が成立すると Match となり、マッチした相手とのみアプリ内でメッセージのやり取りができます。
マッチング条件やLikeの状態管理、Cursor Pagination、リアルタイムのMatch通知・メッセージングまで、フロントエンド・バックエンド双方を実装しています。

UI面では、Datingアプリにありがちな派手さを避け、shadcn/ui・Tailwind CSS・Framer Motion を用いて、落ち着いたダークトーンと控えめなアニメーションによる、**静かで上品なユーザー体験**を目指しました。

「The One」という名前には、数多くの候補を消費するのではなく、本当に知りたいと思える

**"たった一人"とのつながりを見つける**
というプロダクトの方向性を込めています。

**(EN)**

**The One** is a full-stack, real-time dating app built around a simple idea: connection should start with genuinely getting to know someone — not casual swiping.

Built with **Next.js 14 / TypeScript**, it combines **Prisma + PostgreSQL (Neon)** for data management, **Auth.js** for authentication, **Cloudinary** for image handling, and **Pusher** for real-time communication.

Users browse profiles and photos, and can send a Like to anyone who catches their interest. When two users Like each other, it becomes a Match — and only matched users can message each other in-app. The app covers the full stack of this flow, from matching logic and Like state management to cursor-based pagination and real-time Match notifications and messaging.

On the UI side, rather than the bold, high-energy look common to dating apps, The One uses **shadcn/ui**, **Tailwind CSS**, and **Framer Motion** to create a calm, dark-toned interface with subtle animation — aiming for a **quiet, refined user experience**.

The name "The One" reflects the product's core philosophy: instead of burning through endless candidates, it's about finding

**that one person you genuinely want to know.**

## 🚀 Recent Updates

### v2 — Authentication Expansion (October 2026)

The One v2 focuses on expanding the authentication system beyond the initial email/password flow.

- Google OAuth
- Automatic Account Linking
- Secure Password Reset
- Password reset emails with Resend
- Token expiration and single-use protection
- User enumeration prevention
- Transactional password updates
- Server / Client responsibility separation

## Features

**(JP)**

### 🔐 認証・プロフィール管理

- **Auth.js** によるメールアドレス/パスワード認証
- 🆕 **Google OAuth** によるソーシャルログイン
- 🆕 Google OAuth と既存アカウントを統合する **Automatic Account Linking**
- 🆕 **Secure Password Reset**（有効期限・Single-use Token）
- 🆕 **Resend** によるパスワードリセット・変更確認メール
- **bcryptjs** によるパスワードのハッシュ化
- 性別・希望する相手の性別・居住地・自己紹介・プロフィール写真を含む、プロフィール登録機能一式
- **Cloudinary** と連携したプロフィール画像のアップロード・削除フロー
- プロフィールの完成状態に応じたアクセス制御

### 👥 Members & マッチング

- 性別・希望する相手の性別の条件に基づいたマッチング候補の絞り込み
- Like / Unlike機能。相互Likeで自動的にMatchが成立
- Like済みユーザーやプロフィール写真未登録のユーザーを候補から除外
- **Cursor Pagination** による効率的な追加読み込み（Load More）

### ⚡ リアルタイムMatch＆Messaging

- **Pusher** を利用したリアルタイム通信
- Match成立時のリアルタイム通知
- マッチした相手との1対1メッセージング
- リアルタイムでのメッセージ送信・UI更新
- タイピングインジケーターの表示
- Match / Messageの状態をサーバー側で処理し、Pusherを通じてクライアントへリアルタイムに通知

### 🔔 通知・New表示

- 新しいLike / Match / Messageを示す通知バッジ
- 新しいLike / Match / Messageを受信した際の NEW 表示
- `localStorage` によるNEW状態の保持
- 一定期間経過後のNEW表示の自動非表示

### 🎨 レスポンシブUI＆アニメーション

- **shadcn/ui** ＋ **Tailwind CSS** によるフルレスポンシブUI
- **Framer Motion** によるページ・コンポーネント単位のアニメーション
- Members / Home / Messaging各画面をモバイル・デスクトップ両対応で最適化
- Datingアプリという文脈に合わせた、落ち着いたダークトーンのビジュアルデザイン

**(EN)**

### 🔐 Authentication & Profile Management

- Email / password authentication with **Auth.js**, with passwords securely hashed using **bcryptjs**
- 🆕 **Google OAuth** for social login
- 🆕 **Automatic Account Linking** to connect Google OAuth with existing accounts
- 🆕 **Secure Password Reset** with token expiration and single-use protection
- 🆕 Password reset and password change confirmation emails via **Resend**
- Complete profile registration including gender, preferred gender, location, bio, and profile photos
- Profile image upload and deletion flow integrated with **Cloudinary**
- Access control based on profile completion status

### 👥 Member Discovery & Matching

- Filtered member discovery based on gender and preferred gender
- Like / Unlike functionality with automatic Match creation when both users Like each other
- Exclusion logic to prevent already-Liked users and users without profile photos from appearing as candidates
- Efficient incremental loading with **Cursor Pagination** and a Load More interface

### ⚡ Real-time Matching & Messaging

- Real-time communication powered by **Pusher**
- Real-time notifications when a Match is created
- One-to-one messaging between matched users
- Real-time message delivery and UI updates
- Typing indicator for active conversations
- Match and Message events are processed server-side and pushed to clients in real time via Pusher

### 🔔 Notifications & New Indicators

- Notification badges for new Likes, Matches, and Messages
- **NEW** indicators for newly received Likes, Matches, and Messages
- `localStorage` used to persist NEW states
- Automatic removal of NEW indicators after a defined period

### 🎨 Responsive UI & Animation

- Fully responsive UI built with **shadcn/ui** and **Tailwind CSS**
- Page and component-level animations powered by **Framer Motion**
- Responsive optimization across Members, Home, and Messaging screens
- Refined dark-tone visual design tailored to the dating app experience

## 🧠 Key Technical Implementations

**(JP)**

### ⚡ Real-time Communication Architecture

The Oneでは、Like、Match、Messaging、Connectionsなど複数のリアルタイム機能を、**一貫したアーキテクチャで管理**しています。

#### Frontend

- `ConversationProvider`、`LikeProvider`、`MatchProvider`、`ConnectionsProvider` をそれぞれの責務ごとに分離
- `ConversationProvider`、`LikeProvider`、`MatchProvider` がPusherのsubscriptionとイベント処理を担当
- `ConnectionsProvider` はLike / Match Providerからイベントを受け取り、未確認Like / Matchの状態を統合管理
- `AuthenticatedProviders` で各Providerをまとめ、認証済みユーザーのリアルタイム機能を提供
- コンポーネントごとに個別のPusher接続を持たせず、リアルタイムイベントとUI状態の管理をProvider層に分離

```text
Backend
   │
   ▼
 Pusher
   │
   ├───────────────┬───────────────────┐
   ▼               ▼                   ▼
LikeProvider   MatchProvider   ConversationProvider
   │               │                   │
   └───────┬───────┘                   │
           ▼                           ▼
 ConnectionsProvider             Conversation UI
           │
      ┌────┴────┐
      ▼         ▼
unseenLikeIds  unseenMatchIds
      │         │
      └────┬────┘
           ▼
       UI State
```

#### Backend

- Server Action / Server LogicからDB更新、Realtime通知までの処理フローを統一
- DB mutation後に専用のRealtime utilityを呼び出し、Pusher eventを発行
- Realtime通知に必要なデータをPayloadとして整形し、必要に応じてmapperを使用してクライアント向けのデータ構造へ変換
- Channel、event、payloadの構造を機能間で統一し、Like / Match / Messageそれぞれで一貫したイベント処理を実現

```text
                    USER ACTION
                         │
                         ▼
                  ┌─────────────┐
                  │Server Action│
                  │ / Server Logic│
                  └──────┬──────┘
                         │
                         ▼
                  ┌─────────────┐
                  │  Database   │
                  │  Mutation   │
                  └──────┬──────┘
                         │
                         ▼
                  ┌─────────────┐
                  │  Realtime   │
                  │   Utility   │
                  └──────┬──────┘
                         │
                         ▼
                  ┌─────────────────┐
                  │ Realtime Payload│
                  │  (Mapper if     │
                  │   necessary)    │
                  └───────┬─────────┘
                          │
                          ▼
                       Pusher
```

Like、Match、Messagingなどのリアルタイム機能では共通のデータフローを採用しながら、機能固有の責務を専用のProviderとRealtime Utilityに分離しています。
これにより、機能ごとの責務を分離しつつ、Frontend / Backendの両方で一貫したリアルタイム通信の設計を維持しています。

### 💞 Mutual Matching Logic

- Likeを `sourceUser → targetUser` の関係として管理
- 相手側からのLikeを検索し、相互Likeを判定
- `gender` と `searchGender` の双方を考慮したマッチング候補の生成
- Match専用テーブルを持たず、LikeデータをもとにMatch状態を判定
- 自分自身、Like済みユーザー、条件に合わないユーザーなどを候補から除外

### 📄 Cursor-based Pagination

- Offset Paginationではなく**Cursor Pagination**を採用
- `createdAt` と `id` を組み合わせ、安定した順序で次のデータを取得
- 初回取得後はLoad Moreによって次のMemberを段階的に追加
- Paginationによるデータ取得とMemberの除外条件を組み合わせ、重複のないMember一覧を構築

### 🔐 Authentication & Route Protection

- **Auth.js**によるCredentials / Google OAuthの認証とJWT Session管理
- MiddlewareでRoute単位のアクセスを制御
- Server Component / Server Actionでも認証状態を確認し、認証が必要な処理を保護
- Profileの完成状態に応じて`/complete-profile`へ誘導
- Guest / Authenticated Userで表示内容を切り替え

### 🔑 OAuth & Account Linking

複数の認証方式を同一のUserとして安全に扱えるよう、**Credentials認証とGoogle OAuthを統合**

```text
                    ┌─ Credentials
                    │
Authentication ─────┤
                    │
                    └─ Google OAuth
                           │
                           ▼
                    Verified Email
                           │
                           ▼
                    Existing User?
                       ┌───┴───┐
                      Yes      No
                       │        │
                       ▼        ▼
                 Link Account  Create User
                       │        │
                       └───┬────┘
                           ▼
                          User
```

- **Credentials / Google OAuth** の複数の認証方式を、単一のUserとして管理
- Auth.jsの`Account` を利用し、複数の認証Providerを同一Userに紐付け
- Google OAuthでは `email_verified === true` を確認し、検証済みのemailのみ認証を許可
- Googleのverified emailが既存Userと一致する場合、新しいUserを作成せず既存UserへGoogle Accountを自動Link
- Google OAuthのみで作成されたUserはPassword認証とは分離して扱い、Password Resetによる意図しないPassword設定を防止

### 🔒 Secure Password Reset

パスワードリセット用のTokenを安全に管理し、推測・再利用・ユーザー情報の漏洩を防ぐ設計を実装

```text
Forgot Password
      │
      ▼
Secure Token Generation
      │
      ├── rawToken ──► Reset URL ──► Resend
      │
      └── SHA-256 ──► tokenHash ──► Database
                              │
                              ▼
                     Token Verification
                              │
                              ▼
                         New Password
                              │
                              ▼
                    bcrypt Password Hash
                              │
                              ▼
                    Prisma Transaction
                     ├── Update passwordHash
                     └── Mark token used
```

- `randomBytes(32)` で暗号学的に安全なReset Tokenを生成し、Raw TokenはDatabaseに保存せずSHA-256でHash化して保存
- Tokenには有効期限を設定し、使用済みTokenには`usedAt`を記録して再利用を防止
- Reset Tokenに有効期限を設定し、使用済みTokenは再利用できないように管理
- 登録されていないemailに対しても同一のレスポンスを返し、ユーザーアカウントの存在を推測されないように制御
- Google OAuthのみで作成されたUserにはPassword Reset Tokenを発行せず、OAuth認証とPassword認証を意図せず混在させない
- Password更新とTokenの使用済み処理をPrisma Transactionで実行し、両方の処理が成功した場合のみ変更を確定
- Client Componentから直接Databaseへアクセスせず、
  Server Action → Server-side Logic → Prisma
  という責務分離で認証・Database処理をServer側に限定

### 🧩 Server / Client Responsibility

- Server Componentsで認証・データ取得・DBアクセスなどのサーバー処理を担当
- Server ActionsでLike、Match、MessageなどのMutationを処理
- 認証・Database処理が必要な機能では、Server ActionからServer-side Logicを経由してPrismaへアクセスする構成を採用
- Client ComponentsではPusher subscriptionやユーザー操作など、リアルタイム性・インタラクティブ性が必要な処理を担当
- Server / Clientそれぞれの責務を分離し、Next.js App Routerの構成に合わせて実装

### 🖼️ Cloudinary Image Lifecycle

- **Cloudinary**を利用したプロフィール画像のアップロード
- Profile更新時の画像差し替え・削除処理
- Member削除時にCloudinary上の関連画像も削除
- DB上のプロフィールデータと外部ストレージの画像を連携して管理

**(EN)**

### ⚡ Real-time Communication Architecture

The One uses a **consistent architecture for managing multiple real-time features**, including Likes, Matches, Messaging, and Connections.

#### Frontend

- Separates `ConversationProvider`, `LikeProvider`, `MatchProvider`, and `ConnectionsProvider` by responsibility
- `ConversationProvider`, `LikeProvider`, and `MatchProvider` handle Pusher subscriptions and incoming events
- `ConnectionsProvider` consumes Like and Match events and manages the state of unseen Likes and Matches
- Composes the Providers through `AuthenticatedProviders` to provide real-time functionality throughout authenticated user flows
- Keeps Pusher subscriptions out of individual UI components by separating real-time event handling and UI state management into the Provider layer

```text
Backend
   │
   ▼
 Pusher
   │
   ├───────────────┬───────────────────┐
   ▼               ▼                   ▼
LikeProvider   MatchProvider   ConversationProvider
   │               │                   │
   └───────┬───────┘                   │
           ▼                           ▼
 ConnectionsProvider             Conversation UI
           │
      ┌────┴────┐
      ▼         ▼
unseenLikeIds  unseenMatchIds
      │         │
      └────┬────┘
           ▼
       UI State
```

#### Backend

- Follows a consistent flow from Server Actions / Server Logic through database mutations and real-time notifications
- Calls dedicated Realtime utilities after database mutations to trigger Pusher events
- Constructs real-time payloads with only the data required by the client, using mappers when data transformation is needed
- Maintains consistent channel, event, and payload structures across Like, Match, and Messaging features

```text
                    USER ACTION
                         │
                         ▼
                  ┌─────────────┐
                  │Server Action│
                  │ / Server Logic│
                  └──────┬──────┘
                         │
                         ▼
                  ┌─────────────┐
                  │  Database   │
                  │  Mutation   │
                  └──────┬──────┘
                         │
                         ▼
                  ┌─────────────┐
                  │  Realtime   │
                  │   Utility   │
                  └──────┬──────┘
                         │
                         ▼
                  ┌─────────────────┐
                  │ Realtime Payload│
                  │ (Mapper if      │
                  │  necessary)     │
                  └───────┬─────────┘
                          │
                          ▼
                       Pusher
```

Like, Match, and Messaging features share the same overall data flow while keeping feature-specific responsibilities separated across dedicated Providers and Realtime utilities. This allows each feature to remain independently manageable while maintaining a consistent real-time communication pattern across both the frontend and backend.

### 💞 Mutual Matching Logic

- Models Likes as a directional relationship: `sourceUser → targetUser`
- Checks for the corresponding Like from the other user to determine whether a mutual Like exists
- Generates compatible member candidates based on both `gender` and `searchGender`
- Determines Match state from mutual Like data without maintaining a separate Match table
- Excludes the current user, already-Liked users, and members who do not meet the matching criteria

### 📄 Cursor-based Pagination

- Uses **Cursor Pagination** instead of Offset Pagination
- Combines `createdAt` and `id` to maintain a stable ordering when fetching subsequent results
- Loads members incrementally through a Load More interface
- Combines pagination with member exclusion logic to prevent duplicate results across successive loads

### 🔐 Authentication & Route Protection

- Handles authentication and JWT-based session management with **NextAuth.js**, supporting Credentials and Google OAuth
- Uses Middleware to control access at the route level
- Verifies authentication state in Server Components and Server Actions to protect authenticated functionality
- Redirects users to `/complete-profile` when their profile has not been completed
- Provides different experiences for guests and authenticated users, combining Middleware with server-side authentication checks to protect access

### 🔑 OAuth & Account Linking

Supports multiple authentication methods while maintaining a single User identity across **Credentials and Google OAuth**.

```text
                    ┌─ Credentials
                    │
Authentication ─────┤
                    │
                    └─ Google OAuth
                           │
                           ▼
                    Verified Email
                           │
                           ▼
                    Existing User?
                       ┌───┴───┐
                      Yes      No
                       │        │
                       ▼        ▼
                 Link Account  Create User
                       │        │
                       └───┬────┘
                           ▼
                          User
```

- Supports both **Credentials and Google OAuth** while maintaining a single application User
- Uses Auth.js `Account` records to associate multiple authentication providers with the same User
- Requires `email_verified === true` for Google OAuth authentication, allowing only verified email addresses
- Automatically links a Google Account to an existing User when the verified Google email matches, avoiding duplicate User records
- Keeps Google-only accounts separate from password-based authentication, preventing them from setting a password through the Password Reset flow

### 🔒 Secure Password Reset

Implements a secure password reset flow designed to protect reset tokens from guessing, reuse, and user account enumeration.

```text
Forgot Password
      │
      ▼
Secure Token Generation
      │
      ├── rawToken ──► Reset URL ──► Resend
      │
      └── SHA-256 ──► tokenHash ──► Database
                              │
                              ▼
                     Token Verification
                              │
                              ▼
                         New Password
                              │
                              ▼
                    bcrypt Password Hash
                              │
                              ▼
                    Prisma Transaction
                     ├── Update passwordHash
                     └── Mark token used
```

- Generates cryptographically secure reset tokens using `randomBytes(32)` and stores only their SHA-256 hashes in the database
- Sets an expiration time for each token and records `usedAt` to prevent token reuse
- Enforce one-hour expiration and single-use reset tokens
- Returns the same response for registered and unregistered email addresses to prevent user account enumeration
- Does not issue password reset tokens to Google-only accounts, keeping OAuth and password-based authentication intentionally separate
- Updates the password and marks the reset token as used within a Prisma Transaction, ensuring both operations succeed or fail together
- Keeps database and authentication logic on the server through a Server Action → Server-side Logic → Prisma flow, rather than allowing Client Components to access the database directly

### 🧩 Server / Client Responsibility

- Uses Server Components for authentication, data fetching, and server-side data access
- Uses Server Actions for mutations such as Likes, Matches, and Messages
- For features that require authentication and database access, uses a Server Action → Server-side Logic → Prisma flow to keep server-side processing separated from Client Components.
- Uses Client Components for Pusher subscriptions, user interactions, and other real-time or interactive behavior
- Separates server and client responsibilities according to the architecture of the Next.js App Router

### 🖼️ Cloudinary Image Lifecycle

- Uses **Cloudinary** for profile image uploads
- Handles image replacement and deletion when profiles are updated
- Removes associated Cloudinary images when a member account is deleted
- Keeps profile data in the database synchronized with externally stored images
<br />

<br />

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL database
- A Cloudinary account
- A Pusher account
- A Google Cloud account
- A Resend account

### 1. 📌 Required Accounts

The One uses the following external services:

- **Neon** — PostgreSQL database
- **Cloudinary** — Profile image storage
- **Pusher** — Real-time communication
- **Google Cloud** — Google OAuth authentication
- **Resend** — Password reset and confirmation emails

You will need an account for each service to run the application locally.

### 2. 🔧 Environment Variables

Create a `.env` file in the project root and configure the required environment variables.

Make sure to rename the provided sample files as follows:

- `env.example` → `.env`

```env
#DB
DATABASE_URL=
AUTH_SECRET=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

#Pusher
NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=

# Google
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# App URL
NEXT_PUBLIC_APP_URL=

# Resend
RESEND_API_KEY=
```

`NEXT_PUBLIC_APP_URL` should point to the application's base URL. Use `http://localhost:3000` for local development and the deployed application URL for production.

> Make sure to use your own credentials for each service. Do not commit `.env` or any other file containing secrets to the repository.

### 3. 🗄️ Database Setup

Install the project dependencies:

```bash
npm install
```

Run the Prisma migrations:

```bash
npx prisma migrate dev
```

If the project includes seed data, run:

```bash
npx prisma db seed
```

### 4. ▶️ Run the Application

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### 5. 🚀 Build & Deploy

Create a production build:

```bash
npm run build
```

The One can be deployed to platforms such as Vercel.

When deploying, configure the same environment variables in the deployment platform's environment settings.

### 6. 👤 Sample Login

The following demo accounts are available for testing. Each account uses the password `password` and represents a different `gender` / `searchGender` combination.

| Name   | Email             | Password   | Gender | Search Gender |
| ------ | ----------------- | ---------- | ------ | ------------- |
| Chris  | `chris@test.com`  | `password` | Male   | Female        |
| Eric   | `eric@test.com`   | `password` | Male   | Male          |
| Albert | `albert@test.com` | `password` | Male   | Any           |
| Lizz   | `lizz@test.com`   | `password` | Female | Male          |
| Amanda | `amanda@test.com` | `password` | Female | Female        |
| Misato | `misato@test.com` | `password` | Female | Any           |

These accounts allow you to explore different matching scenarios, including opposite-gender and same-gender preferences.

> All demo accounts are seeded for development and demonstration purposes only.

## 🚀 Current Release

**(JP)**

The Oneは現在も継続的に開発しています。

現在のリリース版には、プロフィール作成、メンバー情報の閲覧、Like、マッチング、リアルタイムメッセージングまで、コアとなるユーザーフローが含まれています。

プロジェクトは現在も継続的に開発しており、今後のリリースでさらなる機能追加や改善を予定しています。

### 予定されている改善点

- ✅ Google OAuth認証 — Oct, 2026
- ✅ パスワードリセット — Oct, 2026
- 高度なメンバー検索とフィルタリング機能
- 通知機能の拡張
- UI/UXのさらなる改善
- マッチングおよびメンバー発見機能の拡張

**(EN)**

The One is currently under active development.

The current release includes the core user flow from profile creation and member discovery to Likes, Matches, and real-time messaging.

The project is still under active development, with additional features and improvements planned for future releases.

### Planned Improvements

- ✅ OAuth Authentication — Oct, 2026
- ✅ Password Reset — Oct, 2026
- Advanced member search and filtering
- Additional notification features
- Further UI/UX improvements
- Additional matching and discovery features

## 📘 Development Notes

**(JP)**

### リアルタイム通信をコアなユーザー体験として設計

The Oneでは、以前のポートフォリオプロジェクトであるAloha Estateでは採用しなかった、リアルタイム通信を実装しました。

Datingアプリでは、ユーザー同士の関係やコミュニケーションに関する変化がリアルタイムに反映されることが、ユーザー体験を大きく左右すると考えたためです。

リアルタイム通信は、単なるメッセージングだけに必要なものではありません。

例えば、

- Likeを受け取った
- お互いにLikeしてMatchが成立した
- 新しいメッセージを受け取った
- 相手がメッセージを入力している
- LikeやMatchなどの状態が変化した

といった情報も、ユーザーがその瞬間に把握できることが重要だと考えました。

ページを更新したり、別の画面へ移動したりしなければ状態の変化を確認できない場合、実際に起きているコミュニケーションとUIの間にタイムラグが生まれ、Datingアプリとしての体験が損なわれると考えました。

### リアルタイム機能の増加を前提とした設計

リアルタイム機能を追加していく中で、機能ごとに個別の実装を増やすことでコードが複雑化することを避け、**一貫した設計でリアルタイム通信を管理すること**を特に意識しました。

Frontendでは、Pusherのsubscriptionやイベント処理をLike、Match、ConversationなどのProviderごとに責務を分離し、UIコンポーネントが直接リアルタイム通信を管理しない構成にしています。

Backendでは、データベースの更新後に専用のRealtime UtilityからPusherイベントを発行し、クライアントに必要なデータだけをRealtime Payloadとして明示的に構築しています。必要に応じてmapperを使用してデータ構造を変換することで、データベースの構造とクライアントが受け取るデータ構造を直接結びつけないようにしています。

### 状態遷移と責務の分離

リアルタイム機能が増えるほど、Like、Match、Messageなどの状態が連続して変化するため、単にイベントを送受信するだけではなく、**どの状態をどこで管理するか**も重要になると考えました。

例えば、Likeを受け取った後にMatchが成立した場合には、LikeとMatchの状態を連動させる必要があります。そのため、各ProviderやConnectionsProviderに明確な責務を持たせ、イベントを受け取った後の状態更新がUIコンポーネントに分散しないように設計しました。

The Oneでは、リアルタイム機能そのものを実装することだけを目的とするのではなく、**機能が増えても理解しやすい構造を維持できること**を意識して設計・実装しています。

今回のリリースはこのアーキテクチャの初期段階であり、今後追加する検索・フィルタリングや通知機能なども、既存のリアルタイム通信の設計をベースに拡張していく予定です。
<br />

### 🆕 認証方式の拡張とUser Identityの設計 — Oct, 2026

The Oneでは、ユーザーがより柔軟にログイン方法を選択できるよう、Credentials認証に加えてGoogle OAuthを導入しました。

認証方式を追加するだけであればGoogle OAuthを実装すること自体は難しくありませんが、**同じemail addressを持つユーザーが異なる認証方式からログインした場合に、別々のUserが作成されないこと**も重要だと考えました。

そのため、Auth.jsの`Account`を利用して認証Providerとアプリケーション上の`User`を分離し、Googleのverified emailが既存Userと一致した場合は、新しいUserを作成せず既存UserへGoogle AccountをLinkする設計にしました。

また、Google OAuthでは`email_verified === true`を確認し、検証済みのemailのみを認証に利用するようにしています。

### 🆕 Password Resetのセキュリティ設計 — Oct, 2026

OAuth導入と合わせて、Credentials認証に必要となるPassword Resetも実装しました。

Password Resetでは、ユーザーが受け取ったURLをそのままDatabaseに保存するのではなく、`randomBytes(32)`で生成したTokenをSHA-256でHash化して保存する方式を採用しました。

さらに、Tokenに有効期限を設定し、使用済みTokenには`usedAt`を記録しています。新しいReset Requestが発行された場合には以前のTokenを無効化することで、複数のReset URLが同時に有効にならないようにしました。

また、登録されていないemailに対しても同じレスポンスを返すことで、Password Reset機能を通じたUser Enumerationを防ぐようにしています。

Google OAuthのみで作成されたUserについてはPassword Resetの対象から除外しました。OAuth認証とPassword認証を意図せず混在させず、**それぞれの認証方式に応じた責務を明確にすること**を優先しています。

メール送信にはResendを利用し、Reset URLの発行からメール送信、Token検証、Password更新までをServer-sideで処理する構成としました。

今回の認証機能では、単にログイン方法を増やすことではなく、**認証方式が増えてもUser identityやSecurityの整合性を維持できること**を意識して設計・実装しています。

**(EN)**

## 📘 Development Notes

### Real-time Communication as a Core User Experience

One of the main goals of The One was to build a more real-time user experience than my previous portfolio project, Aloha Estate.

In Aloha Estate, I intentionally kept the application architecture simpler and did not implement real-time communication. For The One, however, I felt that real-time behavior was particularly important because a dating application's user experience depends heavily on how quickly users can respond to changes in their relationships and conversations.

Real-time communication is not limited to messaging. Users need immediate feedback when:

- Someone sends them a Like
- A mutual Like creates a Match
- A new message is received
- The other person is typing
- Other relevant connection states change

These events can happen while the user is viewing a different part of the application, so updating the UI only after a page refresh would make the experience feel disconnected from what is happening in real time.

### Designing for Consistency as Real-time Features Expanded

As more real-time features were added, I focused on keeping the architecture consistent rather than implementing each feature independently.

On the frontend, Pusher subscriptions and event handling are separated into feature-specific Providers, while ConnectionsProvider integrates Like and Match events into the state used by the UI.

On the backend, database mutations are followed by dedicated Realtime utilities that construct the required event payloads and trigger Pusher events. Data is not sent directly from the database to the client; instead, real-time payloads are explicitly constructed, using mappers when data transformation is needed.

This consistent flow helped keep responsibilities separated as the number of real-time events increased, while avoiding unnecessary coupling between UI components and the real-time communication layer.

### Balancing Functionality and Complexity

Building real-time functionality across Likes, Matches, and Messaging introduced more state transitions and edge cases than a conventional request-response application.

Rather than adding separate implementations for every UI component, I focused on defining clear responsibilities between Server Actions, Realtime utilities, Providers, and UI components.

The goal was not simply to add as many real-time features as possible, but to make the communication flow understandable and maintainable as the application grows.

The current release represents the first stage of this architecture. Future features such as more advanced member search, filtering, and additional notification behavior can build on the existing foundation without changing the core communication model.
<br />

### 🆕 Authentication & User Identity — Oct, 2026

The One was extended to support both Credentials and Google OAuth authentication.

Rather than treating each authentication method as a separate user, I used Auth.js `Account` records to maintain a single User identity across providers. When a verified Google email matches an existing User, the Google Account is automatically linked instead of creating a duplicate User.

Google OAuth also requires `email_verified === true` to ensure that only verified email addresses are used for authentication.

### 🆕 Secure Password Reset — Oct, 2026

A secure Password Reset flow was implemented alongside the authentication changes.

Reset tokens are generated using cryptographically secure random values and stored only as SHA-256 hashes, with expiration and single-use protection. Previous tokens are revoked when a new reset request is issued.

The flow also returns the same response for registered and unregistered emails to prevent user enumeration, while Google-only accounts are kept separate from password-based authentication.

Resend is used for password reset and confirmation emails, with authentication and database operations kept on the server side.
The goal was not simply to add another login method, but to maintain a consistent User identity and security model as the authentication system expanded.
