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
  const db = await initdb();
  const text = db.transaction("jate", "readwrite");
  const saveContent = text.objectStore("jate");

  // Add userContent to the database
  const userInput = await saveContent.add({ content });

  //Display userInput
  console.log("Added to DB: ", userInput);

  //Complete Save
  await text.done;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await initdb();
  const text = db.transaction("jate", "readonly");
  const saveContent = text.objectStore("jate");

  //Retrieve all content from database
  const savedContent = await StorageEvent.getAll();

  //Log past content
  console.log("All content from DB: ", savedContent);

  //complete transaction
  await text.done;

  return savedContent;
};

initdb();
