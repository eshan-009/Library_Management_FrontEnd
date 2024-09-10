const booklist = document.querySelector(".booklist")
const addbutton = document.querySelector("[addbookbutton]")
const addbookform = document.querySelector("form");
const searchinput = document.querySelector("[searchinput]");
const searchbutton = document.querySelector("[searchbutton]")
const searchresult = document.querySelector("[searchresult]")
const searchbox = document.querySelector("[searchbox]");
const addbooktab = document.querySelector("[booktab]")
const tab1 = document.querySelector("[tab1]");
const tab2 = document.querySelector("[tab2]");
const tab3 = document.querySelector("[tab3]");
const inputTitle = document.querySelector("#title")
const inputAuthor = document.querySelector("#author_name")
const inputDescription = document.querySelector("#description")
const bookFormButton = document.querySelector("[addbookbutton]")
const loader = document.createElement("p");
loader.classList.add("loader")
loader.innerHTML = "LOADING..."
const library = [];
let currentTab=tab1;
toggle(currentTab);
// booklist.classList.add("active");
// console.log("cu",currentTab);
var clickedId;
async function getData () {
    const data = await fetch(`https://library-management-system-backend-jid6.onrender.com/api/`);
    const data1 = await data.json();

    return data1.book;
}



function toggle(tab)
{
    tab1.classList.remove("current");
    tab2.classList.remove("current");
    tab3.classList.remove("current");
    tab.classList.add("current");
    if(tab === tab1)
        {
            searchbox.classList.remove("active");
            addbooktab.classList.remove("active")
            booklist.classList.add("active");
            currentTab=tab1;
            bookFormButton.innerHTML = "Edit Book"
     
        }
        else if(tab === tab2)
        {
            
            addbooktab.classList.remove("active")
            booklist.classList.remove("active");
            searchbox.classList.add("active");
            currentTab=tab2;
          
           
          
        }
        else
        {
        
            booklist.classList.remove("active");
            searchbox.classList.remove("active");
            addbooktab.classList.add("active");
            bookFormButton.innerHTML = "Add Book"
            currentTab=tab3;
         
        }
}
tab1.addEventListener("click",()=>{
    currentTab = tab1;
    toggle(currentTab);
})
tab2.addEventListener("click",()=>{
    toggle(tab2);
})
tab3.addEventListener("click",()=>{
    toggle(tab3);
})

