export function parseCodeToMarkdown(blocks) {
  return `\`\`\`${blocks.language}\n${blocks.code}\n\`\`\`\n`;
}

export function parseMarkdownToCode(blocks) {
  const codeData = {
    data: {
      code: blocks.value,
      language: blocks.lang || '',
    },
    type: 'code',
  };

  return codeData;
}
