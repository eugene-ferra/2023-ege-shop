function enableScroll(element) {
    let isDown = false;
    let startX;
    let scrollLeft;

    element.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
        element.style.cursor = 'grabbing'
    });
    element.addEventListener('mouseleave', () => {
        isDown = false;
        element.style.cursor = 'grab'
    });
    element.addEventListener('mouseup', () => {
        isDown = false;
        element.style.cursor = 'grab'
    });
    element.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX); //scroll-fast
        element.scrollLeft = scrollLeft - walk;
        element.style.cursor = 'grabbing';        

        
    });

    // element.addEventListener('wheel', (e) => {
    //     e.preventDefault();
    //     element.scrollTo({
    //         left: element.scrollLeft + e.deltaY / 3,
    //     })

    // })




}

export default enableScroll;