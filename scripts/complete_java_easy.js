/**
 * Script to complete the java-easy.json file with all 100 questions from Java_Theory_Easy_100.txt
 */

const fs = require('fs');
const path = require('path');

// Define paths
const projectRoot = path.resolve(__dirname, '..', '..');
const jsonFilePath = path.join(__dirname, '..', 'data', 'java-easy.json');

console.log('Starting to update java-easy.json with all 100 questions');
console.log(`JSON file path: ${jsonFilePath}`);

try {
    // Read the current json file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    
    // Check how many questions we already have
    const currentCount = jsonData.questions.length;
    console.log(`Current question count: ${currentCount}`);
    
    // Define the remaining questions (33-100)
    const remainingQuestions = [
        {
            "id": "java-easy-033",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the Stream API?",
            "answer": "A sequence of elements that supports various aggregate operations (like `filter`, `map`, `reduce`) to perform computations on data."
        },
        {
            "id": "java-easy-034",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the difference between intermediate and terminal operations in a Stream?",
            "answer": "Intermediate operations (e.g., `filter`, `map`) return a new stream and are lazy. Terminal operations (e.g., `forEach`, `collect`) produce a result or side-effect and trigger the stream processing."
        },
        {
            "id": "java-easy-035",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `Optional` class?",
            "answer": "A container object which may or may not contain a non-null value. It is used to avoid `NullPointerException`."
        },
        {
            "id": "java-easy-036",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What are default methods in interfaces?",
            "answer": "Methods in an interface that have an implementation. They allow adding new functionality to existing interfaces without breaking implementing classes."
        },
        {
            "id": "java-easy-037",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What are static methods in interfaces?",
            "answer": "Methods that belong to the interface itself, not to any instance of an implementing class. They can be called directly on the interface."
        },
        {
            "id": "java-easy-038",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `forEach()` method in Java 8?",
            "answer": "A terminal operation in the Stream API and a method on `Iterable` that performs an action for each element."
        },
        {
            "id": "java-easy-039",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the purpose of the `filter()` method in a Stream?",
            "answer": "To select elements from a stream that match a given predicate (a condition that returns true or false)."
        },
        {
            "id": "java-easy-040",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the purpose of the `map()` method in a Stream?",
            "answer": "To transform each element of a stream into another object using a given function."
        },
        {
            "id": "java-easy-041",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is a `Predicate`?",
            "answer": "A functional interface that represents a function taking one argument and returning a boolean. Used in `filter()`."
        },
        {
            "id": "java-easy-042",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is a `Function`?",
            "answer": "A functional interface that represents a function taking one argument and producing a result. Used in `map()`."
        },
        {
            "id": "java-easy-043",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is a `Consumer`?",
            "answer": "A functional interface that represents an operation that accepts a single input argument and returns no result. Used in `forEach()`."
        },
        {
            "id": "java-easy-044",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is a `Supplier`?",
            "answer": "A functional interface that represents a supplier of results, taking no arguments."
        },
        {
            "id": "java-easy-045",
            "type": "theory",
            "difficulty": "Easy",
            "question": "Can a lambda expression access instance variables?",
            "answer": "Yes, it can access instance variables and static variables from its enclosing scope."
        },
        {
            "id": "java-easy-046",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What does \"effectively final\" mean?",
            "answer": "A local variable that is not declared `final` but whose value is never changed after initialization. Lambda expressions can access these variables."
        },
        {
            "id": "java-easy-047",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `::` (double colon) operator?",
            "answer": "It's the method reference operator, used to refer to a method without invoking it. It provides a shorthand for certain lambda expressions."
        },
        {
            "id": "java-easy-048",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `collect()` terminal operation used for?",
            "answer": "To perform a mutable reduction operation on the elements of a stream, such as collecting them into a `List`, `Set`, or `Map`."
        },
        {
            "id": "java-easy-049",
            "type": "theory",
            "difficulty": "Easy",
            "question": "How do you find the count of elements in a Stream?",
            "answer": "By using the `count()` terminal operation."
        },
        {
            "id": "java-easy-050",
            "type": "theory",
            "difficulty": "Easy",
            "question": "How do you create a Stream?",
            "answer": "From a collection (e.g., `list.stream()`), from an array (e.g., `Arrays.stream(arr)`), or using factory methods like `Stream.of()`."
        },
        {
            "id": "java-easy-051",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What was the major change in Java 9?",
            "answer": "The Java Platform Module System (JPMS), which allows applications to be assembled from modules."
        },
        {
            "id": "java-easy-052",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is `jshell`? (Java 9)",
            "answer": "An interactive Read-Eval-Print Loop (REPL) tool that allows you to execute Java code snippets without needing to write a full class."
        },
        {
            "id": "java-easy-053",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What are private methods in interfaces? (Java 9)",
            "answer": "Private helper methods that can be used within an interface to share code between default and static methods, without exposing the implementation details."
        },
        {
            "id": "java-easy-054",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `var` keyword? (Java 10)",
            "answer": "It allows for Local-Variable Type Inference. The compiler infers the type of a local variable based on the value assigned to it."
        },
        {
            "id": "java-easy-055",
            "type": "theory",
            "difficulty": "Easy",
            "question": "Can `var` be used for instance variables or method parameters?",
            "answer": "No, `var` can only be used for local variables inside methods, in `for` loops, and with `try-with-resources`."
        },
        {
            "id": "java-easy-056",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the new HTTP Client API? (Java 11)",
            "answer": "A modern, standardized API for making HTTP requests, supporting HTTP/1.1, HTTP/2, and WebSockets. It replaces the old `HttpURLConnection`."
        },
        {
            "id": "java-easy-057",
            "type": "theory",
            "difficulty": "Easy",
            "question": "How do you run a single-file source-code program? (Java 11)",
            "answer": "You can run a `.java` file directly from the command line using `java MyFile.java` without compiling it first with `javac`."
        },
        {
            "id": "java-easy-058",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the purpose of the `of()` factory methods for collections? (Java 9)",
            "answer": "To create unmodifiable (immutable) collections like `List.of()`, `Set.of()`, and `Map.of()` with a concise syntax."
        },
        {
            "id": "java-easy-059",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `takeWhile` method on Streams? (Java 9)",
            "answer": "An intermediate operation that returns elements from a stream as long as a given predicate is true. It stops as soon as the predicate becomes false."
        },
        {
            "id": "java-easy-060",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `dropWhile` method on Streams? (Java 9)",
            "answer": "An intermediate operation that discards elements from a stream as long as a given predicate is true. It returns the rest of the stream once the predicate becomes false."
        },
        {
            "id": "java-easy-061",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `ofNullable` method on Streams? (Java 9)",
            "answer": "A static method `Stream.ofNullable(obj)` that returns an empty stream if the object is null, or a stream with a single element if it's not null."
        },
        {
            "id": "java-easy-062",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `ifPresentOrElse` method on `Optional`? (Java 9)",
            "answer": "It allows you to perform an action if a value is present, or run a different action (a `Runnable`) if the `Optional` is empty."
        },
        {
            "id": "java-easy-063",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `or` method on `Optional`? (Java 9)",
            "answer": "It allows you to provide an alternative `Optional` from a `Supplier` if the original `Optional` is empty."
        },
        {
            "id": "java-easy-064",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `isBlank()` method on `String`? (Java 11)",
            "answer": "It returns `true` if the string is empty or contains only white space characters."
        },
        {
            "id": "java-easy-065",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `lines()` method on `String`? (Java 11)",
            "answer": "It returns a `Stream<String>` of lines extracted from the string, separated by line terminators."
        },
        {
            "id": "java-easy-066",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `strip()` method on `String`? (Java 11)",
            "answer": "It removes leading and trailing whitespace. It is Unicode-aware, unlike `trim()`."
        },
        {
            "id": "java-easy-067",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `repeat()` method on `String`? (Java 11)",
            "answer": "It returns a new string which is the original string concatenated with itself a given number of times."
        },
        {
            "id": "java-easy-068",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `asMatchPredicate()` method on `Pattern`? (Java 11)",
            "answer": "It creates a `Predicate` that tests if a string matches the given regular expression pattern."
        },
        {
            "id": "java-easy-069",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `not()` predicate method? (Java 11)",
            "answer": "A static method `Predicate.not()` that takes another predicate and returns its logical negation."
        },
        {
            "id": "java-easy-070",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the purpose of the `toArray(IntFunction)` method on collections? (Java 11)",
            "answer": "It provides a more convenient way to create a typed array from a collection's elements, for example: `list.toArray(String[]::new)`."
        },
        {
            "id": "java-easy-071",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What are Switch Expressions? (Java 14)",
            "answer": "An enhanced form of the `switch` statement that can be used as an expression to return a value. It uses `->` syntax and doesn't require `break` statements."
        },
        {
            "id": "java-easy-072",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What are Text Blocks? (Java 15)",
            "answer": "A multi-line string literal that avoids the need for most escape sequences. It starts with `\"\"\"` followed by a newline and ends with `\"\"\"`."
        },
        {
            "id": "java-easy-073",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What are Records? (Java 16)",
            "answer": "A concise way to create immutable data carrier classes. The compiler automatically generates the constructor, getters, `equals()`, `hashCode()`, and `toString()` methods."
        },
        {
            "id": "java-easy-074",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is `instanceof` Pattern Matching? (Java 16)",
            "answer": "It simplifies `instanceof` checks by allowing you to declare a variable in the `if` condition, which is automatically cast to the target type. Example: `if (obj instanceof String s) { ... }`."
        },
        {
            "id": "java-easy-075",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What are Sealed Classes? (Java 17)",
            "answer": "Classes and interfaces that restrict which other classes or interfaces may extend or implement them, using the `sealed` and `permits` keywords."
        },
        {
            "id": "java-easy-076",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What does it mean for a class to be `non-sealed`?",
            "answer": "A class that is permitted to extend a sealed class but is itself open for extension by any other class."
        },
        {
            "id": "java-easy-077",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `yield` keyword in a switch expression?",
            "answer": "It is used to produce a value from a code block within a `case` of a switch expression."
        },
        {
            "id": "java-easy-078",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `->` (arrow) syntax in a switch expression?",
            "answer": "It separates the `case` label from the code to be executed or the value to be returned, without fall-through."
        },
        {
            "id": "java-easy-079",
            "type": "theory",
            "difficulty": "Easy",
            "question": "Can a record have instance fields other than those in the header?",
            "answer": "No, records cannot declare additional instance fields. They can, however, have static fields."
        },
        {
            "id": "java-easy-080",
            "type": "theory",
            "difficulty": "Easy",
            "question": "Can a record extend another class?",
            "answer": "No, a record implicitly extends `java.lang.Record` and cannot extend any other class."
        },
        {
            "id": "java-easy-081",
            "type": "theory",
            "difficulty": "Easy",
            "question": "Can a record implement an interface?",
            "answer": "Yes, a record can implement one or more interfaces."
        },
        {
            "id": "java-easy-082",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the purpose of a compact constructor in a record?",
            "answer": "To add validation or normalization logic without having to write out the full canonical constructor. It doesn't have a parameter list."
        },
        {
            "id": "java-easy-083",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `formatted()` method on `String`? (Java 15)",
            "answer": "An instance method that provides a convenient way to format a string, similar to `String.format()`. Example: `\"%s: %d\".formatted(\"Value\", 10)`."
        },
        {
            "id": "java-easy-084",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `toList()` method on Streams? (Java 16)",
            "answer": "A more concise terminal operation for collecting stream elements into an unmodifiable list, replacing `collect(Collectors.toList())`."
        },
        {
            "id": "java-easy-085",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `mapMulti()` method on Streams? (Java 16)",
            "answer": "An intermediate operation similar to `flatMap`, but sometimes more efficient, especially when a mapping function produces a small number of results."
        },
        {
            "id": "java-easy-086",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is Pattern Matching for `switch`? (Preview in Java 17+, Standard in 21)",
            "answer": "It allows you to test a variable against multiple patterns in a `switch` statement or expression, including type patterns and `when` clauses for more refined conditions."
        },
        {
            "id": "java-easy-087",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What are Virtual Threads? (Java 21)",
            "answer": "Lightweight threads managed by the JVM, not the OS. They are cheap to create and block on, making them ideal for high-throughput concurrent applications."
        },
        {
            "id": "java-easy-088",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the main benefit of Virtual Threads?",
            "answer": "They allow writing simple, synchronous-style code that scales to millions of concurrent tasks, without the complexity of asynchronous programming."
        },
        {
            "id": "java-easy-089",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What are Sequenced Collections? (Java 21)",
            "answer": "A new set of interfaces (`SequencedCollection`, `SequencedSet`, `SequencedMap`) that provide a unified API for collections with a defined encounter order, adding methods like `getFirst()`, `getLast()`, `addFirst()`, `addLast()`, and `reversed()`."
        },
        {
            "id": "java-easy-090",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `reversed()` method on a Sequenced Collection?",
            "answer": "It returns a reversed-order view of the collection. For a `List`, it's a `List`; for a `Set`, it's a `SequencedSet`."
        },
        {
            "id": "java-easy-091",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What are String Templates? (Preview in Java 21+)",
            "answer": "A feature that simplifies creating strings with embedded expressions, offering a safer and more powerful alternative to string concatenation or `String.format()`. Example: `STR.\"My name is \\{name}.\"`."
        },
        {
            "id": "java-easy-092",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `STR` template processor?",
            "answer": "The standard template processor for simple string interpolation."
        },
        {
            "id": "java-easy-093",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What are Unnamed Patterns and Variables? (Preview in Java 21+)",
            "answer": "The use of an underscore `_` as a placeholder for a variable name or pattern that is required by syntax but not used, improving code readability."
        },
        {
            "id": "java-easy-094",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the purpose of the Foreign Function & Memory (FFM) API? (Java 22)",
            "answer": "To provide a safe and efficient way for Java programs to interoperate with code and data outside of the Java runtime (e.g., calling native C libraries)."
        },
        {
            "id": "java-easy-095",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is Structured Concurrency? (Preview in Java 21+)",
            "answer": "An API that simplifies concurrent programming by treating multiple tasks running in different threads as a single unit of work, ensuring better error handling and cancellation."
        },
        {
            "id": "java-easy-096",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `ScopedValue` class? (Preview in Java 21+)",
            "answer": "A mechanism to share data within and across threads for a limited period, intended as a more robust alternative to thread-local variables, especially with virtual threads."
        },
        {
            "id": "java-easy-097",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `switch` `when` clause? (Part of Pattern Matching for switch)",
            "answer": "A guarded pattern that adds a boolean condition to a `case` label, allowing for more refined control flow. Example: `case String s when s.length() > 5 -> ...`."
        },
        {
            "id": "java-easy-098",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the `null` case in a `switch`? (Java 21)",
            "answer": "`switch` statements and expressions can now handle `null` directly with `case null`, avoiding the need for a separate null check before the switch."
        },
        {
            "id": "java-easy-099",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the main goal of Project Loom?",
            "answer": "To dramatically simplify concurrent programming in Java by introducing lightweight, user-mode threads (Virtual Threads) and other concurrency features like Structured Concurrency."
        },
        {
            "id": "java-easy-100",
            "type": "theory",
            "difficulty": "Easy",
            "question": "What is the main goal of Project Amber?",
            "answer": "To evolve the Java language with smaller, productivity-oriented features like `var`, records, text blocks, and pattern matching."
        }
    ];
    
    // Add the new questions to the existing ones
    jsonData.questions = [...jsonData.questions, ...remainingQuestions];
    
    // Update the totalQuestions count
    jsonData.pagination.totalQuestions = jsonData.questions.length;
    
    // Write the updated data back to the file
    console.log(`About to write file with ${jsonData.questions.length} questions`);
    console.log(`JSON file path being used: ${jsonFilePath}`);
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
        console.log(`File write successful`);
    } catch (err) {
        console.error(`Error writing file: ${err.message}`);
    }
    
    console.log(`Successfully updated java-easy.json with ${jsonData.questions.length} questions`);
    
} catch (error) {
    console.error('Error updating the file:', error);
}
