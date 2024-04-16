package com.myspring.daengnyang.animal.controller;


import com.myspring.daengnyang.animal.service.AnimalServiceImpl;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
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
        return animalService.classification();
    }

    @GetMapping("/location")
    @ResponseBody
    public List<AnimalLocationVO> animalLocation(@RequestParam String classification){
        log.info("시설 위치 정보 조회 컨트롤러 실행");
        return animalService.location(classification);
    }

}
