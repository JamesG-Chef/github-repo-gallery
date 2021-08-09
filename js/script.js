// Create global variable to select the div with the class of 'overview'
const profileInfo = document.querySelector(".overview");
const username = "JamesG-Chef";

// Create an async function to fetch data from your github profile using the github API
const gitUserInfo = async function () {
	// target the 'users' end point (remember to use backticks to surround the template literal)
	const userInfo = await fetch (`https://api.github.com/users/${username}`);
	// In your next await statement, resolve the JSON response. Log out the response to the console and call your function to see your results.
	const data = await userInfo.json();
	console.log(data);

	displayUserInfo(data);
};

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
};


gitUserInfo();

