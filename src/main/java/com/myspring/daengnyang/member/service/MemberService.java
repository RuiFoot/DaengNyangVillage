package com.myspring.daengnyang.member.service;


import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import com.myspring.daengnyang.board.vo.BoardVO;
import com.myspring.daengnyang.member.vo.MemberInfoVO;
import com.myspring.daengnyang.member.vo.MemberVO;
import com.myspring.daengnyang.member.vo.SignupForm;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface MemberService {

    void createMember(SignupForm signupForm);
    MemberVO getMember(String email);

    MemberInfoVO getMemberInfo(Integer memberNo);

    List<AnimalLocationVO> getFavorite(Integer memberNo);

    BoardVO getMemberPost(Integer memberNo);

    boolean getDuplicationEmail(String email);

    Boolean duplicationNickname(String nickname);

    void updateProfile(MemberInfoVO memberInfoVO);
}
