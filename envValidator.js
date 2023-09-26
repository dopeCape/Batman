function validateEnvVariables(requiredEnvVars) {
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    console.error(
      `Missing environment variables: ${missingEnvVars.join(", ")}`
    );
    process.exit(1); // Exit the application with an error code
  }
}

module.exports = validateEnvVariables;
