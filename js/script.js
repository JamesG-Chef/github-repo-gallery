// Create global variable to select the div with the class of 'overview'
const profileInfo = document.querySelector(".overview");
// Create a global variable to represent your github profile name
const username = "JamesG-Chef";
// Create a global variable to represent select the unordered list to display the repos list.
const repoList = document.querySelector(".repo-list");


// Create an async function to fetch data from your github profile using the github API
const gitUserInfo = async function () {
	// target the 'users' end point (remember to use backticks to surround the template literal)
	const userInfo = await fetch (`https://api.github.com/users/${username}`);
	// In your next await statement, resolve the JSON response. Log out the response to the console and call your function to see your results.
	const data = await userInfo.json();
	console.log(data);

	displayUserInfo(data);
};

gitUserInfo();


const displayUserInfo = function (data) {
	// create a new div and give it a class of “user-info”. 
	const div = document.createElement("div");
	div.classList.add("user-info");
	// Using innerHTML, populate the div, with the following elements for figure, image, and paragraphs:
	// Inside the 5 placeholders, use the JSON data to grab the relevant properties to display on the page
	div.innerHTML = `
	<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
    // Append the div to the overview element
    profileInfo.append(div);
    fetchRepos();
};




// create and name a new async function to fetch your repos
const fetchRepos = async function () {
	// target the endpoints that fetch the list of repos 
	// (include parameters to sort most recently updated and 100 per page)
	const fetchList = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
	const data = await fetchList.json();
	console.log(data);

	// call the function to display the repo info, pass it the json response data as an argument
	displayRepoInfo(data);
};

// create and name a function to display information about each repo
// Use 'repos' as a parameter so that the function accepts the data returned from your last API call
const displayRepoInfo = function (repos) {
	// Inside the function, loop and create a list item for each repo and give each item:
	// A class of “repo”.
	// An <h3> element with the repo name. 
	for (const repo of repos) {
		const repoItem = document.createElement("li");
		repoItem.classList.add("repo");
		repoItem.innerHTML = `<h3>${repo.name}</h3>`;
		// Append the list item to the global variable that selects the unordered repos list.
		repoList.append(repoItem);
	}
};