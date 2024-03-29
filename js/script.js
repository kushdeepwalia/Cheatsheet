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
var api = "https://sheets.googleapis.com/v4/spreadsheets/1iAZRBOzGeX7pbxLKEVtl9or_eCXYwwXCuF-sONU3BWM/values:batchGet?ranges=A2:U133&key=AIzaSyATGC19rqvjo4HJs8uMHFoittxEeoNViPs"
// var api = "https://spreadsheets.google.com/feeds/list/1bHRdk1vAp_Q5_8moWbrlUJHb48pXsmprwXnw33Iy2B8/1/public/full?alt=json"
fetch(api)
.then((res)=>res.json())
.then((data)=>{
    const htmlContent = document.getElementById("htmlContent");
    const cssContent = document.getElementById("cssContent");
    const jsContent = document.getElementById("jsContent");
    const phpContent = document.getElementById("phpContent");
    var totalCodes = data.valueRanges[0].values.length;

    var code = data.valueRanges[0].values;
    console.log(code);
    // let cheatCode = "";
    for(let i=0;i<totalCodes;i++)
    {
        let cheatCode = "";
        let j= i+1;
        if(code[i][1]==="HTML")
        {
            cheatCode+=`<br><li>
            <span class="heading">${code[i][2]}</span>
            <pre class="language-html">
                <code class="language-html" id="htmlText${i+1}"></code>
            </pre>
            </li>`
            htmlContent.innerHTML+=cheatCode;            
            let text = document.getElementById("htmlText"+j);
            text.textContent+=code[i][3];
        }
        else if(code[i][1]==="CSS")
        {
            cheatCode+=`<br><li>
            <span class="heading">${code[i][2]}</span>
            <pre class="language-css">
                <code class="language-css" id="cssText${i+1}"></code>
            </pre>
            </li>`
            cssContent.innerHTML+=cheatCode;
            let text = document.getElementById("cssText"+j);
            text.textContent+=code[i][3];
        }
        else if(code[i][1]==="JavaScript")
        {
            cheatCode+=`<br><li>
            <span class="heading">${code[i][2]}</span>
            <pre class="language-js">
                <code class="language-js" id="jsText${i+1}"></code>
            </pre>
            </li>`
            jsContent.innerHTML+=cheatCode;
            let text = document.getElementById("jsText"+j);
            text.textContent+=code[i][3];
        }
        else if(code[i][1]==="PHP")
        {
            cheatCode+=`<br><li>
            <span class="heading">${code[i][2]}</span>
            <pre class="language-php">
                <code class="language-php" id="phpText${i+1}"></code>
            </pre>
            </li>`
            phpContent.innerHTML+=cheatCode;
            let text = document.getElementById("phpText"+j);
            text.textContent+=code[i][3];
        }
    }
})
.then(() => {
    let script = document.createElement('script');
    script.src = "./js/prism.js";
    document.body.append(script);
});




