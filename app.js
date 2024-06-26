// select elements
const nextBtnEl = document.getElementById('next');
const prevBtnEl = document.getElementById('prev');
const carouselEl = document.querySelector(".carousel")
const carouselListItemEl = document.querySelector(".carousel .list")
const thumbnailEl = document.querySelector(".carousel .thumbnail")


function fetchData() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            if (data) {
                const carouselItems = document.getElementById('carousel-items');
                const thumbnailContainer = document.getElementById('thumbnail-container');
                data.forEach(element => {
                    const { id, name, bread, description, thumbnail, image } = element || {}
                    const item = document.createElement('div');
                    item.classList.add('item');
                    item.innerHTML = `
                <img src=${ image } alt="">
                <div class="shadow"></div>
                <div class="content">
                    <div class="author">Name</div>
                    <div class="title">${ name }</div>
                    <div class="topic">${ bread } </div>
                    <div class="des">${ description }</div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
                    `
                    const thumbnailItem = document.createElement('div');
                    thumbnailItem.classList.add('item');
                    thumbnailItem.innerHTML = `
                 <img src=${ thumbnail } alt="">
                <div class="content">
                    <div class="title">${ name }</div>
                    <div class="des">${ bread }</div>
                </div>
                    `

                    carouselItems.appendChild(item)
                    thumbnailContainer.appendChild(thumbnailItem)
                });
            }
        })

}
fetchData()





// next button function
nextBtnEl.onclick = function () {
    showSlider('next')
}

// previous button function
prevBtnEl.onclick = function () {
    showSlider('prev')

}
let timeRunning = 2000;
let timeAutoNext = 15000;

let runTimeOut;
let runAutoSlide;

runAutoSlide = setTimeout(() => {
    nextBtnEl.click();
}, timeAutoNext);

// show slider function
function showSlider(type) {
    const slideItems = document.querySelectorAll('.carousel .list .item');
    const thumbnailItems = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        // move first slideItems child to the end
        carouselListItemEl.appendChild(slideItems[0])
        // move first thumbnailItems child to the end
        thumbnailEl.appendChild(thumbnailItems[0])

        // add carousel class
        carouselEl.classList.add('next')
    } else {
        let positionLastItem = slideItems.length - 1;

        // change position the first element to the last
        carouselListItemEl.prepend(slideItems[positionLastItem])
        thumbnailEl.prepend(thumbnailItems[positionLastItem])

        // add carousel class
        carouselEl.classList.add('prev')
    }


    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
        carouselEl.classList.remove('next')
        carouselEl.classList.remove('prev')
    }, timeRunning)

    clearTimeout(runAutoSlide);


    runAutoSlide = setTimeout(() => {
        nextBtnEl.click();
    }, timeAutoNext);
}


