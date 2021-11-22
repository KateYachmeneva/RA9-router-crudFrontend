export default function createRequest(urlBase,method = "GET", initialData = null){
    return async function FetchData(){
        const url = process.env.REACT_APP_POSTS_URL + urlBase;
        let result;
        try {
             const response = await fetch(
                 url,
                 {
                 header:{
                    'Content - Type': 'application/json'
                },
                 method: method,
                 body:(method === 'POST') ? JSON.stringify(initialData) : null
            })
            if(!response.ok) throw new Error (`Ошибка загрузки: ${response.status}(${response.message})`);
            try{
                result = await response.json();
                }catch (e){
                    throw new Error ('Ошибка проверки' + e)
                }
        }catch(e){
            result = e.text;
        }finally {
            return result;
        }
    }
}