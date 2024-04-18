package com.myspring.daengnyang.board.controller;

import com.myspring.daengnyang.board.service.BoardService;
import com.myspring.daengnyang.board.vo.BoardDetailVO;
import com.myspring.daengnyang.board.vo.BoardVO;
import com.myspring.daengnyang.board.vo.ReviewVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**g
 * 커뮤니티 컨트롤러
 */
@RestController
@Slf4j
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    // 게시글 목록 조회
    @GetMapping("{category}")
    public List<BoardVO> boardList(@PathVariable("category") String category) throws Exception {
        log.info("게시글 목록 조회 컨트롤러 실행 => category: " + category);
        List<BoardVO> list = boardService.selectBoardList(category);
        return list;
    }

    // 댓글 목록 조회
    @GetMapping("/review")
    public List<ReviewVO> boardReviewList(@RequestParam int boardId) throws Exception {
        log.info("댓글 목록 조회 컨트롤러 실행 => boardId : " + boardId);
        List<ReviewVO> list = boardService.selectBoardReviewList(boardId);
        return list;
    }

    // 게시글 상세

    @GetMapping(value="/detail/{boardId}")
    @ResponseBody
    public BoardDetailVO boardDetail(@PathVariable("boardId") int boardId) {
        log.info("게시글 상세 조회 컨트롤러 실행 => boardId : " + boardId);
        return boardService.getBoardDetail(boardId);
    }

}
