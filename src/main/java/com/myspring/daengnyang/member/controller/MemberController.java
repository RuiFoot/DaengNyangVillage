package com.myspring.daengnyang.member.controller;

import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.board.vo.BoardVO;
import com.myspring.daengnyang.member.service.MemberServiceImpl;
import com.myspring.daengnyang.member.service.OAuthServiceImpl;
import com.myspring.daengnyang.member.vo.MemberInfoVO;
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

    private final OAuthServiceImpl oAuthService;

    @Autowired
    public MemberController(MemberServiceImpl memberService, PasswordEncoder passwordEncoder, OAuthServiceImpl oAuthService) {
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
        this.oAuthService = oAuthService;
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
     * @param httpRequest : request의 session을 활용하기 위한 파라미터
     * @return Response
     */
    @PostMapping("/login")
    public ResponseEntity<MemberVO> login(
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
            session.setAttribute("nickname",memberInfoVO.getNickname());

            return ResponseEntity.ok(storedMember);

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
    public List<AnimalLocationVO> getFavorite(@RequestParam("memberNo") Integer memberNo) {
        log.info("멤버 찜한 장소 정보 불러 오기 실행 / Param => memberNo : " + memberNo);
        return memberService.getFavorite(memberNo);
    }

    @GetMapping("/post")
    public BoardVO getMemberPost(@RequestParam("memberNo") Integer memberNo) {
        log.info("내가 쓴 글 불러 오기 실행 / Param => memberNo : " + memberNo);
        return memberService.getMemberPost(memberNo);
    }

    //-------------------------------------------------------------------------------------------

    /**
     * access token을 통해 카카오 개인정보 체크
     *
     * @param code https://kauth.kakao.com/oauth/authorize?client_id=db0c282555cc32e78ecbce031761fc83&redirect_uri=http://localhost:8080/member/oauth/kakao&response_type=code
     *             <p>
     *             https://kauth.kakao.com/oauth/logout?client_id=db0c282555cc32e78ecbce031761fc83&logout_redirect_uri=http://localhost:8080/member/oauth/kakao/logout
     */
    @GetMapping("/oauth/kakao")
    public boolean kakaoCallback(@RequestParam String code, HttpServletRequest httpRequest) {
        log.info("code : " + code);
        String accessToken = oAuthService.getKakaoAccessToken(code);
        System.out.println(accessToken);
        String loginResult = oAuthService.getUserInfo(accessToken);
        log.info("로그인 정보 : " + loginResult);
        String memberNo = oAuthService.kakaoLogin(loginResult);
        if (memberNo != null) {
            HttpSession session = httpRequest.getSession();
            session.setAttribute("memberNo", memberNo);
            log.info("로그인이 정상 처리 되었습니다.");
            return true;
        } else {
            log.info("로그인 오류 발생");
            return false;
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
    public boolean googleCallback(@RequestParam String code, HttpServletRequest httpRequest) {
        log.info("code : " + code);
        String accessToken = oAuthService.getGoogleAccessToken(code);
        System.out.println(accessToken);
        String loginResult = String.valueOf(oAuthService.getUserResource(accessToken));
        log.info("로그인 정보 : " + loginResult);
        String memberNo = oAuthService.googleLogin(loginResult);
        if (memberNo != null) {
            HttpSession session = httpRequest.getSession();
            session.setAttribute("memberNo", memberNo);
            log.info("로그인이 정상 처리 되었습니다.");
            return true;
        } else {
            log.info("로그인 오류 발생");
            return false;
        }
    }

    //---------------------------------------------------------------------------------------------------------------------

    /**
     * 네이버 로그인
     * @return
     */



    @GetMapping("/oauth/naver")
    public boolean naverCallback(@RequestParam String code, @RequestParam String state, HttpServletRequest httpRequest){
        log.info("code : " + code + "state : " + state);
        String accessToken = oAuthService.getNaverAccessToken(code, state);
        String loginResult = oAuthService.getNaverUserInfo(accessToken);
        String memberNo = oAuthService.NaverLogin(loginResult);
        if (memberNo != null) {
            HttpSession session = httpRequest.getSession();
            session.setAttribute("memberNo", memberNo);
            log.info("로그인이 정상 처리 되었습니다.");
            return true;
        } else {
            log.info("로그인 오류 발생");
            return false;
        }
     }




    //---------------------------------------------------------------------------------------------------------------------


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

}
