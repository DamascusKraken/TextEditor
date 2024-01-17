import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Pushing to the Database");
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({id: 1, content: content });
  const result = await request;
    console.log("Your content is now 🏦", result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("You've got mail! 📦");
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", 'readwrite');
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  return result[0].content
};




initdb();
