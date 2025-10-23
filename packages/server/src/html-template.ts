import { readFileSync } from "node:fs";

const htmlTemplate = readFileSync("dist/client/index.html").toString("utf-8");
const [htmlTemplateStart, htmlTemplateEnd] = htmlTemplate.split(
	"<ssr-content-placeholder />",
);

export { htmlTemplateStart, htmlTemplateEnd };
