package com.myspring.daengnyang.member.vo;


import lombok.Data;

@Data
public class SignupForm {
    private String email;
    private String password;
    private String nickname;
    private String profileImg;
    private String address;
    private String addressDetail;
    private String favoritePet;
    private String phoneNumber;
}
