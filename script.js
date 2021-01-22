const listItems = document.querySelectorAll("nav ul li");
const sections = document.querySelectorAll("section");

listItems.forEach(element => {
    element.addEventListener("click", () => {
        let id = element.id;
        let sectionID = element.id + "-section";
        console.log(sectionID);
        listItems.forEach(listItem => {
            if(listItem.classList.contains("li-active"))
                listItem.classList.remove("li-active");
        });
        sections.forEach(section => {
            if(section.classList.contains("section-active"))
                section.classList.remove("section-active");
        })
        let clickedElement = document.getElementById(id);
        let toggleSection = document.getElementById(sectionID);
        clickedElement.classList.add("li-active");
        toggleSection.classList.add("section-active");
    })
});