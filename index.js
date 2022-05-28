document.querySelector("#addbutton").addEventListener("click",async ()=>{
    let tasktitle=document.querySelector("#taskinput").value;
    let statusoftask;
        if( document.querySelector("#taskstatus").checked){
            statusoftask=true;
        }else{
            statusoftask=false;
        }
    let body={
        "title":tasktitle,
        "status":statusoftask
    }
    let res=await fetch("http://localhost:3000/data",{
           method:"POST",
           body:JSON.stringify(body),
           headers:{
               "Content-Type":"application/json"
           }
       });
       let data= await res.json();
       console.log(data);
})


let container=document.querySelector("#displaydataoftasks");
async function updatedom(){
    container.innerHTML="";
  let table=document.createElement("table");
  let thead=document.createElement("thead");
  let theadrow=document.createElement("tr");
  let th1=document.createElement("th");
  th1.innerText="ID";
  let th2=document.createElement("th");
  th2.innerText="Task_Title";
  let th3=document.createElement("th");
  th3.innerText="DELETE";
  let th4=document.createElement("th");
  th4.innerText="EDIT";
  theadrow.append(th1,th2,th3,th4);
  thead.append(theadrow);
  let tbody=document.createElement("tbody");
  let response= await fetch("http://localhost:3000/data");
  let data=await response.json();
  data.forEach((task)=>{
    let{id,title,status}=task;  
    let tbodyrow=document.createElement("tr");
    let td1=document.createElement("td");
    td1.innerText=id;
    let td2=document.createElement("td");
    console.log(title);
    td2.innerText=title;
    if(status===true){
        td2.style="color:green;"
    }else{
        td2.style="color:red;"
    }
    let td3=document.createElement("td");
    let delbutton=document.createElement("button");
    delbutton.innerText="DELETE";
    td3.append(delbutton);
    delbutton.onclick=async function(){
        let res=fetch(`http://localhost:3000/data/${id}`,{
            method:"DELETE"
        });
        updatedom();
    }
    let td4=document.createElement("td");
    let editbutton=document.createElement("button");
    editbutton.innerText="EDIT";
    td4.append(editbutton);
    editbutton.onclick=async function(){
        localStorage.removeItem("taskid");
        localStorage.setItem("taskid",JSON.stringify(id));
        location.href="edit.html";
    }
    tbodyrow.append(td1,td2,td3,td4);
    tbody.append(tbodyrow);
  })
  table.append(thead,tbody);
  container.append(table);

}
updatedom()