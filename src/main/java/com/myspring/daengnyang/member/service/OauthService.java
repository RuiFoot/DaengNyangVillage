package com.myspring.daengnyang.member.service;

import com.fasterxml.jackson.databind.JsonNode;

public interface OauthService {
    String getKakaoAccessToken (String code);
    String getUserInfo(String accessToken);

    String kakaoLogin(String loginResult);
    String kakaoLogout(Long target_id);
    String kakaoUnlink(Long target_id);

    void socialLogin(String code, String registrationId);
    String getAccessToken(String authorizationCode, String registrationId);
    JsonNode getUserResource(String accessToken, String registrationId);
}
