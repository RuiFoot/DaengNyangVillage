package com.myspring.daengnyang.member.controller;

import com.myspring.daengnyang.member.service.MemberService;
import com.myspring.daengnyang.member.service.OauthServiceImpl;
import com.myspring.daengnyang.member.vo.MemberInfoVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/member")
public class OauthController {

    private final OauthServiceImpl oAuthService;
    private final MemberService memberService;
    @Autowired
    public OauthController(OauthServiceImpl oAuthService, MemberService memberService) {
        this.oAuthService = oAuthService;
        this.memberService = memberService;
    }

    /**
     * access token을 통해 카카오 개인정보 체크
     *
     * @param code https://kauth.kakao.com/oauth/authorize?client_id=db0c282555cc32e78ecbce031761fc83&redirect_uri=http://localhost:8080/member/oauth/kakao&response_type=code
     *             <p>
     *             https://kauth.kakao.com/oauth/logout?client_id=db0c282555cc32e78ecbce031761fc83&logout_redirect_uri=http://localhost:8080/member/oauth/kakao/logout
     */
    @GetMapping("/oauth/kakao")
    public ResponseEntity<MemberInfoVO> kakaoCallback(@RequestParam String code, HttpServletRequest httpRequest) {
        log.info("code : " + code);
        String accessToken = oAuthService.getKakaoAccessToken(code);
        System.out.println(accessToken);
        String loginResult = oAuthService.getUserInfo(accessToken);
        log.info("로그인 정보 : " + loginResult);
        long memberNo = oAuthService.kakaoLogin(loginResult);
        if (memberNo > 0) {
            MemberInfoVO memberInfoVO = oAuthService.getMemberInfo(memberNo);
            HttpSession session = httpRequest.getSession();
            session.setAttribute("memberNo", memberNo);
            log.info("로그인이 정상 처리 되었습니다.");
            return ResponseEntity.ok(memberInfoVO);
        } else {
            log.info("로그인 오류 발생");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping("/oauth/kakao/logout")
    public void kakaoLogoutCallback() {
        Long target_id = 3428886536L;
        log.info("kakaoLogout");
        String logoutResult = oAuthService.kakaoLogout(target_id);
        log.info(logoutResult + "로그아웃이 정상 처리 되었습니다.");
    }

    @GetMapping("oauth/kakao/unlink")
    public void kakaoUnlinkCallback() { // 회원 탈퇴 시 계정 연결 끊기
        Long target_id = 3428886536L;
        log.info("kakaoUnlink");
        String unLinkResult = oAuthService.kakaoUnlink(target_id);
        log.info(unLinkResult + "연결 끊기가 정상 처리 되었습니다.");
    }
    //---------------------------------------------------------------------------------------------------------------------

    /**
     * 구글 소셜 로그인
     */

    @GetMapping("/oauth/google")
    public ResponseEntity<MemberInfoVO> googleCallback(@RequestParam String code, HttpServletRequest httpRequest) {
        log.info("code : " + code);
        String accessToken = oAuthService.getGoogleAccessToken(code);
        System.out.println(accessToken);
        String loginResult = String.valueOf(oAuthService.getUserResource(accessToken));
        log.info("로그인 정보 : " + loginResult);
        MemberInfoVO memberInfoVO = oAuthService.googleLogin(loginResult);
        if (memberInfoVO != null) {
            HttpSession session = httpRequest.getSession();
            session.setAttribute("memberNo", memberInfoVO.getMemberNo());
            log.info("로그인이 정상 처리 되었습니다.");
            return ResponseEntity.ok(memberInfoVO);
        } else {
            log.info("로그인 오류 발생");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    //---------------------------------------------------------------------------------------------------------------------

    /**
     * 네이버 로그인
     * @return
     */



    @GetMapping("/oauth/naver")
    public ResponseEntity<MemberInfoVO> naverCallback(@RequestParam String code, @RequestParam String state, HttpServletRequest httpRequest){
        log.info("code : " + code + "state : " + state);
        String accessToken = oAuthService.getNaverAccessToken(code, state);
        String loginResult = oAuthService.getNaverUserInfo(accessToken);
        MemberInfoVO memberInfoVO = oAuthService.NaverLogin(loginResult);
        if (memberInfoVO != null) {
            HttpSession session = httpRequest.getSession();
            session.setAttribute("memberNo", memberInfoVO.getMemberNo());
            log.info("로그인이 정상 처리 되었습니다.");
            return ResponseEntity.ok(memberInfoVO);
        } else {
            log.info("로그인 오류 발생");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }



}
