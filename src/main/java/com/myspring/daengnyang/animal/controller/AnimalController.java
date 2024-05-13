package com.myspring.daengnyang.animal.controller;


import com.myspring.daengnyang.animal.service.AnimalServiceImpl;
import com.myspring.daengnyang.animal.vo.AnimalDetailVO;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.animal.vo.AnimalReviewVO;
import com.myspring.daengnyang.animal.vo.FavoriteCheckRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import java.util.List;


/**
 * 반려동물 동반 시설 컨트롤러
 */
@RestController
@Slf4j
@RequestMapping("/animal")
public class AnimalController {

    private final AnimalServiceImpl animalService;

    @Autowired
    public AnimalController(AnimalServiceImpl animalService) {
        this.animalService = animalService;
    }

    @GetMapping("")
    public List<String> animalClassification() {
        log.info("시설 분류 정보 조회 컨트롤러 실행");
        return animalService.getClassification();
    }

    @GetMapping("/area")
    public List<String> animalArea(@Param("sido") String sido){
        log.info("시도 => 시군구 컨트롤러 실행");
        return animalService.getSigungu(sido);
    }

    @GetMapping("/location/{sido}")
    public ResponseEntity<?> animalLocation(
            @PathVariable("sido") String sido,
            @RequestParam("sigungu") String sigungu,
            @RequestParam String classification,
            @PageableDefault(page = 0,size = 12, sort = "star", direction = Sort.Direction.DESC) Pageable pageable) { // page : 2 => 페이지 보내야함
        log.info("시설 위치 정보 조회 컨트롤러 실행 => PathVariable : " + sido + ", Params : " + classification);
        log.info("pageable : " + pageable);
        Page<?> paging = animalService.getLocation(sido,sigungu, classification, pageable);
        return ResponseEntity.ok(paging);
    }

    @GetMapping("/detail/{animalNum}")
    public AnimalDetailVO animalDetail(@PathVariable("animalNum") Integer animalNum) {
        log.info("시설 상세 정보 조회 컨트롤러 실행 => PathVariable : " + animalNum);
        return animalService.getDetail(animalNum);
    }

    @GetMapping("/recommend")
    public List<AnimalLocationVO> animalrecommend(@RequestParam(required = false) Integer memberNo, @RequestParam(required = false, defaultValue = "서울") String sido, @RequestParam(required = false) String sigungu) {

        return animalService.getRecommend(memberNo, sido, sigungu);
    }

    //-----------------------------------------------------------------------------------------------

    @PutMapping("/favorite")
    public boolean favoriteCheck(@RequestBody FavoriteCheckRequest request) {
        Integer memberNo = request.getMemberNo();
        Integer animalNum = request.getAnimalNum();
        log.info("memberNo : " + memberNo + " / animalNum : " + animalNum);

        return animalService.favoriteCheck(memberNo, animalNum);
    }

    @GetMapping("/favorite/{animalNum}")
    public boolean favoriteNum(@PathVariable("animalNum") Integer animalNum, @RequestParam Integer memberNo) {
        return animalService.getFavorite(animalNum, memberNo);
    }

    //-----------------------------------------------------------------------------------------------

    @GetMapping("/review")
    public AnimalReviewVO animalReview(@RequestParam Integer animalNum) {
        log.info("시설 댓글 정보 조회 컨트롤러 실행 => RequestParam : " + animalNum);
        return animalService.getReview(animalNum);
    }

    @PostMapping("/review")
    public boolean animalReviewPost(@RequestBody AnimalReviewVO animalReviewVO) {
        log.info("댓글 작성 컨트롤러 실행 : " + animalReviewVO);
        return animalService.animalReviewPost(animalReviewVO);
    }

    @PatchMapping("/review")
    public boolean animalReviewModified(@RequestBody AnimalReviewVO animalReviewVO) {
        log.info("댓글 수정 컨트롤러 실행 : " + animalReviewVO);
        return animalService.updateAnimalReview(animalReviewVO);
    }

    @DeleteMapping("/review")
    public boolean animalReviewDelete(@Param("animalReviewNum") Integer animalReviewNum) {
        return animalService.deleteAnimalReview(animalReviewNum);
    }
    //-----------------------------------------------------------------------------------------------

    @GetMapping("/popular")
    public List<AnimalLocationVO> animalPopular() {
        return animalService.getPopular();
    }
}
