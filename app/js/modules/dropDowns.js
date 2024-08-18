function dropdown(triggersSelector, dropDownsSelector, activeClass){
    let dropdowns = document.querySelectorAll(dropDownsSelector)
    let triggers = document.querySelectorAll(triggersSelector)
    
    triggers.forEach((item, i) => {
        item.addEventListener('click', function(){
            triggers[i].classList.toggle(activeClass)
            dropdowns[i].classList.toggle(activeClass)
        })
    })
}

export default dropdown