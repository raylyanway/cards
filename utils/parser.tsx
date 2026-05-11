export function parseCSVToArray(csv: string): Record<string, string>[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map((h) => h.trim());

  return lines.slice(1).reduce<Record<string, string>[]>((acc, line) => {
    if (!line.trim()) return acc; // skip empty lines

    const values = line.split(',').map((v) => v.trim());
    const obj = headers.reduce<Record<string, string>>((acc, header, index) => {
      acc[header] = values[index] ?? '';
      return acc;
    }, {});

    acc.push(obj);
    return acc;
  }, []);
}

export function chunkObject<T extends Record<string, any>>(
  obj: T,
  chunkSize: number = 100
): Record<string, any>[] {
  const keys = Object.keys(obj);
  const chunks: Record<string, any>[] = [];

  for (let i = 0; i < keys.length; i += chunkSize) {
    const chunkKeys = keys.slice(i, i + chunkSize);
    chunks.push(Object.fromEntries(chunkKeys.map((key) => [key, obj[key]])));
  }

  return chunks;
}

export function splitByParentheses(
  text: string
): { highlight: boolean; id: number; text: string }[] {
  const parts = [];
  let currentIndex = 0;
  let id = 0;

  const regex = /~(.*?)~/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, highlightedText] = match;
    const startIndexOfHighlightedText = match.index;

    // Part before the highlighted text
    parts.push({
      highlight: false,
      id: ++id,
      text: text.slice(currentIndex, startIndexOfHighlightedText)
    });

    // Highlighted text
    parts.push({ highlight: true, id: ++id, text: highlightedText });

    currentIndex = startIndexOfHighlightedText + highlightedText.length + 2;
  }

  // Add the remaining text, if any
  parts.push({ highlight: false, id: ++id, text: text.slice(currentIndex) });

  return parts;
}
