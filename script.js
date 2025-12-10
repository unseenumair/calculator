console.log("Hey Calculator");

const btns = document.querySelectorAll(".btn");
const display = document.querySelector("#display");

// Disabling TagIndex for All Btns
btns.forEach((e)=>{
    e.setAttribute("tabindex", "-1");
});

function appendZero() {
    if (display.innerText === "") {
        display.innerText = "O";
    }
}

function changeBg(className) {
    display.classList.add(className);
    setTimeout(()=> display.classList.remove(className), 600);
}

function clear() { display.innerText = ""; }
function del() { display.innerText = (display.innerText).slice(0,-1); }

function main(value) {
    const notAppend = ["clr", "DEL", "=", "Enter", "Backspace"];

    // Appending Text inside Display
        if (!notAppend.includes(value)) {
            if (display.innerText === "O") {
                    display.innerText = (value === "x") ? "*" : value;
            }

            else {
                // Handling "..." value
                let text = display.innerText;
                let dotsIndex = (text).indexOf("...");
                if (dotsIndex != -1) {
                    display.innerText = text.slice(0, dotsIndex);
                }
                
                display.innerText += (value === "x") ? "*" : value;
            }
        }

        // clr (clear)
        if (value === "clr") { clear(); }

        // DEL (delete)
        if (value === "DEL" || value === "Backspace") { del(); }

        appendZero();

        // equal
        if (value === "=" || value === "Enter") {
            try {               
                let result = eval(display.innerText);
                let result_str = String(result);

                // Handling Big Value
                if (result_str.length > 5) {
                    result = result_str.slice(0, 6) + "...";
                }

                // Showing Error & Success Criteria
                if (String(result) === display.innerText) {
                    changeBg("error");
                }
                else {
                    display.innerText = result;
                    changeBg("success");
                }
            } 
            catch (error) { changeBg("error"); }
        }   
}

btns.forEach((e)=>{
    e.addEventListener("click", () => main(e.innerText));
});

// Calculating using KeyBoard keys
const validKeys = ["Enter"];
btns.forEach((e) => {
    if (e.innerText != "x" && e.innerText != "clr" && e.innerText != "DEL") {
        validKeys.push(e.innerText);
    }
    else if (e.innerText === "x"){
        validKeys.push("*");
    }
    else if (e.innerText === "DEL") {
        validKeys.push("Backspace");
    }
});

document.addEventListener("keydown", (e)=>{
    if (validKeys.includes(e.key)) {
        main(e.key);
    }
});
