package com.myspring.daengnyang.board.service;

import com.myspring.daengnyang.board.mapper.BoardMapper;
import com.myspring.daengnyang.board.vo.*;
import com.myspring.daengnyang.common.vo.Paging;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardMapper boardMapper;

    @Override
    public Page<BoardVO> selectBoardList(String category, Pageable pageable) throws Exception {

        Paging<Object> requestList = Paging.builder()
                .data(category)
                .pageable(pageable)
                .build();

        List<BoardVO> boardList = boardMapper.selectBoardList(requestList);
        int total = boardMapper.boardListCnt(category);

        System.out.println(total);

        return new PageImpl<>(boardList, pageable, total);
    }

    @Override
    public List<ReviewVO> selectBoardReviewList(int boardId) throws Exception {
       return boardMapper.selectBoardReviewList(boardId);
    }

    @Override
    public List<RReviewVO> selectReviewReviewList(int boardReviewNum) throws Exception {
        return boardMapper.selectReviewReviewList(boardReviewNum);
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

    @Override
    public void deleteReviewReview(int reviewId) {
        boardMapper.deleteReviewReview(reviewId);
    }

    @Override
    public void postBoard(BoardPostVO boardPostVO) {
        boardMapper.postBoard(boardPostVO);
        int boardId = boardMapper.getBoardId();
        System.out.println("boardId : " + boardId);
        boardPostVO.setBoardId(boardId);

        String category = boardPostVO.getCategory();

        if(category.equals("댕냥 마켓")) {
            System.out.println(category);
            boardMapper.postMarketBoardDetail(boardPostVO);
        } else {
            boardMapper.postBoardDetail(boardPostVO);
        }
    }

    @Override
    public void postReview(ReviewVO reviewVO) {
        int memberNo = boardMapper.getMemberNo(reviewVO.getNickname());
        System.out.println(memberNo);

        reviewVO.setMemberNo(memberNo);

        boardMapper.postReview(reviewVO);
    }

    @Override
    public void postReviewReview(RReviewVO reviewVO) {
        int memberNo = boardMapper.getMemberNo(reviewVO.getNickname());
        System.out.println(memberNo);

        reviewVO.setMemberNo(memberNo);

        boardMapper.postReviewReview(reviewVO);
    }

    @Override
    public void modifyPost(BoardPostVO boardPostVO) {
        boardMapper.modifyPost(boardPostVO);
        boardMapper.modifyPostDetail(boardPostVO);
    }

    @Override
    public void modifyReview(ReviewVO reviewVO) {
        boardMapper.modifyReview(reviewVO);
    }

    @Override
    public void modifyReviewReview(RReviewVO reviewVO) {
        boardMapper.modifyReviewReview(reviewVO);
    }

    @Override
    public int getBoardId(int boardReviewNum) {
        return boardMapper.getBoardIdReview(boardReviewNum);
    }
}
