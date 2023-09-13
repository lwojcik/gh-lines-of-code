// Replace with your GitHub username and Personal Access Token
const username = "lwojcik";
const token = "github_pat_...";

// Define the GitHub API base URL
const apiUrl = "https://api.github.com";

// Function to fetch all repositories for a user
async function getAllRepositories() {
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

// Function to count lines of code in a repository
async function countLinesOfCode(repository) {
  try {
    const response = await fetch(
      `${apiUrl}/repos/${username}/${repository.name}/languages`,
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
      `Repository: ${repository.name}, Lines of Code: ${linesOfCode}`
    );
    return linesOfCode;
  } catch (error) {
    console.error(`Error counting lines of code in ${repository.name}:`, error);
    return 0;
  }
}

// Main function to fetch and count lines of code in all repositories
async function countLinesOfCodeInAllRepositories() {
  const repositories = await getAllRepositories();

  let totalLinesOfCode = 0;
  for (const repository of repositories) {
    totalLinesOfCode += await countLinesOfCode(repository);
  }

  console.log(`Total Lines of Code in All Repositories: ${totalLinesOfCode}`);
}

// Run the main function
countLinesOfCodeInAllRepositories();
