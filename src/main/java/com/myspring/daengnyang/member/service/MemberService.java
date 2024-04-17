package com.myspring.daengnyang.member.service;

import com.myspring.daengnyang.member.vo.MemberInfoVO;
import com.myspring.daengnyang.member.vo.MemberVO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public interface MemberService {

    public MemberVO createMember(int memberNo, String emaiil, String password);

}
