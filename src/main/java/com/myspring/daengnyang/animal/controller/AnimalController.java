package com.myspring.daengnyang.animal.controller;


import com.myspring.daengnyang.animal.service.AnimalServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
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
        return animalService.classification();
    }
}
