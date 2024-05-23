package com.myspring.daengnyang.member.controller;

import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.board.vo.BoardVO;
import com.myspring.daengnyang.member.service.MemberServiceImpl;
import com.myspring.daengnyang.member.service.OauthServiceImpl;
import com.myspring.daengnyang.member.vo.MemberInfoVO;
import com.myspring.daengnyang.member.vo.MemberVO;
import com.myspring.daengnyang.member.vo.SignupForm;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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
    public MemberController(MemberServiceImpl memberService, PasswordEncoder passwordEncoder, OauthServiceImpl oAuthService) {
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * \
     * 회원가입
     *
     * @param signupForm : 회원가입에 필요한 정보들
     * @return
     */
    @PostMapping("/signup")
    @ResponseBody
    public boolean createMember(@RequestBody SignupForm signupForm) {
        log.info("일반 회원가입 실행");
        log.info(signupForm.toString());
        memberService.createMember(signupForm);
        return true;
    }

    /**
     * 일반 로그인
     *
     * @param request     : 이메일, password 전송
     * @return Response
     */
    @PostMapping("/login")
    public ResponseEntity<MemberInfoVO> login(
            @RequestBody Map<String, String> request,
            HttpSession session
    ) {
        String email = request.get("email");
        String enteredPassword = request.get("password");

        MemberVO storedMember = memberService.getMember(email);

        Integer memberNo = storedMember.getMemberNo();
        String storedPasswordHash = storedMember.getPassword();
        MemberInfoVO memberInfoVO = memberService.getMemberInfo(memberNo);
        boolean passwordMatches =
                passwordEncoder.matches(enteredPassword, storedPasswordHash);
        log.info("비밀번호 매칭 : " + passwordMatches);
        if (passwordMatches) {
            storedMember.setPassword(null);
            session.setAttribute("memberNo", memberNo);
            session.setAttribute("nickname",memberInfoVO.getNickName());
            System.out.println(session.getId());


            return ResponseEntity.ok(memberInfoVO);

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    /**
     * 중복확인 : email
     *
     * @param email
     * @return boolean
     */
    @GetMapping("/duplicationE")
    public boolean duplicationEmail(@RequestParam("email") String email) {
        return memberService.getDuplicationEmail(email);
    }

    /**
     * 중복확인 : 닉네임
     *
     * @param nickname
     * @return boolean
     */
    @GetMapping("/duplicationN")
    public boolean duplicationNickname(@RequestParam("nickname") String nickname) {
        System.out.print(memberService.duplicationNickname(nickname));
        return memberService.duplicationNickname(nickname);
    }

    @GetMapping("/mypage")
    public MemberInfoVO getMemberInfo(@RequestParam("memberNo") Integer memberNo) {
        log.info("멤버 정보 불러 오기 실행 / Param => memberNo : " + memberNo);
        return memberService.getMemberInfo(memberNo);
    }

    @GetMapping("/favorite")
    public ResponseEntity<?> getFavorite(@RequestParam("memberNo") Integer memberNo,
    @PageableDefault(page = 0,size = 12, sort = "favDate", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("멤버 찜한 장소 정보 불러 오기 실행 / Param => memberNo : " + memberNo);
        Page<?> paging = memberService.getFavorite(memberNo, pageable);
        return ResponseEntity.ok(paging);
    }

    @GetMapping("/post")
    public ResponseEntity<?> getMemberPost(
            @RequestParam("memberNo") int memberNo,
            @PageableDefault(size = 12, sort = "createDate", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("내가 쓴 글 불러 오기 실행 / Param => memberNo : " + memberNo);
        log.info("pageable : " + pageable);
        Page<?> paging = memberService.getMemberPost(memberNo, pageable);
        return ResponseEntity.ok(paging);
    }

    @GetMapping("/logout")
    public boolean Logout(HttpSession session) throws Exception {
        log.info("Logout");
        session.invalidate();
        return true;
        // return "redirect:/member/main"; 얼럿창출력안하고싶을때 사용
    }

    @PatchMapping("/update")
    public boolean updateProfile(@RequestBody MemberInfoVO memberInfoVO) {
        log.info("회원정보 수정 컨트롤러 실행");
        memberService.updateProfile(memberInfoVO);
        return true;
    }

    @PatchMapping("/password")
    public void updatePassword(@RequestBody MemberVO memberVO) {
        log.info("비밀번호 변경 컨트롤러 실행 : " + memberVO.getPassword());
        memberService.updatePassword(memberVO);
    }

    @PostMapping("/findEmail")
    public Map<String, String> findEmail(@RequestBody Map<String, String> phoneNumberMap) {
        log.info("이메일 찾기 컨트롤러 실행");

        String phoneNumber = phoneNumberMap.get("phoneNumber");
        Map<String, String> map = new HashMap<>();
        map.put("email", memberService.findEmail(phoneNumber));
        return map;
    }

    @PostMapping("/findNickname")
    public Map<String, String> findNickname(@RequestBody Map<String, String> emailMap) {
        log.info("닉네임 찾기 컨트롤러 실행");

        String email = emailMap.get("email");
        Map<String, String> map = new HashMap<>();
        map.put("nickname", memberService.findNickname(email));
        return map;
    }



}
