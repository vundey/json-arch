let file = document.querySelector(".file");
let btn = document.querySelector(".btn");

let title = document.querySelector(".title");
var form = document.querySelector(".form");



function readerJSON(){
    let test = file.files[0];
    form.style.cssText = "padding: 2em;";
    
    let reader = new FileReader();
    reader.readAsText(test);
    reader.onload = function(){
        // Добавление заголовка
        let text = reader.result;
        const json = JSON.parse(text);
        
        addMain(json);
        addReferences(json);
        addButton(json);
        // Добавление формы с импутами
        
    }
}

function addMain(json){
    title.textContent = json['name'];
    // Добавление формы с импутами
    for(let i=0; i < json.fields.length; i++){
        let el = document.createElement("label");
        let el2 = document.createElement("input");

        el.textContent = json.fields[i].label;
        form.appendChild(el);
        for(let it in json.fields[i].input){
            el2.setAttribute(it, json.fields[i].input[it]);
        }
        
        form.appendChild(el2);
    }
}

function addReferences(json){
    if(json.references != null){
        
        for(let i = 0; i < json.references.length; i++){
            if(json.references[i].input != null){
                var el3 = document.createElement("input");
                for(id in json.references[i].input){
                    el3.setAttribute(id, json.references[i].input[id]);
                }
                form.appendChild(el3); 
            }else{
                for(id in json.references[i]){
                    var el4 = document.createElement("p");
                    el4.textContent = json.references[i][id];
                    form.appendChild(el4);
                    
                }
            }
        }  
    }
}


function addButton(json){
    if(json.buttons != null){
        for(let i = 0; i < json.buttons.length; i++){
            let btnEl = document.createElement("button");
            btnEl.textContent = json.buttons[i].text;
            form.appendChild(btnEl);
        }
    }
    file.disabled = true;
}

function btnEvent(){
    title.textContent = null;
    file.disabled = false;
    form.style.cssText = "padding: 0;";
    form.innerHTML = "";
}

file.addEventListener("change", readerJSON, false);
btn.addEventListener("click", btnEvent, false);
