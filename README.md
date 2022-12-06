# React-Express-GraphQL-Project
This repository contain 4 part, 2 React.js project, one express project and one apollo express project. This repository mainly foucs on develop a social media project and a admin project for manage the social media website. Run on Node v16.17.0 and using NPM 8.11.0 intall pageage.


### Architecture diagram of porject 
![architecture diagram ](https://firebasestorage.googleapis.com/v0/b/whitegive-bc20c.appspot.com/o/images%2FReact%20diagram.png?alt=media&token=05e5afb6-96d5-49bb-b5fc-9cefc31a1f36)

### Features:
* Social media web application
  * Sign in
   <br>User able to use email and password to log in Social media website. User also need to pass multifactor authentication. 
  * Sign up
   <br>User need to enter name,email and password to sign up Social media website. The name,email and password can be verify by front- end and back-end.
  * Profile 
   <br>User able to see the personal detail in the profile page. User also can modify their account detail.
  * Make a Post
    <br>User can posting their information in the posting page, such as Image, text.
  * Reply a post & reply 
    <br>User able to reply a post or a reply.
  * Follow & Unfollow 
    <br>User able to follow a user or unfollow a user.
  * Post reactions
    <br>User able to click "Like" button or "Dislike" button for post.User can share their preference for post.
 * Admin web application
   * Disable post 
   <br>administrator can disable a post if deemed inappropriate(Dirty word).
   * Block User and unblock user 
   <br>administrator blocking a user will not allow a user to login until the admin unblocks the account
   * Number of users using social media website per day
    <br>The bar chart will show the number of user login social media website everyday. 
   * User post reaction metrics
    <br>The 2 bar chart will show the count of post preference for every user. 
   * Profile visits
    <br>The line chart will show the number of user's profile has been visit for each user. 
   * Top 10 Follower metrics
    <br>The bar chart will show the Top 10 Follower of blogger in the Metrics. 

###  what to install
Install Node v16.17.0 , NPM 8.11.0 and MySQL are necessary.

###  NPM pageage:
    react-moment
    react-toastify
    uuid
    react-bootstrap
    moment
    moment-timezone
    firebase
    bootstrap
    @emailjs/browser
    react-quill
    axios
    argon2
    jest
    mysql2
    sequelize
    @graphql-tools/schema
    apollo-server-core
    apollo-server-express
    bad-words
    graphql
    graphql-type-uuid
    chart.js
    react-chartjs-2