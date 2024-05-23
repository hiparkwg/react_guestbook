package kr.jobtc.react.guestbook;

import lombok.Data;

@Data
public class Page {
	int startNo = 1, endNo;
	int listSize = 4;
	//int blockSize = 5;
	//int startPage = 1, endPage;
	int totSize, totPage;
	int nowPage = 1;

	String findStr;

	public Page() {
	}

	public Page(int totSize, int nowPage) {
		this.totSize = totSize;
		this.nowPage = nowPage;
	}

	public void pageCompute() {
		totPage = (int) Math.ceil(totSize / (double) listSize);
		endNo = listSize * nowPage;
		startNo = endNo - listSize;
		if (endNo > totSize)
			endNo = totSize;

		/*
		endPage = (int) Math.ceil(nowPage / (double) blockSize) * blockSize;
		startPage = endPage - blockSize + 1;
		if (endPage > totPage)
			endPage = totPage;
		*/
	}

}
