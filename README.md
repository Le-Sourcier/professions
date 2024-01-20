### Job Categories API

Welcome to the Job Categories API! This API provides information about various job categories, listing the most well-known jobs within each category. Below, you'll find details on how to use the API, including example requests and responses.

---

### Table of Contents
1. [Introduction](#introduction)
2. [API Endpoints](#api-endpoints)
    - [Get All Categories](#get-all-categories)
    - [Search Jobs by Category](#search-jobs-by-category)
3. [Example Usage](#example-usage)
    - [Get All Categories](#example-get-all-categories)
    - [Search Jobs by Category](#example-search-jobs-by-category)

---

### Introduction <a name="introduction"></a>

The Job Categories API is designed to help developers access information about different job categories and the associated jobs within each category. Whether you're building a job-related application, conducting research, or creating a platform for career exploration, this API provides valuable insights.

### API Endpoints <a name="api-endpoints"></a>

#### Get All Categories <a name="get-all-categories"></a>

**Endpoint:** `/categories`

**Method:** `GET`

**Description:** Get a list of all available job categories.

**Response:**
```json
{
  "categories": ["Web Development", "Mobile Development", "Data Science", ...]
}
```

---

#### Search Jobs by Category <a name="search-jobs-by-category"></a>

**Endpoint:** `/jobs/:category`

**Method:** `GET`

**Parameters:**
- `category` (string): The name of the job category.

**Description:** Get a list of jobs within a specific category.

**Response:**
```json
{
  "category": "Web Development",
  "jobs": ["Web Developer", "Software Engineer", "UI/UX Designer", ...]
}
```

---

### Example Usage <a name="example-usage"></a>

#### Example: Get All Categories <a name="example-get-all-categories"></a>

**Request:**
```bash
curl -X GET https://job-categories-api.example.com/categories
```

**Response:**
```json
{
  "categories": ["Web Development", "Mobile Development", "Data Science", ...]
}
```

---

#### Example: Search Jobs by Category <a name="example-search-jobs-by-category"></a>

**Request:**
```bash
curl -X GET https://job-categories-api.example.com/jobs/Web%20Development
```

**Response:**
```json
{
  "category": "Web Development",
  "jobs": ["Web Developer", "Software Engineer", "UI/UX Designer", ...]
}
```

---

### Enhanced Search with Partial Category Match

#### Search Jobs by Partial Category <a name="example-search-jobs-by-partial-category"></a>

**Request:**
```bash
curl -X GET https://job-categories-api.example.com/jobs/develop
```

**Response:**
```json
{
  "results": [
    {
      "category": "Web Development",
      "jobs": ["Web Developer", "Software Engineer", "UI/UX Designer", ...]
    },
    {
      "category": "Mobile Development",
      "jobs": ["Mobile Engineer", "Software Engineer", "iOS Developer", ...]
    },
    ...
  ]
}
```

---

### Enhanced Job Search with Partial Query Match

#### Search Jobs by Partial Query <a name="example-search-jobs-by-partial-query"></a>

**Request:**
```bash
curl -X GET https://job-categories-api.example.com/jobs/developer
```

**Response:**
```json
{
  "results": [
    {
      "category": "Web Development",
      "jobs": ["Web Developer", "Software Engineer", "UI/UX Designer", ...]
    },
    {
      "category": "Mobile Development",
      "jobs": ["Mobile Engineer", "Software Engineer", "iOS Developer", ...]
    },
    ...
  ]
}
```

These enhanced search functionalities allow you to retrieve results even with partial input, providing a more flexible and user-friendly experience.