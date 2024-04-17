package com.myspring.daengnyang.animal.controller;


import com.myspring.daengnyang.animal.service.AnimalServiceImpl;
import com.myspring.daengnyang.animal.vo.AnimalDetailVO;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.animal.vo.AnimalReviewVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @ResponseBody
    public List<String> animalClassification(){
        log.info("시설 분류 정보 조회 컨트롤러 실행");
        return animalService.getClassification();
    }

    @GetMapping("/location/{classification}")
    @ResponseBody
    public List<AnimalLocationVO> animalLocation(@PathVariable("classification") String classification){
        log.info("시설 위치 정보 조회 컨트롤러 실행 => PathVariable : " + classification);
        return animalService.getLocation(classification);
    }
    @GetMapping("/detail/{animalNum}")
    @ResponseBody
    public AnimalDetailVO animalDetail(@PathVariable("animalNum") Integer animalNum){
        log.info("시설 상세 정보 조회 컨트롤러 실행 => PathVariable : " + animalNum);
        return animalService.getDetail(animalNum);
    }
    @GetMapping("/review")
    @ResponseBody
    public AnimalReviewVO animalReview(@RequestParam Integer animalNum){
        log.info("시설 댓글 정보 조회 컨트롤러 실행 => RequestParam : " + animalNum);
        return animalService.getReview(animalNum);
    }
    @GetMapping("/recommend")
    @ResponseBody
    public List<AnimalLocationVO> animalrecommend(@RequestParam(required = false) Integer memberNo, @RequestParam(required = false,defaultValue = "서울") String sido, @RequestParam(required = false) String sigungu){
        return null;
    }


}
