# next-theOne <br />Build a Full-Stack Real-Time Dating App with Next.js 14+ & TypeScript

## 🛠 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js%4014-000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=000)
<br />
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
<br />
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=000)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000?style=for-the-badge&logo=next.js&logoColor=white)
<br />
![Pusher](https://img.shields.io/badge/Pusher-300D4F?style=for-the-badge&logo=pusher&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

<p>etc...</p>

## Link

[💍 The One](https://next-the-one.vercel.app/)

## Demo

<img width="1048" height="1990" alt="Image" src="https://github.com/user-attachments/assets/8d498fbf-967b-40be-b3a7-47764731605f" />

## What is this project?

**(JP)**

**The One** は、"気軽なスワイプ"ではなく、相手を深く知ることから始まる出会いをコンセプトにした、フルスタックのリアルタイム・デーティングアプリです。

**Next.js 14 / TypeScript** をベースに、**Prisma + PostgreSQL (Neon)** によるデータ管理。
**NextAuth.js** による認証、**Cloudinary** による画像管理。
**Pusher** によるリアルタイム通信を組み合わせて構築しました。

ユーザーはプロフィールや写真をもとに相手を探し、気になる相手に Like を送信。お互いに Like が成立すると Match となり、マッチした相手とのみアプリ内でメッセージのやり取りができます。
マッチング条件やLikeの状態管理、Cursor Pagination、リアルタイムのMatch通知・メッセージングまで、フロントエンド・バックエンド双方を実装しています。

UI面では、Datingグアプリにありがちな派手さを避け、shadcn/ui・Tailwind CSS・Framer Motion を用いて、落ち着いたダークトーンと控えめなアニメーションによる、**静かで上品なユーザー体験**を目指しました。

「The One」という名前には、数多くの候補を消費するのではなく、本当に知りたいと思える<br />
**"たった一人"とのつながりを見つける**
というプロダクトの方向性を込めています。
<br />
<br />

**(EN)**

**The One** is a full-stack, real-time dating app built around a simple idea: connection should start with genuinely getting to know someone — not casual swiping.

Built with **Next.js 14 / TypeScript**, it combines **Prisma + PostgreSQL (Neon)** for data management, **NextAuth.js** for authentication, **Cloudinary** for image handling, and **Pusher** for real-time communication.

Users browse profiles and photos, and can send a Like to anyone who catches their interest. When two users Like each other, it becomes a Match — and only matched users can message each other in-app. The app covers the full stack of this flow, from matching logic and Like state management to cursor-based pagination and real-time Match notifications and messaging.

On the UI side, rather than the bold, high-energy look common to dating apps, The One uses **shadcn/ui**, **Tailwind CSS**, and **Framer Motion** to create a calm, dark-toned interface with subtle animation — aiming for a **quiet, refined user experience**.

The name "The One" reflects the product's core philosophy: instead of burning through endless candidates, it's about finding<br />
**that one person you genuinely want to know.**
<br />
<br />

## Features

**(JP)**

### 🔐 認証・プロフィール管理

- **NextAuth.js** によるメールアドレス/パスワード認証、**bcryptjs** でパスワードをハッシュ化
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
  <br />
  <br />

**(EN)**

### 🔐 Authentication & Profile Management

- Email / password authentication with **NextAuth.js**, with passwords securely hashed using **bcryptjs**
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
  <br />
  <br />

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

- **NextAuth.js**による認証とSession管理
- Server側で認証状態を確認し、保護されたRouteへのアクセスを制御
- Profileの完成状態に応じて`/complete-profile`へ誘導
- Guest / Authenticated UserでHomeの表示内容を切り替え
- MiddlewareとServer側の認証チェックを組み合わせ、認証が必要な機能を保護

### 🖼️ Cloudinary Image Lifecycle

- **Cloudinary**を利用したプロフィール画像のアップロード
- Profile更新時の画像差し替え・削除処理
- Member削除時にCloudinary上の関連画像も削除
- DB上のプロフィールデータと外部ストレージの画像を連携して管理

### 🧩 Server / Client Responsibility

- Server Componentsで認証・データ取得・DBアクセスなどのサーバー処理を担当
- Server ActionsでLike、Match、MessageなどのMutationを処理
- Client ComponentsではPusher subscriptionやユーザー操作など、リアルタイム性・インタラクティブ性が必要な処理を担当
- Server / Clientそれぞれの責務を分離し、Next.js App Routerの構成に合わせて実装
<br />
<br />

**(EN)**

### ⚡ Real-time Communication Architecture

The One uses a **consistent architecture for managing multiple real-time features**, including Likes, Matches, Messaging, and Connections.

#### Frontend

* Separates `ConversationProvider`, `LikeProvider`, `MatchProvider`, and `ConnectionsProvider` by responsibility
* `ConversationProvider`, `LikeProvider`, and `MatchProvider` handle Pusher subscriptions and incoming events
* `ConnectionsProvider` consumes Like and Match events and manages the state of unseen Likes and Matches
* Composes the Providers through `AuthenticatedProviders` to provide real-time functionality throughout authenticated user flows
* Keeps Pusher subscriptions out of individual UI components by separating real-time event handling and UI state management into the Provider layer

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

* Follows a consistent flow from Server Actions / Server Logic through database mutations and real-time notifications
* Calls dedicated Realtime utilities after database mutations to trigger Pusher events
* Constructs real-time payloads with only the data required by the client, using mappers when data transformation is needed
* Maintains consistent channel, event, and payload structures across Like, Match, and Messaging features

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

* Models Likes as a directional relationship: `sourceUser → targetUser`
* Checks for the corresponding Like from the other user to determine whether a mutual Like exists
* Generates compatible member candidates based on both `gender` and `searchGender`
* Determines Match state from mutual Like data without maintaining a separate Match table
* Excludes the current user, already-Liked users, and members who do not meet the matching criteria

### 📄 Cursor-based Pagination

* Uses **Cursor Pagination** instead of Offset Pagination
* Combines `createdAt` and `id` to maintain a stable ordering when fetching subsequent results
* Loads members incrementally through a Load More interface
* Combines pagination with member exclusion logic to prevent duplicate results across successive loads

### 🔐 Authentication & Route Protection

* Handles authentication and session management with **NextAuth.js**
* Verifies authentication state on the server to control access to protected routes
* Redirects users to `/complete-profile` when their profile has not been completed
* Provides different Home experiences for guests and authenticated users
* Combines Middleware with server-side authentication checks to protect authenticated functionality

### 🖼️ Cloudinary Image Lifecycle

* Uses **Cloudinary** for profile image uploads
* Handles image replacement and deletion when profiles are updated
* Removes associated Cloudinary images when a member account is deleted
* Keeps profile data in the database synchronized with externally stored images

### 🧩 Server / Client Responsibility

* Uses Server Components for authentication, data fetching, and server-side data access
* Uses Server Actions for mutations such as Likes, Matches, and Messages
* Uses Client Components for Pusher subscriptions, user interactions, and other real-time or interactive behavior
* Separates server and client responsibilities according to the architecture of the Next.js App Router
<br />
<br />

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm
* PostgreSQL database
* A Cloudinary account
* A Pusher account

### 1. 📌 Required Accounts

The One uses the following external services:

* **Neon** — PostgreSQL database
* **Cloudinary** — Profile image storage
* **Pusher** — Real-time communication

You will need an account for each service to run the application locally.

### 2. 🔧 Environment Variables

Create a `.env` file in the project root and configure the required environment variables.

Make sure to rename the provided sample files as follows:

- `.env.example` → `.env`


```env
DATABASE_URL=
AUTH_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=
```

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

| Name    | Email              | Password   | Gender | Search Gender |
| ------- | ------------------ | ---------- | ------ | ------------- |
| Chris   | `chris@test.com`   | `password` | Male   | Female        |
| Eric    | `eric@test.com`    | `password` | Male   | Male          |
| Albert  | `albert@test.com`  | `password` | Male   | Any           |
| Lizz    | `lizz@test.com`    | `password` | Female | Male          |
| Amanda  | `amanda@test.com`  | `password` | Female | Female        |
| Misato  | `misato@test.com`  | `password` | Female | Any           |

These accounts allow you to explore different matching scenarios, including opposite-gender and same-gender preferences.

> All demo accounts are seeded for development and demonstration purposes only.
<br />
<br />

## 🚀 Current Release

**(JP)**

The Oneは現在、初期リリース版として提供されています。

現在のリリース版には、プロフィール作成、メンバー情報の閲覧、Like、マッチング、リアルタイムメッセージングまで、コアとなるユーザーフローが含まれています。

プロジェクトは現在も継続的に開発しており、今後のリリースでさらなる機能追加や改善を予定しています。

### 予定されている改善点

- 高度なメンバー検索とフィルタリング機能
- Google OAuth認証
- 通知機能の拡張
- UI/UXのさらなる改善
- マッチングおよびメンバー発見機能の拡張
<br />
<br />

**(EN)**

The One is currently available as an initial release.

The current release includes the core user flow from profile creation and member discovery to Likes, Matches, and real-time messaging.

The project is still under active development, with additional features and improvements planned for future releases.

### Planned Improvements

- Advanced member search and filtering
- Google OAuth authentication
- Additional notification features
- Further UI/UX improvements
- Additional matching and discovery features
<br />
<br />

## 📘 Development Notes

**(JP)**

### リアルタイム通信をコアなユーザー体験として設計

The Oneでは、以前のポートフォリオプロジェクトであるAloha Estateでは採用しなかった、リアルタイム通信を実装しました。

Datingアプリでは、ユーザー同士の関係やコミュニケーションに関する変化がリアルタイムに反映されることが、ユーザー体験を大きく左右すると考えたためです。

リアルタイム通信は、単なるメッセージングだけに必要なものではありません。
<br />
例えば、

* Likeを受け取った
* お互いにLikeしてMatchが成立した
* 新しいメッセージを受け取った
* 相手がメッセージを入力している
* LikeやMatchなどの状態が変化した

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
<br />

**(EN)**

## 📘 Development Notes

### Real-time Communication as a Core User Experience

One of the main goals of The One was to build a more real-time user experience than my previous portfolio project, Aloha Estate.

In Aloha Estate, I intentionally kept the application architecture simpler and did not implement real-time communication. For The One, however, I felt that real-time behavior was particularly important because a dating application's user experience depends heavily on how quickly users can respond to changes in their relationships and conversations.

Real-time communication is not limited to messaging. Users need immediate feedback when:

* Someone sends them a Like
* A mutual Like creates a Match
* A new message is received
* The other person is typing
* Other relevant connection states change

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
