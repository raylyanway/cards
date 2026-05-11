import {
  chunkObject,
  parseCSVToArray,
  splitByParentheses
} from '@/utils/parser';

describe('parser utilities', () => {
  test('parseCSVToArray returns objects for CSV input', () => {
    const csv = 'name,age,city\nAlice,30,Seattle\nBob,25,Portland';
    const result = parseCSVToArray(csv);

    expect(result).toEqual([
      { name: 'Alice', age: '30', city: 'Seattle' },
      { name: 'Bob', age: '25', city: 'Portland' }
    ]);
  });

  test('chunkObject splits a large object into smaller chunks', () => {
    const source = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const result = chunkObject(source, 2);

    expect(result).toEqual([{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }]);
  });

  test('splitByParentheses returns highlighted and plain segments', () => {
    const text = 'Learn ~React Native~ with ~Expo~';
    const result = splitByParentheses(text);

    expect(result).toEqual([
      { highlight: false, id: 1, text: 'Learn ' },
      { highlight: true, id: 2, text: 'React Native' },
      { highlight: false, id: 3, text: ' with ' },
      { highlight: true, id: 4, text: 'Expo' }
    ]);

    const text1 = 'Learn ~React Native~ with ~Expo~ today!';
    const result1 = splitByParentheses(text1);

    expect(result1).toEqual([
      { highlight: false, id: 1, text: 'Learn ' },
      { highlight: true, id: 2, text: 'React Native' },
      { highlight: false, id: 3, text: ' with ' },
      { highlight: true, id: 4, text: 'Expo' },
      { highlight: false, id: 5, text: ' today!' }
    ]);
  });
});
