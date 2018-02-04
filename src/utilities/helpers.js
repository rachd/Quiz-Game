export function parse(str) {
	const parser = new DOMParser();
	return parser.parseFromString(str, "text/html").body.textContent;
}