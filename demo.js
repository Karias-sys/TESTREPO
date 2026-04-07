// Function to calculate the area of a circle
function calculateCircleArea(radius) {
    return Math.PI * radius * radius;
}

//function to validate an email address using regex
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// function to fetch data from an API and log the reponse
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Example usage
const radius = 5;
console.log(`Area of circle with radius ${radius}:`, calculateCircleArea(radius));

const email = "ariaskevin13@gmail.comm";
console.log(`Is the email "${email}" valid?`, validateEmail(email));

const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";
fetchData(apiUrl);


