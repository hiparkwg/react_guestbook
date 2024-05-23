const  Test=()=>{
   return(
      <h2>function test...</h2>
   )
}

/* controller call test */
function Test2(){
   const { useState } = React;
   let [data, setData] = useState('')
   const handler = ()=>{
      axios({
         method: 'get',
         url: '/guestbookList',
         responseType: 'text'
      }).then(resp => {
         if(resp.data != null){
            console.log(resp.data);
            setData('extra type receive data :' + resp.data);
         }
      })
   }
   return (
      <div>
         <button type='button' onClick={handler}>SEND</button>
         {data}
      </div>
   )

}

