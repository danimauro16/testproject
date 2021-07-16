const fs = require('fs');
const path = require('path');

class JsonModel {
    constructor(name) {
        this.name = name;
        this.dataDir = '../data/';
        this.dataPath = path.resolve(__dirname, this.dataDir , this.name + '.json');
    }

    /* read JSON file*/
    readJsonFile() {
        let fileContent = fs.readFileSync(this.dataPath, 'utf-8');
        if (fileContent) {
            return JSON.parse(fileContent);
        }
        return [];
    }

    /* Write in JSON file */
    writeJsonFile(data) {
        let jsonData = JSON.stringify(data, null, ' ');
        fs.writeFileSync(this.dataPath, jsonData);
    }

    /** Create next key */
    generatePk() {
        let items = this.readJsonFile();
        let lastItem = items.pop();
        if(lastItem) {
            return ++lastItem.id;
        }
        return 1;
    }
    
    /** Get all documents */
    all() { return this.readJsonFile() }

    /* Get document by Id */
    find(id) {
        let items = this.readJsonFile();
        return items.find(item => item.id == id)
    }

    /* Get documents by Key */
    findByField(field, value) {
        let items = this.readJsonFile();
        return items.find(item => item[field] == value);
    }

    /* Get document by Key */
    findAllByField(field, value) {
        let items = this.readJsonFile();
        return items.filter(item => item[field] == value);
    }

    /* Save document */
    save(item) {
        let items = this.readJsonFile();
        item.id = this.generatePk();
        items.push(item);
        this.writeJsonFile(items);
        return item;
    }

    /* Update document */
    update(item) {
        let items = this.readJsonFile();
        let updatedItems = items.map(currentItem => {
            if (currentItem.id == Number(item.id)) {
                currentItem = item;
                return { ...currentItem, id: Number(item.id) };
            }
            return currentItem;
        });
        this.writeJsonFile(updatedItems);
        return item;
    }

    /** Delete document */
    destroy(id) {
        let items = this.readJsonFile();
        let filteredItems = items.filter(currentItem => currentItem.id != id );
        this.writeJsonFile(filteredItems);
    }
}

module.exports = JsonModel;