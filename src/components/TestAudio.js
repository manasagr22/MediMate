import React, { useState } from 'react'

export default function TestAudio() {
    const [disable, setDisable] = useState(true);
    const [DB, setDB] = useState(null);
    const indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB ||
        window.shimIndexedDB;

    if (!indexedDB) {
        console.log("IndexedDB could not be found in this browser.");
    }
    // const request = indexedDB.open("AudioDatabase", 1);
    function storeData(str) {

        if (!indexedDB) {
            console.log("IndexedDB could not be found in this browser.");
        }
        else {
            const request = indexedDB.open("AudioDatabase", 1);

            request.onerror = function (event) {
                console.error("An error occurred with IndexedDB");
                console.error(event);
            };

            request.onupgradeneeded = function () {
                const db = request.result;
                const store = db.createObjectStore("audioFiles", { keyPath: "id" });
                store.createIndex("filesData", "filesData", { unique: false });
            };

            request.onsuccess = function () {
                console.log("Database opened successfully");

                const db = request.result;
                setDB(db);
                const transaction = db.transaction("audioFiles", "readwrite");
                const store = transaction.objectStore("audioFiles");
                // const fileIndex = store.index("filesData");

                store.put({ id: "2", filesData: str });

                // const idQuery = store.get("1");
                // const colourQuery = colourIndex.getAll(["Red"]);
                // const colourMakeQuery = makeModelIndex.get(["Blue", "Honda"]);

                // idQuery.onsuccess = function () {
                //     const aud = new Audio(idQuery.result.fileData);
                //     aud.play();
                //     console.log('idQuery', idQuery.result);
                // };
                // colourQuery.onsuccess = function () {
                //     console.log('colourQuery', colourQuery.result);
                // };
                // colourMakeQuery.onsuccess = function () {
                //     console.log('colourMakeQuery', colourMakeQuery.result);
                // };

                transaction.oncomplete = function () {
                    console.log("Hello..")
                    // db.close();
                    setDisable(false);
                };
            };
        }
    }

    function uploadAudio(e) {
        const f = document.getElementById("f");
        if (f.files[0].type.indexOf('audio/') !== 0) {
            console.warn('not an audio file');
            return;
        }
        const reader = new FileReader();
        reader.onload = function () {
            var str = this.result;
            // this is a string, so you can store it in localStorage, even if it's really not a good idea
            // console.log(str);
            storeData(str);
            // localStorage.setItem("files", JSON.stringify(str));
        };
        reader.readAsDataURL(f.files[0]);
    }

    function playAudio() {
        // const request = indexedDB.open("AudioDatabase", 1);
        // const db = request.result;
        const transaction = DB.transaction("audioFiles", "readwrite");
        const store = transaction.objectStore("audioFiles");
        // const fileIndex = store.index("filesData");

        // store.put({ id: "1", fileData: str });

        const idQuery = store.get("2");
        // const colourQuery = colourIndex.getAll(["Red"]);
        // const colourMakeQuery = makeModelIndex.get(["Blue", "Honda"]);

        idQuery.onsuccess = function () {
            console.log('idQuery', idQuery.result);
            const aud = new Audio(idQuery.result.filesData);
            aud.play();
            // console.log('idQuery', idQuery.result);
        };
    }

    return (
        <div>
            <input type="file" id="f" onChange={(e) => {
                uploadAudio(e)
            }} />
            <button type='button' disabled={disable} onClick={playAudio} style={{backgroundColor: "red"}} >Play</button>
        </div>
    )
}
