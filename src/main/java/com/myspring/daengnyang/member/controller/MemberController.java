package com.myspring.daengnyang.member.controller;

import com.myspring.daengnyang.member.service.MemberServiceImpl;
import com.myspring.daengnyang.member.vo.MemberVO;
import com.myspring.daengnyang.member.vo.SignupForm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


/**
 * 회원 정보 관련 컨트롤러
 */
@RestController
@Slf4j
@RequestMapping("/member")
public class MemberController {

    private final MemberServiceImpl memberService;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public MemberController(MemberServiceImpl memberService, PasswordEncoder passwordEncoder) {
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
    }


    @GetMapping("")
    public String member(){
        return "member";
    }
    @PostMapping("/signup")
    @ResponseBody
    public String createMember(@RequestBody SignupForm signupForm){
        log.info("일반 회원가입 실행");
        log.info(signupForm.toString());
        memberService.createMember(signupForm);
        return "redirect:/";
    }

    @PostMapping("/login")
    public ResponseEntity<MemberVO> login(
            @RequestBody Map<String, String> request,
            HttpServletRequest httpRequest
    ){
        String email = request.get("email");
        String enteredPassword = request.get("password");

        MemberVO storedMember = memberService.getMember(email);

        Integer memberNo = storedMember.getMemberNo();
        String storedPasswordHash = storedMember.getPassword();

        boolean passwordMatches =
                passwordEncoder.matches(enteredPassword,storedPasswordHash);
        log.info("비밀번호 매칭 : " + passwordMatches);
        if(passwordMatches){
            storedMember.setPassword(null);
            HttpSession session = httpRequest.getSession();
            session.setAttribute("memberNo",memberNo);

            return ResponseEntity.ok(storedMember);

        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
    @GetMapping("/duplication/{email}")
    public boolean duplicationEmail(@PathVariable String email){
        return memberService.getDuplicationEmail(email);
    }

    @GetMapping("/duplication/{nickname}")
    public boolean duplicationNickname(@PathVariable String nickname) {
        System.out.print(memberService.duplicationNickname(nickname));
        return memberService.duplicationNickname(nickname);
    }
}
