//ajax
// 1.xml http requist

let divWraper = document.getElementById("api-users");

function getUsers() {
  let requist = new XMLHttpRequest();
  requist.open("GET", "https://jsonplaceholder.typicode.com/users");

  requist.addEventListener("load", function () {
    //   console.log(this.responseText);
    let response = this.responseText; //tekstis saxit
    let responseJs = JSON.parse(response);
    console.log(responseJs);

    let ulNewUsers = document.createElement("ul");
    let liNew = document.createElement("li");
    liNew.textContent = responseJs[4].email;
    ulNewUsers.appendChild(liNew);

    // responseJs.forEach((element) => {
    //   console.log(element); //titoeuli obj

    //   let liElement = document.createElement("li");
    //   //   liElement.textContent = element.username + " " + element.email;
    //   liElement.textContent = `${element.username} ${element.email}`;
    //   ulNewUsers.appendChild(liElement);
    // });

    divWraper.appendChild(ulNewUsers);
  });

  requist.addEventListener("error", function () {
    let pError = document.createElement("p");
    pError.textContent = "Server Error";
    divWraper.appendChild(pError);
  });

  requist.send();
}

getUsers();

// 2.fetch

fetch("httpsjsonplaceholder.typicode.com/users", {
  method: "GET",
})
  .then(function (responseNew) {
    console.log(responseNew);
    if (!responseNew.ok) {
      throw new Error();
    }
    return responseNew.json();
  })
  .then(function (pasuxi) {
    console.log("Fetch-is shedegi:", pasuxi);
    let ulNewFetch = document.createElement("ul");
    let liNewFetch = document.createElement("li");
    liNewFetch.textContent = pasuxi[5].email;
    ulNewFetch.appendChild(liNewFetch);
    divWraper.appendChild(ulNewFetch);
  })
  .catch(function (error) {
    console.log(error);

    let pNewError = document.createElement("p");
    pNewError.textContent = "Server Error";
    divWraper.appendChild(pNewError);
  });

//   new users
let divUsers = document.getElementById("fetch-new-info");
let btnAdd = document.getElementById("add-more");
let currentPage = 1;

function getUsersInfo(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  })
    .then(function (resp) {
      console.log(resp);
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .then(function (mosuliInfo) {
      console.log(mosuliInfo);

      let ulNewUsers = document.createElement("ul");
      mosuliInfo.data.forEach((element) => {
        let liUsers = document.createElement("li");
        liUsers.textContent = `${element.first_name} ${element.last_name}`;
        ulNewUsers.appendChild(liUsers);
      });
      divUsers.appendChild(ulNewUsers);
    })
    .catch(function (error) {
      console.log(error);
    });
}

btnAdd.addEventListener("click", function () {
  currentPage++;
  getUsersInfo(currentPage);
});

getUsersInfo(currentPage);
