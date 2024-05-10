package com.myspring.daengnyang.board.service;

import com.myspring.daengnyang.board.vo.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BoardService {
    List<BoardVO> selectBoardList(String category) throws Exception;
    List<ReviewVO> selectBoardReviewList(int boardId) throws Exception;
    List<RReviewVO> selectReviewReviewList(int boardReviewNum) throws Exception;
    public void registerReview(int boardId);
    public void removeReview(int boardId);
    public BoardDetailVO getBoardDetail(int boardId);
    void deleteBoard(int boardId);
    void deleteBoardReview(int boardReviewNum);
    void deleteReviewReview(int reviewId);
    void postBoard(BoardPostVO boardPostVO);
    void modifyPost(BoardPostVO boardPostVO);
    void modifyReview(ReviewVO reviewVO);
    void modifyReviewReview(RReviewVO reviewVO);
    void postReview(ReviewVO reviewVO);
    void postReviewReview(RReviewVO reviewVO);
    int getBoardId(int boardReviewNum);

}
