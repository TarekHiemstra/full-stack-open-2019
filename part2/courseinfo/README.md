# courseinfo
## 2.1: course contents step6
Let's finish the code for rendering course contents from exercises 1.1 - 1.5. You can start with the code from the model answers.

Note that if you copy a project from one place to another, you might have to destroy the node_modules directory and install the dependencies again with the command npm install before you can start the application. It might not be good to copy a project or to put the node_modules directory into the version control per se.

Let's change the App component like so: 

```javascript
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}
```
Define a component responsible for formatting a single course called Course.

The component structure of the application can be, for example, the following: 

```
App
  Course
    Header
    Content
      Part
      Part
      ...

```
Hence, the Course component contains the components defined in the previous part, which are responsible for rendering the course name and its parts.

The rendered page can, for example, look as follows:

![fullstack content](https://fullstackopen.com/static/6e12df59c1c9e28c39ebdbe1b41ccf97/14be6/8e.png)

You don't need the sum of the exercises yet.

The application must work regardless of the number of parts a course has, so make sure the application works if you add or remove parts of a course.

Ensure that the console shows no errors!
## 2.2: Course contents step7

Show also the sum of the exercises of the course.

![fullstack content](https://fullstackopen.com/static/2d8aa950189db6cf2eeb794181429ae9/14be6/9e.png)

2.3\*: Course contents step8

If you haven't done so already, calculate the sum of exercises with the array method reduce.

Pro tip: when your code looks as follows:

```javascript
const total = 
  parts.reduce( (s, p) => someMagicHere )
```

and does not work, it's worth to use console.log, which requires the arrow function to be written in its longer form:

```javascript
const total = parts.reduce( (s, p) => {
  console.log('what is happening', s, p)
  return someMagicHere 
})
```

Pro tip2: There is a plugin for VS code that automatically changes short form arrow functions into their longer form, and vice versa. 


![fullstack content](https://fullstackopen.com/static/3d941b76fc2e66aa39e0198aa1ef0a56/14be6/5b.png)

## 2.4: Course contents step9

Let's extend our application to allow for an arbitrary number of courses:

```javascript
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      // ...
    </div>
  )
}
```

The application can, for example, look like this: 

![fullstack content](https://fullstackopen.com/static/8c1ce3363ec056cd15c5edacbeec3370/14be6/10e.png)

## 2.5: separate module

Declare the Course component as a separate module, which is imported by the App component. You can include all subcomponents of the course into the same module. 
