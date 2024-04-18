package com.myspring.daengnyang.member.mapper;

import com.myspring.daengnyang.member.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {
     void createMember(@Param("email") String email, @Param("password") String password);

     MemberVO getMember(@Param("email") String email);

}
