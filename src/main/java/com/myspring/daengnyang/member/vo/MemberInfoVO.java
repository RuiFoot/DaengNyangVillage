package com.myspring.daengnyang.member.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MemberInfoVO {
    private String nickname;
    private int memberNo;
    private String profileImg;
    private String address;
    private String addressDetail;
    private String favoritePet;
    private String phoneNumber;
}
