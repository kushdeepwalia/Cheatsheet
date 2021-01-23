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

fetch("https://spreadsheets.google.com/feeds/list/1bHRdk1vAp_Q5_8moWbrlUJHb48pXsmprwXnw33Iy2B8/1/public/full?alt=json")
.then((res)=>res.json())
.then((data)=>{
    const htmlContent = document.getElementById("htmlContent");
    var totalCodes = data["feed"]["entry"].length;
    var code = data["feed"]["entry"];
    let htmlCode = "";
    for(let i=0;i<totalCodes;i++)
    {
        if(code[i]["gsx$language"]["$t"]==="HTML")
        {
            htmlCode+=`<li>
            <span class="heading">${code[i]["gsx$heading"]["$t"]}</span>
            <pre>
                <code class="language-html" id="test${i+1}">&lt;p&gt;&lt;/p&gt;</code>
            </pre>
        </li>`
        }
    }
    htmlContent.innerHTML=htmlCode;
    for(let i=0;i<totalCodes;i++)
    {
        if(code[i]["gsx$language"]["$t"]==="HTML")
        {
            let j = i+1;
            document.getElementById("test"+j).textContent=code[i]["gsx$code"]["$t"];
        }
    }
})
.then(() => {
    let script = document.createElement('script');
    script.src = "prism.js";
    document.body.append(script);
});






