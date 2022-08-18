const tableBody = document.querySelector("[data-table-body]");
const formEl = document.querySelector("[data-user-form]");

const fullnameInput = document.querySelector("[data-user-fullname]");
const ageInput = document.querySelector("[data-user-age]");

const END_POINT = "http://localhost:3000/";

async function getAllUsers() {
  try {
    const res = await fetch(END_POINT + "all");
    const data = await res.json();
    return addUsersToTable(data);
  } catch (error) {
    console.log("Error:");
    console.error(error);
  }
}

function addUsersToTable(users) {
  const usersElement = users.map((user) => {
    return `
    <tr>
    <td>${user.id}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.age}</td>
    </tr>
    `;
  });

  tableBody.innerHTML = usersElement.join("");
}

// formEl.onsubmit = (e) => {
//   e.preventDefault();

//   fetch(END_POINT + "create", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//      fullname: fullnameInput.value,
//      age: ageInput.value,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => addUsersToTable(data));
// };

formEl.onsubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(END_POINT + "create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullnameInput.value,
        age: ageInput.value,
      }),
    });
    const data = await res.json();
    return addUsersToTable(data);
  } catch (error) {
    console.log("Error:");
    console.error(error);
  }
};

window.addEventListener("DOMContentLoaded", getAllUsers);
