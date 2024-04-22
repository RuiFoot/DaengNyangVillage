package com.myspring.daengnyang.member.service;

public interface OauthService {
    String getKakaoAccessToken (String code);
    String getUserInfo(String accessToken);
    String kakaoLogout(Long target_id);
    String kakaoUnlink(Long target_id);
}
