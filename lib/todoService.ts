import { ToDo } from './redux/interfaces'


const baseUrl = "/api/todos";

export const makeRequest = (method?: string, databody?: string) => {
	console.log("databody", databody)
	fetch(baseUrl, {
	method: method,
	body: JSON.stringify(databody),
	headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json()) 
.then(json => console.log(json))
.catch(err => console.log(err));
}


export const doAdd = (addRec: ToDo) => {
	return makeRequest("POST", addRec)
}

export const doDelete = (delRec: ToDo) => {
	console.log(delRec)
	return makeRequest("DELETE", delRec)
}