async function addBook(title, author,description){
   

    if(!title || !author || !description)
    {
        return alert("Fill All details")
    }
    else
    {
      const response = await fetch(`https://library-management-system-backend-jid6.onrender.com/api/`,{
        method : "POST",
        body : JSON.stringify({
          
            title:title,
            author:author,
            description:description,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
       
      })
     
      if(response.status === 200)
        {
            alert("Book Added Successfully");
        }
        else
        {
            alert("Book Already Exist");
        }
    }
   
    location.reload();
   
  
}
async function updateBook(id,title, author,description){
   
    console.log("Update BOOk START ",title,author,description);
    if(!title || !author || !description)
    {
        return alert("Fill All details")
    }
    else
    {
      const response = await fetch(`https://library-management-system-backend-jid6.onrender.com/api/`,{
        method : "PUT",
        body : JSON.stringify({
            id:id,
            title:title,
            author:author,
            description:description,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
       
      })

    }
   
    location.reload();
    alert("Book Updated Successfully");
    inputTitle.value ="";
        inputAuthor.value ="";
        inputDescription.value ="";
}
async function borrowBook(id)
{

       const response = await fetch(`https://library-management-system-backend-jid6.onrender.com/api/`,{
        method : "PATCH", 
        body :JSON.stringify({id:id, isBorrowed : true}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
       })
       console.log("POST REsponse",response)
    
    return
}

async function returnBook(id)
{
    const response = await fetch(`https://library-management-system-backend-jid6.onrender.com/api/`,{
        method : "PATCH", 
        body :JSON.stringify({id:id, isBorrowed : false}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
       })
       console.log("POST REsponse",response)
    
    return
}
async function listAvailableBooks(){
      booklist.appendChild(loader);
    const librariran = await getData() ;
    booklist.removeChild(loader);
    // console.log(librariran)
    if(librariran)
    {
        for(item of librariran)
            {
                listbookitem(item.title,item._id,item.author,item.isBorrowed);
            }
    }
    else
    {
        return alert("Library is Empty")
    }
   
    
}

async function searchBook(title){
    const librariran = await getData()
    if(librariran)
    {
        const bookdata = librariran.filter((item)=>{
           
            const bookname = item.title.toLowerCase().split(" ").join("");
            // console.log("Apple",bookname);
         
            if(bookname.includes(title.toLowerCase().split(" ").join("")))
            {
              
                return item;
            }
        });
     
        if(bookdata)
        {   
            
            return bookdata;
        }
        else 
        {
           
            return null;
        }
    }
   
}

function createListitem(text,id,author,isBorrowed){
    // console.log("Here",id)
    const listitem = document.createElement("li");
    listitem.classList.add("listitem");
    listitem.innerHTML= `${text} &nbsp  &nbsp &nbsp by ${author} &nbsp&nbsp&nbsp `
    const button = document.createElement("button");
    button.innerHTML = `${isBorrowed ? "Return Book" : "Borrow Book"}`;
    button.style.cssText = `${isBorrowed ? "background-color: #E94F37" : "background-color: #3BB273"}; border-radius: 1rem;height: 2.6rem ;width: 7rem; display:flex;justify-content:center ;align-items: center;font-size: 1rem; color:#FFFFFF;`
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete"
    deleteButton.style.cssText = "background-color: #E94F37; border-radius: 1rem;height: 2.6rem ;width: 6rem; display:flex;justify-content:center ;align-items: center;font-size: 1rem; color:#FFFFFF;"
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit",
      editButton.style.cssText = "background-color: #E94F37; border-radius: 1rem;height: 2.6rem ;width: 3rem; display:flex;justify-content:center ;align-items: center;font-size: 1rem; color:#FFFFFF;"

    button.addEventListener("click",async(e)=>{
        e.preventDefault();
     
        const librariran = await getData();
        const requiredbook = librariran.find((elem)=>elem._id===id);
        console.log("Event",requiredbook)
        if(requiredbook.isBorrowed===false)
        {
            await borrowBook(id);
            location.reload();
            alert("Book Borrowed");
        }
        else
        {
            await returnBook(id);
            location.reload();
           alert("Book Returned");
        }
        
    })
    deleteButton.addEventListener("click",async(e)=>{
        console.log("Hello")
        e.preventDefault();
        const response = await fetch(`https://library-management-system-backend-jid6.onrender.com/api/`,{
            method:"DELETE",
            body : JSON.stringify({id:id}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }

        })
       
        location.reload();
        alert("Book Deleted");
    })
    editButton.addEventListener("click",async(e)=>{
        e.preventDefault();
        booklist.classList.remove("active");
        addbooktab.classList.add("active");
        
        const Data = await getData();
        clickedId = id;
        const requiredBook = Data.find((item)=>item._id===clickedId)
        inputTitle.value = requiredBook.title;
        inputAuthor.value = requiredBook.author;
        inputDescription.value = requiredBook.description;
       
        if(Array.from(addbooktab.classList).includes("active"))
            {
                 bookFormButton.innerHTML = "Edit Book";
                 searchresult.innerHTML = ""
            }
           
    })
    const parentButton = document.createElement("div");
    parentButton.classList.add("parentButton");

    parentButton.appendChild(button);
    parentButton.appendChild(deleteButton);
    parentButton.appendChild(editButton);
    listitem.appendChild(parentButton);
    return listitem;
}
const listbookitem1 =  (text,id,author,isBorrowed)=>{
   const listitem = createListitem(text,id,author,isBorrowed)
    searchresult.appendChild(listitem)
}
searchbutton.addEventListener("click",async (e)=>{
    // e.preventDefault();
    const text = searchinput.value;
    let searchdata = await searchBook(text);
    // console.log("Here",searchdata)
    searchresult.innerHTML=''
    searchdata.map((item)=>listbookitem1(item.title,item._id,item.author,item.isBorrowed)); 
    })

const listbookitem =  (text,id,author,isBorrowed)=>{
    const listitem = createListitem(text,id,author,isBorrowed);
    booklist.appendChild(listitem);
}



addbookform.addEventListener("submit",(e)=>{
    e.preventDefault();
  
    const formdata = new FormData(addbookform);
    let title = formdata.get("title");
    let author = formdata.get("author_name")
    let description = formdata.get("description");

  if(bookFormButton.innerHTML === "Edit Book")
  {
    updateBook(clickedId,title,author,description);
  }
  else
  {
    addBook(title,author,description);
  }
  clickedId = null;


});



listAvailableBooks();



