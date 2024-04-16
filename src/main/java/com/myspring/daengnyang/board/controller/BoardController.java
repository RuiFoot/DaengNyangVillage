package com.myspring.daengnyang.board.controller;

import com.myspring.daengnyang.board.service.BoardService;
import com.myspring.daengnyang.board.vo.BoardVO;
import com.myspring.daengnyang.board.vo.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    private BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("")
    public List<BoardVO> boardList(@RequestParam String category) throws Exception {
        List<BoardVO> list = boardService.selectBoardList(category);
        return list;
    }

    @GetMapping("/review")
    public List<ReviewVO> boardReviewList(@RequestParam int boardId) throws Exception {
        List<ReviewVO> list = boardService.selectBoardReviewList(boardId);
        return list;
    }


}
