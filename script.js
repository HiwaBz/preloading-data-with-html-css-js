
const API_URL = 'http://'
const boxContainer = document.querySelector('.box-container')
const box = document.querySelectorAll('.box')
const imgs = document.querySelectorAll('img')



// getting data from API

const getData = async function (limit = 4) {
    const page = Math.ceil(Math.random() * 10) 
    // console.log(page);
    const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    // console.log(await res.clone().json());
    return await res.clone().json()
}


// hiding the undefinded picture src :

// const imagesDisplaySetting = function (dis) {
//     document.addEventListener("DOMContentLoaded", function (event) {
//         document.querySelectorAll('img').forEach(function (img) {
//             img.style.display = `${dis}`;
//         })
//     });
// }
// implement the ui section : 

const generateMarkup = async function () {

    // display none before image load

    // imagesDisplaySetting('none')

    const data = await getData()

    box.forEach((el, i) => {
        el.querySelector('h4').textContent = data[i].author;
        el.querySelector('img').src = data[i].download_url;

        // change the image display to block :
        // el.querySelector('img').style.display = 'block';

        [...el.children].forEach(elem => elem.style.animation = "none")

    })
}


const loadData = async function () {

    try {
        await generateMarkup();


    } catch (error) {
        console.log(error);

    }

}

loadData();