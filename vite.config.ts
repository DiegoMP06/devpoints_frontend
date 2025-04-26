import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "url";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            app: fileURLToPath(new URL("./src/modules/app", import.meta.url)),
            auth: fileURLToPath(new URL("./src/modules/auth", import.meta.url)),
            dashboard: fileURLToPath(new URL("./src/modules/dashboard", import.meta.url)),
        },
    },
});
