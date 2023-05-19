# BC-M14-Blog
AS A developer who writes about tech I WANT a CMS-style blog site SO THAT I can publish articles, blog posts, and my thoughts and opinions

# Who
This application is part of a bootcamp and could be useful to others learning javascript and an example application. 

# What
Is a simple javascript application leverage node and express for serving content from a mysql database.
It is leveraging handlebars as part of an MVC implementation pattern.  
![image](https://github.com/CodeByDex/BC-M14-Blog/assets/119005046/f1ce9a99-27c9-4160-848a-3b9b6e827ce3)


# Where
This application be found at: https://tranquil-escarpment-89879.herokuapp.com/

# How
To develop against this application you will need to run `npm i` to install depedency applications.

You will need to run the `db/schema.sql` to generate the required database for this application. 

If you are going to work on styling you will need to complete npx installation for tailwindcss.
Recommend consulting tailwinds documentation for this: https://tailwindcss.com/docs/installation
Once you've installed tailwinds anytime you are making styling updates you will need to run:
```npx tailwindcss -i ./public/css/styles.css -o ./public/css/output.css --watch```

Before running the application for the first time you will need to setup a .env with the following keys provided:
DB_Name = "blog_db"  
DB_User = "dbuser"  
DB_PW = "dbpw"  
landscape = "local"  

## Sources
Leveraging tailwindcss examples for various styling on the site.
https://tailwindcss.com/docs/container
