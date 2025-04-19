import { node } from "@elysiajs/node";
import { Elysia, type ElysiaAdapter } from "elysia";
import { BunAdapter } from "elysia/adapter/bun";

// ランタイム判定関数
function detectRuntime(): "Bun" | "Node.js" {
	return typeof globalThis.Bun !== "undefined" ? "Bun" : "Node.js";
}

const adapter: ElysiaAdapter = detectRuntime() === "Bun" ? BunAdapter : node();

// モックユーザーデータ
const users = [
	{ id: "1", name: "佐藤太郎", email: "taro.sato@example.com", role: "admin" },
	{
		id: "2",
		name: "鈴木花子",
		email: "hanako.suzuki@example.com",
		role: "user",
	},
	{
		id: "3",
		name: "田中一郎",
		email: "ichiro.tanaka@example.com",
		role: "user",
	},
];

const app = new Elysia({
	adapter,
})
	// ヘルスチェックエンドポイント
	.get("/health", () => ({
		status: "ok",
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV,
		runtime: detectRuntime(),
	}))

	// ユーザー情報を返すエンドポイント
	.get("/v1/user/:id", ({ params: { id } }) => {
		const user = users.find((user) => user.id === id);

		if (!user) {
			return {
				status: 404,
				body: { error: "ユーザーが見つかりません" },
			};
		}

		return {
			status: 200,
			body: user,
		};
	})

	// ランタイム情報を返すエンドポイント
	.get("/runtime", () => ({
		runtime: detectRuntime(),
		version: process.version,
		platform: process.platform,
		arch: process.arch,
	}))

	// ルートパス
	.get("/", () => "ElysiaJS アプリケーションへようこそ！")
	.listen(4001);

// 起動ログにランタイム情報を表示
console.log(
	`🦊 サーバーが起動しました on http://${app.server?.hostname}:${app.server?.port} (${detectRuntime()})`,
);

// プロセス終了時の処理
const shutdown = () => {
	console.log("サーバーをシャットダウンしています...");
	app.stop();
	process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
