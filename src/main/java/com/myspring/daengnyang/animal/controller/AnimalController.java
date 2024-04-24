package com.myspring.daengnyang.animal.controller;


import com.myspring.daengnyang.animal.service.AnimalServiceImpl;
import com.myspring.daengnyang.animal.vo.AnimalDetailVO;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.animal.vo.AnimalReviewVO;
import com.myspring.daengnyang.animal.vo.FavoriteCheckRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<String> animalClassification(){
        log.info("시설 분류 정보 조회 컨트롤러 실행");
        return animalService.getClassification();
    }

    @GetMapping("/location/{searchLocation}")
    public List<AnimalLocationVO> animalLocation(@PathVariable("searchLocation") String location ,@RequestParam String classification){
        log.info("시설 위치 정보 조회 컨트롤러 실행 => PathVariable : " + location + ", Params : " + classification);
        return animalService.getLocation(location,classification);
    }
    @GetMapping("/detail/{animalNum}")
    public AnimalDetailVO animalDetail(@PathVariable("animalNum") Integer animalNum){
        log.info("시설 상세 정보 조회 컨트롤러 실행 => PathVariable : " + animalNum);
        return animalService.getDetail(animalNum);
    }
    @GetMapping("/recommend")
    public List<AnimalLocationVO> animalrecommend(@RequestParam(required = false) Integer memberNo, @RequestParam(required = false,defaultValue = "서울") String sido, @RequestParam(required = false) String sigungu){

        return animalService.getRecommend(memberNo,sido,sigungu);
    }

    //-----------------------------------------------------------------------------------------------
    @GetMapping("/favorite")
    public List<AnimalLocationVO>  getFavoriteLocation(){
        return null;
    }
    @PutMapping("/favorite")
    public boolean favoriteCheck(@RequestBody FavoriteCheckRequest request){
        Integer memberNo = request.getMemberNo();
        Integer animalNum = request.getAnimalNum();
        log.info("memberNo : " + memberNo +" / animalNum : "+animalNum);

        return animalService.favoriteCheck(memberNo,animalNum);
    }

    //-----------------------------------------------------------------------------------------------

    @GetMapping("/review")
    public AnimalReviewVO animalReview(@RequestParam Integer animalNum){
        log.info("시설 댓글 정보 조회 컨트롤러 실행 => RequestParam : " + animalNum);
        return animalService.getReview(animalNum);
    }
    @PostMapping("/review")
    public boolean animalReviewPost(@RequestBody AnimalReviewVO animalReviewVO){
        log.info("댓글 작성 컨트롤러 실행 : " + animalReviewVO);
        return animalService.animalReviewPost(animalReviewVO);
    }

}
