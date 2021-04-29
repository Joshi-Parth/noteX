import firebase from '../firebase'

const notesRef = firebase.collection('notes');


const getAll = () => {
     notesRef.onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("All data in 'notes' collection", data);
        return data;
      });
    
      
}

const create = (data) => {
    return notesRef.add(data);
}

const update = (id, value) => {
    return notesRef.doc(id).update(value);
}

const remove = (id) => {
    return notesRef.doc(id).delete();
}

const DataService = {
    getAll,
    create,
    update,
    remove,
};


export default DataService;