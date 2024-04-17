package com.myspring.daengnyang.member.mapper;

import com.myspring.daengnyang.member.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public class MemberMapper {

    public MemberVO createMember(int memberNo, String email, String password);
}
