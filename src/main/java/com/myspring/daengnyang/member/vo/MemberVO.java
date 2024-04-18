package com.myspring.daengnyang.member.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberVO {
    private int memberNo;
    private String email;
    private String password;
}
