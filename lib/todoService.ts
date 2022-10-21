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


export const doAdd = (addRec: string) => {
	return makeRequest("POST", addRec)
}

export const doDelete = (delRec: string) => {
	return makeRequest("DELETE", delRec)
}