
-- USING FORIEN KEYS TO CONNECT TABLES

-- list of products including the name of the supplier
SELECT Products.ProductName, Suppliers.SupplierName
FROM Products
JOIN Suppliers ON Products.SupplierID = Suppliers.supplierID;





--list of products including the category name, organized by category.
--show the category name first.
select Categories.CategoryName, Products.ProductName
from Products
join Categories on Products.CategoryID = Categories.CategoryID
order by Categories.CategoryName;

-- shorter way to write the query above is to make the table name as a single letter.
-- And can change the column name as it appers on the result 
-- by using as (or just a space)
select C.CategoryName as Category, P.ProductName as Product
from Products as P
join Categories as C on P.CategoryID = C.CategoryID
order by C.CategoryName;


-- Added the Suppliers to the query that match the products.supplierID
select Categories.CategoryName as Category, 
    Products.ProductName as Product, 
    Suppliers.SupplierNAme as SuppliedBy
from Products
join Categories 
    on Products.CategoryID = Categories.CategoryID
join Suppliers 
    on Products.SupplierID = Suppliers.SupplierID
order by Categories.CategoryName;


-- list of posts with the user name of the post
-- this is an INNER jOIN
-- inner is not needed (its default)
select posts.contents as Quote, users.username as PostedBy
from posts
 inner join users on posts.user_id = users.id;


-- insert items into rows by calling the column and adding the value in parenthesies.
 insert into users (username) values ('confucius'), ('aristotle'), ('kanye');

-- this is a LEFT JOIN 
-- which will show the newly added users even if they don't have a quote
select users.username as Writer, posts.contents as Quotes 
from users left join posts on posts.user_id = users.id;


 -- to see a value without repeating use 'distinct'
 select distinct user_id from posts;


-- list if users that have posts
select DISTINCT users.username as Writer
from users
left join posts on posts.user_id = users.id
where posts.contents is not null;


-- list of users that do not have posts
select DISTINCT users.username as Writer
from users
left join posts on posts.user_id = users.id
where posts.contents is null;


-- seeing the number value of a table
select count(*) from posts;


-- to see how many posts a user has
select user_id, count(*) from posts
group by user_id; --piling the users into groups
