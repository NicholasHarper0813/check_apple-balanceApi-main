// const saveBtn = document.getElementById("saveData");
const startBtn = document.getElementById("startFetch");
const file = document.getElementById("file");
const record = document.getElementById("record");
const progress = document.getElementById("progress");
const error = document.getElementById("error");
let cookie = document.getElementById("cookieText");
let path = null;

const socket = io("ws://localhost:3000");

function saveUserData(e) {
  e.preventDefault();
  localStorage.setItem("cookieText", cookie.value);
}

function populateData() {
  cookie.value = localStorage.getItem("cookieText");
}

startBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!path) return alert("Please chose a valid file before starting");

  record.textContent = 0;
  // saveBtn.setAttribute("disabled", true)
  startBtn.setAttribute("disabled", true);
  file.setAttribute("disabled", true);
  cookie.setAttribute("disabled", true);
  progress.style.width = "0%";
  error.innerHTML = "";

  let headers = cookie.value
    .replace("fetch(", "")
    .replace(")", "")
    .replace(
      "https://secure1.store.apple.com/shop/giftcard/balancex?_a=checkBalance&_m=giftCardBalanceCheck",
      ""
    )
    .replace(`\"\" ,`, "");

  console.log(headers);

  socket.emit("start", {
    name: "Muneeb Akram",
    headers: headers,
    path: path,
  });
});

file.addEventListener("change", (e) => {
  let files = e.target.files[0];
  const [fileName, fileExt] = files.name.split(".");
  if (fileExt !== "xlsx") {
    file.value = null;
    files = null;
    console.log(files);
    return alert("Please provide a valid file type");
  }
  path = e.target.files[0].path;
});

socket.on("recordChecked", (data) => {
  record.textContent = record.textContent * 1 + 1;
  progress.style.width = `${(data.checkedRecords / data.totalRecords) * 100}%`;
  console.log(data);
});

socket.on("completed", (data) => {
  // saveBtn.removeAttribute("disabled")
  startBtn.removeAttribute("disabled");
  file.removeAttribute("disabled");
  cookie.removeAttribute("disabled");
});

socket.on("error", (data) => {
  error.innerHTML = `<p class="alert alert-danger" >Some error occured please try closing the window and try again</p>`;
});

populateData();
