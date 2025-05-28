export function parseListToMarkdown(blocks) {
  let items = [];
  switch (blocks.style) {
    case 'unordered':
    default:
      items = blocks.items.map((item) => `- ${item}`);
      return `\n${items.join('\n')}\n`;
    case 'ordered':
      items = blocks.items.map((item, index) => `${index + 1}. ${item}`);
      return `\n${items.join('\n')}\n`;
  }
}

export function parseMarkdownToList(blocks) {
  let listData = {};
  const itemData = [];

  blocks.children.forEach((items) => {
    items.children.forEach((listItem) => {
      listItem.children.forEach((item) => {
        let text = '';
        item.children.forEach((row) => {
          if (row.type === 'text') {
            text += row.value;
          } else if (row.type === 'emphasis') {
            text += `<i>${row.children[0].value}<i>`;
          } else if (row.type === 'strong') {
            text += `<b>${row.children[0].value}<b>`;
          } else if (row.type === 'strongEmphasis') {
            text += `<b><i>${row.children[0].value}<i><b>`;
          } else if (row.type === 'link') {
            text += `<a href="${row.url}">${row.children[0].value}</a>`;
          } else if (row.type === 'inlineCode') {
            text += `<code class="inline-code">${row.value}</code>`;
          }
        });
        itemData.push(text);
      });
    });
  });

  listData = {
    data: {
      items: itemData,
      style: blocks.ordered ? 'ordered' : 'unordered',
    },
    type: 'list',
  };

  return listData;
}
