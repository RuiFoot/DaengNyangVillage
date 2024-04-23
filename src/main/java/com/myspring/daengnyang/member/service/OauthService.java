package com.myspring.daengnyang.member.service;

import com.fasterxml.jackson.databind.JsonNode;

public interface OauthService {
    String getKakaoAccessToken (String code);
    String getUserInfo(String accessToken);

    String kakaoLogin(String loginResult);
    String kakaoLogout(Long target_id);
    String kakaoUnlink(Long target_id);

    /**
     * 구글
     * @param code
     * @return
     */
    String googleLogin(String code);
    String getGoogleAccessToken(String authorizationCode);
    JsonNode getUserResource(String accessToken);
}
