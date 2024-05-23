function GuestBookRegister(props){

   let [loginId, setLoginId] = useState('');
   
   loginId = sessionStorage.getItem("id");
   

   const send=(e)=>{
      let frm = document.frmRegister;
      
      if(frm.id.value == ''){
			alert('먼저 로그인해 주세요');
			return;
		} 
      if(frm.doc.value == '' || frm.pwd.value == ''){ 
			alert('모든 항목을 작성해 주세요');
			return;
		}
      
      /*
      let param = {
         'id' : frm.id.value,
         'doc' : frm.doc.value,
         'pwd' : frm.pwd.value
      }
      */
	  let data = new FormData(frm);
      
      axios({
         method : 'post',
         url    : '/guestbookRegister',
         data   : data,
         responseType : 'text'
      }).then(resp=>{
         if(resp.data != '') alert(resp.data)
         document.querySelector('.btnFind').click();
      })
   }

   //function del(){}
   const del=()=>{
      let frm = document.frmRegister;
      let data = new FormData(frm);
      axios({
         method : 'post',
         url    : '/guestbookDelete',
         data   : data,
         responseType : 'text'
      }).then(resp=>{
         if(resp.data != '' ) alert(resp.data)
         document.querySelector('.btnFind').click();
      })
   }

   const modify = ()=>{
      let frm = document.frmRegister;
      let data = new FormData(frm);
      
      axios({
         method  : 'post',
         url     : '/guestbookModify',
         data    : data,
         responseType : 'text'
      }).then( resp=>{
         if(resp.data != '' ) alert(resp.data)
         document.querySelector('.btnFind').click();
      })
   }

   const cancelF=()=>{
      let frm = document.frmRegister;
      frm.id.value= sessionStorage.getItem("id");
      frm.doc.value = '';
      frm.sno.value='';
      frm.pwd.value = '';
      document.querySelector('.btnSend').style.display='inline';
      document.querySelector('.btnControl').style.display='none';
		document.querySelector('.subTitle').innerHTML = "Regisger...";
   }

   return(
      <div>
         <form name='frmRegister' className='frmRegister'>
            <h2 class='subTitle'>Register...</h2>
            <span>ID</span>
            <input name='id' class='id' readOnly value={loginId} /><br/>
            <span></span>
            <textarea name='doc' cols='40' rows='4'></textarea>
            <br/>
            <span>암호</span>
            <input type='password' name='pwd'/>
            <br/>
            <div className='btnZone'>
               <span></span>
               <div className='btnControl'>
                  <button type='button' onClick={modify}  className='btnModify'>수정</button>
                  <button type='button' onClick={del}     className='btnDel'>삭제</button>
                  <button type='button' onClick={cancelF} className='btnCancel' >취소</button>
               </div>
               <button type='button' onClick={send}    className='btnSend'>전송</button>
            </div>

         </form>
      </div>
   )

}


