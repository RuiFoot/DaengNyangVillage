package com.myspring.daengnyang.board.service;

import com.myspring.daengnyang.board.vo.BoardDetailVO;
import com.myspring.daengnyang.board.vo.BoardVO;
import com.myspring.daengnyang.board.vo.ReviewVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BoardService {
    List<BoardVO> selectBoardList(String category) throws Exception;
    List<ReviewVO> selectBoardReviewList(int boardId) throws Exception;
    public void registerReview(int boardId);
    public void removeReview(int boardId);
    public BoardDetailVO getBoardDetail(int boardId);
    void deleteBoard(int boardId);
    void deleteBoardReview(int boardReviewNum);

}
