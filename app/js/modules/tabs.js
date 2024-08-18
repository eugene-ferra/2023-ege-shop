function tabs(triggers, tabsSelector, activeClass) {
    const tabs = document.querySelectorAll(triggers)
    const categories = document.querySelectorAll(tabsSelector)
    let activeTab


    tabs.forEach(item => {
        if (item.classList.contains(activeClass)) {
            activeTab = item.getAttribute('data-category')
        }
    })

    categories.forEach(item => {
        if (item.getAttribute('data-category') != activeTab) {
            item.classList.remove(activeClass)
        } else {
            item.classList.add(activeClass)
        }
    })

    tabs.forEach(item => {
        item.addEventListener('click', function () {

            tabs.forEach(item => {
                item.classList.remove(activeClass)
            });
            item.classList.add(activeClass);
            activeTab = item.getAttribute('data-category')

            categories.forEach(item => {
                if (item.getAttribute('data-category') != activeTab) {
                    item.classList.remove(activeClass)
                } else {
                    item.classList.add(activeClass)
                }
            })
        })

    })

}


export default tabs;