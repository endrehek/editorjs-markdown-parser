export function parseTableToMarkdown(blocks) {
  const { content } = blocks;
  let markdownTable = '';

  const headerRow = content[0];
  const headerLine = `| ${headerRow.join(' | ')} |`;
  const separatorLine = `| ${headerRow.map(() => '---').join(' | ')} |`;
  markdownTable += `${headerLine}\n${separatorLine}\n`;
  content.shift();

  content.forEach((row) => {
    const rowLine = `| ${row.join(' | ')} |`;
    markdownTable += `${rowLine}\n`;
  });

  return markdownTable;
}

export function parseMarkdownToTable(blocks) {
  const tableData = {
    data: {
      withHeadings: true,
      stretched: false,
      content: [],
    },
    type: 'table',
  };
  blocks.children.forEach((row) => {
    if (row.type === 'tableRow') {
      const rowCells = [];

      row.children.forEach((cell) => {
        if (cell.type === 'tableCell' && cell.children) {
          const content = cell.children.find(
            (child) => child.type === 'text',
          ).value;
          rowCells.push(content);
        }
      });

      tableData.data.content.push(rowCells);
    }
  });

  return tableData;
}
