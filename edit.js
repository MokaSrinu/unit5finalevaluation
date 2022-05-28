let id1=JSON.parse(localStorage.getItem("taskid"))
    console.log(id1);
    let display=async ()=>{
      try {
          let response=await fetch(`http://localhost:3000/data/${id1}`);
          let res=await response.json();
          console.log(res);
          let {id,title,status}=res;
          document.querySelector("#task").value=title;
          if(status===true){
              document.querySelector("#statuscheck").checked=true;
          }
      } catch (error) {
          console.log(error);
      }
    }
    display();
    let edit=async()=>{
        try {
            let statusoftask;
            if(document.querySelector("#statuscheck").checked){
                 statusoftask=true;
            }else{
                statusoftask=false;
            }
           let body1={
               "title":document.querySelector("#task").value,
               "status":statusoftask
           }
           let res1=await fetch(`http://localhost:3000/data/${id1}`,{
               method:"PUT",
               body:JSON.stringify(body1),
               headers:{
                   "Content-Type":"application/json"
               }
           });
           let data1= await res1.json();
           console.log(data1);
           location.href="./index.html"
           
       } catch (error) {
           console.log(error)
       }
    }
