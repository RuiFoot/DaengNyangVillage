package com.myspring.daengnyang.member.service;

import com.myspring.daengnyang.member.mapper.MemberMapper;
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
    }
}
