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


export async function getAllCourses2() {
    const response = await fetch("https://fitness-pro-5a801.firebaseio.com/courses.json", {
        method: "GET",

    })


    if (!response.ok) {
        throw new Error('Ошибка сервера')
    }


    const newData = await response.json()
    newData.forEach((el, index) => {
        el.id = index + 8
    })

    const data = newData

    return data

}