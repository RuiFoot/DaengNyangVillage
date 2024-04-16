package com.myspring.daengnyang.board.controller;


import ch.qos.logback.core.model.Model;
import com.myspring.daengnyang.board.service.BoardService;
import com.myspring.daengnyang.board.vo.BoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {
//    @GetMapping("")
//    public String board(){
//        return "board";
//    }

    private BoardService boardService;
    @GetMapping("")
    public List<BoardVO> boardList(@RequestParam String category) throws Exception {
        List<BoardVO> list = boardService.selectBoardList();
        return list;
    }


}
