// Creating variables attached to HTML elements

const fetchBtn = document.querySelector(".btn"); // 'Fetch users' button
const userList = document.querySelector(".user-list"); // List of users
const paginationContainer = document.querySelector(".pagination-container"); // Pagination container
let PER_PAGE_LIMIT = 5; // Limit of elements per page
let CURR_PAGE = 1; // Current page number
const USERS_URL = "https://jsonplaceholder.typicode.com/users"; // URL that the data is fetched from

fetchBtn.addEventListener("click", fetchFunction); // Adding an event listener to the button on click

function fetchFunction() { // Creating a function that handles the whole operation
    fetchUsers() // when the button is clicked, fetchUsers will be invoked - as a promise
        .then((users) => (printUsers(users)), addPagination(), fetchBtn.removeEventListener("click", fetchFunction)) // after the operation succeeds, 
        // print the user list, add pagination and remove the event listener
        .catch((error) => console.log(error)) // if the operation fails, log the error in the console
};

function fetchUsers(CURR_PAGE) { // Creating a function that fetches the list of users & handles potential errors
    const params = new URLSearchParams({ // Creating a const 'params' consisting of a new instance of the URLSearchParams class
        _limit: PER_PAGE_LIMIT,
        _page: CURR_PAGE,
    })

    return fetch(USERS_URL + "?" + params) // fetch the URL from the server
        .then((response) => { // 'Then' handles the situation after the promise is settled
            if (!response.ok) { // 'If' handles the situation in case the promise is rejected
                throw new Error(response.status) // In case the response from the server is anything but OK, the 'if' will throw an error that logs the status of the response
            }
            return response.json(); // Otherwise the promise is fulfilled and the function returns a response in JSON format

        })
};

// Creating a function that prints the list of users in HTML

function printUsers(users) {
    const markup = users // Creating a const called 'markup' that is a mapped version of the array of objects 'users'
        .map((user) => { // Mapping the original array and adding the following HTML code for every instance of 'user':
            return `<li>
          <p><b>Name</b>: ${user.name}</p>
          <p><b>E-mail</b>: ${user.email}</p>
          <p><b>City</b>: ${user.address.city}</p>
        </li>`;
        })
        .join(""); // Connecting all the mapped elements together
    userList.innerHTML = markup; // Putting the contents of const 'markup' into the HTML of const 'userList' (<ul>)
};

function addPagination() { // Creating a function that adds pagination

    for (let i = 1; i <= 10; i++) { // A for loop creates a button for every page
        paginationContainer.innerHTML +=
            `<button type="button" class="pagination-btn">${i}</button>`
    };
    const buttons = document.querySelectorAll(".pagination-btn"); // Creating a variable attached to every pagination button
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => { // For every button add an event listener on 'click'
            const pageNum = event.target.textContent; // Const 'pageNum' equals to the text content of each button
            fetchUsers(pageNum) // Invoking the 'fetchUsers' function with the const 'pageNum' as parameter
        })
    })
};






