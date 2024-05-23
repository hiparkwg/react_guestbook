package kr.jobtc.react.guestbook;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import kr.jobtc.react.mybatis.MybaFactory;

@Component
public class GuestBookDao {
	SqlSession session;
	Page page;

	public GuestBookDao() {
		session = MybaFactory.getFactory().openSession();
	}

	public String login(String id, String pwd) {
		String name = null;
		Map<String, String> map = new HashMap<>();
		map.put("id", id);
		map.put("pwd", pwd);
		name = session.selectOne("guestbook.login", map);
		
		return name;
	}
	
	
	public List<GuestBookVo> search(String findStr, int nowPage) {
		/* 검색어에 따른 결과행 가져옴 */
		int totSize = session.selectOne("guestbook.totSize", findStr);
		this.page = new Page(totSize, nowPage);
		this.page.pageCompute();
		this.page.setFindStr(findStr);

		List<GuestBookVo> list = session.selectList("guestbook.search", page);

		return list;
	}

	public GuestBookVo view(int sno) {
		GuestBookVo vo = null;
		vo = session.selectOne("guestbook.view", sno);
		return vo;
	}

	public String register(GuestBookVo vo) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		String nal = sdf.format(new Date());
		vo.setNal(nal);
		String msg = "";
		int cnt = session.insert("guestbook.register", vo);
		if (cnt > 0) {
			session.commit();
		} else {
			msg = "저장중 오류 발생";
			session.rollback();
		}
		return msg;
	}

	public String modify(GuestBookVo vo) {
		String msg = "";
		int cnt = session.update("guestbook.modify", vo);
		if (cnt > 0) {
			session.commit();
		} else {
			msg = "수정중 오류 발생";
			session.rollback();
		}
		return msg;
	}

	public String delete(GuestBookVo vo) {
		String msg = "";
		int cnt = session.delete("guestbook.delete", vo);
		if (cnt > 0) {
			session.commit();
		} else {
			msg = "삭제중 오류 발생";
			session.rollback();
		}
		return msg;
	}

	public Page getPage() {
		return page;
	}

}
