# Northcoders News API

## Project Overview

This project is a RESTful API for a news website, providing endpoints to retrieve articles, topics, comments, and users. It also allows for posting comments, updating article votes, and deleting comments.

## Setup Instructions

To run this project locally, you need to set up environment variables that are necessary to connect to the two PostgreSQL databases (development and test).

### Environment Variables

As `.env` files are included in the `.gitignore`, you will need to create the following files in the root of the project directory:

#### 1. `.env.development`

This file contains the environment variables for the development database.

```plaintext
PGDATABASE=nc_news
