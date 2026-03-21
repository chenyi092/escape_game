[繁體中文](./README_zh.md) | [日本語](./README.md)
# 脱出ゲーム：遅刻まであと15分、授業に間に合え！
### [実行および攻略動画](https://www.youtube.com/watch?v=p_RvpuNT_Wg)
## 概要 | Project Overview
朝寝坊した主人公が、閉じ込められた部屋から15分以内に脱出し、授業に間に合わせることを目指すWebベースの脱出ゲームです 。<br>
部屋を探索し、道具を駆使して謎を解くインタラクティブな体験を提供します 。<br>
- **多種多様な結末**： プレイヤーの行動に応じて3パターンのエンディングを用意しています 。
- **セーブ機能搭載**： データベースを活用し、プレイヤー名を入力することで途中から再開が可能です 。
## 技術スタック | Tech Stack
本プロジェクトでは、フロントエンドからバックエンドまで一貫した設計を行いました 。<br>
- **Frontend**: JavaScript (インタラクション全般), HTML, CSS
- **Backend**: Ruby
- **Database**: JSON形式でのデータ受け渡し、データベースによる状態保存
- **Deployment**: 大学 CGI サーバー
## システムアーキテクチャ | System Architecture
#### 1. データベース・セッション管理
  データの整合性とユーザー体験（UX）を重視した設計を行っています 。
  - プレイヤーごとにゲーム進行状況をデータベースに保存 。
  - セッションを利用し、再開時にプレイヤー名を手入力する手間を省く最適化を実装しました 。
#### 2. インタラクション設計
  - **道具システム**： 道具の選択、ズームイン表示、特定のオブジェクト（電話など）への使用ロジックを JavaScript で実装 。
  - **フラグ管理**： 謎を解いた後のオブジェクトの状態変化（例：電話のテキスト変化）を動的に制御しています 。
## ファイル構成 | File Structure
![file connection](/docs/01-file-connection.png)
## 実装のこだわり | Key Features & Challenges
- **UXの向上**： セーブデータがない場合の警告表示や、UIボタンのアニメーションなど、ユーザーが直感的に遊べるデザインを工夫しました 。
- **バックエンド初挑戦**： 初めてバックエンド（Ruby）を学び、フロントエンドとのデータ連携（JSON）を実装したことで、フルスタック開発の基礎を習得しました 。
## デモ画面 | Demo
<p align="center">
  <img src="/docs/02-homepage.png" width="35%" />
  <img src="/docs/03-narration.png" width="35%" />
</p>
<p align="center">
  <img src="/docs/04-game-scene.png" width="35%" />
  <img src="/docs/05-password-input.png" width="35%" />
</p>
<p align="center">
  <img src="/docs/06-item-box.png" width="35%" />
  <img src="/docs/07-menu.png" width="35%" />
</p>

### 補足事項
※ 現在、大学サーバー（筑波大学 CGI）の制限により、学外からの直接アクセスが制限されている場合があります。
