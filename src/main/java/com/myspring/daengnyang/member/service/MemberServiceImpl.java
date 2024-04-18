package com.myspring.daengnyang.member.service;

import com.myspring.daengnyang.member.mapper.MemberMapper;
import com.myspring.daengnyang.member.vo.MemberInfoVO;
import com.myspring.daengnyang.member.vo.MemberVO;
import com.myspring.daengnyang.member.vo.SignupForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final PasswordEncoder passwordEncoder;
    private final MemberMapper memberMapper;
    @Autowired
    public MemberServiceImpl(PasswordEncoder passwordEncoder, MemberMapper memberMapper) {
        this.passwordEncoder = passwordEncoder;
        this.memberMapper = memberMapper;
    }

    @Override
    public void createMember(SignupForm signupForm) {
        MemberVO user = new MemberVO();
        user.setEmail(signupForm.getEmail());
        user.setPassword(passwordEncoder.encode(signupForm.getPassword()));
        log.info("일반 회원가입 서비스 실행");
        memberMapper.createMember(user.getEmail(),user.getPassword());

        int memberNo = memberMapper.getMemberNo(user.getEmail());
        MemberInfoVO userInfo = new MemberInfoVO();
        userInfo.setNickname(signupForm.getNickname());
        userInfo.setProfileImg(signupForm.getProfileImg());
        userInfo.setAddress(signupForm.getAddress());
        userInfo.setAddressDetail(signupForm.getAddressDetail());
        userInfo.setFavoritePet(signupForm.getFavoritePet());
        userInfo.setPhoneNumber(signupForm.getPhoneNumber());
        memberMapper.createMemberInfo(userInfo.getNickname(), memberNo, userInfo.getProfileImg(),
                userInfo.getAddress(), userInfo.getAddressDetail(), userInfo.getFavoritePet(), userInfo.getPhoneNumber());
    }

    @Override
    public MemberVO getMember(String email) {
        log.info("멤버 정보 불러오기 서비스 실행 => email : "+ email);
        return memberMapper.getMember(email);
    }

    @Override
    public boolean getDuplicationEmail(String email) {
        String data = memberMapper.getDuplicationEmail(email);
        return data != null;
    }


}
