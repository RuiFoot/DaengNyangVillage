package com.myspring.daengnyang.Home.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping(value = "/test")
    public String home(){
        System.out.println("하이");
        return "안녕";
    }
}
