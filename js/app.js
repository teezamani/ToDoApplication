
// Select the Elements
const timeF = document.getElementById("demo");
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const submit = document.getElementById("form");
const filter = document.getElementById('filter');

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});
//                        prompt                    //
    var n = new Date();
    var time = n.getHours();
    var txt;
    var person = prompt(" Welcome back \n please enter your name:", "");
    if (person == null || person == "") {
      txt = " Good day !!!! ";
    }else if (time <12) {
        txt = `Good Morning ${person} !!!`
    }else if (time >=12 && time <16) {
        txt = `Good Afternoon ${person} !!!`
    }else if (time >=16 && time <=19 ) {
        txt = `Good Evening ${person} !!!`
    } else {
        txt = `Good Night ${person} !!! `
    }
    timeF.innerHTML = txt;
 
//  show  added alert 
submit.addEventListener('click', buttonClick)
function buttonClick(e) {
    if (input.value=="") {
        return "";
    }else{
        document.getElementById('added').style.display="block";
    }
    setTimeout(()=> document.getElementById('added').remove(),3000);
}
// Show cleared alert
document.querySelector('.clear').addEventListener('click', clearedClick)
function clearedClick(e) {   
        document.getElementById('wel').style.display="block";
        setTimeout(()=> document.getElementById('added').remove(),3000);
}
    
  
// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <span class="text ${LINE}">${toDo}</span>
                    <i class="fa fa-trash-o de float-right mr-4"  job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
submit.addEventListener('submit', function (e) {
    e.preventDefault();
     // get form value
 const toDo = input.value;
 if (toDo) {
     addToDo(toDo,id,false,false );

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));            
            id++;
        }
        input.value = "";
});

// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
            element.parentNode.parentNode.removeChild(element.parentNode);  
            LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


//Filter items
//Filter Event
filter.addEventListener('keydown', filterItems);

function filterItems(e) {
    //Convert text to lowerCASE
    let text = e.target.value.toLowerCase();
    //Get List
    let items = list.getElementsByTagName('li');
    //Convert to Array
    Array.from(items).forEach(function (item) {
        let itemName = item.textContent;
        if (itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display ='block';
        }else{
            item.style.display ='none';
        }
    })
}

















