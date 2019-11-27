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
