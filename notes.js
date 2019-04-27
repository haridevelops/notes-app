const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your Notes...'
}

/**
 * 
 * @param {string} title 
 * @param {string} body 
 */
const addNotes = (title, body) => {
    const existingData = loadNotes()

    const isTitleExists = checkTitleExists(existingData, title)
debugger
    if (!isTitleExists) {
        existingData.push({
            title: title,
            body: body
        })
        saveNotes(existingData)
        console.log(chalk.green.inverse('New Note added'))
    } else {
        console.log(chalk.red.inverse('Note title already taken'))
    }
}

/**
 * 
 * @param {string} title 
 */
const removeNotes = (title) => {
    const existingData = loadNotes()

    const isTitleExists = checkTitleExists(existingData, title)

    if (!isTitleExists) {
        console.log(chalk.red.inverse('Note not found!'))
    } else {
        const updatedData = existingData.filter(note => note.title !== title)
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(updatedData)
    }

}

/**
 * list a notes from datastore
 */
const listNotes = () => {
    const existingData = loadNotes()
    existingData.length === 0 ?
        console.log(chalk.red.inverse('No Notes found')) :
        existingData.forEach(element => console.log(chalk.green(element.title)))
    
}

/**
 * 
 * @param {string} title 
 */
const readNotes = (title) => {
    const existingData = loadNotes()
    const isTitleExists = checkTitleExists(existingData, title)
    isTitleExists ? 
        console.log(chalk.green.bold(isTitleExists.title), ' ', isTitleExists.body) :
        console.log(chalk.red.inverse('Note does not exist for this title'))

}

const checkTitleExists = (existingData, title) => existingData.find(note => note.title === title)

const saveNotes = (notes) => {
    const dataString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataString)
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
}



module.exports = { 
    getNotes: getNotes, 
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes

};
