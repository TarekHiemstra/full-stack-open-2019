# countries
## 2.12\* Data for countries, step1

The API https://restcountries.eu provides a lot data for different countries in a machine readable format, a so-called REST API.

Create an application, in which one can look at data of various countries. The application should probably get the data from the endpoint all.

The user interface is very simple. The country to be shown is found by typing a search query into the search field.

If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific:

![fullstack content](https://fullstackopen.com/static/d8a3e3b3af8907d0c3dd495ef0d26ba6/14be6/19b1.png)

If there are fewer than ten countries, but more than one, then all countries matching the query are shown:

![fullstack content](https://fullstackopen.com/static/1d4ebf199806ccfe0df529c08e2a0c6d/14be6/19b2.png)

When there is only one country matching the query, then the basic data of the country, its flag and the languages spoken in that country are shown:

![fullstack content](https://fullstackopen.com/static/1d4bba516fb538c5214f37c4a2ab0f8e/14be6/19b3.png)

NB: it is enough that your application works for most of the countries. Some countries, like Sudan, can cause trouble, since the name of the country is part of the name of another country, South Sudan. You need not worry about these edge cases.

WARNING create-react-app will automatically turn your project into a git-repository unless you create your application inside of an existing git repository. Most likely you do not want each of your projects to be a separate repository, so simply run the rm -rf .git command at the root of your application.

## 2.13\*: Data for countries, step2
There is still a lot to do in this part, so don't get stuck on this exercise!

Improve on the application in the previous exercise, such that when the names of multiple countries are shown on the page there is a button next to the name of the country, which when pressed shows the view for that country:

![fullstack content](https://fullstackopen.com/static/b8986829d36bd14bbbd6270e0e8d2edf/14be6/19b4.png)

In this exercise it is also enough that your application works for most of the countries. Countries whose name appears in the name of another country, like Sudan can be ignored.

## 2.14\*: Data for countries, step3
There is still a lot to do in this part, so don't get stuck on this exercise!

Add to the view showing the data of a single country the weather report for the capital of that country. There are dozens of providers for weather data. We used https://www.apixu.com.

![fullstack content](https://fullstackopen.com/static/f81474494132d75fcd76a98297df6920/14be6/19b5.png)
