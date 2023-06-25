// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://end3-3ff74-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById('input-field')
const publishButtonEl = document.getElementById('publish-button')
const endorsementsEl = document.querySelector('.endorsements')

function clearInputFieldEl() {
    inputFieldEl.innerHTML = ""
}

function addToList(item) {

    console.log('add to list funciton is called')

    endorsementsEl.innerHTML += `<li>${item}</li>`

}


onValue(endorsementsInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        console.log(itemsArray)

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            addToList(currentItemValue)
        }
    } else {
        endorsementsEl.innerHTML = "No Quests here... Yet "
    }
})

publishButtonEl.addEventListener("click", function () {

    console.log('hello')
    let inputValue = inputFieldEl.value
    addToList(inputValue)
    push(endorsementsInDB, inputValue)



    clearInputFieldEl()
})

