
let records = [];   

const books = {

   programming: [

{name:"HTML & CSS - Jon Duckett",status:"Available"},
{name:"Eloquent JavaScript",status:"Available"},
{name:"Python Crash Course",status:"Available"},
{name:"Java Complete Reference",status:"Available"},
{name:"C Programming Language",status:"Available"},
{name:"Learning React",status:"Available"},
{name:"Clean Code",status:"Available"},
{name:"You Don't Know JS",status:"Available"},
{name:"Head First Java",status:"Available"},
{name:"Programming Logic and Design",status:"Available"}

],
   novels:[

{name:"Harry Potter",status:"Available"},
{name:"The Hobbit",status:"Available"},
{name:"The Alchemist",status:"Available"},
{name:"The Great Gatsby",status:"Available"},
{name:"Pride and Prejudice",status:"Available"},
{name:"The Da Vinci Code",status:"Available"},
{name:"The Kite Runner",status:"Available"},
{name:"The Lord of the Rings",status:"Available"},
{name:"To Kill a Mockingbird",status:"Available"},
{name:"The Fault in Our Stars",status:"Available"}

],

   science:[

{name:"A Brief History of Time",status:"Available"},
{name:"Cosmos",status:"Available"},
{name:"The Selfish Gene",status:"Available"},
{name:"The Elegant Universe",status:"Available"},
{name:"Brief Answers to the Big Questions",status:"Available"},
{name:"Astrophysics for People in a Hurry",status:"Available"},
{name:"The Gene",status:"Available"},
{name:"The Immortal Life of Henrietta Lacks",status:"Available"},
{name:"Silent Spring",status:"Available"},
{name:"The Body",status:"Available"}

],
   history:[

{name:"The Discovery of India",status:"Available"},
{name:"India After Gandhi",status:"Available"},
{name:"Sapiens",status:"Available"},
{name:"Freedom at Midnight",status:"Available"},
{name:"Guns, Germs and Steel",status:"Available"},
{name:"The Silk Roads",status:"Available"},
{name:"Ancient India",status:"Available"},
{name:"The Story of Civilization",status:"Available"},
{name:"World History",status:"Available"},
{name:"The History of the Ancient World",status:"Available"}

],
};

let currentCategory = "";

function showCategory(category){

    currentCategory = category;

    const list = document.getElementById("bookList");

    list.innerHTML = "";

    books[category].forEach(book=>{

        let color = book.status=="Available" ? "green" : "red";

        list.innerHTML += `

        <li>

        <strong>${book.name}</strong>

        <br>

        Status :
        <span style="color:${color};font-weight:bold;">
        ${book.status}
        </span>

        </li>

        <br>

        `;

    });

}


function loadBooks(){

    const issue = document.getElementById("issueBook");
    const ret = document.getElementById("returnBook");
    const reserve = document.getElementById("reserveBook");

    issue.innerHTML = "<option>Select Book</option>";
    ret.innerHTML = "<option>Select Book</option>";
    reserve.innerHTML = "<option>Select Book</option>";

    for(let category in books){

        books[category].forEach(book=>{

            issue.innerHTML +=
            `<option>${book.name}</option>`;

            ret.innerHTML +=
            `<option>${book.name}</option>`;

            reserve.innerHTML +=
            `<option>${book.name}</option>`;

        });

    }

}

loadBooks();



function issueBook(){

let bookName=document.getElementById("issueBook").value;

let student=document.getElementById("studentName").value;

let roll=document.getElementById("studentRoll").value;

if(bookName=="Select Book" || student=="" || roll==""){

alert("Please fill all fields.");

return;

}

for(let category in books){

books[category].forEach(book=>{

if(book.name==bookName){

if(book.status=="Issued"){

document.getElementById("result").innerHTML=

"❌ This book is already issued.";

}

else{

    

book.status="Issued";

records.push({

Action:"Issue",

Book:book.name,

Student:student,

RollNo:roll,

Date:new Date().toLocaleString()

});



document.getElementById("result").innerHTML=

`<b>✅ Book Issued Successfully</b>

<br><br>

📚 <b>Book:</b> ${book.name}

<br>

👤 <b>Name:</b> ${student}

<br>

🆔 <b>Roll No:</b> ${roll}`;

document.getElementById("studentName").value="";
document.getElementById("studentRoll").value="";
document.getElementById("issueBook").selectedIndex=0;

}

}

});

}

if(currentCategory!=""){

showCategory(currentCategory);

}

}



function returnBook(){

let bookName=document.getElementById("returnBook").value;

let roll=document.getElementById("returnRoll").value;

if(bookName=="Select Book" || roll==""){

alert("Please fill all fields.");

return;

}

for(let category in books){

books[category].forEach(book=>{

if(book.name==bookName){

if(book.status=="Available"){

document.getElementById("result").innerHTML=

"❌ This book is already available.";

}

else{



book.status="Available";

records.push({

Action:"Return",

Book:book.name,

Student:"-",

RollNo:roll,

Date:new Date().toLocaleString()

});

document.getElementById("result").innerHTML=
`<b>✅ Book Returned Successfully</b>

<br><br>

📚 <b>Book:</b> ${book.name}

<br>

🆔 <b>Roll No:</b> ${roll}`;

document.getElementById("returnRoll").value="";
document.getElementById("returnBook").selectedIndex=0;

}

}

});

}

if(currentCategory!=""){

showCategory(currentCategory);

}

}


function reserveBook(){

let book=document.getElementById("reserveBook").value;

let name=document.getElementById("reserveName").value;

let roll=document.getElementById("reserveRoll").value;

if(book=="Select Book" || name=="" || roll==""){

alert("Please fill all fields.");

return;

}

records.push({

Action:"Reservation",

Book:book,

Student:name,

RollNo:roll,

Date:new Date().toLocaleString()

});


document.getElementById("result").innerHTML=

`<b>📅 Reservation Successful</b>

<br><br>

📚 <b>Book:</b> ${book}

<br>

👤 <b>Name:</b> ${name}

<br>

🆔 <b>Roll No:</b> ${roll}`;

document.getElementById("reserveName").value="";
document.getElementById("reserveRoll").value="";
document.getElementById("reserveBook").selectedIndex=0;

}



function showDigitalLibrary(){

    document.getElementById("digitalBooks").innerHTML=

    `
    <a href="https://www.w3schools.com/" target="_blank">
    HTML & CSS Tutorial
    </a>

    <a href="https://developer.mozilla.org/" target="_blank">
    JavaScript Documentation
    </a>

    <a href="https://www.geeksforgeeks.org/" target="_blank">
    GeeksforGeeks
    </a>

    <a href="https://www.freecodecamp.org/" target="_blank">
    freeCodeCamp
    </a>

    <a href="https://books.google.com/" target="_blank">
    Google Books
    </a>

    `;

}

function downloadExcel(){

if(records.length==0){

alert("No records available.");

return;

}

const worksheet = XLSX.utils.json_to_sheet(records);

const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, worksheet, "Library Report");

XLSX.writeFile(workbook, "Library_Report.xlsx");

}