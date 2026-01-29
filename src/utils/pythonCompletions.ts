import type { Monaco } from '@monaco-editor/react';

// Python keywords
const pythonKeywords = [
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
    'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
    'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
    'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try',
    'while', 'with', 'yield'
];

// Python built-in functions
const pythonBuiltins = [
    { name: 'print', detail: 'print(value, ...)', docs: 'Prints values to the console' },
    { name: 'input', detail: 'input(prompt)', docs: 'Read a string from standard input' },
    { name: 'len', detail: 'len(obj)', docs: 'Return the length of an object' },
    { name: 'range', detail: 'range(stop) or range(start, stop, step)', docs: 'Return a sequence of numbers' },
    { name: 'int', detail: 'int(x)', docs: 'Convert x to an integer' },
    { name: 'float', detail: 'float(x)', docs: 'Convert x to a floating point number' },
    { name: 'str', detail: 'str(x)', docs: 'Convert x to a string' },
    { name: 'list', detail: 'list(iterable)', docs: 'Create a new list' },
    { name: 'dict', detail: 'dict(**kwargs)', docs: 'Create a new dictionary' },
    { name: 'set', detail: 'set(iterable)', docs: 'Create a new set' },
    { name: 'tuple', detail: 'tuple(iterable)', docs: 'Create a new tuple' },
    { name: 'bool', detail: 'bool(x)', docs: 'Convert x to a boolean' },
    { name: 'type', detail: 'type(object)', docs: 'Return the type of an object' },
    { name: 'abs', detail: 'abs(x)', docs: 'Return the absolute value of x' },
    { name: 'max', detail: 'max(iterable)', docs: 'Return the largest item' },
    { name: 'min', detail: 'min(iterable)', docs: 'Return the smallest item' },
    { name: 'sum', detail: 'sum(iterable)', docs: 'Sum of all items in iterable' },
    { name: 'sorted', detail: 'sorted(iterable)', docs: 'Return a new sorted list' },
    { name: 'reversed', detail: 'reversed(seq)', docs: 'Return a reverse iterator' },
    { name: 'enumerate', detail: 'enumerate(iterable)', docs: 'Return an enumerate object' },
    { name: 'zip', detail: 'zip(iter1, iter2, ...)', docs: 'Zip iterables together' },
    { name: 'map', detail: 'map(func, iterable)', docs: 'Apply function to every item' },
    { name: 'filter', detail: 'filter(func, iterable)', docs: 'Filter items by function' },
    { name: 'open', detail: 'open(file, mode)', docs: 'Open a file' },
    { name: 'round', detail: 'round(number, ndigits)', docs: 'Round a number' },
    { name: 'pow', detail: 'pow(base, exp)', docs: 'Return base to the power exp' },
    { name: 'isinstance', detail: 'isinstance(obj, classinfo)', docs: 'Check if object is instance of class' },
    { name: 'hasattr', detail: 'hasattr(obj, name)', docs: 'Check if object has attribute' },
    { name: 'getattr', detail: 'getattr(obj, name)', docs: 'Get attribute from object' },
    { name: 'setattr', detail: 'setattr(obj, name, value)', docs: 'Set attribute on object' },
    { name: 'ord', detail: 'ord(c)', docs: 'Return Unicode code point of character' },
    { name: 'chr', detail: 'chr(i)', docs: 'Return character from Unicode code point' },
    { name: 'hex', detail: 'hex(x)', docs: 'Convert integer to hex string' },
    { name: 'bin', detail: 'bin(x)', docs: 'Convert integer to binary string' },
    { name: 'all', detail: 'all(iterable)', docs: 'Return True if all elements are true' },
    { name: 'any', detail: 'any(iterable)', docs: 'Return True if any element is true' },
    { name: 'format', detail: 'format(value, format_spec)', docs: 'Format a value' },
    { name: 'repr', detail: 'repr(obj)', docs: 'Return string representation' },
    { name: 'id', detail: 'id(obj)', docs: 'Return identity of object' },
    { name: 'dir', detail: 'dir(obj)', docs: 'List of valid attributes for object' },
    { name: 'iter', detail: 'iter(obj)', docs: 'Return an iterator object' },
    { name: 'next', detail: 'next(iterator)', docs: 'Get next item from iterator' },
    { name: 'callable', detail: 'callable(obj)', docs: 'Check if object is callable' },
];

// Common string methods
const stringMethods = [
    { name: 'upper', detail: 'str.upper()', docs: 'Return uppercase copy of string' },
    { name: 'lower', detail: 'str.lower()', docs: 'Return lowercase copy of string' },
    { name: 'strip', detail: 'str.strip()', docs: 'Remove leading/trailing whitespace' },
    { name: 'split', detail: 'str.split(sep)', docs: 'Split string by separator' },
    { name: 'join', detail: 'str.join(iterable)', docs: 'Join strings with separator' },
    { name: 'replace', detail: 'str.replace(old, new)', docs: 'Replace occurrences of substring' },
    { name: 'find', detail: 'str.find(sub)', docs: 'Return index of substring' },
    { name: 'count', detail: 'str.count(sub)', docs: 'Count occurrences of substring' },
    { name: 'startswith', detail: 'str.startswith(prefix)', docs: 'Check if string starts with prefix' },
    { name: 'endswith', detail: 'str.endswith(suffix)', docs: 'Check if string ends with suffix' },
    { name: 'isdigit', detail: 'str.isdigit()', docs: 'Check if all characters are digits' },
    { name: 'isalpha', detail: 'str.isalpha()', docs: 'Check if all characters are alphabetic' },
    { name: 'capitalize', detail: 'str.capitalize()', docs: 'Return capitalized copy' },
    { name: 'title', detail: 'str.title()', docs: 'Return titlecased copy' },
];

