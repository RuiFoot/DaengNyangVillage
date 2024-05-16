package com.myspring.daengnyang.chatbot.controller;

import com.myspring.daengnyang.chatbot.service.ChatbotService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }


    @GetMapping("")
    public String chatbot(@RequestParam("message")String message){
        String result = chatbotService.sendMessage(message);
        return result;
    }
}
