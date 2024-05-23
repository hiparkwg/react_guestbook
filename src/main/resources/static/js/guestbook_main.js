import axios from 'axios'
import {useEffect, useState} from "react"

let [findStr, setFindStr] = useState('');
let [list, setList] = useState([])
let [data, setData] = useState('');
let [sno, setSno] = useState(-1);
let [vo, setVo] = useState('');
let [frm, setFrm] = useState();

function GuestBookMain(props){
   return(
      <main>
         <h1>GuestBook</h1> 
         <GuestBookList/>
      </main>
   )
}

function GuestBookList(){


   
   useEffect( ()=>{
      fetch("/guestbookView?sno=" + sno)
      .then(resp=> resp.text())
      .then(msg=>{
         if(msg != null && msg != ''){
            data = JSON.parse(msg);
            setVo(data);
         }
         console.table('view:', vo)
      })
   }, [sno]);
   

   /* spring server 80번 포트로 통신 proxy 설정확인 */
   /*
   useEffect( ()=>{
      fetch("/guestbookList?findStr=" + findStr)
      .then(resp=> resp.json())
      .then(msg=>{
         console.table('msg:', msg)
         setData(msg);
      })
   }, [findStr]);

   if(data != ''){
      list =data.map(d=>
         <tr onClick={e=>setSno(d.sno)}>
            <td>{d.sno}</td>
            <td>{d.id}</td>
            <td>{d.nal}</td>
            <td>{d.doc}</td>
         </tr>   
      )
   }
   */


   const find=()=>{
      findStr = document.querySelector('#findStr').value;
      setFindStr(findStr);
      console.log('findStr:', findStr)
      axios({
         method  : 'get',
         url     : '/guestbookList',
         params  : {'findStr': findStr},
         responseType : 'json'
      }).then(resp=>{
         if(resp !=null && resp !=''){
            list =resp.data.map(d=>
               <tr onClick={e=>setSno(d.sno)}>
                  <td>{d.sno}</td>
                  <td>{d.id}</td>
                  <td>{d.nal}</td>
                  <td>{d.doc}</td>
               </tr>   
            )
            setList(list);            
         }
      })
   }


   return(
      <div>
         <hr/>
         <input  id='findStr' defaultValue={findStr}/>
         <button type='button' onClick={find}>검색</button>
         <table width='100%'>
            <tr className='title'>
               <th>sno</th>
               <th>id</th>
               <th>nal</th>
               <th>doc</th>
            </tr>
            {list}
         </table>
      </div>
   )

}

function GuestBookRegister(props){
   console.log('....', props.vo)

   const send=(e)=>{
      frm = document.frmRegister ;
      frm.action="/guestbookRegister";
      frm.method='post';
      frm.submit();
   }

   if(props.vo !== null && props.vo !== ''){
      let frm = document.frmRegister;
      console.table('register props:', props.vo)
      frm.id.value = props.vo.id;
      frm.doc.value = props.vo.doc;
      frm.sno.value = props.vo.sno;
   }

   //function del(){}
   const del=()=>{
      let temp = document.frmRegister;
      let frm = new FormData(temp);
      axios({
         method : 'post',
         url    : '/guestbookDelete',
         data   : frm,
         responseType : 'text'
      }).then(resp=>{
         if(resp.data != '') alert(resp.data)
         props.find();
      })
   }

   const modify = ()=>{
      let temp = document.frmRegister;
      let frm = new FormData(temp);
      axios({
         method  : 'post',
         url     : '/guestbookModify',
         data    : frm,
         responseType : 'text'
      }).then( resp=>{
         if(resp.data != '') alert(resp.data);
         props.find();
      })
   }





   return(
      <div>
         <form name='frmRegister' className='frmRegister'>
            <h2>Register...</h2>
            <span>ID</span>
            <input name='id'/><br/>
            <span></span><textarea name='doc'></textarea>
            <br/>
            <span>암호</span>
            <input type='password' name='pwd'/>
            <input type='text' name='sno' />
            <br/>
            <button type='button' onClick={send}>전송</button>
            <button type='button' onClick={modify}>수정</button>
            <button type='button' onClick={del}>삭제</button>

         </form>
      </div>
   )
}
