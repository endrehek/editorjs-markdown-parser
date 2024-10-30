export function parseLinkToolToMarkdown(blocks) {
  return `[${blocks.meta.title}](${blocks.link})\n`;
}

export function parseMarkdownToLink(blocks) {
  const paragraphData = {
    data: {
      text: `<a href="${blocks.url}">${blocks.children[0].value}</a>`,
    },
    type: 'paragraph',
  };
  return paragraphData;
}
