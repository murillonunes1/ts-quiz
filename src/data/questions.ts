export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuestionSet {
  level: 'easy' | 'medium' | 'hard';
  questions: Question[];
}

export const questionsData: QuestionSet[] = [
  {
    level: 'easy',
    questions: [
      {
        id: 1,
        question: 'What is TypeScript?',
        options: [
          'A JavaScript library',
          'A superset of JavaScript that adds static typing',
          'A database management system',
          'A CSS framework'
        ],
        correctAnswer: 1,
        explanation: 'TypeScript is a superset of JavaScript that adds static type definitions, helping catch errors at compile time.'
      },
      {
        id: 2,
        question: 'Which command is used to compile TypeScript files?',
        options: ['node', 'npm', 'tsc', 'ts'],
        correctAnswer: 2,
        explanation: 'The "tsc" command is the TypeScript compiler used to compile .ts files to .js files.'
      },
      {
        id: 3,
        question: 'What is the correct way to declare a variable with a string type in TypeScript?',
        options: [
          'let name: string = "John";',
          'let name = string("John");',
          'let name: String = "John";',
          'string name = "John";'
        ],
        correctAnswer: 0,
        explanation: 'In TypeScript, you declare a typed variable using the syntax: let variableName: type = value'
      },
      {
        id: 4,
        question: 'Which of the following is NOT a primitive type in TypeScript?',
        options: ['string', 'number', 'boolean', 'array'],
        correctAnswer: 3,
        explanation: 'Array is not a primitive type. The primitive types in TypeScript are string, number, boolean, undefined, null, and symbol.'
      },
      {
        id: 5,
        question: 'What does the "?" symbol mean when used with a property in TypeScript?',
        options: [
          'The property is required',
          'The property is optional',
          'The property is a function',
          'The property is readonly'
        ],
        correctAnswer: 1,
        explanation: 'The "?" symbol makes a property optional, meaning it may or may not be present in the object.'
      }
    ]
  },
  {
    level: 'medium',
    questions: [
      {
        id: 6,
        question: 'What is the correct syntax for defining a union type?',
        options: [
          'let value: string & number;',
          'let value: string | number;',
          'let value: string + number;',
          'let value: string, number;'
        ],
        correctAnswer: 1,
        explanation: 'Union types use the "|" (pipe) symbol to allow a variable to be one of several types.'
      },
      {
        id: 7,
        question: 'Which utility type makes all properties of a type optional?',
        options: ['Required<T>', 'Partial<T>', 'Pick<T, K>', 'Readonly<T>'],
        correctAnswer: 1,
        explanation: 'Partial<T> is a utility type that makes all properties of type T optional.'
      },
      {
        id: 8,
        question: 'What is the purpose of the "never" type in TypeScript?',
        options: [
          'Represents values that never occur',
          'Represents null values',
          'Represents undefined values',
          'Represents any type'
        ],
        correctAnswer: 0,
        explanation: 'The "never" type represents values that never occur, such as functions that always throw exceptions or infinite loops.'
      },
      {
        id: 9,
        question: 'How do you define a generic function in TypeScript?',
        options: [
          'function myFunc(T)(arg: T): T {}',
          'function myFunc<T>(arg: T): T {}',
          'function myFunc[T](arg: T): T {}',
          'function myFunc{T}(arg: T): T {}'
        ],
        correctAnswer: 1,
        explanation: 'Generic functions are defined using angle brackets <T> after the function name to specify type parameters.'
      },
      {
        id: 10,
        question: 'What is the difference between "interface" and "type" in TypeScript?',
        options: [
          'No difference, they are identical',
          'interface can be extended, type cannot',
          'interface can be merged, type uses intersection',
          'type is for primitives, interface is for objects'
        ],
        correctAnswer: 2,
        explanation: 'Interfaces can be declaration merged and extended, while types use intersection (&) for combining and cannot be merged.'
      }
    ]
  },
  {
    level: 'hard',
    questions: [
      {
        id: 11,
        question: 'What does the "infer" keyword do in TypeScript?',
        options: [
          'Automatically infers the type of a variable',
          'Extracts types from within conditional types',
          'Creates a new type alias',
          'Defines a generic constraint'
        ],
        correctAnswer: 1,
        explanation: 'The "infer" keyword is used within conditional types to extract and capture types for use in the true branch.'
      },
      {
        id: 12,
        question: 'Which of the following correctly implements a mapped type?',
        options: [
          'type ReadOnly<T> = { readonly [K in keyof T]: T[K] }',
          'type ReadOnly<T> = { [K: keyof T]: readonly T[K] }',
          'type ReadOnly<T> = readonly { [K in T]: T[K] }',
          'type ReadOnly<T> = { [K in T]: readonly T }'
        ],
        correctAnswer: 0,
        explanation: 'Mapped types use the syntax [K in keyof T] to iterate over the keys of type T and transform them.'
      },
      {
        id: 13,
        question: 'What is the purpose of the "asserts" keyword in TypeScript?',
        options: [
          'To throw an error if a condition is false',
          'To create assertion functions for type narrowing',
          'To assert that a value is truthy',
          'To perform runtime type checking'
        ],
        correctAnswer: 1,
        explanation: 'The "asserts" keyword is used to create assertion functions that narrow types based on runtime checks.'
      },
      {
        id: 14,
        question: 'Which advanced type technique allows you to create a type from string literals?',
        options: [
          'Template literal types',
          'String interpolation types',
          'Literal string types',
          'String pattern types'
        ],
        correctAnswer: 0,
        explanation: 'Template literal types use backticks and ${} syntax to create types from string patterns and manipulations.'
      },
      {
        id: 15,
        question: 'What is the correct way to define a recursive type in TypeScript?',
        options: [
          'type JSON = string | number | boolean | JSON[] | { [key: string]: JSON }',
          'type JSON = string | number | boolean | Array<JSON> | Record<string, JSON>',
          'Both A and B are correct',
          'Recursive types are not supported in TypeScript'
        ],
        correctAnswer: 2,
        explanation: 'Both syntaxes are valid for defining recursive types. TypeScript supports recursive type definitions for complex data structures.'
      }
    ]
  }
];