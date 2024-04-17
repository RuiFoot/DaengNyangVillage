package com.myspring.daengnyang.board.mapper;

import com.myspring.daengnyang.board.vo.BoardDetailVO;
import com.myspring.daengnyang.board.vo.BoardVO;
import com.myspring.daengnyang.board.vo.ReviewVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {

    // 카테고리 별 게시물 목록 조회
    List<BoardVO> selectBoardList(@Param("category") String category) throws Exception;

    // 게시글 별 댓글 목록 조회
    List<ReviewVO> selectBoardReviewList(@Param("boardId") int boardId) throws Exception;
    // 댓글 수 조회
    int updateReviewCnt(@Param("boardId") int boardId,
                        @Param("amount") int amount);

    BoardDetailVO getBoardDetail(@Param("boardId") int boardId);
}
