package com.myspring.daengnyang.member.service;

import com.myspring.daengnyang.animal.mapper.AnimalMapper;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.board.vo.BoardVO;
import com.myspring.daengnyang.member.mapper.MemberMapper;
import com.myspring.daengnyang.member.vo.MemberInfoVO;
import com.myspring.daengnyang.member.vo.MemberVO;
import com.myspring.daengnyang.member.vo.SignupForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final PasswordEncoder passwordEncoder;
    private final MemberMapper memberMapper;
    private final AnimalMapper animalMapper;

    @Autowired
    public MemberServiceImpl(PasswordEncoder passwordEncoder, MemberMapper memberMapper, AnimalMapper animalMapper) {
        this.passwordEncoder = passwordEncoder;
        this.memberMapper = memberMapper;
        this.animalMapper = animalMapper;
    }

    @Override
    public void createMember(SignupForm signupForm) {
        MemberVO user = new MemberVO();
        user.setEmail(signupForm.getEmail());
        user.setPassword(passwordEncoder.encode(signupForm.getPassword()));
        log.info("일반 회원가입 서비스 실행");
        memberMapper.createMember(user.getEmail(), user.getPassword());

        int memberNo = memberMapper.getMemberNo(user.getEmail());
        MemberInfoVO userInfo = new MemberInfoVO();
        userInfo.setNickName(signupForm.getNickname());
        userInfo.setProfileImg(signupForm.getProfileImg());
        userInfo.setInputAddress(signupForm.getAddress());
        userInfo.setDetailedAddress(signupForm.getAddressDetail());
        userInfo.setMypet(signupForm.getFavoritePet());
        userInfo.setPhoneNumber(signupForm.getPhoneNumber());
        userInfo.setInputZonecode(signupForm.getInputZonecode());
        memberMapper.createMemberInfo(userInfo.getNickName(), memberNo, userInfo.getProfileImg(),
                userInfo.getInputAddress(), userInfo.getDetailedAddress(), userInfo.getMypet(), userInfo.getPhoneNumber(), userInfo.getInputZonecode());
    }

    @Override
    public MemberVO getMember(String email) {
        log.info("계정 정보 불러 오기 서비스 실행 => email : " + email);
        return memberMapper.getMember(email);
    }

    @Override
    public MemberInfoVO getMemberInfo(Integer memberNo) {
        log.info("멤버 정보 불러 오기 서비스 실행 => memberNo : " + memberNo);
        MemberInfoVO memberInfoVO;
        memberInfoVO = memberMapper.getMemberInfo(memberNo);
        log.info("멤버 정보 : " + memberInfoVO);
        return memberInfoVO;
    }

    @Override
    public List<AnimalLocationVO> getFavorite(Integer memberNo) {
        return memberMapper.getFavorite(memberNo);
    }

    @Override
    public List<BoardVO> getMemberPost(Integer memberNo) {
        return memberMapper.getMemberPost(memberNo);
    }


    @Override
    public Boolean duplicationNickname(String nickname) {
        log.info("닉네임 중복 여부 조회 서비스 실행 => nickname : " + nickname);
        int cnt = memberMapper.duplicationNickname(nickname);

        if (cnt == 0) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public boolean getDuplicationEmail(String email) {
        String data = memberMapper.getDuplicationEmail(email);
        return data != null;
    }

    @Override
    public void updateProfile(MemberInfoVO memberInfoVO) {
        MemberInfoVO vo = new MemberInfoVO();

        vo.setNickName(memberInfoVO.getNickName());
        vo.setMemberNo(memberInfoVO.getMemberNo());
        vo.setProfileImg(memberInfoVO.getProfileImg());
        vo.setInputAddress(memberInfoVO.getInputAddress());
        vo.setDetailedAddress(memberInfoVO.getDetailedAddress());
        vo.setMypet(memberInfoVO.getMypet());
        vo.setPhoneNumber(memberInfoVO.getPhoneNumber());
        vo.setInputZonecode(memberInfoVO.getInputZonecode());

        memberMapper.updateProfile(vo.getNickName(), vo.getMemberNo(), vo.getProfileImg(), vo.getInputAddress(),
                vo.getDetailedAddress(), vo.getMypet(), vo.getPhoneNumber(), vo.getInputZonecode());
    }

    @Override
    public void updatePassword(MemberVO memberVO) {
        String newPassword = passwordEncoder.encode(memberVO.getPassword());
        System.out.println(newPassword);

        memberMapper.updatePassword(memberVO.getMemberNo(), newPassword);
    }
}
