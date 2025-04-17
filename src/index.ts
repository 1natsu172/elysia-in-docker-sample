import { Elysia } from "elysia";

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

const app = new Elysia()
	.listen(4001)
	// ヘルスチェックエンドポイント
	.get("/health", () => ({
		status: "ok",
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV,
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

	// ルートパス
	.get("/", () => "ElysiaJS アプリケーションへようこそ！");

console.log(
	`🦊 サーバーが起動しました on http://${app.server?.hostname}:${app.server?.port}`,
);

// プロセス終了時の処理
const shutdown = () => {
	console.log("サーバーをシャットダウンしています...");
	app.stop();
	process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
