import type { Course, Exercise } from '../types';

// ============================================
// COURSES DATA
// ============================================
export const courses: Course[] = [
    // Development Track
    {
        id: 'python-fundamentals',
        title: 'Python Fundamentals',
        description: 'Learn the basics of Python programming including variables, data types, and control structures.',
        track: 'development',
        difficulty: 'beginner',
        thumbnail: '🐍',
        duration: '8 hours',
        exerciseCount: 24,
        completedCount: 0,
        progress: 0,
        isLocked: false,
    },
    {
        id: 'oop-python',
        title: 'Object-Oriented Programming',
        description: 'Master classes, inheritance, polymorphism, and other OOP concepts in Python.',
        track: 'development',
        difficulty: 'intermediate',
        thumbnail: '🏗️',
        duration: '12 hours',
        exerciseCount: 32,
        completedCount: 0,
        progress: 0,
        isLocked: false,
    },
    {
        id: 'web-apis-fastapi',
        title: 'Web APIs with FastAPI',
        description: 'Build modern APIs with Python using the FastAPI framework.',
        track: 'development',
        difficulty: 'intermediate',
        thumbnail: '⚡',
        duration: '10 hours',
        exerciseCount: 18,
        completedCount: 0,
        progress: 0,
        isLocked: true,
    },

    // Data Science Track
    {
        id: 'data-analysis-pandas',
        title: 'Data Analysis with Pandas',
        description: 'Learn to analyze and manipulate data using the powerful Pandas library.',
        track: 'datascience',
        difficulty: 'intermediate',
        thumbnail: '🐼',
        duration: '10 hours',
        exerciseCount: 28,
        completedCount: 0,
        progress: 0,
        isLocked: false,
    },
    {
        id: 'data-visualization',
        title: 'Data Visualization',
        description: 'Create stunning visualizations with Matplotlib, Seaborn, and Plotly.',
        track: 'datascience',
        difficulty: 'intermediate',
        thumbnail: '📊',
        duration: '8 hours',
        exerciseCount: 20,
        completedCount: 0,
        progress: 0,
        isLocked: false,
    },
    {
        id: 'ml-fundamentals',
        title: 'Machine Learning Basics',
        description: 'Introduction to machine learning with scikit-learn.',
        track: 'datascience',
        difficulty: 'advanced',
        thumbnail: '🤖',
        duration: '15 hours',
        exerciseCount: 25,
        completedCount: 0,
        progress: 0,
        isLocked: true,
    },

    // DevOps Track
    {
        id: 'python-automation',
        title: 'Python Automation',
        description: 'Automate repetitive tasks with Python scripts and tools.',
        track: 'devops',
        difficulty: 'beginner',
        thumbnail: '🔧',
        duration: '6 hours',
        exerciseCount: 15,
        completedCount: 0,
        progress: 0,
        isLocked: false,
    },
    {
        id: 'testing-pytest',
        title: 'Testing with Pytest',
        description: 'Write effective tests for your Python applications.',
        track: 'devops',
        difficulty: 'intermediate',
        thumbnail: '✅',
        duration: '8 hours',
        exerciseCount: 22,
        completedCount: 0,
        progress: 0,
        isLocked: false,
    },
];

