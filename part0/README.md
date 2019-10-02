# [Exercises Part 0](https://fullstackopen.com/en/part0/fundamentals_of_web_apps)

In this part there are three exercises (exercise 0.4, 0.5 and 0.6) that have to be submitted to GitHub. The idea of these exercises is to read the text through once more, and to think through what is going on where.

### 0.1: HTML
Review the basics of HTML by reading this tutorial from Mozilla: [HTML tutorial](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics).This exercise is not submitted to GitHub, it's enough to just read the tutorial

### 0.2: CSS
Review the basics of CSS by reading this tutorial from Mozilla: [CSS tutorial](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics). This exercise is not submitted to GitHub, it's enough to just read the tutorial

### 0.3: HTML forms
Learn about the basics of HTML forms by reading Mozilla's tutorial [Your first form](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form). This exercise is not submitted to GitHub, it's enough to just read the tutorial

### 0.4: new note
In chapter Loading a page containing JavaScript - revised the chain of events caused by opening the page https://fullstack-exampleapp.herokuapp.com/notes is depicted as a sequence diagram

    browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
    server-->browser: HTML-code
    browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
    server-->browser: main.css
    browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
    server-->browser: main.js

    note over browser:
    browser starts executing js-code
    that requests JSON data from server 
    end note

    browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
    server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

    note over browser:
    browser executes the event handler
    that renders notes to display
    end note

Create a similar diagram depicting the situation where the user creates a new note on page https://fullstack-exampleapp.herokuapp.com/notes by writing something into the text field and clicking the submit button.

If necessary, show operations on the browser or on the server as comments on the diagram.

The diagram does not have to be a sequence diagram. Any sensible way of presenting the events is fine.

All necessary information for doing this, and the next three exercises, can be found from the text of this part. The idea of these exercises is to read the text through once more, and to think through what is going on where. Reading the application code is not necessary, but it is of course possible.

### 0.5: Single page app

Create a diagram depicting the situation where the user goes to the single page app version of the notes app at https://fullstack-exampleapp.herokuapp.com/spa.

### 0.6: New note

Create a diagram depicting the situation, where user creates a new note using the single page version of the app.

This was the last exercise, and it's time to push your answers to GitHub and mark the exercises as done in the submission application.
