package com.myspring.daengnyang.member.mapper;

import com.myspring.daengnyang.member.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {
     void createMember(@Param("email") String email, @Param("password") String password);
     void createMemberInfo(@Param("nickname") String nickname, @Param("memberNo") int memberNo,
                           @Param("profileImg") String profileImg, @Param("address") String address,
                           @Param("addressDetail") String addressDetail, @Param("favoritePet") String favoritePet,
                           @Param("phoneNumber") String phoneNumber);

     MemberVO getMember(@Param("email") String email);

     int getMemberNo(@Param("email") String email);

     int duplicationNickname(@Param("nickname") String nickname);
}
