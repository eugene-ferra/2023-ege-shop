function changeWiew(innerClass, cardClass, triggerClass) {
    try {
        const inner = document.querySelector(`.${innerClass}`);
        
        const triggers = document.querySelectorAll(`.${triggerClass}`);

        triggers.forEach(trigger => {
            trigger.addEventListener("click", function (e) {
                const cards = inner.querySelectorAll(`.${cardClass}`);
                if (!e.currentTarget.classList.contains(`${triggerClass}--active`)) {
                    triggers.forEach(item => {
                        item.classList.remove(`${triggerClass}--active`)
                    })
                    e.currentTarget.classList.add(`${triggerClass}--active`)

                    if (e.currentTarget.id == "lines") {
                        inner.classList.add("wide");
                        cards.forEach(item => {
                            item.classList.add("card--wide")
                        })
                    }
                    if (e.currentTarget.id == "grid") {
                        inner.classList.remove("wide");
                        cards.forEach(item => {
                            item.classList.remove("card--wide")
                        })
                    }
                }
            })
        })

    } catch { }


}

export default changeWiew