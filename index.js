import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";


const firebaseConfig = {
   databaseURL: "https://leads-tracker-app-5af74-default-rtdb.firebaseio.com/"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referneceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}


onValue(referneceInDB, function(snapshot) {
    const snapshotExists = snapshot.exists();
    if (snapshotExists) {
        const snapshotValue = snapshot.val();
        const leads = Object.values(snapshotValue);
        render(leads);
    }
});

deleteBtn.addEventListener("dblclick", function() {
    remove(referneceInDB);
    ulEl.innerHTML = "";
});

inputBtn.addEventListener("click", function() {
    push(referneceInDB, inputEl.value);
    inputEl.value = "";
});
