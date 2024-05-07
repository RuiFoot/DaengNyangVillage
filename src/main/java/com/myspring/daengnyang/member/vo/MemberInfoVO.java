package com.myspring.daengnyang.member.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MemberInfoVO {
    private String nickName;
    private int memberNo;
    private String profileImg;
    private String inputAddress;
    private String detailedAddress;
    private String mypet;
    private String phoneNumber;
    private String inputZonecode;
}
