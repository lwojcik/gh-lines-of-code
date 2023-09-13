// Replace with your GitHub username and Personal Access Token
const username = "lwojcik";
const token = "github_pat_...";

// Define the GitHub API base URL
const apiUrl = "https://api.github.com";

// Function to fetch all repositories for a user
async function getAllRepositories(username) {
  try {
    const response = await fetch(`${apiUrl}/users/${username}/repos`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const repositories = await response.json();
    return repositories;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}

// Function to fetch all repositories for a GitHub organization
async function getOrganizationRepositories(organization) {
  try {
    const response = await fetch(`${apiUrl}/orgs/${organization}/repos`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const repositories = await response.json();
    return repositories;
  } catch (error) {
    console.error(
      `Error fetching organization repositories for ${organization}:`,
      error
    );
    throw error;
  }
}

// Function to count lines of code in a repository
async function countLinesOfCode(repository) {
  try {
    const response = await fetch(
      `${apiUrl}/repos/${repository.full_name}/languages`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    const data = await response.json();

    // Calculate the total lines of code by summing up the language sizes
    const linesOfCode = Object.values(data).reduce(
      (total, value) => total + value,
      0
    );

    console.log(
      `Repository: ${repository.full_name}, Lines of Code: ${linesOfCode}`
    );
    return linesOfCode;
  } catch (error) {
    console.error(
      `Error counting lines of code in ${repository.full_name}:`,
      error
    );
    return 0;
  }
}

// Main function to fetch and count lines of code in all repositories
async function countLinesOfCodeInAllRepositories() {
  const personalRepositories = await getAllRepositories(username);

  let totalLinesOfCode = 0;

  // Count lines of code in personal repositories
  for (const repository of personalRepositories) {
    totalLinesOfCode += await countLinesOfCode(repository);
  }

  // Include repositories from organizations
  const organizations = ["..."];

  for (const org of organizations) {
    const orgRepositories = await getOrganizationRepositories(org);
    for (const repository of orgRepositories) {
      totalLinesOfCode += await countLinesOfCode(repository);
    }
  }
  console.log(`Total Lines of Code in All Repositories: ${totalLinesOfCode}`);
}

// Run the main function
countLinesOfCodeInAllRepositories();
