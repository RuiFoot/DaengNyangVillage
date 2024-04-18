package com.myspring.daengnyang.member.controller;

import com.myspring.daengnyang.member.service.MemberServiceImpl;
import com.myspring.daengnyang.member.vo.SignupForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/member")
public class MemberController {

    private final MemberServiceImpl memberService;
    @Autowired
    public MemberController(MemberServiceImpl memberService) {
        this.memberService = memberService;
    }


    @GetMapping("")
    public String member(){
        return "member";
    }
    @PostMapping("/signup")
    public String createMember(@RequestBody SignupForm signupForm){
        log.info("일반 회원가입 실행");
        memberService.createMember(signupForm);
        return "redirect:/";
    }
}
