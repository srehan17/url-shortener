# URL Shortener - generates short numeric URLs

What the application does:
> Users can submit a full length URL to get a short numeric URL.
> Users can see a list of original urls and short url.
> Users can delete a url from the list.
> Users can see flash messages when a url is added or deleted.
> Submitting an invalid URL that doesn't follow the https://www.example.com format gives an error message.

To get it up and running:
> Create a MongoDB database on MongoDB Atlas
> Clone this git repository
> Install dependencies: npm install
> Create .env file in the root folder and add the MONGO_URI environment variable following the steps in MongoDB Atlas.
> Run server: node server.js