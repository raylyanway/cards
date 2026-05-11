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
  const parts: { highlight: boolean; id: number; text: string }[] = [];
  let id = 0;
  let lastIndex = 0;

  const regex = /~(.*?)~/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Text before ~
    if (match.index > lastIndex) {
      parts.push({
        highlight: false,
        id: ++id,
        text: text.slice(lastIndex, match.index)
      });
    }

    // Highlighted part
    parts.push({
      highlight: true,
      id: ++id,
      text: match[1]
    });

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push({
      highlight: false,
      id: ++id,
      text: text.slice(lastIndex)
    });
  }

  return parts;
}
