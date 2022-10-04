let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userImage = document.getElementById("userImage");
let addContact = document.getElementById("addContact");
let contactList = document.getElementById("list");
let userMessage = document.getElementById("contact-message");

// ! ====================== create start ============================
function createCotact(contactinfo) {
  if (localStorage.getItem("userContact") === null) {
    localStorage.setItem("userContact", "[]");
  }
  let data = JSON.parse(localStorage.getItem("userContact"));
  data.push(contactinfo);
  localStorage.setItem("userContact", JSON.stringify(data));
}
// ? btn
addContact.addEventListener("click", () => {
  if (userName.value.trim() == "") {
    alert("Заполните поле!");
    return;
  } else if (userEmail.value.trim() == "") {
    alert("Заполните поле!");
    return;
  } else if (userMessage.value.trim() == "") {
    alert("Заполните поле!");
    return;
  }
  // else if (userImage.value.trim() == "") {
  //   alert("Заполните поле!");
  //   return;
  // }
  let contact = {
    name: userName.value,
    email: userEmail.value,
    // img: userImage.value,
    message: userMessage.value,
  };
  createCotact(contact);
  readContact();
  // readContact();
  userName.value = "";
  userEmail.value = "";
  userImage.value = "";
  userMessage.value = "";
});
// ! ====================== create end ============================

// ! ====================== Read start ============================
function readContact() {
  if (localStorage.getItem("userContact") === null) {
    localStorage.setItem("userContact", "[]");
  }
  let data = JSON.parse(localStorage.getItem("userContact"));
  contactList.innerHTML = "";
  data.forEach((item, index) => {
    let div = document.createElement("div");
    div.innerHTML = ` Name: ${item.name} <br /> Email: ${item.email} <br /> Message: ${item.message} <br />`;
    let btnDel = document.createElement("button");
    btnDel.innerText = "Delete";
    btnDel.style.marginLeft = "250px";
    div.append(btnDel);

    btnDel.addEventListener("click", () => {
      deleteContact(index);
    });
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    div.append(editBtn);
    editBtn.addEventListener("click", () => {
      editContact(item, index);
    });
    contactList.append(div);
  });
}
// ?btnEdit
let innerModal = document.getElementById("innerModal");
let innerEmail = document.getElementById("innerEmail");
let innerMessage = document.getElementById("innerMessage");
let mainModal = document.querySelector(".main-modal");
let id = "";
function editContact(item, index) {
  mainModal.style.display = "block";
  innerModal.value = ` ${item.name}`;
  innerEmail.value = ` ${item.email}`;
  innerMessage.value = `${item.message}`;
  id = index;
}

// ?save
let modalSave = document.getElementById("modalSave");
modalSave.addEventListener("click", () => {
  if (innerModal.value.trim() == "") {
    alert("Заполните поле!");
    return;
  }
  let data = JSON.parse(localStorage.getItem("userContact"));
  let editedModal = {
    name: innerModal.value,
    email: innerEmail.value,
    message: innerMessage.value,
  };
  data.splice(id, 1, editedModal);
  localStorage.setItem("userContact", JSON.stringify(data));
  mainModal.style.display = "none";
  readContact();
});

// ? closeModal
let closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
  mainModal.style.display = "none";
});

// ?btnDelete
function deleteContact(index) {
  let data = JSON.parse(localStorage.getItem("userContact"));
  data.splice(index, 1);
  localStorage.setItem("userContact", JSON.stringify(data));
  readContact();
}
readContact();
