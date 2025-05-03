// Example usage:
// const csvData = `name,age,city
// John Doe,30,New York
// Jane Smith,25,Los Angeles
// Sam Johnson,22,Chicago`;

// const result = parseCSV(csvData);
// console.log(result);
export function parseCSVToArray(csv: string): object[] {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
  
    return lines.slice(1).map((line) => {
      const values = line.split(',');
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index].trim();
      });
      return obj;
    });
  }
  
  // Example usage:
  // const exampleObject = {
  // Your object with more than 100 fields
  // };
  
  // const chunks = chunkObject(exampleObject);
  // console.log(chunks);
  export function chunkObject(
    obj: Record<string, any>,
    chunkSize: number = 100
  ): Record<string, any>[] {
    const keys = Object.keys(obj);
    const chunks: Record<string, any>[] = [];
  
    for (let i = 0; i < keys.length; i += chunkSize) {
      const chunk: Record<string, any> = {};
      keys.slice(i, i + chunkSize).forEach((key) => {
        chunk[key] = obj[key];
      });
      chunks.push(chunk);
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