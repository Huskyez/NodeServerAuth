import dataStore from 'nedb-promises';
// var dataStore = require('nedb')

export class NoteStore {
  constructor({ filename, autoload }) {
    this.store = new dataStore({ filename, autoload });
  }
  
  async find(props) {
    const userId = props.userId;
    
    if (!props.page) {
      return await this.store.find({ userId: userId });
    }

    const page = props.page;
    const limit = props.limit;

    var list = null;
    list = await this.store.find({ userId: userId }).sort({_id : 1}).skip(page * limit).limit(limit);

    return list;
  }
  
  async findOne(props) {
    return this.store.findOne(props);
  }
  
  async insert(note) {
    let noteText = note.text;
    if (!noteText) { // validation
      throw new Error('Missing text property')
    }
    if (!note._id || note._id.length == 0) {
      note._id = undefined;
    }
    // console.log(note);
    return this.store.insert(note);
  };
  
  async update(props, note) {
    console.log(props);
    console.log(note);
    return this.store.update(props, note);
  }
  
  async remove(props) {
    return this.store.remove(props);
  }
}

export default new NoteStore({ filename: './db/notes.json', autoload: true });