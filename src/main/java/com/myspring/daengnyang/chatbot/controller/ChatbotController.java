package com.myspring.daengnyang.chatbot.controller;

import com.myspring.daengnyang.chatbot.service.ChatbotService;
import com.myspring.daengnyang.chatbot.vo.ChatbotVO;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    // @GetMapping("")
    // public String chatbot(@RequestParam("message")String message){
    // String result = chatbotService.sendMessage(message);
    // return result;
    // }

    @PostMapping("")
    public Map<String, String> chatbot(@RequestBody ChatbotVO chatbotVO) {
        String result = chatbotService.sendMessage(chatbotVO.getMessage());
        System.out.println(result);

        Map<String, String> map = new HashMap<>();
        map.put("result", result);
        return map;
    }
}