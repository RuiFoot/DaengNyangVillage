package com.myspring.daengnyang.member.service;

import com.myspring.daengnyang.board.service.BoardService;
import com.myspring.daengnyang.member.mapper.MemberMapper;
import com.myspring.daengnyang.member.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberMapper memberMapper;

    @Override
    public MemberVO createMember(int memberNo, String email, String password) {
        return memberMapper.createMember(memberNo, email, password);
    }
}
