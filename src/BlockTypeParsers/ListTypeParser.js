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

export function parseMarkdownToList(outerList) {
  const itemData = [];

  outerList.children.forEach((items) => { // each row of item
    items.children.forEach((listItem) => {
      let text = '';
      listItem.children.forEach((item) => {
        if (item.type === 'text') {
          text += item.value;
        } else if (item.type === 'emphasis') {
          text += `<i>${item.children[0].value}<i>`;
        } else if (item.type === 'strong') {
          text += `<b>${item.children[0].value}<b>`;
        } else if (item.type === 'strongEmphasis') {
          text += `<b><i>${item.children[0].value}<i><b>`;
        } else if (item.type === 'link') {
          text += `<a href="${item.url}">${item.children[0].value}</a>`;
        } else if (item.type === 'inlineCode') {
          text += `<code class="inline-code">${item.value}</code>`;
        }
      });
      itemData.push(text);
    });
  });

  const listData = {
    data: {
      items: itemData,
      style: outerList.ordered ? 'ordered' : 'unordered',
    },
    type: 'list',
  };

  return listData;
}
