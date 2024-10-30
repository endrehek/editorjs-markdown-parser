import MarkdownParser, { parseToMarkdown } from './MarkdownParser';

import MarkdownImporter, { parseToBlocks } from './MarkdownImporter';

export const MDParser = MarkdownParser;
export const MDImporter = MarkdownImporter;
export const MDfromBlocks = parseToMarkdown;
export const MDtoBlocks = parseToBlocks;
