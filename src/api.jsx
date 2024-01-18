// const email ='ars@rrr.re';
// const password='111we';

export async function getAllCourses() {

    const response = await fetch("https://fitness-pro-5a801-default-rtdb.europe-west1.firebasedatabase.app/courses.json", {
        method: "GET",
    })
    if (!response.ok) {
        throw new Error('Ошибка сервера')
    }
    const newData = await response.json()
    console.log(newData)
    return newData

}

// export async function addUser() {
 
//     const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkhbdRflDnKHqeqnmiXF2E9cFOSM-JckA", {
//         method: "POST",
//         headers:{"content-type": "application/json"},
//         body: JSON.stringify({
//             email: 'arsen@yandex.ru',
//             password: `${password}`,
//             returnSecureToken:true
//           }),
        
//     })
//     if (!response.ok) {
//         console.log(response)
//         throw new Error('Ошибка сервера')
        
//     }
//     const newData = await response.json()
//     console.log(newData)
    

//     const data = newData

//     return data

// }


