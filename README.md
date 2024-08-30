# NC News API

## Overview

NC News API is a RESTful web service built with Node.js, Express, and PostgreSQL. It is the backend for a news platform, allowing users to interact with articles, comments, topics, and user profiles through various endpoints. Key features include filtering, sorting, commenting, and more, following best practices in API development.

**Hosted Version**: [NC News API on Render](https://nc-project-5d75.onrender.com/api/)

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v14.0.0 or later
- **PostgreSQL**: v12.0 or later
- **Git**

### Installation

1. Clone the repository and navigate into it:

   ```bash
   git clone https://github.com/your-username/nc-news.git
   cd nc-news
2. Install dependencies:
    ```bash
   npm install
   
3. Set up your PostgreSQL databases:
         ```bash
      CREATE DATABASE nc_news;
      CREATE DATABASE nc_news_test;
4. Configure environment variables:
   Create a .env file in the root directory:
         ```bash 
      PGDATABASE=nc_news
      PGDATABASE_TEST=nc_news_test
5. Seed the local database:
   ```bash
   npm run seed
   
6. Run tests:
      ```bash
         npm test

## API Endpoints
/api/topics: GET - Retrieve all topics.

/api/articles: GET - Retrieve all articles; supports filtering, sorting, and pagination.

/api/articles/:article_id: GET - Retrieve a single article by ID.

/api/articles/:article_id/comments: GET - Retrieve comments for an article.

/api/users: GET - Retrieve all users.

/api/comments/:comment_id: DELETE - Delete a comment by ID.

For full endpoint details, refer to the API documentation.


# Usage
Start the server locally:
      ```bash
         npm start
         The API will run on the port defined in your environment variables (default is 3000). Use tools like Postman or cURL to interact with the API.

# Development
To contribute:

1.Fork the repository on GitHub.

2.Clone your fork to your local machine.

3.Create a new branch:
      ```bash
      git checkout -b feature/your-feature-name
      
4.Make changes, commit, and push to your fork.
5.Create a pull request against the main repository.

Ensure your code follows coding standards and passes all tests.

# Contributing
Contributions are welcome!
## License

This project is licensed under the MIT License, which allows you to freely use, modify, and distribute the software. However, it comes without any warranty, and the original author is not liable for any damages arising from its use. 

For the full license text, please refer to the [LICENSE](./LICENSE) file included in this repository.


# Contact
For questions or support:

Name:yaseen fehad
Email: yaseenfehad@gmail.com
GitHub: yas-feh21