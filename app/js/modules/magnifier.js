function magnify({images, activeIndex, container, containerImg, containerMove, magnifierClass, containerMoveActiveClass}){

    let magnifier = document.createElement("div");
    let containerMoveStyles = window.getComputedStyle(containerMove);
    
    containerImg.addEventListener("mousemove", (e) => {
        containerMove.style.backgroundImage = `url(${images[activeIndex].getAttribute('src')})`;
        container.appendChild(magnifier)
        magnifier.setAttribute("class", magnifierClass);
        containerMove.classList.add(containerMoveActiveClass)
        const magnifierSize = magnifier.offsetWidth;
        let x = e.offsetX;
        let y = e.offsetY;

        magnifier.style.left = x + "px";
        magnifier.style.top = y - magnifierSize / 2 + "px";

        containerMove.style.backgroundPositionX = -e.offsetX * 1.3 + "px";
        containerMove.style.backgroundPositionY = -e.offsetY * 1.4 + "px";
        containerMove.style.backgroundSize = "200% auto";

    });


    containerImg.addEventListener("mouseleave", () => {
        containerMove.style.backgroundImage = `none`;
        containerMove.style.backgroundPositionX = "center";
        containerMove.style.backgroundPositionY = "center";
        containerMove.style.backgroundSize = 'contain'
        magnifier.remove();
        containerMove.classList.remove(containerMoveActiveClass)
    });
}

export default magnify