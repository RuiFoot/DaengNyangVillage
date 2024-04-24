package com.myspring.daengnyang.board.service;

import com.myspring.daengnyang.board.mapper.BoardMapper;
import com.myspring.daengnyang.board.vo.BoardDetailVO;
import com.myspring.daengnyang.board.vo.BoardVO;
import com.myspring.daengnyang.board.vo.ReviewVO;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardMapper boardMapper;

    @Override
    public List<BoardVO> selectBoardList(String category) throws Exception {
        return boardMapper.selectBoardList(category);
    }

    @Override
    public List<ReviewVO> selectBoardReviewList(int boardId) throws Exception {
       return boardMapper.selectBoardReviewList(boardId);
    }

    @Override
    public void registerReview(int boardId) {
        boardMapper.updateReviewCnt(boardId, 1);
    }

    @Override
    public void removeReview(int boardId) {
        boardMapper.updateReviewCnt(boardId, -1);
    }

    @Override
    public BoardDetailVO getBoardDetail(int boardId) {
        return boardMapper.getBoardDetail(boardId);
    }

    @Override
    public void deleteBoard(int boardId) {
        boardMapper.deleteBoard(boardId);
    }

    @Override
    public void deleteBoardReview(int boardReviewNum) {
        boardMapper.deleteBoardReview(boardReviewNum);
    }

}
