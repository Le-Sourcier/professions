const http = require("http");
const express = require("express");

const fs = require("fs");

const router = express.Router();

// Specify the path to your JSON file
const jsonFilePath = "./jobs_list.json";

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

      // Find jobs for the requested category
      const matchingJobs = jobsData.find(
        (job) => job.category.toLowerCase() === requestedCategory
      );

      if (!matchingJobs) {
        const error = {
          error: true,
          status: 404,
          message: "Category not found",
          data: [],
        };

        return res.status(404).json(error);
      }

      const success = {
        error: false,
        status: 200,
        message: "Success",
        data: matchingJobs.keywords,
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
