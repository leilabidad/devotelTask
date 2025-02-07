# Job Offers API with NestJS and MySQL

## 📋 Project Description
A NestJS backend application that fetches job offers from two different APIs, transforms the data into a unified structure, stores it in a MySQL database, and provides an API for retrieving and filtering the data.

## 🚀 Features
- Fetch data from multiple APIs
- Data transformation and normalization
- Store data in MySQL with no duplicates
- Scheduled data fetching (Cron Job)
- REST API for retrieving job offers with filtering and pagination
- Comprehensive error handling

## 🛠 Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/leilabidad/devotel.git
    cd devotel
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables in `.env`:
    ```plaintext
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASS=password
    DB_NAME=job_offers_db
    ```

4. Run the application:
    ```bash
    npm run start:dev
    ```

## 📊 API Endpoints
- **GET** `/api/job-offers`  
  - Query Parameters:
    - `title`: Filter by job title
    - `location`: Filter by location
    - `salary`: Filter by minimum salary
    - `page`: Pagination (default: 1)
    - `limit`: Number of items per page (default: 10)

### Example Request:
