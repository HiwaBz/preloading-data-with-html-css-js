
const API_URL = 'http://'
const boxContainer = document.querySelector('.box-container')
const box = document.querySelectorAll('.box')
const imgs = document.querySelectorAll('img')
const btn = document.querySelector('.loadMoreBtn')
const animatedLoading = document.querySelector('.loadingGif')
let lmt = 1



// * getting data from API :

const getData = async function (limit = lmt * 4) {
    const page = Math.ceil(Math.random() * 10)
    const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    return await res.clone().json()
}



// * implement the ui section : 

const generateMarkup = async function () {

    const data = await getData(lmt * 4)

    Array.from(boxContainer.querySelectorAll('.box')).slice(-4).forEach((el, i) => {
        el.querySelector('h4').textContent = data[i].author;
        el.querySelector('img').src = data[i].download_url;

        // * change the image display to block :
        [...el.children].forEach(elem => elem.style.animation = "none")

    })

    // * remove loading animation :

    animatedLoading.classList.add('hidden')
}


const addBox = function () {

    btn.addEventListener('click', async () => {
        animatedLoading.classList.remove('hidden')
        const markup = `<div class="box">
        <h4 style="animation: bounce ease-in-out infinite 1s;">Author</h4>
        <img src="" alt="" style="animation: bounce ease-in-out infinite 1s;">
    </div>

    <div class="box">
        <h4 style="animation: bounce ease-in-out infinite 1s;">Author</h4>
        <img src="" alt="" style="animation: bounce ease-in-out infinite 1s;">
    </div>

    <div class="box">
        <h4 style="animation: bounce ease-in-out infinite 1s;">Author</h4>
        <img src="" alt="" style="animation: bounce ease-in-out infinite 1s;">
    </div>

    <div class="box">
        <h4 style="animation: bounce ease-in-out infinite 1s;">Author</h4>
        <img src="" alt="" style="animation: bounce ease-in-out infinite 1s;">
    </div>`


        boxContainer.insertAdjacentHTML('beforeend', markup)
        // 
        lmt++;
        // ? generate markup after boxes inserted to the container : 
        await generateMarkup();




    })
}


const loadData = async function () {

    try {
        addBox();
        await generateMarkup();


    } catch (error) {
        console.log(error);

    }

}

loadData();