function GuestBookList() {
	const { useState, useEffect } = React;

	let [findStr, setFindStr] = useState('');
	let [nowPage, setNowPage] = useState(1);
	let [list, setList] = useState([]);
	let [param, setParam] = useState({'findStr' : '', 'nowPage':1});


	/* 서버로 전달될 파라미터가 변경되었을 때 */
	useEffect(() => {
		setParam(param);
		find(param);
	}, [param]);
	
	/* 현재 페이지 정보가 바뀌면 */
	useEffect(() => {
		setNowPage(nowPage)
		setParam({'findStr': findStr, 'nowPage' : nowPage})
	}, [nowPage]);


	function findClick(p){
		findStr = document.querySelector('#findStr').value;
		setFindStr(findStr);
		
		if(p.np ==null){
			setNowPage(1);
		}else{
			setNowPage(nowPage + p.np)
		}
		setParam({'findStr': findStr, 'nowPage' : nowPage})
		
	}

	function find(param) {
		axios({
			method: 'get',
			url: "/guestbookList",
			params: param,
			responseType: 'json',
		}).then((resp) => {
			if (resp != null && resp != '') {
				list = resp.data.list.map(d =>
					<tr onClick={e => view(d.sno)} className='row'>
						<td>{d.sno}</td>
						<td>{d.id}</td>
						<td>{d.nal}</td>
						<td className='doc'>{d.doc}</td>
					</tr>
				)
				setList(list);
			}

			let btnPrev = document.querySelector('.btnPrev');
			let btnNext = document.querySelector('.btnNext');
			
			if(resp.data.page.nowPage <= 1){
				btnPrev.style.display='none';
			}else{
				btnPrev.style.display='inline-block';
			}
			if(resp.data.page.totPage <= resp.data.page.nowPage ){
				btnNext.style.display='none';
			}else{
				btnNext.style.display='inline-block';
			}
		})

	}
	
	function view(no) {
		let frm = document.frmRegister;
		axios({
			method: 'get',
			url: "/guestbookView",
			params: { 'sno': no },
			responseType: 'json',
		}).then((resp) => {
			if (resp.data != null && resp.data != '') {
				let d = resp.data;
				frm.id.value = d.id;
				frm.doc.value = d.doc;
				
				if(frm["sno"] == null){
					let child = document.createElement("input");
					child.setAttribute("type", "hidden");
					child.setAttribute("name", "sno");
					frm.appendChild(child)
				}					
				
				frm.sno.value = d.sno;
				
				
				document.querySelector('.btnControl').style.display = 'inline';
				document.querySelector('.btnSend').style.display = 'none';
				document.querySelector('.subTitle').innerHTML = "Modify & Delete...";
				
				/*로그인한 유저의 방명록일때 처리 */
				if(sessionStorage.getItem("id") == d.id){
					document.querySelector('.btnModify').style.display='inline';
					document.querySelector('.btnDel').style.display = 'inline';
				}else{
					document.querySelector('.btnModify').style.display='none'
					document.querySelector('.btnDel').style.display = 'none';
					
				}
			}
	
		})
	}



	return (
		<div>
			<h2> List...</h2>
			<div className="findZone">
				<input id='findStr' defaultValue={findStr} size='40' />
				<button type='button' onClick={findClick}
							className='btnFind'>검색</button>
			</div>
	
			<table width='100%'>
				<tr className='title'>
					<th>sno</th>
					<th>id</th>
					<th>nal</th>
					<th>doc</th>
				</tr>
				{list}
				<tr align='center'>
					<td colspan='4'>
						<button type='button' class='btnPrev' onClick={(e) => findClick({'np':-1})}>&lt;</button>
						<button type='button' class='btnNext' onClick={(e) => findClick({'np':+1})}>&gt;</button>
					</td>
				</tr>
			</table>
		</div>
	)
}
