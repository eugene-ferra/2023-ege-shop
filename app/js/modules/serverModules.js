async function getData(url) {
    let data = await fetch(url, { mode: 'cors' })
        .then(response => {
            return response.json()
        })
        .catch(error => console.error(error));
    
        return data
}







export default getData 