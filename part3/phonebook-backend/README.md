# phonebook-backend

NB: It's recommended to do all of the exercises from this part into a new dedicated git repository, and place your source code right at the root of the repository. Otherwise you will run into problems in exercise 3.10.

NB: Because this is not a frontend project and we are not working with React, the application is not created with create-react-app. You initialize this project with the npm init command that was demonstrated earlier in this part of the material.

Strong recommendation: When you are working on backend code, always keep an eye on what's going on in the terminal that is running your application.

## 3.1: Phonebook backend step1
Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons:

![fullstack content](https://fullstackopen.com/static/26ba32b70d616dfcb3b205941d6f8300/14be6/22e.png)

Notice that the forward slash in the route api/persons is not a special character, and is just like any other character in the string.

The application must be started with the command npm start.

The application must also offer an npm run watch command that will run the application and restart the server whenever changes are made and saved to a file in the source code.

## 3.2: Phonebook backend step2
Implement a page at the address http://localhost:3001/info that looks roughly like this:

![fullstack content](https://fullstackopen.com/static/a563a2056c3207a42cfe2d0a7d081c5a/14be6/23e.png)

The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.

## 3.3: Phonebook backend step3
Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.

## 3.4: Phonebook backend step4
Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

Test that your functionality works with either Postman or the Visual Studio Code REST client.

## 3.5: Phonebook backend step5
Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate id's is small.

## 3.6: Phonebook backend step6
Implement error handling for creating new entries. The request is not allowed to succeed, if:

The name or number is missing
The name already exists in the phonebook
Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.:

```javascript
{ error: 'name must be unique' }
```

## 3.7: Phonebook backend step7
Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.

The documentation for Morgan is not the best, and you may have to spend some time figuring out how to configure it correctly. However, most documentation in the world falls under the same category, so it's good to learn to decipher and interpret cryptic documentation in any case.

Morgan is installed just like all other libraries with the npm install command. Taking morgan into use happens the same as configuring any other middleware by using the app.use command.

## 3.8\*: Phonebook backend step8
Configure morgan so that it also shows the data sent in HTTP POST requests:

![fullstack content](https://fullstackopen.com/static/4ed4b48465d48df517158501c0be187e/14be6/24.png)

This exercise can be quite challenging, even though the solution does not require a lot of code.

This exercise can be completed in a few different ways. One of the possible solutions utilizes these two techniques:

creating new tokens
JSON.stringify
