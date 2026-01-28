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
