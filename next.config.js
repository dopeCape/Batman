/** @type {import('next').NextConfig} */
const validateEnvVariables = require("./envValidator");
const requiredEnvVars = require("./envConfig");

validateEnvVariables(requiredEnvVars);
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
