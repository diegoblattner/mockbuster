import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig((env) => {
	return {
		plugins: [react()],
		resolve: {
			preserveSymlinks: true, // flag for npm workspaces
		},
		build: {
			rollupOptions: {
				input: {
					AppClient: "./index.html",
					AppSSR: "./src/App.tsx",
				},
				...(env.isSsrBuild
					? {
							output: {
								//for SSR, don't add a hash to the filename so it is easier to identify it from the server
								entryFileNames: `assets/[name].js`,
								chunkFileNames: `assets/[name].js`,
								assetFileNames: `assets/[name].[ext]`,
							},
						}
					: {}),
			},
		},
	};
});
