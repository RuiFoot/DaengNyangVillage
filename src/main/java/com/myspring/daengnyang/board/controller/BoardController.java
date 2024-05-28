package com.myspring.daengnyang.board.controller;

import com.myspring.daengnyang.board.service.BoardService;
import com.myspring.daengnyang.board.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
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
//    @GetMapping("{category}")
//    public List<BoardVO> boardList(@PathVariable("category") String category) throws Exception {
//        log.info("게시글 목록 조회 컨트롤러 실행 => category: " + category);
//        List<BoardVO> list = boardService.selectBoardList(category);
//        return list;
//    }
    @GetMapping("/{category}")
    public ResponseEntity<?> boardList(
            @PathVariable("category") String category,
            @PageableDefault(size = 12, sort = "createDate", direction = Sort.Direction.DESC) Pageable pageable)
            throws Exception {
        log.info("게시글 목록 조회 컨트롤러 실행 => category: " + category);
        log.info("pageable : " + pageable);
        Page<?> paging = boardService.selectBoardList(category, pageable);
        return ResponseEntity.ok(paging);
    }

    // 댓글 목록 조회
    @GetMapping("/review")
    public List<ReviewVO> boardReviewList(@RequestParam int boardId) throws Exception {
        log.info("댓글 목록 조회 컨트롤러 실행 => boardId : " + boardId);
        List<ReviewVO> list = boardService.selectBoardReviewList(boardId);
        return list;
    }

    // 대댓글 목록 조회
    @GetMapping("/review/review")
    public List<RReviewVO> reviewReviewList(@RequestParam int boardReviewNum) throws Exception {
        log.info("대댓글 목록 조회 컨드롤러 실행 => reviewNum : " + boardReviewNum);
        List<RReviewVO> list = boardService.selectReviewReviewList(boardReviewNum);
        return list;
    }

    // 게시글 상세
    @GetMapping(value="/detail/{boardId}")
    @ResponseBody
    public BoardDetailVO boardDetail(@PathVariable("boardId") int boardId) {
        log.info("게시글 상세 조회 컨트롤러 실행 => boardId : " + boardId);
        return boardService.getBoardDetail(boardId);
    }

    // 게시글 삭제 (/board/{boardId} 에 Delete로 요청 오는 것을 처리함
    @DeleteMapping("/{boardId}")
    public void deleteBoard(@PathVariable("boardId") int boardId) {
        log.info("게시글 삭제 컨트롤러 실행 => boardId : " + boardId);
        boardService.deleteBoard(boardId);
    }

    @DeleteMapping("/review/{boardReviewNum}")
    public void deleteBoardReview(@PathVariable("boardReviewNum") int boardReviewNum) {
        log.info("댓글 삭제 컨트롤러 실행 => boardReviewNum : " + boardReviewNum);
        int boardId = boardService.getBoardId(boardReviewNum);
        System.out.println(boardId);
        boardService.deleteBoardReview(boardReviewNum);
        boardService.removeReview(boardId);
    }

    @DeleteMapping("/review/review")
    public void deleteReviewReview(@RequestParam int reviewId, @RequestParam int boardReviewNum) {
        log.info("대댓글 삭제 컨트롤러 실행 => reivewId : " + reviewId);
        int boardId = boardService.getBoardId(boardReviewNum);
        System.out.println(boardId);
        boardService.deleteReviewReview(reviewId);
        boardService.removeReview(boardId);
    }


    @PostMapping("")
    @ResponseBody
    public void postBoard(@RequestBody BoardPostVO boardPostVO) {
        log.info("글 쓰기 컨트롤러 실행");
        boardService.postBoard(boardPostVO);
    }

    @PatchMapping("")
    @ResponseBody
    public void modifyPost(@RequestBody BoardPostVO boardPostVO) {
        log.info("글 수정 컨트롤러 실행");
        boardService.modifyPost(boardPostVO);
    }


    @PatchMapping("/review")
    @ResponseBody
    public void modifyReview(@RequestBody ReviewVO reviewVO) {
        log.info("댓글 수정 컨트롤러 실행");
        boardService.modifyReview(reviewVO);
    }

    @PatchMapping("/review/review")
    @ResponseBody
    public void modifyReviewReview(@RequestBody RReviewVO reviewVO) {
        log.info("대댓글 수정 컨트롤러 실행");
        boardService.modifyReviewReview(reviewVO);
    }

    /**
     * 댓글 작성 기능
     */

    @PostMapping("/review")
    @ResponseBody
    public void postReview(@RequestBody ReviewVO reviewVO) {
        log.info("댓글 쓰기 컨트롤러 실행");
        boardService.postReview(reviewVO);

        int boardId = reviewVO.getBoardId();
        boardService.registerReview(boardId);
    }

    @PostMapping("/review/review")
    @ResponseBody
    public void postReview(@RequestBody RReviewVO reviewVO) {
        log.info("댓글 쓰기 컨트롤러 실행");
        boardService.postReviewReview(reviewVO);

        int boardId = reviewVO.getBoardId();
        boardService.registerReview(boardId);
    }

}
