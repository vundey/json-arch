let file = document.querySelector(".file");
let btn = document.querySelector(".btn");

let title = document.querySelector(".title");
let form = document.querySelector(".form");



function readerJSON(){
    let test = file.files[0];

    let reader = new FileReader();
    reader.readAsText(test);
    reader.onload = function(){
        // Добавление заголовка
        let text = reader.result;
        const json = JSON.parse(text);
        title.textContent = json.name;
        // Добавление формы с импутами
        for(let i=0; i <= Number(json.fields.length)+1; i++){
            let el = document.createElement("label");
            let el2 = document.createElement("input");
    
            el.textContent = json.fields[i].label;
            el2.type = json.fields[i].input.type;
            if(!json.fields[i].input.required){
                el2.required = json.fields[i].input.required;
            }
            form.appendChild(el);
            form.appendChild(el2);
        }
    
        if(!json.references){
            let el3 = document.createElement("label");
        }
    
        file.disabled = true;
    }
}

function btnEvent(){
    title.textContent = null;
    file.disabled = false;
    form.remove();
}

file.addEventListener("change", readerJSON, false);
btn.addEventListener("click", btnEvent, false);
