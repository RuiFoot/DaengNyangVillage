package com.myspring.daengnyang.member.mapper;

import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.board.vo.BoardVO;
import com.myspring.daengnyang.member.vo.MemberInfoVO;
import com.myspring.daengnyang.member.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MemberMapper {
    void createMember(@Param("email") String email, @Param("password") String password);

    void createMemberInfo(@Param("nickname") String nickname, @Param("memberNo") int memberNo,
                          @Param("profileImg") String profileImg, @Param("address") String address,
                          @Param("addressDetail") String addressDetail, @Param("favoritePet") String favoritePet,
                          @Param("phoneNumber") String phoneNumber);

    MemberVO getMember(@Param("email") String email);

    int getMemberNo(@Param("email") String email);

    MemberInfoVO getMemberInfo(@Param("memberNo") Integer memberNo);

    MemberInfoVO getMemberInfoL(@Param("memberNo") Long memberNo);

    List<AnimalLocationVO> getFavorite(@Param("memberNo") Integer memberNo);


    List<BoardVO> getMemberPost(@Param("memberNo") Integer memberNo);

    String getDuplicationEmail(@Param("email") String email);

    int duplicationNickname(@Param("nickname") String nickname);

    void updateProfile(@Param("nickname") String nickname, @Param("memberNo") int memberNo,
                       @Param("profileImg") String profileImg, @Param("address") String address,
                       @Param("addressDetail") String addressDetail, @Param("favoritePet") String favoritePet,
                       @Param("phoneNumber") String phoneNumber);


}