// Common list methods
const listMethods = [
    { name: 'append', detail: 'list.append(x)', docs: 'Add item to end of list' },
    { name: 'extend', detail: 'list.extend(iterable)', docs: 'Extend list with items from iterable' },
    { name: 'insert', detail: 'list.insert(i, x)', docs: 'Insert item at index' },
    { name: 'remove', detail: 'list.remove(x)', docs: 'Remove first occurrence of value' },
    { name: 'pop', detail: 'list.pop(i)', docs: 'Remove and return item at index' },
    { name: 'clear', detail: 'list.clear()', docs: 'Remove all items from list' },
    { name: 'index', detail: 'list.index(x)', docs: 'Return index of first occurrence' },
    { name: 'sort', detail: 'list.sort()', docs: 'Sort list in place' },
    { name: 'reverse', detail: 'list.reverse()', docs: 'Reverse list in place' },
    { name: 'copy', detail: 'list.copy()', docs: 'Return shallow copy of list' },
];

// Common dict methods
const dictMethods = [
    { name: 'keys', detail: 'dict.keys()', docs: 'Return view of dictionary keys' },
    { name: 'values', detail: 'dict.values()', docs: 'Return view of dictionary values' },
    { name: 'items', detail: 'dict.items()', docs: 'Return view of dictionary items' },
    { name: 'get', detail: 'dict.get(key, default)', docs: 'Get value for key, or default' },
    { name: 'pop', detail: 'dict.pop(key)', docs: 'Remove key and return value' },
    { name: 'update', detail: 'dict.update(other)', docs: 'Update dictionary with key/value pairs' },
    { name: 'clear', detail: 'dict.clear()', docs: 'Remove all items from dictionary' },
];

// Code snippets
const pythonSnippets = [
    { label: 'defn', insertText: 'def ${1:function_name}(${2:params}):\n    ${3:pass}', docs: 'Define a function' },
    { label: 'classc', insertText: 'class ${1:ClassName}:\n    def __init__(self${2:}):\n        ${3:pass}', docs: 'Define a class' },
    { label: 'ifc', insertText: 'if ${1:condition}:\n    ${2:pass}', docs: 'If statement' },
    { label: 'ifelse', insertText: 'if ${1:condition}:\n    ${2:pass}\nelse:\n    ${3:pass}', docs: 'If-else statement' },
    { label: 'forl', insertText: 'for ${1:item} in ${2:iterable}:\n    ${3:pass}', docs: 'For loop' },
    { label: 'forr', insertText: 'for ${1:i} in range(${2:n}):\n    ${3:pass}', docs: 'For loop with range' },
    { label: 'whilel', insertText: 'while ${1:condition}:\n    ${2:pass}', docs: 'While loop' },
    { label: 'tryex', insertText: 'try:\n    ${1:pass}\nexcept ${2:Exception} as ${3:e}:\n    ${4:pass}', docs: 'Try-except block' },
    { label: 'withc', insertText: 'with ${1:expression} as ${2:var}:\n    ${3:pass}', docs: 'With statement' },
    { label: 'mainb', insertText: 'if __name__ == "__main__":\n    ${1:main()}', docs: 'Main block' },
    { label: 'printf', insertText: 'print(f"${1:text}")', docs: 'Print with f-string' },
    { label: 'listc', insertText: '[${1:expr} for ${2:item} in ${3:iterable}]', docs: 'List comprehension' },
];

export function handleEditorWillMount(monaco: Monaco) {
    // Register Python completion provider
    monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: (model: Parameters<Parameters<typeof monaco.languages.registerCompletionItemProvider>[1]['provideCompletionItems']>[0], position: Parameters<Parameters<typeof monaco.languages.registerCompletionItemProvider>[1]['provideCompletionItems']>[1]) => {
            const word = model.getWordUntilPosition(position);
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
            };

            const suggestions: Array<{
                label: string;
                kind: number;
                insertText: string;
                insertTextRules?: number;
                range: typeof range;
                detail?: string;
                documentation?: string;
            }> = [];

            // Add keywords
            pythonKeywords.forEach(keyword => {
                suggestions.push({
                    label: keyword,
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: keyword,
                    range: range,
                    detail: 'Python keyword',
                });
            });

            // Add built-in functions
            pythonBuiltins.forEach(func => {
                suggestions.push({
                    label: func.name,
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: func.name + '($0)',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range: range,
                    detail: func.detail,
                    documentation: func.docs,
                });
            });

            // Add string methods
            stringMethods.forEach(method => {
                suggestions.push({
                    label: method.name,
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: method.name + '($0)',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range: range,
                    detail: method.detail,
                    documentation: method.docs,
                });
            });

            // Add list methods
            listMethods.forEach(method => {
                suggestions.push({
                    label: method.name,
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: method.name + '($0)',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range: range,
                    detail: method.detail,
                    documentation: method.docs,
                });
            });

            // Add dict methods
            dictMethods.forEach(method => {
                suggestions.push({
                    label: method.name,
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: method.name + '($0)',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range: range,
                    detail: method.detail,
                    documentation: method.docs,
                });
            });

            // Add snippets
            pythonSnippets.forEach(snippet => {
                suggestions.push({
                    label: snippet.label,
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: snippet.insertText,
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range: range,
                    detail: '📝 snippet',
                    documentation: snippet.docs,
                });
            });

            return { suggestions };
        },
        triggerCharacters: ['.', ' '],
    });
}
