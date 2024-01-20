const http = require("http");
const express = require("express");

const fs = require("fs");

const router = express.Router();

// Specify the path to your JSON file
const jsonFilePath = "./jobs_list.json";

//Get all available job list
router.get("/", async (req, res) => {
  try {
    // Read the file and parse the JSON data
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        const error = {
          error: true,
          status: 400,
          message: "Error getting data",
          data: [],
        };
        return res.status(400).json(error);
      }

      const jsonData = JSON.parse(data);

      const success = {
        error: false,
        status: 200,
        message: "Success",
        data: jsonData,
      };
      return res.status(200).json(success);
    });
  } catch (err) {
    const error = {
      error: true,
      status: 500,
      message: "Internal Server Error",
      data: [],
    };
    return res.status(500).json(error);
  }
});

//Get jobs by query
router.get("/jobs/:query", (req, res) => {
  try {
    const requestedQuery = req.params.query.toLowerCase();

    // Read the file and parse the JSON data
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        const error = {
          error: true,
          status: 400,
          message: "Error reading the file",
          data: [],
        };

        return res.status(400).json(error);
      }

      const jobsData = JSON.parse(data);

      // Find jobs that match the partial input
      const matchingJobs = jobsData.reduce((acc, category) => {
        const matchingInCategory = category.keywords.filter((job) =>
          job.toLowerCase().includes(requestedQuery)
        );

        if (matchingInCategory.length > 0) {
          acc.push({
            category: category.category,
            jobs: matchingInCategory,
          });
        }

        return acc;
      }, []);

      if (matchingJobs.length === 0) {
        const error = {
          error: true,
          status: 404,
          message: "No matching jobs found",
          data: [],
        };

        return res.status(404).json(error);
      }

      const success = {
        error: false,
        status: 200,
        message: "Success",
        data: matchingJobs,
      };

      return res.status(200).json(success);
    });
  } catch (err) {
    const error = {
      error: true,
      status: 500,
      message: "Internal Server Error",
      data: [],
    };

    return res.status(500).json(error);
  }
});

//Get job by category
router.get("/jobs/:category", (req, res) => {
  try {
    const requestedCategory = req.params.category.toLowerCase();

    // Read the file and parse the JSON data
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        const error = {
          error: true,
          status: 400,
          message: "Error reading the file",
          data: [],
        };

        return res.status(400).json(error);
      }

      const jobsData = JSON.parse(data);

      // Find categories that match the partial input
      const matchingCategories = jobsData.filter((job) =>
        job.category.toLowerCase().includes(requestedCategory)
      );

      if (matchingCategories.length === 0) {
        const error = {
          error: true,
          status: 404,
          message: "No matching categories found",
          data: [],
        };

        return res.status(404).json(error);
      }

      // Group response by categories
      const groupedResponse = matchingCategories.map((category) => {
        return {
          category: category.category,
          jobs: category.keywords,
        };
      });

      const success = {
        error: false,
        status: 200,
        message: "Success",
        data: groupedResponse,
      };

      return res.status(200).json(success);
    });
  } catch (err) {
    const error = {
      error: true,
      status: 500,
      message: "Internal Server Error",
      data: [],
    };

    return res.status(500).json(error);
  }
});

//Get job from category list
router.get("/jobs/:category/:job", (req, res) => {
  try {
    const requestedCategory = req.params.category.toLowerCase();
    const requestedJob = req.params.job.toLowerCase();

    // Read the file and parse the JSON data
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        const error = {
          error: true,
          status: 400,
          message: "Error reading the file",
          data: [],
        };

        return res.status(400).json(error);
      }

      const jobsData = JSON.parse(data);

      // Find categories that match the partial input
      const matchingCategories = jobsData.filter((job) =>
        job.category.toLowerCase().includes(requestedCategory)
      );

      if (matchingCategories.length === 0) {
        const error = {
          error: true,
          status: 404,
          message: "No matching categories found",
          data: [],
        };

        return res.status(404).json(error);
      }

      // Find the specified job within the category
      const matchingJobs = matchingCategories.reduce((acc, category) => {
        if (category.keywords.includes(requestedJob)) {
          acc.push({
            category: category.category,
            job: requestedJob,
          });
        }
        return acc;
      }, []);

      if (matchingJobs.length === 0) {
        const error = {
          error: true,
          status: 404,
          message: "Job not found in the specified category",
          data: [],
        };

        return res.status(404).json(error);
      }

      const success = {
        error: false,
        status: 200,
        message: "Success",
        data: matchingJobs,
      };

      return res.status(200).json(success);
    });
  } catch (err) {
    const error = {
      error: true,
      status: 500,
      message: "Internal Server Error",
      data: [],
    };

    return res.status(500).json(error);
  }
});

module.exports = router;
