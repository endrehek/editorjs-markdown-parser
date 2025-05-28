export function parseHeaderToMarkdown(blocks) {
  switch (blocks.level) {
    case 1:
      return `# ${blocks.text}\n`;
    case 2:
      return `## ${blocks.text}\n`;
    case 3:
      return `### ${blocks.text}\n`;
    case 4:
      return `#### ${blocks.text}\n`;
    case 5:
      return `##### ${blocks.text}\n`;
    case 6:
    default:
      return `###### ${blocks.text}\n`;
  }
}

export function parseMarkdownToHeader(blocks) {
  let headerData = {};
  let headerText = '';

  blocks.children.forEach((item) => {
    if (item.type === 'text') {
      headerText += item.value;
    } else if (item.type === 'emphasis') {
      headerText += `<i>${item.children[0].value}<i>`;
    } else if (item.type === 'strong') {
      headerText += `<b>${item.children[0].value}<b>`;
    } else if (item.type === 'strongEmphasis') {
      headerText += `<b><i>${item.children[0].value}<i><b>`;
    } else if (item.type === 'link') {
      headerText += `<a href="${item.url}">${item.children[0].value}</a>`;
    } else if (item.type === 'inlineCode') {
      headerText += `<code class="inline-code">${item.value}</code>`;
    }
  });

  headerData = {
    data: {
      level: blocks.depth,
      text: headerText,
    },
    type: 'header',
  };

  return headerData;
}
