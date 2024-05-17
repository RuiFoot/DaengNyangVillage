package com.myspring.daengnyang.chatbot.controller;

import com.myspring.daengnyang.chatbot.service.ChatbotService;
import com.myspring.daengnyang.chatbot.vo.ChatbotVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }


//    @GetMapping("")
//    public String chatbot(@RequestParam("message")String message){
//        String result = chatbotService.sendMessage(message);
//        return result;
//    }

    @PostMapping("")
    public String chatbot(String message){
        String result = chatbotService.sendMessage(message);
        System.out.println(result);
        return result;
    }
}
