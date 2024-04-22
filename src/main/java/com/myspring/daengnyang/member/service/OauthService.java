package com.myspring.daengnyang.member.service;

public interface OauthService {
    String getKakaoAccessToken (String code);
    String getUserInfo(String accessToken);

    String kakaoLogin(String loginResult);
    String kakaoLogout(Long target_id);
    String kakaoUnlink(Long target_id);
}