// ============================================
// EXERCISES DATA - Python Fundamentals Course
// ============================================
export const exercises: Exercise[] = [
    // ---------- Python Fundamentals ----------
    {
        id: 'hello-world',
        courseId: 'python-fundamentals',
        title: 'Hello, World!',
        description: 'Your first Python program - printing to the console.',
        instructions: `# Hello, World!

Welcome to Python! Let's write your very first program.

## Your Task
Use the \`print()\` function to display "Hello, World!" to the console.

## Example
\`\`\`python
print("Your message here")
\`\`\`

The \`print()\` function outputs text to the console. Text must be wrapped in quotes.`,
        difficulty: 'beginner',
        points: 10,
        starterCode: `# Print "Hello, World!" to the console
`,
        solution: `# Print "Hello, World!" to the console
print("Hello, World!")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Hello, World!', description: 'Correct output', isHidden: false }
        ],
        hints: [
            'Use the print() function',
            'Put your text inside quotes: "Hello, World!"',
            'Don\'t forget the comma after Hello'
        ],
        tags: ['basics', 'print', 'strings'],
        order: 1,
        estimatedTime: '2 min',
        status: 'available',
    },
    {
        id: 'variables-intro',
        courseId: 'python-fundamentals',
        title: 'Variables and Assignment',
        description: 'Learn how to store data in variables.',
        instructions: `# Variables

Variables store data that you can use later in your program.

## Assignment Syntax
\`\`\`python
variable_name = value
\`\`\`

## Your Task
1. Create a variable called \`name\` and assign your name to it
2. Create a variable called \`age\` and assign your age (as a number)
3. Print both variables

Expected output format:
\`\`\`
Alice
25
\`\`\``,
        difficulty: 'beginner',
        points: 15,
        starterCode: `# Create your variables below
name = 
age = 

# Print the variables
print(name)
print(age)`,
        solution: `# Create your variables below
name = "Alice"
age = 25

# Print the variables
print(name)
print(age)`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Alice\n25', description: 'Variables printed correctly', isHidden: false }
        ],
        hints: [
            'Strings need quotes: name = "Alice"',
            'Numbers don\'t need quotes: age = 25',
            'Variable names are case-sensitive'
        ],
        tags: ['basics', 'variables', 'assignment'],
        order: 2,
        estimatedTime: '3 min',
        status: 'available',
    },
    {
        id: 'data-types',
        courseId: 'python-fundamentals',
        title: 'Basic Data Types',
        description: 'Understand strings, integers, floats, and booleans.',
        instructions: `# Data Types in Python

Python has several basic data types:

| Type | Example | Description |
|------|---------|-------------|
| str | "hello" | Text/strings |
| int | 42 | Whole numbers |
| float | 3.14 | Decimal numbers |
| bool | True/False | Boolean values |

## Your Task
Create variables of each type and print their types using \`type()\`:

Expected output:
\`\`\`
<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>
\`\`\``,
        difficulty: 'beginner',
        points: 15,
        starterCode: `# Create a variable of each type
text = "Hello"
number = 
decimal = 
is_valid = 

# Print the type of each variable
print(type(text))
print(type(number))
print(type(decimal))
print(type(is_valid))`,
        solution: `# Create a variable of each type
text = "Hello"
number = 42
decimal = 3.14
is_valid = True

# Print the type of each variable
print(type(text))
print(type(number))
print(type(decimal))
print(type(is_valid))`,
        testCases: [
            { id: '1', input: '', expectedOutput: "<class 'str'>\n<class 'int'>\n<class 'float'>\n<class 'bool'>", description: 'All types correct', isHidden: false }
        ],
        hints: [
            'int is a whole number like 42',
            'float is a decimal like 3.14',
            'bool is either True or False (capitalized!)'
        ],
        tags: ['basics', 'data-types', 'type'],
        order: 3,
        estimatedTime: '5 min',
        status: 'available',
    },
    {
        id: 'string-operations',
        courseId: 'python-fundamentals',
        title: 'String Operations',
        description: 'Learn to concatenate and manipulate strings.',
        instructions: `# String Operations

Strings can be combined and manipulated in many ways:

## Concatenation
\`\`\`python
first = "Hello"
last = "World"
combined = first + " " + last  # "Hello World"
\`\`\`

## f-strings (Formatted Strings)
\`\`\`python
name = "Alice"
greeting = f"Hello, {name}!"  # "Hello, Alice!"
\`\`\`

## Your Task
Create a greeting message that says: "Welcome, [name]! You have [points] points."

Use f-strings to insert the variables.`,
        difficulty: 'beginner',
        points: 20,
        starterCode: `name = "Player1"
points = 100

# Create the greeting using an f-string
greeting = 

print(greeting)`,
        solution: `name = "Player1"
points = 100

# Create the greeting using an f-string
greeting = f"Welcome, {name}! You have {points} points."

print(greeting)`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Welcome, Player1! You have 100 points.', description: 'Correct greeting message', isHidden: false }
        ],
        hints: [
            'Use f-string: f"text {variable} more text"',
            'Put variables inside curly braces {}',
            'Don\'t forget the f before the quote'
        ],
        tags: ['strings', 'f-strings', 'concatenation'],
        order: 4,
        estimatedTime: '5 min',
        status: 'available',
    },
    {
        id: 'list-comprehensions',
        courseId: 'python-fundamentals',
        title: 'List Comprehensions',
        description: 'Create lists using Python list comprehensions.',
        instructions: `# List Comprehensions

List comprehensions provide a concise way to create lists.

## Basic Syntax
\`\`\`python
[expression for item in iterable]
\`\`\`

## With Condition
\`\`\`python
[expression for item in iterable if condition]
\`\`\`

## Your Task
Create a list comprehension that:
1. Takes numbers 1-10
2. Filters only even numbers
3. Squares each even number

Expected output: \`[4, 16, 36, 64, 100]\``,
        difficulty: 'intermediate',
        points: 25,
        starterCode: `# Create a list of squared even numbers from 1 to 10
# Your code here:

squared_evens = []

print(squared_evens)`,
        solution: `# Create a list of squared even numbers from 1 to 10
squared_evens = [x ** 2 for x in range(1, 11) if x % 2 == 0]

print(squared_evens)`,
        testCases: [
            { id: '1', input: '', expectedOutput: '[4, 16, 36, 64, 100]', description: 'Correct list comprehension', isHidden: false }
        ],
        hints: [
            'Use range(1, 11) to get numbers 1-10',
            'x % 2 == 0 checks if a number is even',
            'x ** 2 squares a number'
        ],
        tags: ['lists', 'comprehensions', 'intermediate'],
        order: 5,
        estimatedTime: '10 min',
        status: 'available',
    },
    {
        id: 'conditionals',
        courseId: 'python-fundamentals',
        title: 'If/Else Statements',
        description: 'Control program flow with conditional statements.',
        instructions: `# Conditional Statements

Use if/elif/else to make decisions in your code.

## Syntax
\`\`\`python
if condition:
    # code if true
elif another_condition:
    # code if this is true
else:
    # code if all above are false
\`\`\`

## Your Task
Write a function that takes a score and returns a grade:
- 90-100: "A"
- 80-89: "B"
- 70-79: "C"
- 60-69: "D"
- Below 60: "F"`,
        difficulty: 'beginner',
        points: 20,
        starterCode: `def get_grade(score):
    # Your code here
    pass

# Test your function
print(get_grade(95))
print(get_grade(82))
print(get_grade(71))
print(get_grade(65))
print(get_grade(45))`,
        solution: `def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

# Test your function
print(get_grade(95))
print(get_grade(82))
print(get_grade(71))
print(get_grade(65))
print(get_grade(45))`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'A\nB\nC\nD\nF', description: 'All grades correct', isHidden: false }
        ],
        hints: [
            'Start with the highest score first',
            'Use >= for comparison',
            'Remember to return the grade string'
        ],
        tags: ['conditionals', 'if-else', 'functions'],
        order: 6,
        estimatedTime: '8 min',
        status: 'available',
    },
    {
        id: 'for-loops',
        courseId: 'python-fundamentals',
        title: 'For Loops',
        description: 'Iterate over sequences with for loops.',
        instructions: `# For Loops

For loops let you iterate over sequences (lists, strings, ranges).

## Basic Syntax
\`\`\`python
for item in sequence:
    # do something with item
\`\`\`

## Your Task
Write code that prints the multiplication table for 5 (from 1 to 10):
\`\`\`
5 x 1 = 5
5 x 2 = 10
...
5 x 10 = 50
\`\`\``,
        difficulty: 'beginner',
        points: 20,
        starterCode: `# Print the multiplication table for 5
number = 5

# Your code here
`,
        solution: `# Print the multiplication table for 5
number = 5

for i in range(1, 11):
    print(f"{number} x {i} = {number * i}")`,
        testCases: [
            { id: '1', input: '', expectedOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50', description: 'Multiplication table correct', isHidden: false }
        ],
        hints: [
            'Use range(1, 11) to get 1 through 10',
            'Use f-strings to format the output',
            'Multiply number * i for the result'
        ],
        tags: ['loops', 'for-loop', 'range'],
        order: 7,
        estimatedTime: '5 min',
        status: 'available',
    },
    {
        id: 'while-loops',
        courseId: 'python-fundamentals',
        title: 'While Loops',
        description: 'Repeat code until a condition is met.',
        instructions: `# While Loops

While loops continue as long as a condition is true.

## Syntax
\`\`\`python
while condition:
    # code to repeat
    # make sure to update the condition!
\`\`\`

## Your Task
Use a while loop to find the first number greater than 1 that divides evenly into 100.

Start checking from 2.

Expected output: \`2\``,
        difficulty: 'beginner',
        points: 20,
        starterCode: `# Find the first divisor of 100 (starting from 2)
number = 100
divisor = 2

# Your code here

print(divisor)`,
        solution: `# Find the first divisor of 100 (starting from 2)
number = 100
divisor = 2

while number % divisor != 0:
    divisor += 1

print(divisor)`,
        testCases: [
            { id: '1', input: '', expectedOutput: '2', description: 'Correct divisor found', isHidden: false }
        ],
        hints: [
            'Use % to check if a number divides evenly (remainder is 0)',
            'Increment divisor until you find one that works',
            'Be careful not to create an infinite loop!'
        ],
        tags: ['loops', 'while-loop', 'math'],
        order: 8,
        estimatedTime: '5 min',
        status: 'available',
    },
    {
        id: 'functions-basics',
        courseId: 'python-fundamentals',
        title: 'Functions',
        description: 'Create reusable code with functions.',
        instructions: `# Functions

Functions are reusable blocks of code.

## Syntax
\`\`\`python
def function_name(parameter1, parameter2):
    # function body
    return result
\`\`\`

## Your Task
Create a function called \`calculate_area\` that:
1. Takes \`width\` and \`height\` as parameters
2. Returns the area (width * height)

Then call it with (5, 3) and (10, 7).`,
        difficulty: 'beginner',
        points: 20,
        starterCode: `# Define the calculate_area function


# Test your function
print(calculate_area(5, 3))
print(calculate_area(10, 7))`,
        solution: `# Define the calculate_area function
def calculate_area(width, height):
    return width * height

# Test your function
print(calculate_area(5, 3))
print(calculate_area(10, 7))`,
        testCases: [
            { id: '1', input: '', expectedOutput: '15\n70', description: 'Both areas calculated correctly', isHidden: false }
        ],
        hints: [
            'Start with def function_name(params):',
            'Use return to send back the result',
            'The area is width * height'
        ],
        tags: ['functions', 'basics', 'return'],
        order: 9,
        estimatedTime: '5 min',
        status: 'available',
    },
    {
        id: 'dictionaries',
        courseId: 'python-fundamentals',
        title: 'Dictionaries',
        description: 'Store key-value pairs with dictionaries.',
        instructions: `# Dictionaries

Dictionaries store key-value pairs.

## Syntax
\`\`\`python
my_dict = {
    "key1": "value1",
    "key2": "value2"
}
\`\`\`

## Access Values
\`\`\`python
value = my_dict["key1"]
\`\`\`

## Your Task
Create a dictionary called \`student\` with:
- name: "John"
- age: 20
- grade: "A"

Then print each value.`,
        difficulty: 'beginner',
        points: 20,
        starterCode: `# Create the student dictionary


# Print each value
print(student["name"])
print(student["age"])
print(student["grade"])`,
        solution: `# Create the student dictionary
student = {
    "name": "John",
    "age": 20,
    "grade": "A"
}

# Print each value
print(student["name"])
print(student["age"])
print(student["grade"])`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'John\n20\nA', description: 'All values printed correctly', isHidden: false }
        ],
        hints: [
            'Use curly braces {} for dictionaries',
            'Keys and string values need quotes',
            'Separate key-value pairs with commas'
        ],
        tags: ['dictionaries', 'data-structures', 'basics'],
        order: 10,
        estimatedTime: '5 min',
        status: 'available',
    },
    {
        id: 'exception-handling',
        courseId: 'python-fundamentals',
        title: 'Exception Handling',
        description: 'Handle errors gracefully with try/except.',
        instructions: `# Exception Handling

Use try/except to handle errors gracefully.

## Syntax
\`\`\`python
try:
    # code that might fail
except ErrorType:
    # handle the error
\`\`\`

## Your Task
Write a function \`safe_divide\` that:
1. Divides two numbers
2. Returns "Error: Division by zero" if dividing by 0
3. Returns the result otherwise`,
        difficulty: 'intermediate',
        points: 25,
        starterCode: `def safe_divide(a, b):
    # Your code here
    pass

# Test your function
print(safe_divide(10, 2))
print(safe_divide(15, 3))
print(safe_divide(8, 0))`,
        solution: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Error: Division by zero"

# Test your function
print(safe_divide(10, 2))
print(safe_divide(15, 3))
print(safe_divide(8, 0))`,
        testCases: [
            { id: '1', input: '', expectedOutput: '5.0\n5.0\nError: Division by zero', description: 'Division and error handled correctly', isHidden: false }
        ],
        hints: [
            'Use try: before the division',
            'Use except ZeroDivisionError: to catch the error',
            'Return the error message string'
        ],
        tags: ['exceptions', 'try-except', 'error-handling'],
        order: 11,
        estimatedTime: '8 min',
        status: 'available',
    },
    {
        id: 'classes-intro',
        courseId: 'oop-python',
        title: 'Introduction to Classes',
        description: 'Create your first Python class.',
        instructions: `# Classes in Python

Classes are blueprints for creating objects.

## Basic Class
\`\`\`python
class ClassName:
    def __init__(self, param):
        self.attribute = param
    
    def method(self):
        return self.attribute
\`\`\`

## Your Task
Create a \`Dog\` class with:
1. An \`__init__\` method that takes \`name\` and \`breed\`
2. A \`bark\` method that returns "[name] says Woof!"

Create a dog named "Buddy" who is a "Golden Retriever".`,
        difficulty: 'intermediate',
        points: 30,
        starterCode: `class Dog:
    # Your code here
    pass

# Create a dog and test
buddy = Dog("Buddy", "Golden Retriever")
print(buddy.name)
print(buddy.breed)
print(buddy.bark())`,
        solution: `class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed
    
    def bark(self):
        return f"{self.name} says Woof!"

# Create a dog and test
buddy = Dog("Buddy", "Golden Retriever")
print(buddy.name)
print(buddy.breed)
print(buddy.bark())`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Buddy\nGolden Retriever\nBuddy says Woof!', description: 'Dog class works correctly', isHidden: false }
        ],
        hints: [
            '__init__ is the constructor method',
            'Use self.name = name to store attributes',
            'Methods need self as the first parameter'
        ],
        tags: ['classes', 'oop', 'objects'],
        order: 1,
        estimatedTime: '10 min',
        status: 'available',
    },
    {
        id: 'fizzbuzz',
        courseId: 'python-fundamentals',
        title: 'FizzBuzz Challenge',
        description: 'The classic programming interview question.',
        instructions: `# FizzBuzz

A classic programming challenge!

## Rules
For numbers 1 to 15:
- If divisible by 3: print "Fizz"
- If divisible by 5: print "Buzz"  
- If divisible by both: print "FizzBuzz"
- Otherwise: print the number

## Expected Output
\`\`\`
1
2
Fizz
4
Buzz
...
14
FizzBuzz
\`\`\``,
        difficulty: 'beginner',
        points: 25,
        starterCode: `# FizzBuzz for numbers 1-15
for i in range(1, 16):
    # Your code here
    pass`,
        solution: `# FizzBuzz for numbers 1-15
for i in range(1, 16):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
        testCases: [
            { id: '1', input: '', expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', description: 'FizzBuzz output correct', isHidden: false }
        ],
        hints: [
            'Check for divisibility by both 3 AND 5 first',
            'Use % to check for divisibility',
            'Order of if/elif matters!'
        ],
        tags: ['conditionals', 'loops', 'classic'],
        order: 12,
        estimatedTime: '10 min',
        status: 'available',
    },
    {
        id: 'palindrome',
        courseId: 'python-fundamentals',
        title: 'Palindrome Checker',
        description: 'Check if a word reads the same forwards and backwards.',
        instructions: `# Palindrome Checker

A palindrome is a word that reads the same forwards and backwards.

## Examples
- "radar" → palindrome ✓
- "hello" → not palindrome ✗
- "level" → palindrome ✓

## Your Task
Create a function \`is_palindrome\` that:
1. Takes a string
2. Returns True if it's a palindrome
3. Returns False otherwise

**Hint**: How do you reverse a string in Python?`,
        difficulty: 'intermediate',
        points: 25,
        starterCode: `def is_palindrome(word):
    # Your code here
    pass

# Test your function
print(is_palindrome("radar"))
print(is_palindrome("hello"))
print(is_palindrome("level"))
print(is_palindrome("python"))`,
        solution: `def is_palindrome(word):
    return word == word[::-1]

# Test your function
print(is_palindrome("radar"))
print(is_palindrome("hello"))
print(is_palindrome("level"))
print(is_palindrome("python"))`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'True\nFalse\nTrue\nFalse', description: 'Palindrome check correct', isHidden: false }
        ],
        hints: [
            'word[::-1] reverses a string',
            'Compare the word with its reverse',
            'Return True or False based on comparison'
        ],
        tags: ['strings', 'slicing', 'functions'],
        order: 13,
        estimatedTime: '8 min',
        status: 'available',
    },
    {
        id: 'fibonacci',
        courseId: 'python-fundamentals',
        title: 'Fibonacci Sequence',
        description: 'Generate the famous Fibonacci sequence.',
        instructions: `# Fibonacci Sequence

The Fibonacci sequence: each number is the sum of the two preceding ones.

\`\`\`
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
\`\`\`

## Your Task
Create a function \`fibonacci\` that returns a list of the first n Fibonacci numbers.

For \`fibonacci(10)\`, return:
\`\`\`
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\``,
        difficulty: 'intermediate',
        points: 30,
        starterCode: `def fibonacci(n):
    # Your code here
    pass

# Test your function
print(fibonacci(10))`,
        solution: `def fibonacci(n):
    if n <= 0:
        return []
    if n == 1:
        return [0]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

# Test your function
print(fibonacci(10))`,
        testCases: [
            { id: '1', input: '', expectedOutput: '[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]', description: 'First 10 Fibonacci numbers', isHidden: false }
        ],
        hints: [
            'Start with [0, 1]',
            'Each new number = previous two added',
            'Use a loop to generate more numbers'
        ],
        tags: ['algorithms', 'sequences', 'loops'],
        order: 14,
        estimatedTime: '12 min',
        status: 'available',
    },
    // Python Fundamentals - Additional
    {
        id: 'file-io',
        courseId: 'python-fundamentals',
        title: 'File Input/Output',
        description: 'Read from and write to files.',
        instructions: `# File I/O

Python makes working with files easy using the \`open()\` function.

## Reading a File
\`\`\`python
with open('file.txt', 'r') as f:
    content = f.read()
\`\`\`

## Writing to a File
\`\`\`python
with open('file.txt', 'w') as f:
    f.write('Hello!')
\`\`\`

## Your Task
Complete the function that counts words in a text.
Count how many words are in: "Hello world this is Python"`,
        difficulty: 'beginner',
        points: 20,
        starterCode: `def count_words(text):
    # Your code here
    pass

# Test
text = "Hello world this is Python"
print(count_words(text))`,
        solution: `def count_words(text):
    return len(text.split())

# Test
text = "Hello world this is Python"
print(count_words(text))`,
        testCases: [
            { id: '1', input: '', expectedOutput: '5', description: 'Word count correct', isHidden: false }
        ],
        hints: [
            'Use .split() to break text into words',
            'Use len() to count items in a list',
            'split() with no argument splits on whitespace'
        ],
        tags: ['files', 'strings', 'basics'],
        order: 15,
        estimatedTime: '8 min',
        status: 'available',
    },
    {
        id: 'lambda-functions',
        courseId: 'python-fundamentals',
        title: 'Lambda Functions',
        description: 'Create anonymous functions with lambda.',
        instructions: `# Lambda Functions

Lambda functions are small, anonymous functions.

## Syntax
\`\`\`python
lambda arguments: expression
\`\`\`

## Example
\`\`\`python
square = lambda x: x ** 2
print(square(5))  # 25
\`\`\`

## Your Task
Use lambda and \`sorted()\` to sort a list of tuples by the second element.

Input: [(1, 3), (2, 1), (3, 2)]
Output: [(2, 1), (3, 2), (1, 3)]`,
        difficulty: 'intermediate',
        points: 25,
        starterCode: `# Sort by the second element of each tuple
data = [(1, 3), (2, 1), (3, 2)]

# Use sorted() with a lambda key
sorted_data = sorted(data, key=)

print(sorted_data)`,
        solution: `# Sort by the second element of each tuple
data = [(1, 3), (2, 1), (3, 2)]

# Use sorted() with a lambda key
sorted_data = sorted(data, key=lambda x: x[1])

print(sorted_data)`,
        testCases: [
            { id: '1', input: '', expectedOutput: '[(2, 1), (3, 2), (1, 3)]', description: 'Sorted by second element', isHidden: false }
        ],
        hints: [
            'lambda x: x[1] gets the second element',
            'sorted() takes a key parameter',
            'x[1] accesses index 1 (second item)'
        ],
        tags: ['lambda', 'sorting', 'functions'],
        order: 16,
        estimatedTime: '10 min',
        status: 'available',
    },
    // OOP Python Course Exercises
    {
        id: 'class-inheritance',
        courseId: 'oop-python',
        title: 'Class Inheritance',
        description: 'Create child classes that inherit from parents.',
        instructions: `# Inheritance

Child classes inherit attributes and methods from parent classes.

## Syntax
\`\`\`python
class Child(Parent):
    def __init__(self):
        super().__init__()
\`\`\`

## Your Task
Create an \`Animal\` parent class with a \`speak()\` method.
Then create \`Dog\` and \`Cat\` child classes that override \`speak()\`.`,
        difficulty: 'intermediate',
        points: 30,
        starterCode: `class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

class Dog(Animal):
    # Override speak
    pass

class Cat(Animal):
    # Override speak
    pass

# Test
dog = Dog("Buddy")
cat = Cat("Whiskers")
print(dog.speak())
print(cat.speak())`,
        solution: `class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Test
dog = Dog("Buddy")
cat = Cat("Whiskers")
print(dog.speak())
print(cat.speak())`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Buddy says Woof!\nWhiskers says Meow!', description: 'Inheritance works correctly', isHidden: false }
        ],
        hints: [
            'Override speak() in child classes',
            'Use self.name from the parent',
            'Each animal should return its own sound'
        ],
        tags: ['oop', 'inheritance', 'classes'],
        order: 2,
        estimatedTime: '12 min',
        status: 'available',
    },
    {
        id: 'magic-methods',
        courseId: 'oop-python',
        title: 'Magic Methods',
        description: 'Customize object behavior with dunder methods.',
        instructions: `# Magic Methods

Magic methods (dunder methods) customize object behavior.

## Common Magic Methods
- \`__str__\`: String representation
- \`__len__\`: Length of object
- \`__add__\`: Addition operator

## Your Task
Create a \`Vector\` class that supports:
- String representation: "Vector(x, y)"
- Addition: v1 + v2 returns a new Vector`,
        difficulty: 'intermediate',
        points: 35,
        starterCode: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        # Return "Vector(x, y)"
        pass
    
    def __add__(self, other):
        # Return new Vector with added components
        pass

# Test
v1 = Vector(2, 3)
v2 = Vector(4, 1)
print(v1)
print(v1 + v2)`,
        solution: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

# Test
v1 = Vector(2, 3)
v2 = Vector(4, 1)
print(v1)
print(v1 + v2)`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Vector(2, 3)\nVector(6, 4)', description: 'Magic methods work correctly', isHidden: false }
        ],
        hints: [
            '__str__ should return formatted string',
            '__add__ receives other as parameter',
            'Create and return a new Vector in __add__'
        ],
        tags: ['oop', 'magic-methods', 'operators'],
        order: 3,
        estimatedTime: '15 min',
        status: 'available',
    },
    {
        id: 'property-decorators',
        courseId: 'oop-python',
        title: 'Property Decorators',
        description: 'Use @property for getters and setters.',
        instructions: `# Property Decorators

The @property decorator creates managed attributes.

## Syntax
\`\`\`python
class Circle:
    @property
    def area(self):
        return 3.14 * self.radius ** 2
\`\`\`

## Your Task
Create a \`Rectangle\` class with:
- width and height attributes
- area property (read-only)
- perimeter property (read-only)`,
        difficulty: 'intermediate',
        points: 30,
        starterCode: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    @property
    def area(self):
        # Return width * height
        pass
    
    @property
    def perimeter(self):
        # Return 2 * (width + height)
        pass

# Test
rect = Rectangle(5, 3)
print(rect.area)
print(rect.perimeter)`,
        solution: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    @property
    def area(self):
        return self.width * self.height
    
    @property
    def perimeter(self):
        return 2 * (self.width + self.height)

# Test
rect = Rectangle(5, 3)
print(rect.area)
print(rect.perimeter)`,
        testCases: [
            { id: '1', input: '', expectedOutput: '15\n16', description: 'Properties calculated correctly', isHidden: false }
        ],
        hints: [
            '@property makes a method act like an attribute',
            'Area = width × height',
            'Perimeter = 2 × (width + height)'
        ],
        tags: ['oop', 'properties', 'decorators'],
        order: 4,
        estimatedTime: '10 min',
        status: 'available',
    },
    {
        id: 'static-class-methods',
        courseId: 'oop-python',
        title: 'Static & Class Methods',
        description: 'Learn @staticmethod and @classmethod.',
        instructions: `# Static and Class Methods

## @staticmethod
No access to instance or class. Just a function in a class.

## @classmethod
Receives the class (cls) as first argument. Can modify class state.

## Your Task
Create a \`Counter\` class with:
- A class variable \`count\` tracking instances
- A @classmethod \`get_count()\` returning total instances
- A @staticmethod \`is_valid(n)\` checking if n > 0`,
        difficulty: 'intermediate',
        points: 30,
        starterCode: `class Counter:
    count = 0
    
    def __init__(self):
        Counter.count += 1
    
    @classmethod
    def get_count(cls):
        # Return the count
        pass
    
    @staticmethod
    def is_valid(n):
        # Return True if n > 0
        pass

# Test
c1 = Counter()
c2 = Counter()
c3 = Counter()
print(Counter.get_count())
print(Counter.is_valid(5))
print(Counter.is_valid(-1))`,
        solution: `class Counter:
    count = 0
    
    def __init__(self):
        Counter.count += 1
    
    @classmethod
    def get_count(cls):
        return cls.count
    
    @staticmethod
    def is_valid(n):
        return n > 0

# Test
c1 = Counter()
c2 = Counter()
c3 = Counter()
print(Counter.get_count())
print(Counter.is_valid(5))
print(Counter.is_valid(-1))`,
        testCases: [
            { id: '1', input: '', expectedOutput: '3\nTrue\nFalse', description: 'Static and class methods work', isHidden: false }
        ],
        hints: [
            '@classmethod uses cls to access class variables',
            '@staticmethod is like a regular function',
            'Return cls.count in get_count'
        ],
        tags: ['oop', 'static', 'classmethod'],
        order: 5,
        estimatedTime: '12 min',
        status: 'available',
    },
    {
        id: 'dataclasses',
        courseId: 'oop-python',
        title: 'Dataclasses',
        description: 'Simplify class creation with @dataclass.',
        instructions: `# Dataclasses

The @dataclass decorator auto-generates __init__, __repr__, etc.

## Syntax
\`\`\`python
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int
\`\`\`

## Your Task
Create a \`Product\` dataclass with:
- name: str
- price: float
- quantity: int = 0 (default)

Print two products.`,
        difficulty: 'intermediate',
        points: 25,
        starterCode: `from dataclasses import dataclass

@dataclass
class Product:
    # Define fields here
    pass

# Test
p1 = Product("Laptop", 999.99, 5)
p2 = Product("Mouse", 29.99)
print(p1)
print(p2)`,
        solution: `from dataclasses import dataclass

@dataclass
class Product:
    name: str
    price: float
    quantity: int = 0

# Test
p1 = Product("Laptop", 999.99, 5)
p2 = Product("Mouse", 29.99)
print(p1)
print(p2)`,
        testCases: [
            { id: '1', input: '', expectedOutput: "Product(name='Laptop', price=999.99, quantity=5)\nProduct(name='Mouse', price=29.99, quantity=0)", description: 'Dataclass works correctly', isHidden: false }
        ],
        hints: [
            'Use type hints: name: str',
            'Default values go after the colon: quantity: int = 0',
            'Fields with defaults must come after required fields'
        ],
        tags: ['oop', 'dataclass', 'modern-python'],
        order: 6,
        estimatedTime: '8 min',
        status: 'available',
    },
    // Data Analysis Exercises
    {
        id: 'list-statistics',
        courseId: 'data-analysis-pandas',
        title: 'Basic Statistics',
        description: 'Calculate mean, median, and mode.',
        instructions: `# Basic Statistics

Calculate common statistics from a list of numbers.

## Your Task
Create functions to calculate:
1. Mean (average)
2. Median (middle value)
3. Mode (most frequent)

Test with: [1, 2, 2, 3, 4, 4, 4, 5]`,
        difficulty: 'intermediate',
        points: 30,
        starterCode: `def mean(numbers):
    # Return average
    pass

def median(numbers):
    # Return middle value
    pass

def mode(numbers):
    # Return most frequent
    pass

# Test
data = [1, 2, 2, 3, 4, 4, 4, 5]
print(mean(data))
print(median(data))
print(mode(data))`,
        solution: `def mean(numbers):
    return sum(numbers) / len(numbers)

def median(numbers):
    sorted_nums = sorted(numbers)
    n = len(sorted_nums)
    mid = n // 2
    if n % 2 == 0:
        return (sorted_nums[mid-1] + sorted_nums[mid]) / 2
    return sorted_nums[mid]

def mode(numbers):
    counts = {}
    for n in numbers:
        counts[n] = counts.get(n, 0) + 1
    return max(counts, key=counts.get)

# Test
data = [1, 2, 2, 3, 4, 4, 4, 5]
print(mean(data))
print(median(data))
print(mode(data))`,
        testCases: [
            { id: '1', input: '', expectedOutput: '3.125\n3.5\n4', description: 'Statistics calculated correctly', isHidden: false }
        ],
        hints: [
            'Mean = sum / count',
            'Median: sort first, then find middle',
            'Mode: count occurrences, find max'
        ],
        tags: ['statistics', 'data', 'math'],
        order: 1,
        estimatedTime: '15 min',
        status: 'available',
    },
    {
        id: 'data-filtering',
        courseId: 'data-analysis-pandas',
        title: 'Data Filtering',
        description: 'Filter data based on conditions.',
        instructions: `# Data Filtering

Filter lists of dictionaries based on conditions.

## Your Task
Given a list of student records, filter to find:
1. Students with grade >= 80
2. Students in "Math" class

Return the filtered lists.`,
        difficulty: 'intermediate',
        points: 25,
        starterCode: `students = [
    {"name": "Alice", "grade": 85, "class": "Math"},
    {"name": "Bob", "grade": 72, "class": "Science"},
    {"name": "Charlie", "grade": 90, "class": "Math"},
    {"name": "Diana", "grade": 78, "class": "English"},
]

# Filter students with grade >= 80
high_achievers = []

# Filter students in Math class
math_students = []

print([s["name"] for s in high_achievers])
print([s["name"] for s in math_students])`,
        solution: `students = [
    {"name": "Alice", "grade": 85, "class": "Math"},
    {"name": "Bob", "grade": 72, "class": "Science"},
    {"name": "Charlie", "grade": 90, "class": "Math"},
    {"name": "Diana", "grade": 78, "class": "English"},
]

# Filter students with grade >= 80
high_achievers = [s for s in students if s["grade"] >= 80]

# Filter students in Math class
math_students = [s for s in students if s["class"] == "Math"]

print([s["name"] for s in high_achievers])
print([s["name"] for s in math_students])`,
        testCases: [
            { id: '1', input: '', expectedOutput: "['Alice', 'Charlie']\n['Alice', 'Charlie']", description: 'Filtering works correctly', isHidden: false }
        ],
        hints: [
            'Use list comprehension with if condition',
            'Access dictionary values with s["key"]',
            'Comparison operators: >=, =='
        ],
        tags: ['filtering', 'data', 'comprehensions'],
        order: 2,
        estimatedTime: '10 min',
        status: 'available',
    },
    {
        id: 'data-grouping',
        courseId: 'data-analysis-pandas',
        title: 'Group By Operations',
        description: 'Group data and calculate aggregates.',
        instructions: `# Group By

Group data by a category and calculate aggregates.

## Your Task
Group sales data by product category and calculate:
1. Total sales per category
2. Average sale per category`,
        difficulty: 'intermediate',
        points: 30,
        starterCode: `sales = [
    {"product": "Laptop", "category": "Electronics", "amount": 1000},
    {"product": "Phone", "category": "Electronics", "amount": 500},
    {"product": "Desk", "category": "Furniture", "amount": 300},
    {"product": "Chair", "category": "Furniture", "amount": 150},
    {"product": "Monitor", "category": "Electronics", "amount": 400},
]

# Group by category and sum amounts
totals = {}
# Your code here

for cat, total in sorted(totals.items()):
    print(f"{cat}: {total}")`,
        solution: `sales = [
    {"product": "Laptop", "category": "Electronics", "amount": 1000},
    {"product": "Phone", "category": "Electronics", "amount": 500},
    {"product": "Desk", "category": "Furniture", "amount": 300},
    {"product": "Chair", "category": "Furniture", "amount": 150},
    {"product": "Monitor", "category": "Electronics", "amount": 400},
]

# Group by category and sum amounts
totals = {}
for sale in sales:
    cat = sale["category"]
    totals[cat] = totals.get(cat, 0) + sale["amount"]

for cat, total in sorted(totals.items()):
    print(f"{cat}: {total}")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Electronics: 1900\nFurniture: 450', description: 'Grouping works correctly', isHidden: false }
        ],
        hints: [
            'Loop through sales',
            'Use dict.get(key, 0) for safe access',
            'Accumulate amounts per category'
        ],
        tags: ['groupby', 'aggregation', 'data'],
        order: 3,
        estimatedTime: '12 min',
        status: 'available',
    },
    // Python Automation Exercises
    {
        id: 'list-files',
        courseId: 'python-automation',
        title: 'List Directory Contents',
        description: 'Work with file system operations.',
        instructions: `# File System Operations

Python's os module provides file system utilities.

## Your Task
Given a list of filenames, filter to find:
1. All .py files
2. All .txt files

Use string methods to check extensions.`,
        difficulty: 'beginner',
        points: 20,
        starterCode: `files = [
    "main.py",
    "data.txt",
    "utils.py",
    "readme.md",
    "config.json",
    "test.py",
    "notes.txt"
]

# Filter Python files
py_files = []

# Filter text files
txt_files = []

print("Python files:", py_files)
print("Text files:", txt_files)`,
        solution: `files = [
    "main.py",
    "data.txt",
    "utils.py",
    "readme.md",
    "config.json",
    "test.py",
    "notes.txt"
]

# Filter Python files
py_files = [f for f in files if f.endswith(".py")]

# Filter text files
txt_files = [f for f in files if f.endswith(".txt")]

print("Python files:", py_files)
print("Text files:", txt_files)`,
        testCases: [
            { id: '1', input: '', expectedOutput: "Python files: ['main.py', 'utils.py', 'test.py']\nText files: ['data.txt', 'notes.txt']", description: 'Files filtered correctly', isHidden: false }
        ],
        hints: [
            'Use .endswith() to check file extension',
            'List comprehension makes filtering easy',
            '.endswith(".py") checks for Python files'
        ],
        tags: ['files', 'automation', 'strings'],
        order: 1,
        estimatedTime: '8 min',
        status: 'available',
    },
    {
        id: 'batch-rename',
        courseId: 'python-automation',
        title: 'Batch Rename Files',
        description: 'Generate new filenames for batch operations.',
        instructions: `# Batch Rename

Create a function to generate new filenames with a prefix and numbering.

## Example
prefix="report", count=3
Output: ["report_001.txt", "report_002.txt", "report_003.txt"]`,
        difficulty: 'beginner',
        points: 20,
        starterCode: `def batch_rename(prefix, count, extension="txt"):
    # Generate list of new filenames
    # Format: prefix_001.extension
    pass

# Test
files = batch_rename("report", 5)
for f in files:
    print(f)`,
        solution: `def batch_rename(prefix, count, extension="txt"):
    return [f"{prefix}_{i:03d}.{extension}" for i in range(1, count + 1)]

# Test
files = batch_rename("report", 5)
for f in files:
    print(f)`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'report_001.txt\nreport_002.txt\nreport_003.txt\nreport_004.txt\nreport_005.txt', description: 'Batch rename works correctly', isHidden: false }
        ],
        hints: [
            'Use f-string formatting: {i:03d} for 3-digit padding',
            'range(1, count + 1) gives 1 to count',
            'List comprehension creates the list'
        ],
        tags: ['automation', 'strings', 'formatting'],
        order: 2,
        estimatedTime: '10 min',
        status: 'available',
    },
    // Testing Exercises
    {
        id: 'assert-basics',
        courseId: 'testing-pytest',
        title: 'Assert Statements',
        description: 'Use assert for basic testing.',
        instructions: `# Assert Statements

Assert statements verify conditions during testing.

## Syntax
\`\`\`python
assert condition, "Error message"
\`\`\`

## Your Task
Create a function \`validate_age(age)\` that:
- Returns True if age is between 0 and 120
- Returns False otherwise

Then write asserts to test it.`,
        difficulty: 'beginner',
        points: 20,
        starterCode: `def validate_age(age):
    # Return True if age is valid (0-120)
    pass

# Test with asserts
assert validate_age(25) == True
assert validate_age(-5) == False
assert validate_age(150) == False
assert validate_age(0) == True
assert validate_age(120) == True

print("All tests passed!")`,
        solution: `def validate_age(age):
    return 0 <= age <= 120

# Test with asserts
assert validate_age(25) == True
assert validate_age(-5) == False
assert validate_age(150) == False
assert validate_age(0) == True
assert validate_age(120) == True

print("All tests passed!")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'All tests passed!', description: 'All assertions pass', isHidden: false }
        ],
        hints: [
            'Use chained comparison: 0 <= age <= 120',
            'Return a boolean expression',
            'Asserts fail if condition is False'
        ],
        tags: ['testing', 'assert', 'validation'],
        order: 1,
        estimatedTime: '8 min',
        status: 'available',
    },
    {
        id: 'test-functions',
        courseId: 'testing-pytest',
        title: 'Writing Test Functions',
        description: 'Structure tests as functions.',
        instructions: `# Test Functions

Organize tests as functions with descriptive names.

## Convention
\`\`\`python
def test_function_name():
    # Arrange
    # Act
    # Assert
\`\`\`

## Your Task
Write test functions for a \`Calculator\` class.`,
        difficulty: 'intermediate',
        points: 25,
        starterCode: `class Calculator:
    def add(self, a, b):
        return a + b
    
    def subtract(self, a, b):
        return a - b
    
    def multiply(self, a, b):
        return a * b

def test_add():
    # Test the add method
    pass

def test_subtract():
    # Test the subtract method
    pass

def test_multiply():
    # Test the multiply method
    pass

# Run tests
test_add()
test_subtract()
test_multiply()
print("All tests passed!")`,
        solution: `class Calculator:
    def add(self, a, b):
        return a + b
    
    def subtract(self, a, b):
        return a - b
    
    def multiply(self, a, b):
        return a * b

def test_add():
    calc = Calculator()
    assert calc.add(2, 3) == 5
    assert calc.add(-1, 1) == 0

def test_subtract():
    calc = Calculator()
    assert calc.subtract(5, 3) == 2
    assert calc.subtract(0, 5) == -5

def test_multiply():
    calc = Calculator()
    assert calc.multiply(3, 4) == 12
    assert calc.multiply(-2, 3) == -6

# Run tests
test_add()
test_subtract()
test_multiply()
print("All tests passed!")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'All tests passed!', description: 'All test functions pass', isHidden: false }
        ],
        hints: [
            'Create a Calculator instance in each test',
            'Use assert to check expected vs actual',
            'Test edge cases like negatives and zero'
        ],
        tags: ['testing', 'functions', 'classes'],
        order: 2,
        estimatedTime: '12 min',
        status: 'available',
    },

    // ============================================
    // NEW EXERCISES - EXPANDING TO 50+
    // ============================================

    // Python Fundamentals - Additional Exercises
    {
        id: 'string-methods',
        courseId: 'python-fundamentals',
        title: 'String Methods',
        description: 'Practice using common string methods in Python.',
        instructions: 'Implement string manipulation functions using Python string methods like upper(), lower(), strip(), replace(), and split().',
        difficulty: 'beginner',
        points: 15,
        starterCode: `def process_text(text):
    """
    Process the text:
    1. Remove leading/trailing whitespace
    2. Convert to lowercase
    3. Replace spaces with underscores
    """
    # Your code here
    pass

# Test your function
result = process_text("  Hello World  ")
print(result)  # Should print: hello_world`,
        solution: `def process_text(text):
    """
    Process the text:
    1. Remove leading/trailing whitespace
    2. Convert to lowercase
    3. Replace spaces with underscores
    """
    result = text.strip()
    result = result.lower()
    result = result.replace(' ', '_')
    return result

# Test your function
result = process_text("  Hello World  ")
print(result)  # Should print: hello_world`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'hello_world', description: 'Process text correctly', isHidden: false }
        ],
        hints: ['Use strip() first to remove whitespace', 'Chain methods or use intermediate variables'],
        tags: ['strings', 'methods'],
        order: 9,
        estimatedTime: '8 min',
        status: 'available',
    },
    {
        id: 'list-slicing',
        courseId: 'python-fundamentals',
        title: 'List Slicing Mastery',
        description: 'Master Python list slicing with start, stop, and step.',
        instructions: 'Use list slicing to extract specific elements. Remember: list[start:stop:step]',
        difficulty: 'beginner',
        points: 15,
        starterCode: `numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Get the first 5 elements
first_five = None

# Get elements from index 3 to 7
middle = None

# Get every second element
every_second = None

# Reverse the list
reversed_list = None

print(f"First five: {first_five}")
print(f"Middle: {middle}")
print(f"Every second: {every_second}")
print(f"Reversed: {reversed_list}")`,
        solution: `numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Get the first 5 elements
first_five = numbers[:5]

# Get elements from index 3 to 7
middle = numbers[3:8]

# Get every second element
every_second = numbers[::2]

# Reverse the list
reversed_list = numbers[::-1]

print(f"First five: {first_five}")
print(f"Middle: {middle}")
print(f"Every second: {every_second}")
print(f"Reversed: {reversed_list}")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'First five: [0, 1, 2, 3, 4]\nMiddle: [3, 4, 5, 6, 7]\nEvery second: [0, 2, 4, 6, 8]\nReversed: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]', description: 'All slicing operations correct', isHidden: false }
        ],
        hints: ['Remember [:n] gets first n elements', 'Negative step reverses the list'],
        tags: ['lists', 'slicing'],
        order: 10,
        estimatedTime: '10 min',
        status: 'available',
    },
    {
        id: 'error-handling',
        courseId: 'python-fundamentals',
        title: 'Error Handling with Try/Except',
        description: 'Learn to handle exceptions gracefully in Python.',
        instructions: 'Implement a safe division function that handles ZeroDivisionError and TypeError.',
        difficulty: 'beginner',
        points: 20,
        starterCode: `def safe_divide(a, b):
    """
    Divide a by b safely.
    Return "Cannot divide by zero" for ZeroDivisionError
    Return "Invalid input type" for TypeError
    """
    # Your code here
    pass

# Test cases
print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide("10", 2))`,
        solution: `def safe_divide(a, b):
    """
    Divide a by b safely.
    Return "Cannot divide by zero" for ZeroDivisionError
    Return "Invalid input type" for TypeError
    """
    try:
        return a / b
    except ZeroDivisionError:
        return "Cannot divide by zero"
    except TypeError:
        return "Invalid input type"

