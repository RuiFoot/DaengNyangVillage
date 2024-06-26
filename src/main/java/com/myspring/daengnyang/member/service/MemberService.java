package com.myspring.daengnyang.member.service;


import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.board.vo.BoardVO;
import com.myspring.daengnyang.member.vo.MemberInfoVO;
import com.myspring.daengnyang.member.vo.MemberVO;
import com.myspring.daengnyang.member.vo.SignupForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface MemberService {

    void createMember(SignupForm signupForm);

    MemberVO getMember(String email);

    MemberInfoVO getMemberInfo(Integer memberNo);

    Page<AnimalLocationVO> getFavorite(Integer memberNo, Pageable pageable);

    Page<BoardVO> getMemberPost(int memberNo, Pageable pageable);

    boolean getDuplicationEmail(String email);

    Boolean duplicationNickname(String nickname);

    void updateProfile(MemberInfoVO memberInfoVO);

    void updatePassword(MemberVO memberVO);

    String findEmail(String phoneNumber);
    String findNickname(String email);
}
