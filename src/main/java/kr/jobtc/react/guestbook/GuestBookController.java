package kr.jobtc.react.guestbook;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class GuestBookController {
	@Autowired
	GuestBookDao guestBookDao;

	@RequestMapping("/")
	public ModelAndView index() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("index.html");
		return mv;
	}
	
	@RequestMapping("/login")
	public String login(String id, String pwd) {
		String name = "";
		name = guestBookDao.login(id, pwd);
		return name;
	}
	
	@RequestMapping("/guestbookList")
	public Map<Object, Object> list(String findStr, int nowPage) {
		Map<Object, Object> map = new HashMap<>();
		List<GuestBookVo> list = guestBookDao.search(findStr, nowPage);
		Page page = guestBookDao.getPage();
		map.put("list", list);
		map.put("page", page);
		
		return map;
	}

	@RequestMapping("/guestbookRegister")
	public String register(GuestBookVo vo) {
		String msg = "";
		msg = guestBookDao.register(vo);
		return msg;
	}

	@RequestMapping("/guestbookView")
	public GuestBookVo view(int sno) {
		GuestBookVo vo = null;
		vo = guestBookDao.view(sno);
		return vo;
	}

	@RequestMapping("/guestbookModify")
	public String modify(GuestBookVo vo) {
		String msg = "";
		msg = guestBookDao.modify(vo);
		return msg;
	}

	@RequestMapping("/guestbookDelete")
	public String delete(GuestBookVo vo) {
		String msg = "";
		msg = guestBookDao.delete(vo);
		return msg;
	}

}
