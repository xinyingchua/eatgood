<h1>eatgood.</h1>

<h2>Description</h2>
<a href = "https://eat-good.herokuapp.com/recipes">eatgood.</a> is a full-stack application for like minded people to come together, share and try healthy recipes. 
You can find inspiration on what to cook for your meals and eating clean does not have to be boring anymore 

<h2> Technologies / Dependencies </h2>
<li> 3 models with all 7 RESTful routes and full CRUD</li>
<li> MVC file structure: Models, Views, Controllers </li>
<li> Node.js, Mongoose, Express and EJS</li>
<li> Bcrpyt: Hash Generation</li>
<li> Dotenv</li>
<li> Express-session</li>
<li> Express-flash-message</li>
<li> Lodash</li>
<li> Method-Override</li>
<li> Moment</li>



<br />

<h2> Restful Routes</h2>

| **URL** | **HTTP Verb** |  **Action**|
|------------|-------------|------------|
| /recipes        | GET       | index  
| /recipes/new        | GET       | new  
| /recipes/:slug       | GET      | show
| /recipes/    | POST       | create 
| /recipes/:slug/edit     | GET       | edit       
|/recipes/:slug    |PATCH        | update
|/recipes/:slug    |DELETE        | destroy
|/users/dashboard      |GET        | dashboard    
|/recipes/:slug/ratings    |POST        | create new rating & review   
|/users/register   |GET        | show register page
|/users/register   |POST        | register new user
|/users/login |GET        | show login page
|/users/login |POST        | log in user
|/users/logout |POST        | log out user

<br />
<br />

<h2>Index</h2>
<img src="public/assets/index.png" width="700">
<br />



<h2> Approach Taken</h2>
<li> Brainstorm</li>
<li> Design wireframes on how the app should work</li>
<li> Create HTML - Views / Partials </li>
<li> Created database for seeding in MongoDB </li>
<li> Work on Models - Schema, virtual</li>
<li> Create Controllers for Recipes, Recipes Ratings, User </li>
<li> Deploy application to Heroku</li>

<br />

<h2> Unsolved Problems</h2>
<li> Application is not mobile responsive</li>
<li> Other users are able to make changes to recipes that are not posted by them</li>
<li> To create router</li>