# Test cases
print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide("10", 2))`,
        testCases: [
            { id: '1', input: '', expectedOutput: '5.0\nCannot divide by zero\nInvalid input type', description: 'All cases handled correctly', isHidden: false }
        ],
        hints: ['Use try/except blocks', 'Handle each exception type separately'],
        tags: ['exceptions', 'error-handling'],
        order: 11,
        estimatedTime: '10 min',
        status: 'available',
    },
    {
        id: 'set-operations',
        courseId: 'python-fundamentals',
        title: 'Set Operations',
        description: 'Learn union, intersection, and difference operations on sets.',
        instructions: 'Perform set operations to find common and unique elements between two groups.',
        difficulty: 'beginner',
        points: 15,
        starterCode: `group_a = {1, 2, 3, 4, 5}
group_b = {4, 5, 6, 7, 8}

# Find elements in both groups (intersection)
common = None

# Find all unique elements (union)
all_elements = None

# Find elements only in group_a (difference)
only_a = None

print(f"Common: {sorted(common)}")
print(f"All: {sorted(all_elements)}")
print(f"Only in A: {sorted(only_a)}")`,
        solution: `group_a = {1, 2, 3, 4, 5}
group_b = {4, 5, 6, 7, 8}

# Find elements in both groups (intersection)
common = group_a & group_b

