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

fetch("https://spreadsheets.google.com/feeds/list/1iAZRBOzGeX7pbxLKEVtl9or_eCXYwwXCuF-sONU3BWM/1/public/full?alt=json")
.then((res)=>res.json())
.then((data)=>{
    const htmlContent = document.getElementById("htmlContent");
    const cssContent = document.getElementById("cssContent");
    const jsContent = document.getElementById("jsContent");
    const phpContent = document.getElementById("phpContent");
    var totalCodes = data["feed"]["entry"].length;
    var code = data["feed"]["entry"];
    let htmlCode = "";
    let cssCode = "";
    let jsCode = "";
    let phpCode = "";
    for(let i=0;i<totalCodes;i++)
    {
        if(code[i]["gsx$language"]["$t"]==="HTML")
        {
            htmlCode+=`
            <br>
            <li>
                <span class="heading">${code[i]["gsx$heading"]["$t"]}</span>
                <pre>
                    <code class="language-html" id="test${i+1}"></code>
                </pre>
            </li>`
        }
        if(code[i]["gsx$language"]["$t"]==="CSS")
        {
            cssCode+=`
            <br>
            <li>
                <span class="heading">${code[i]["gsx$heading"]["$t"]}</span>
                <pre>
                    <code class="language-css" id="test${i+1}"></code>
                </pre>
            </li>`
        }
        if(code[i]["gsx$language"]["$t"]==="JavaScript")
        {
            jsCode+=`
            <br>
            <li>
                <span class="heading">${code[i]["gsx$heading"]["$t"]}</span>
                <pre>
                    <code class="language-js" id="test${i+1}"></code>
                </pre>
            </li>`
        }
        if(code[i]["gsx$language"]["$t"]==="PHP")
        {
            phpCode+=`
            <br>
            <li>
                <span class="heading">${code[i]["gsx$heading"]["$t"]}</span>
                <pre>
                    <code class="language-php" id="test${i+1}"></code>
                </pre>
            </li>`
        }
    }
    if(htmlCode !== "")
        htmlContent.innerHTML=htmlCode;
    if(cssCode !== "")
        cssContent.innerHTML=cssCode;
    if(jsCode !== "")
        jsContent.innerHTML=jsCode;
    if(phpCode !== "")
        phpContent.innerHTML=phpCode;
    for(let i=0;i<totalCodes;i++)
    {
        let j = i+1;
        document.getElementById("test"+j).textContent=code[i]["gsx$code"]["$t"];
    }
})
.then(() => {
    let script = document.createElement('script');
    script.src = "prism.js";
    document.body.append(script);
});






