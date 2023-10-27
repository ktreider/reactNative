import axios from 'axios';

const BACKEND_URL = 'https://react-native-c05a5-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
    //to send a post request for adding a new piece of data
    //base url + node segment (in this case 'expenses')
    //and value to be added (in this case the expenseData)
    const response = await axios.post(
        BACKEND_URL + '/expenses.json', 
        expenseData
    ); 
    const id = response.data.name; //get generated id from firebase
    return id;
}

export async function fetchExpenses() {
    //get the expenses stored in firebase
    //await this promise and store the eventually returned data
    //as a response object
    const response = await axios.get(BACKEND_URL + '/expenses.json');

    const expenses = [];

    //go through all the keys in the response object,
    //and create js objects with the key as an id field
    //and the rest of the data appropriately
    for (const key in response.data) {
        const expenseObj = {
            id: key, 
            amount: response.data[key].amount,
            date:new Date(response.data[key].date), //reformat since firebase converts this to a string
            description: response.data[key].description,
        };
        expenses.push(expenseObj); //put all objects into an array
    }

    return expenses;
}


export function updateExpense(id, expenseData) {
    //send a put request to the specific piece of data
    //using the id, and the second arg as the rest of the
    //expense data (amt, date, desc)
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);

}

export function deleteExpense(id) {
    //sends a delete request
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}