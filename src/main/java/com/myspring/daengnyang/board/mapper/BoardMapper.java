package com.myspring.daengnyang.board.mapper;

import com.myspring.daengnyang.board.vo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;

import java.util.Date;
import java.util.List;

@Mapper
public interface BoardMapper {

    // 카테고리 별 게시물 목록 조회
    List<BoardVO> selectBoardList(@Param("category") String category) throws Exception;

    // 게시글 별 댓글 목록 조회
    List<ReviewVO> selectBoardReviewList(@Param("boardId") int boardId) throws Exception;

    // 대댓글 조회
    List<RReviewVO> selectReviewReviewList(@Param("boardReviewNum") int boardReviewNum) throws Exception;

    // 댓글 수 조회
    int updateReviewCnt(@Param("boardId") int boardId,
                        @Param("amount") int amount);

    BoardDetailVO getBoardDetail(@Param("boardId") int boardId);

    void deleteBoard(@Param("boardId") int boardId);
    void deleteBoardReview(@Param("boardReviewNum") int boardReviewNum);
    void deleteReviewReview(@Param("reviewId") int reviewId);

    void modifyPost(@Param("boardPostVO") BoardPostVO boardPostVO);
    void modifyPostDetail(@Param("boardPostVO") BoardPostVO boardPostVO);
    void modifyReview(@Param("reviewVO") ReviewVO reviewVO);
    void modifyReviewReview(@Param("reviewVO") RReviewVO reviewVO);

    int postBoard(@Param("boardPostVO") BoardPostVO boardPostVO);
    void postBoardDetail(@Param("boardPostVO") BoardPostVO boardPostVO);
    void postMarketBoardDetail(@Param("boardPostVO") BoardPostVO boardPostVO);
    int getBoardId();
    int getBoardIdReview(@Param("boardReviewNum") int boardReviewNum);
    void postReview(@Param("reviewVO") ReviewVO reviewVO);
    void postReviewReview(@Param("reviewVO") RReviewVO reviewVO);
    int getMemberNo(@Param("nickname") String nickname);

}