# Find all unique elements (union)
all_elements = group_a | group_b

# Find elements only in group_a (difference)
only_a = group_a - group_b

print(f"Common: {sorted(common)}")
print(f"All: {sorted(all_elements)}")
print(f"Only in A: {sorted(only_a)}")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Common: [4, 5]\nAll: [1, 2, 3, 4, 5, 6, 7, 8]\nOnly in A: [1, 2, 3]', description: 'Set operations correct', isHidden: false }
        ],
        hints: ['Use & for intersection', 'Use | for union', 'Use - for difference'],
        tags: ['sets', 'operations'],
        order: 12,
        estimatedTime: '8 min',
        status: 'available',
    },
    {
        id: 'enumerate-function',
        courseId: 'python-fundamentals',
        title: 'Using Enumerate',
        description: 'Learn to use enumerate() for index-value pairs in loops.',
        instructions: 'Use enumerate to print each fruit with its position (1-indexed).',
        difficulty: 'beginner',
        points: 10,
        starterCode: `fruits = ['apple', 'banana', 'cherry', 'date']

# Print each fruit with its position (starting from 1)
# Expected output:
# 1. apple
# 2. banana
# 3. cherry
# 4. date

# Your code here`,
        solution: `fruits = ['apple', 'banana', 'cherry', 'date']

# Print each fruit with its position (starting from 1)
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")`,
        testCases: [
            { id: '1', input: '', expectedOutput: '1. apple\n2. banana\n3. cherry\n4. date', description: 'Enumerate with correct indexing', isHidden: false }
        ],
        hints: ['enumerate() takes an optional start parameter', 'Unpack index and value in the for loop'],
        tags: ['loops', 'enumerate'],
        order: 13,
        estimatedTime: '5 min',
        status: 'available',
    },

    // OOP - Additional Exercises
    {
        id: 'abstract-classes',
        courseId: 'oop-python',
        title: 'Abstract Base Classes',
        description: 'Learn to create abstract classes using ABC module.',
        instructions: 'Create an abstract Shape class with an abstract area() method, then implement Circle and Square classes.',
        difficulty: 'intermediate',
        points: 30,
        starterCode: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    # Define abstract method area()
    pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    # Implement area()
    pass

class Square(Shape):
    def __init__(self, side):
        self.side = side
    
    # Implement area()
    pass

# Test
circle = Circle(5)
square = Square(4)
print(f"Circle area: {circle.area():.2f}")
print(f"Square area: {square.area():.2f}")`,
        solution: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return math.pi * self.radius ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side
    
    def area(self):
        return self.side ** 2

# Test
circle = Circle(5)
square = Square(4)
print(f"Circle area: {circle.area():.2f}")
print(f"Square area: {square.area():.2f}")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Circle area: 78.54\nSquare area: 16.00', description: 'Abstract class implementation', isHidden: false }
        ],
        hints: ['Use @abstractmethod decorator', 'Import ABC from abc module'],
        tags: ['oop', 'abstract-classes', 'inheritance'],
        order: 7,
        estimatedTime: '15 min',
        status: 'available',
    },
    {
        id: 'composition-vs-inheritance',
        courseId: 'oop-python',
        title: 'Composition Over Inheritance',
        description: 'Learn when to use composition instead of inheritance.',
        instructions: 'Create an Engine class and a Car class that uses composition (has-an Engine) instead of inheritance.',
        difficulty: 'intermediate',
        points: 25,
        starterCode: `class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower
        self.running = False
    
    def start(self):
        self.running = True
        return "Engine started"
    
    def stop(self):
        self.running = False
        return "Engine stopped"

class Car:
    def __init__(self, make, model, horsepower):
        self.make = make
        self.model = model
        # Create an Engine instance (composition)
        # Your code here
    
    def start(self):
        # Start the engine
        # Your code here
        pass
    
    def get_info(self):
        status = "running" if self.engine.running else "off"
        return f"{self.make} {self.model} - {self.engine.horsepower}hp - {status}"

# Test
car = Car("Tesla", "Model S", 670)
print(car.start())
print(car.get_info())`,
        solution: `class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower
        self.running = False
    
    def start(self):
        self.running = True
        return "Engine started"
    
    def stop(self):
        self.running = False
        return "Engine stopped"

class Car:
    def __init__(self, make, model, horsepower):
        self.make = make
        self.model = model
        self.engine = Engine(horsepower)
    
    def start(self):
        return self.engine.start()
    
    def get_info(self):
        status = "running" if self.engine.running else "off"
        return f"{self.make} {self.model} - {self.engine.horsepower}hp - {status}"

# Test
car = Car("Tesla", "Model S", 670)
print(car.start())
print(car.get_info())`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Engine started\nTesla Model S - 670hp - running', description: 'Composition working correctly', isHidden: false }
        ],
        hints: ['Create Engine instance in Car.__init__', 'Delegate start() to the engine'],
        tags: ['oop', 'composition', 'design-patterns'],
        order: 8,
        estimatedTime: '12 min',
        status: 'available',
    },
    {
        id: 'context-managers',
        courseId: 'oop-python',
        title: 'Context Managers',
        description: 'Create custom context managers using __enter__ and __exit__.',
        instructions: 'Create a Timer context manager that measures execution time of code blocks.',
        difficulty: 'intermediate',
        points: 30,
        starterCode: `import time

class Timer:
    def __init__(self, name):
        self.name = name
        self.start_time = None
    
    def __enter__(self):
        # Record start time
        # Your code here
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Calculate and print elapsed time
        # Your code here
        return False

# Test the Timer
with Timer("Sleep Test"):
    time.sleep(0.1)
    print("Processing...")`,
        solution: `import time

class Timer:
    def __init__(self, name):
        self.name = name
        self.start_time = None
    
    def __enter__(self):
        self.start_time = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        elapsed = time.time() - self.start_time
        print(f"{self.name} took {elapsed:.3f} seconds")
        return False

# Test the Timer
with Timer("Sleep Test"):
    time.sleep(0.1)
    print("Processing...")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Processing...', description: 'Context manager works', isHidden: false }
        ],
        hints: ['__enter__ is called at with block start', '__exit__ is called when block ends'],
        tags: ['oop', 'context-managers', 'advanced'],
        order: 9,
        estimatedTime: '15 min',
        status: 'available',
    },

    // Data Analysis - Additional Exercises
    {
        id: 'list-aggregation',
        courseId: 'data-analysis-pandas',
        title: 'List Aggregation Functions',
        description: 'Use built-in functions for data aggregation.',
        instructions: 'Calculate sum, average, min, max, and count for a list of numbers.',
        difficulty: 'intermediate',
        points: 15,
        starterCode: `numbers = [23, 45, 12, 67, 34, 89, 21, 56, 78, 43]

# Calculate statistics
total = None
count = None
average = None
minimum = None
maximum = None

print(f"Sum: {total}")
print(f"Count: {count}")
print(f"Average: {average:.2f}")
print(f"Min: {minimum}")
print(f"Max: {maximum}")`,
        solution: `numbers = [23, 45, 12, 67, 34, 89, 21, 56, 78, 43]

# Calculate statistics
total = sum(numbers)
count = len(numbers)
average = total / count
minimum = min(numbers)
maximum = max(numbers)

print(f"Sum: {total}")
print(f"Count: {count}")
print(f"Average: {average:.2f}")
print(f"Min: {minimum}")
print(f"Max: {maximum}")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Sum: 468\nCount: 10\nAverage: 46.80\nMin: 12\nMax: 89', description: 'All aggregations correct', isHidden: false }
        ],
        hints: ['Use sum(), len(), min(), max()', 'Average = sum / count'],
        tags: ['data', 'aggregation', 'statistics'],
        order: 4,
        estimatedTime: '8 min',
        status: 'available',
    },
    {
        id: 'dictionary-comprehension',
        courseId: 'data-analysis-pandas',
        title: 'Dictionary Comprehension',
        description: 'Transform data using dictionary comprehensions.',
        instructions: 'Create dictionaries using comprehension syntax to transform and filter data.',
        difficulty: 'intermediate',
        points: 20,
        starterCode: `names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
scores = [85, 92, 78, 95, 88]

# Create a dictionary mapping names to scores
name_scores = None

# Create a dictionary with only high scorers (>= 85)
high_scorers = None

# Create a dictionary with pass/fail status (>= 80 is pass)
status = None

print(f"All scores: {name_scores}")
print(f"High scorers: {high_scorers}")
print(f"Status: {status}")`,
        solution: `names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
scores = [85, 92, 78, 95, 88]

# Create a dictionary mapping names to scores
name_scores = {name: score for name, score in zip(names, scores)}

# Create a dictionary with only high scorers (>= 85)
high_scorers = {name: score for name, score in name_scores.items() if score >= 85}

# Create a dictionary with pass/fail status (>= 80 is pass)
status = {name: 'pass' if score >= 80 else 'fail' for name, score in name_scores.items()}

print(f"All scores: {name_scores}")
print(f"High scorers: {high_scorers}")
print(f"Status: {status}")`,
        testCases: [
            { id: '1', input: '', expectedOutput: "All scores: {'Alice': 85, 'Bob': 92, 'Charlie': 78, 'David': 95, 'Eve': 88}\nHigh scorers: {'Alice': 85, 'Bob': 92, 'David': 95, 'Eve': 88}\nStatus: {'Alice': 'pass', 'Bob': 'pass', 'Charlie': 'fail', 'David': 'pass', 'Eve': 'pass'}", description: 'Dict comprehensions correct', isHidden: false }
        ],
        hints: ['Use zip() to pair names and scores', 'Add if condition for filtering'],
        tags: ['data', 'comprehension', 'dictionary'],
        order: 5,
        estimatedTime: '12 min',
        status: 'available',
    },
    {
        id: 'sorting-data',
        courseId: 'data-analysis-pandas',
        title: 'Sorting Complex Data',
        description: 'Sort lists of dictionaries by different keys.',
        instructions: 'Sort a list of student records by different criteria using sorted() and key functions.',
        difficulty: 'intermediate',
        points: 20,
        starterCode: `students = [
    {'name': 'Alice', 'grade': 85, 'age': 22},
    {'name': 'Bob', 'grade': 92, 'age': 20},
    {'name': 'Charlie', 'grade': 78, 'age': 23},
    {'name': 'David', 'grade': 95, 'age': 21},
]

# Sort by grade (descending)
by_grade = None

# Sort by age (ascending)
by_age = None

# Sort by name (alphabetical)
by_name = None

print("By grade (desc):", [s['name'] for s in by_grade])
print("By age (asc):", [s['name'] for s in by_age])
print("By name:", [s['name'] for s in by_name])`,
        solution: `students = [
    {'name': 'Alice', 'grade': 85, 'age': 22},
    {'name': 'Bob', 'grade': 92, 'age': 20},
    {'name': 'Charlie', 'grade': 78, 'age': 23},
    {'name': 'David', 'grade': 95, 'age': 21},
]

# Sort by grade (descending)
by_grade = sorted(students, key=lambda s: s['grade'], reverse=True)

# Sort by age (ascending)
by_age = sorted(students, key=lambda s: s['age'])

# Sort by name (alphabetical)
by_name = sorted(students, key=lambda s: s['name'])

print("By grade (desc):", [s['name'] for s in by_grade])
print("By age (asc):", [s['name'] for s in by_age])
print("By name:", [s['name'] for s in by_name])`,
        testCases: [
            { id: '1', input: '', expectedOutput: "By grade (desc): ['David', 'Bob', 'Alice', 'Charlie']\nBy age (asc): ['Bob', 'David', 'Alice', 'Charlie']\nBy name: ['Alice', 'Bob', 'Charlie', 'David']", description: 'All sorts correct', isHidden: false }
        ],
        hints: ['Use sorted() with key parameter', 'Lambda functions work well for extracting keys'],
        tags: ['data', 'sorting', 'lambda'],
        order: 6,
        estimatedTime: '10 min',
        status: 'available',
    },

    // Python Automation - Additional Exercises
    {
        id: 'json-processing',
        courseId: 'python-automation',
        title: 'JSON Data Processing',
        description: 'Read, modify, and write JSON data.',
        instructions: 'Parse JSON data, modify it, and convert back to JSON string.',
        difficulty: 'beginner',
        points: 20,
        starterCode: `import json

# Sample JSON data
json_string = '''
{
    "users": [
        {"id": 1, "name": "Alice", "active": true},
        {"id": 2, "name": "Bob", "active": false}
    ],
    "total": 2
}
'''

# Parse the JSON string
data = None

# Add a new user
new_user = {"id": 3, "name": "Charlie", "active": True}
# Your code to add user and update total here

# Convert back to JSON string (with indentation)
result = None

print(result)`,
        solution: `import json

# Sample JSON data
json_string = '''
{
    "users": [
        {"id": 1, "name": "Alice", "active": true},
        {"id": 2, "name": "Bob", "active": false}
    ],
    "total": 2
}
'''

# Parse the JSON string
data = json.loads(json_string)

# Add a new user
new_user = {"id": 3, "name": "Charlie", "active": True}
data["users"].append(new_user)
data["total"] = len(data["users"])

# Convert back to JSON string (with indentation)
result = json.dumps(data, indent=2)

print(result)`,
        testCases: [
            { id: '1', input: '', expectedOutput: '{\n  "users": [\n    {\n      "id": 1,\n      "name": "Alice",\n      "active": true\n    },\n    {\n      "id": 2,\n      "name": "Bob",\n      "active": false\n    },\n    {\n      "id": 3,\n      "name": "Charlie",\n      "active": true\n    }\n  ],\n  "total": 3\n}', description: 'JSON processed correctly', isHidden: false }
        ],
        hints: ['json.loads() parses a string', 'json.dumps() converts to string'],
        tags: ['json', 'automation', 'data'],
        order: 4,
        estimatedTime: '12 min',
        status: 'available',
    },
    {
        id: 'regex-basics',
        courseId: 'python-automation',
        title: 'Regular Expressions Basics',
        description: 'Learn to use regex for pattern matching.',
        instructions: 'Use regular expressions to find and extract patterns from text.',
        difficulty: 'beginner',
        points: 25,
        starterCode: `import re

text = "Contact us at support@example.com or sales@company.org. Call 555-1234 or 555-5678."

# Find all email addresses
emails = None

# Find all phone numbers (pattern: XXX-XXXX)
phones = None

# Check if text contains 'example.com'
has_example = None

print(f"Emails: {emails}")
print(f"Phones: {phones}")
print(f"Has example.com: {has_example}")`,
        solution: `import re

text = "Contact us at support@example.com or sales@company.org. Call 555-1234 or 555-5678."

# Find all email addresses
emails = re.findall(r'[\\w.]+@[\\w.]+\\.\\w+', text)

# Find all phone numbers (pattern: XXX-XXXX)
phones = re.findall(r'\\d{3}-\\d{4}', text)

# Check if text contains 'example.com'
has_example = bool(re.search(r'example\\.com', text))

print(f"Emails: {emails}")
print(f"Phones: {phones}")
print(f"Has example.com: {has_example}")`,
        testCases: [
            { id: '1', input: '', expectedOutput: "Emails: ['support@example.com', 'sales@company.org']\nPhones: ['555-1234', '555-5678']\nHas example.com: True", description: 'Regex patterns work', isHidden: false }
        ],
        hints: ['re.findall() returns all matches', 're.search() finds first match'],
        tags: ['regex', 'automation', 'text'],
        order: 5,
        estimatedTime: '15 min',
        status: 'available',
    },
    {
        id: 'datetime-operations',
        courseId: 'python-automation',
        title: 'Date and Time Operations',
        description: 'Work with dates, times, and timedeltas.',
        instructions: 'Perform common date/time operations including formatting and calculations.',
        difficulty: 'beginner',
        points: 20,
        starterCode: `from datetime import datetime, timedelta

# Create a specific date
birthday = datetime(2000, 6, 15)

# Get today's date
today = datetime.now()

# Calculate age in days
age_days = None

# Add 30 days to today
future_date = None

# Format today as "YYYY-MM-DD"
formatted = None

print(f"Birthday: {birthday.strftime('%B %d, %Y')}")
print(f"Days since birthday: {age_days}")
print(f"30 days from now: {future_date.strftime('%Y-%m-%d')}")
print(f"Today formatted: {formatted}")`,
        solution: `from datetime import datetime, timedelta

# Create a specific date
birthday = datetime(2000, 6, 15)

# Get today's date
today = datetime.now()

# Calculate age in days
age_days = (today - birthday).days

# Add 30 days to today
future_date = today + timedelta(days=30)

# Format today as "YYYY-MM-DD"
formatted = today.strftime('%Y-%m-%d')

print(f"Birthday: {birthday.strftime('%B %d, %Y')}")
print(f"Days since birthday: {age_days}")
print(f"30 days from now: {future_date.strftime('%Y-%m-%d')}")
print(f"Today formatted: {formatted}")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'Birthday: June 15, 2000', description: 'Birthday formatted correctly', isHidden: false }
        ],
        hints: ['timedelta for date arithmetic', 'strftime for formatting'],
        tags: ['datetime', 'automation', 'formatting'],
        order: 6,
        estimatedTime: '10 min',
        status: 'available',
    },
    {
        id: 'command-line-args',
        courseId: 'python-automation',
        title: 'Simulating Command Line Arguments',
        description: 'Learn to process command line style arguments.',
        instructions: 'Create a function that parses command-line style arguments.',
        difficulty: 'beginner',
        points: 20,
        starterCode: `def parse_args(args_list):
    """
    Parse a list of command-line arguments.
    Supports --key=value and --flag formats.
    Returns a dictionary of parsed arguments.
    """
    result = {}
    # Your code here
    return result

# Test with sample arguments
args = ['--name=Alice', '--age=25', '--verbose', '--output=report.txt']
parsed = parse_args(args)
print(parsed)`,
        solution: `def parse_args(args_list):
    """
    Parse a list of command-line arguments.
    Supports --key=value and --flag formats.
    Returns a dictionary of parsed arguments.
    """
    result = {}
    for arg in args_list:
        if arg.startswith('--'):
            arg = arg[2:]  # Remove --
            if '=' in arg:
                key, value = arg.split('=', 1)
                result[key] = value
            else:
                result[arg] = True
    return result

# Test with sample arguments
args = ['--name=Alice', '--age=25', '--verbose', '--output=report.txt']
parsed = parse_args(args)
print(parsed)`,
        testCases: [
            { id: '1', input: '', expectedOutput: "{'name': 'Alice', 'age': '25', 'verbose': True, 'output': 'report.txt'}", description: 'Args parsed correctly', isHidden: false }
        ],
        hints: ['Check for = to distinguish key=value from flags', 'Use split with maxsplit=1'],
        tags: ['automation', 'parsing', 'cli'],
        order: 7,
        estimatedTime: '15 min',
        status: 'available',
    },

    // Testing - Additional Exercises
    {
        id: 'test-fixtures',
        courseId: 'testing-pytest',
        title: 'Test Fixtures and Setup',
        description: 'Create reusable test fixtures for cleaner tests.',
        instructions: 'Create a setup function that initializes test data, then use it in multiple tests.',
        difficulty: 'intermediate',
        points: 25,
        starterCode: `# Simulating test fixtures without pytest

class TestDatabase:
    """A simple in-memory test database"""
    def __init__(self):
        self.data = {}
    
    def insert(self, key, value):
        self.data[key] = value
    
    def get(self, key):
        return self.data.get(key)
    
    def delete(self, key):
        if key in self.data:
            del self.data[key]

# Create a fixture function
def get_test_db():
    """Setup function that creates a test database with sample data"""
    # Your code here - create db and add test data
    pass

# Tests
def test_insert():
    db = get_test_db()
    db.insert('new_key', 'new_value')
    assert db.get('new_key') == 'new_value'

def test_get_existing():
    db = get_test_db()
    # Test that fixture data exists
    assert db.get('user1') == 'Alice'

def test_delete():
    db = get_test_db()
    db.delete('user1')
    assert db.get('user1') is None

# Run tests
test_insert()
test_get_existing()
test_delete()
print("All fixture tests passed!")`,
        solution: `# Simulating test fixtures without pytest

class TestDatabase:
    """A simple in-memory test database"""
    def __init__(self):
        self.data = {}
    
    def insert(self, key, value):
        self.data[key] = value
    
    def get(self, key):
        return self.data.get(key)
    
    def delete(self, key):
        if key in self.data:
            del self.data[key]

# Create a fixture function
def get_test_db():
    """Setup function that creates a test database with sample data"""
    db = TestDatabase()
    db.insert('user1', 'Alice')
    db.insert('user2', 'Bob')
    return db

# Tests
def test_insert():
    db = get_test_db()
    db.insert('new_key', 'new_value')
    assert db.get('new_key') == 'new_value'

def test_get_existing():
    db = get_test_db()
    assert db.get('user1') == 'Alice'

def test_delete():
    db = get_test_db()
    db.delete('user1')
    assert db.get('user1') is None

# Run tests
test_insert()
test_get_existing()
test_delete()
print("All fixture tests passed!")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'All fixture tests passed!', description: 'Fixture tests pass', isHidden: false }
        ],
        hints: ['Fixture creates fresh db each call', 'Add sample data in the fixture'],
        tags: ['testing', 'fixtures', 'setup'],
        order: 3,
        estimatedTime: '15 min',
        status: 'available',
    },
    {
        id: 'edge-case-testing',
        courseId: 'testing-pytest',
        title: 'Testing Edge Cases',
        description: 'Learn to identify and test edge cases.',
        instructions: 'Write comprehensive tests that cover edge cases for a string utility function.',
        difficulty: 'intermediate',
        points: 25,
        starterCode: `def truncate(text, max_length, suffix='...'):
    """
    Truncate text to max_length, adding suffix if truncated.
    If text is shorter than max_length, return as-is.
    """
    if len(text) <= max_length:
        return text
    return text[:max_length - len(suffix)] + suffix

# Write tests for edge cases
def test_normal_truncation():
    # Test basic truncation
    assert truncate("Hello World", 8) == "Hello..."

def test_no_truncation_needed():
    # Test when text is shorter than max_length
    # Your test here
    pass

def test_exact_length():
    # Test when text is exactly max_length
    # Your test here
    pass

def test_empty_string():
    # Test with empty string
    # Your test here
    pass

def test_custom_suffix():
    # Test with custom suffix
    # Your test here
    pass

# Run all tests
test_normal_truncation()
test_no_truncation_needed()
test_exact_length()
test_empty_string()
test_custom_suffix()
print("All edge case tests passed!")`,
        solution: `def truncate(text, max_length, suffix='...'):
    """
    Truncate text to max_length, adding suffix if truncated.
    If text is shorter than max_length, return as-is.
    """
    if len(text) <= max_length:
        return text
    return text[:max_length - len(suffix)] + suffix

# Write tests for edge cases
def test_normal_truncation():
    assert truncate("Hello World", 8) == "Hello..."

def test_no_truncation_needed():
    assert truncate("Hello", 10) == "Hello"

def test_exact_length():
    assert truncate("Hello", 5) == "Hello"

def test_empty_string():
    assert truncate("", 5) == ""

def test_custom_suffix():
    assert truncate("Hello World", 8, '>>') == "Hello >>"

# Run all tests
test_normal_truncation()
test_no_truncation_needed()
test_exact_length()
test_empty_string()
test_custom_suffix()
print("All edge case tests passed!")`,
        testCases: [
            { id: '1', input: '', expectedOutput: 'All edge case tests passed!', description: 'Edge case tests pass', isHidden: false }
        ],
        hints: ['Consider empty strings', 'Test boundary conditions'],
        tags: ['testing', 'edge-cases', 'assertions'],
        order: 4,
        estimatedTime: '12 min',
        status: 'available',
    },
];

// Helper function to get exercises by course
export const getExercisesByCourse = (courseId: string): Exercise[] => {
    return exercises.filter(e => e.courseId === courseId);
};

// Helper function to get exercise by ID
export const getExerciseById = (exerciseId: string): Exercise | undefined => {
    return exercises.find(e => e.id === exerciseId);
};

// Helper function to get course by ID
export const getCourseById = (courseId: string): Course | undefined => {
    return courses.find(c => c.id === courseId);
};
