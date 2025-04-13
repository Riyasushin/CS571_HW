studentData = [];

function buildStudents(studs) {
  // TODO This function is just a suggestion! I would suggest calling it after
  //      fetching the data or performing a search. It should populate the
  //      index.html with student data by using createElement and appendChild.
  const studentsDiv = document.getElementById("students");
  studentsDiv.innerHTML = "";

  /// Use document to update the element with id num-results to be the number of students in the course
  const numResult = document.getElementById("num-results");
  numResult.innerText = studs.length;

  studs.forEach((student) => {
    const cardBody = document.createElement("div");
    cardBody.className = "col-2";

    // name
    const name = document.createElement("h3");
    name.className = "card-title";
    name.innerText = `${student?.name?.first} ${student?.name?.last}`;
    cardBody.appendChild(name);

    // major
    const major = document.createElement("strong");
    major.className = "card-text";
    major.innerText = `${student.major}`;
    cardBody.appendChild(major);

    // credits
    const credits = document.createElement("p");
    credits.className = "card-text";
    credits.innerText = `${student?.name?.first} is taking ${
      student.numCredits
    } and is ${student.fromWisconsin ? " " : " not "}from Wisconsin`;
    cardBody.appendChild(credits);

    // interest
    const interestHind = document.createElement("p");
    interestHind.className = "card-text";
    interestHind.innerText = `${student.interests.length} interests`;
    const interestsList = document.createElement("ul");
    student.interests.forEach((interest) => {
      const interestItem = document.createElement("li");
      interestItem.innerText = interest;
      interestsList.appendChild(interestItem);
    });
    cardBody.appendChild(interestHind);
    cardBody.appendChild(interestsList);

    // show the card

    studentsDiv.appendChild(cardBody);
  });
}

function handleSearch(e) {
  e?.preventDefault(); // You can ignore this; prevents the default form submission!

  // TODO Implement the search
  const searchName = document
    .getElementById("search-name")
    .value.trim()
    .toLowerCase();
  const searchMajor = document
    .getElementById("search-major")
    .value.trim()
    .toLowerCase();
  const searchInterest = document
    .getElementById("search-interest")
    .value.trim()
    .toLowerCase();

  const filterdStudentData = studentData.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const major = student.major.toLowerCase();
    const interests = student.interests.map((interest) =>
      interest.toLowerCase()
    );

    const nameMatch = searchName === "" || fullName.includes(searchName);
    const majorMatch = searchMajor === "" || major.includes(searchMajor);
    const interestMatch =
      searchInterest === "" ||
      interests.some((interest) => interest.includes(searchInterest));

    return nameMatch && majorMatch && interestMatch;
  });

  buildStudents(filterdStudentData);
}

fetch("https://cs571.org/rest/s25/hw2/students", {
  headers: {
    "X-CS571-ID": CS571.getBadgerId(),
  },
})
  .then((res) => {
    if (res.status == 200) {
      return res.json();
    } else {
      throw new Error();
    }
  })
  .then((data) => {
    console.log(data);
    studentData = data;
  })
  .then(() => {
    buildStudents(studentData);
  })
  .catch((err) => {
    alert("Oh no, ERROR");
  });

document.getElementById("search-btn").addEventListener("click", handleSearch);
