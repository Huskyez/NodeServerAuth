import dataStore from 'nedb-promises';

export class UserStore {
  constructor({ filename, autoload }) {
    this.store = new dataStore({ filename, autoload });
  }
  
  async findOne(props) {
    return this.store.findOne(props);
  }
  
  async insert(user) {
    //
    return this.store.insert(user);
  };
}

export default new UserStore({ filename: './db/users.json', autoload: true });