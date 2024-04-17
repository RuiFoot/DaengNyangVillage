package com.myspring.daengnyang.member.service;


import com.myspring.daengnyang.member.vo.SignupForm;
import org.springframework.stereotype.Service;

@Service
public interface MemberService {

    void createMember(SignupForm signupForm);

}
