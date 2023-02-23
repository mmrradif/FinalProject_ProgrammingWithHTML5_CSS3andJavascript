const form = document.querySelector("form");
const submit = document.querySelector(".submit");
const updates = document.querySelector(".update");
const tbody = document.querySelector("table>tbody");
const container = document.querySelector(".container");


//--------------------------------------------- Insert Data Start -------------------------------//

submit.addEventListener('click',function(){

    let idb = indexedDB.open('radif', 1);
    idb.onupgradeneeded = () => {
        let res = idb.result;
        res.createObjectStore('data', { autoIncrement: true });
    }
    idb.onsuccess = () => {
        
        let resul = idb.result;
        let tx = resul.transaction("data", "readwrite");
        let store = tx.objectStore('data');
        store.put({
            image: form[0].value,
            name: form[1].value,
            price: form[2].value,
            about: form[3].value            
        });
        alert("Data Recorded Successfully");
        location.reload();      
    }
});


//--------------------------------------------- Read Data Start ------------------------------//

function read() {
    let idb = indexedDB.open('radif', 1);

    idb.onsuccess = () => {
        let res = idb.result;
        let tx = res.transaction('data', 'readonly');
        let store = tx
            .objectStore('data');

        let cursor = store.openCursor();
        cursor.onsuccess = () => {
            let curRes = cursor.result;
            if (curRes) {
                console.log(curRes.value.name);

                tbody.innerHTML += `
                    <tr>
                    <td>${curRes.value.image}</td>
                    <td>${curRes.value.name}</td>
                    <td>${curRes.value.price}</td>
                    <td>${curRes.value.about}</td>
                    <td class="up" onclick="update(${curRes.key})" data-key='" + curRes.key + "'>Update</td>
                    <td class="del" onclick="del(${curRes.key})">Delete</td>
                    </tr>`;
                curRes.continue();
            }
        }
    }
}


//--------------------------------------------- Delete Data Start ------------------------------//

function del(e) {
    let idb = indexedDB.open('radif', 1);
    idb.onsuccess = () => {
        let res = idb.result;
        let tx = res.transaction('data', "readwrite");
        let store = tx.objectStore('data');

        store.delete(e);
        alert("Data Has Been Deleted");
        location.reload();
    }
}


//--------------------------------------------- Update Data Start ------------------------------//

let updateKey;

function update(e) {
    submit.style.display = "none";
    updates.style.display = "block";
    updateKey = e;
   
}


updates.addEventListener('click', () => {
    let idb = indexedDB.open('radif', 1);
    idb.onsuccess = () => {
        let res = idb.result;
        let tx = res.transaction('data', 'readwrite');
        let store = tx.objectStore('data');



        store.put({
            name: form[0].value,
            email: form[1].value,
            phone: form[2].value,
            address: form[3].value
        }, updateKey);
        alert("Data has been deled");
        location.reload();
    }
});

read();


//-------------------------- Product Card --------------------------------->>>

function productCard() {
    let idb = indexedDB.open('radif', 1);

    idb.onsuccess = () => {
        let res = idb.result;
        let tx = res.transaction('data', 'readonly');
        let store = tx
            .objectStore('data');

        let cursor = store.openCursor();
        cursor.onsuccess = () => {
            let curRes = cursor.result;
            if (curRes) {
                console.log(curRes.value.name);

                container.innerHTML += `

                    <div class="card">
                        <div class="imageBox">
                            <img src="Images/${curRes.value.image}"/>
                        </div>

                        <div class="content">
                            <div class="details">
                                <h2>${curRes.value.name}</h2>
                                <h3>${curRes.value.price}</h3>

                                <div class="data">
                                    <p>${curRes.value.about}</p>
                                </div>

                                <div class="actionBtn">
                                    <a id="addCart" class="addCart" href="cart.html">More Product</a>
                                </div>

                            </div>
                        </div>                   
                    </div>`;
                curRes.continue();
            }
        }
    }
}

