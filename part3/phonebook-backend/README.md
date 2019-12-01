# phonebook-backend

**NB:** It's recommended to do all of the exercises from this part into a new dedicated git repository, and place your source code right at the root of the repository. Otherwise you will run into problems in exercise 3.10.

**NB:** Because this is not a frontend project and we are not working with React, the application <strong>is not created</strong> with create-react-app. You initialize this project with the <em>npm init</em> command that was demonstrated earlier in this part of the material.

**Strong recommendation:** When you are working on backend code, always keep an eye on what's going on in the terminal that is running your application.

## 3.1: Phonebook backend step1

Implement a Node application that returns a hardcoded list of phonebook entries from the address <http://localhost:3001/api/persons>:

![fullstack content](https://fullstackopen.com/static/26ba32b70d616dfcb3b205941d6f8300/14be6/22e.png)

Notice that the forward slash in the route <i>api/persons</i> is not a special character, and is just like any other character in the string. 

The application must be started with the command _npm start_.

The application must also offer an _npm run watch_ command that will run the application and restart the server whenever changes are made and saved to a file in the source code.

## 3.2: Phonebook backend step2

Implement a page at the address <http://localhost:3001/info> that looks roughly like this:

![fullstack content](https://fullstackopen.com/static/a563a2056c3207a42cfe2d0a7d081c5a/14be6/23e.png)

The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.

## 3.3: Phonebook backend step3

Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be <http://localhost:3001/api/persons/5>

If an entry for the given id is not found, the server has to respond with the appropriate status code.

## 3.4: Phonebook backend step4

Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

Test that your functionality works with either Postman or the Visual Studio Code REST client.

## 3.5: Phonebook backend step5

Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address <http://localhost:3001/api/persons>.

Generate a new id for the phonebook entry with the [Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) function. Use a big enough range for your random values so that the likelihood of creating duplicate id's is small.

## 3.6: Phonebook backend step6

Implement error handling for creating new entries. The request is not allowed to succeed, if:
- The name or number is missing 
- The name already exists in the phonebook

Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.:

```js
{ error: 'name must be unique' }
```

## 3.7: Phonebook backend step7

Add the [morgan](https://github.com/expressjs/morgan) middleware to your application for logging. Configure it to log messages to your console based on the <i>tiny</i> configuration.

The documentation for Morgan is not the best, and you may have to spend some time figuring out how to configure it correctly. However, most documentation in the world falls under the same category, so it's good to learn to decipher and interpret cryptic documentation in any case.

Morgan is installed just like all other libraries with the _npm install_ command. Taking morgan into use happens the same as configuring any other middleware by using the _app.use_ command.

## 3.8\*: Phonebook backend step8

Configure morgan so that it also shows the data sent in HTTP POST requests:

![fullstack content](https://fullstackopen.com/static/4ed4b48465d48df517158501c0be187e/14be6/24.png)

This exercise can be quite challenging, even though the solution does not require a lot of code.

This exercise can be completed in a few different ways. One of the possible solutions utilizes these two techniques:
- [creating new tokens](https://github.com/expressjs/morgan#creating-new-tokens)
- [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

The following exercises don't require many lines of code. They can however be challenging, because you must understand exactly what is happening and where, and the configurations must be just right. 

## 3.9 phonebook backend step9

Make the backend work with the frontend from the previous part. Do not implement the functionality for making changes to the phone numbers yet, that will be implemented in exercise 3.17. 

You will probably have to do some small changes to the frontend, at least to the URLs for the backend. Remember to keep the developer console open in your browser. If some HTTP requests fail, you should check from the <i>Network</i>-tab what is going on. Keep an eye on the backend's console as well. If you did not do the previous exercise, it is worth it to print the request data or <i>request.body</i> to the console in the event handler responsible for POST requests. 

## 3.10 phonebook backend step10

Deploy the backend to the internet, for example to Heroku. 

**NB** the command _heroku_ works on the department's computers and the freshman laptops. If for some reason you cannot [install](https://devcenter.heroku.com/articles/heroku-cli) Heroku to your computer, you can use the command [npx heroku-cli](https://www.npmjs.com/package/heroku-cli).

Test the deployed backend with a browser and Postman or VS Code REST client to ensure it works. 

**PRO TIP:** When you deploy your application to Heroku, it is worth it to at least in the beginning keep an eye on the logs of the heroku application **AT ALL TIMES** with the command <em>heroku logs -t</em>.

The following is a log about one typical problem. Heroku cannot find application dependency <i>express</i>:

![fullstack content](https://fullstackopen.com/static/9c32d4d565c7179d84334ba086ed03b9/14be6/33.png)

The reason is that the option <i>--save</i> was forgotten when <i>express</i> was installed, so information about the dependency was not saved to the file <i>package.json</i>.

Another typical problem is that the application is not configured to use the port set to environment variable <em>PORT</em>: 

![fullstack content](https://fullstackopen.com/static/ca43fb98bc62fbd1d6a918b4d965274e/14be6/34.png)

Create a README.md at the root of your repository, and add a link to your online application to it. 

## 3.11 phonebook full stack

Generate a production build of your frontend, and add it to the internet application using the method introduced in this part. 

**NB** Make sure the directory <i>build</i> is not gitignored

Also make sure that the frontend still works locally. 

## 3.12: Command-line database

Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas. 

Create a <i>mongo.js</i> file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

**NB** Do not include the password in the file that you commit and push to GitHub! 

The application should work as follows. You use the program by passing three command-line arguments (the first is the password), e.g.:

```bash
node mongo.js yourpassword Anna 040-1234556
```

As a result, the application will print:

```bash
added Anna number 040-1234556 to phonebook
```

The new entry to the phonebook will be saved to the database. Notice that if the name contains whitespace characters, it must be enclosed in quotes:

```bash
node mongo.js yourpassword "Arto Vihavainen" 040-1234556
```

If the password is the only parameter given to the program, meaning that it is invoked like this:

```bash
node mongo.js yourpassword
```

Then the program should display all of the entries in the phonebook:

<pre>
phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236
</pre>

You can get the command-line parameters from the [process.argv](https://nodejs.org/docs/latest-v8.x/api/process.html#process_process_argv) variable.

**NB: do not close the connection in the wrong place**. E.g. the following code will not work:

```js
Person
  .find({})
  .then(persons=> {
    // ...
  })

mongoose.connection.close()
```

In the code above the <i>mongoose.connection.close()</i> command will get executed immediately after the <i>Person.find</i> operation is started. This means that the database connection will be closed immediately, and the execution will never get to the point where <i>Person.find</i> operation finishes and the <i>callback</i> function gets called.

The correct place for closing the database connection is at the end of the callback function:

```js
Person
  .find({})
  .then(persons=> {
    // ...
    mongoose.connection.close()
  })
```

**NB2** if you define a model with the name <i>Person</i>, mongoose will automatically name the associated collection as <i>people</i>.

The following exercises are pretty straightforward, but if your frontend stops working with the backend, then finding and fixing the bugs can be quite interesting.

## 3.13: Phonebook database, step1

Change the fetching of all phonebook entries so that the data is <i>fetched from the database</i>.

Verify that the frontend works after the changes have been made.

In the following exercises, write all Mongoose-specific code into its own module, just like we did in the chapter [Database configuration into its own module](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#database-configuration-into-its-own-module).

## 3.14: Phonebook database, step2

Change the backend so that new numbers are <i>saved to the database</i>. Verify that your frontend still works after the changes.

At this point, you can choose to simply allow users to create all phonebook entries. At this stage, the phonebook can have multiple entries for a person with the same name.


## 3.15: Phonebook database, step3

Change the backend so that deleting phonebook entries is reflected in the database.

Verify that the frontend still works after making the changes.

## 3.16: Phonebook database, step4

Move the error handling of the application to a new error handler middleware.

## 3.17\*: Phonebook database, step5

If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.

Modify the backend to support this request.

Verify that the frontend works after making your changes.

## 3.18\*: Phonebook database step6

Also update the handling of the <i>api/persons/:id</i> and <i>info</i> routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.

Inspecting an individual phonebook entry from the browser should look like this:

![fullstack content](https://fullstackopen.com/static/853a1d57372a2b5c8fc1249b682d59a7/14be6/49.png)

## 3.19: Phonebook database, step7

Add validation to your application, that will make sure that you can only add one number for a person in the phonebook. Our current frontend won't allow users to try and create duplicates, but we can attempt to create them directly with Postman or the VS Code REST client.

Mongoose does not offer a built-in validator for this purpose. Install the [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator#readme) package with npm and use it instead.

If an HTTP POST request tries to add a name that is already in the phonebook, the server must respond with an appropriate status code and error message.

## 3.20\*: Phonebook database, step8

Expand the validation so that the name stored in the database has to be at least three characters long, and the phone number must have at least 8 digits.

Expand the frontend so that it displays some form of error message when a validation error occurs. Error handling can be implemented by adding a <em>catch</em> block as shown below:

```js
personService
    .create({ ... })
    .then(createdPerson => {
      // ...
    })
    .catch(error => {
      // this is the way to access the error message
      console.log(error.response.data)
    })
```

You can display the default error message returned by Mongoose, even though they are not as readable as they could be:

![fullstack content](https://fullstackopen.com/static/fddf847e340f060549c3029f464a5493/14be6/56e.png)

## 3.21 Deploying the database backend to production

Generate a new "full stack" version of the application by creating a new production build of the frontend, and copy it to the backend repository. Verify that everything works locally by using the entire application from the address <https://localhost:3001>.

Push the latest version to Heroku and verify that everything works there as well.
